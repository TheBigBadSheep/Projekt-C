import PouchDB from 'pouchdb'
const LOCAL_TASKS = new PouchDB('tasks')
import { Camera } from '@capacitor/camera'

export const state = () => ({
  taskInput: null,
  items: [],
  filter: 'all',
  editMode: false,
  currentDate: '',
  tag: 0,
})

export const mutations = {
  ADD_ITEM(state, item) {
    state.items.push(item)
  },

  CHANGE_FILTER(state, filter) {
    state.filter = filter
  },
  CHANGE_TAG(state) {
    state.tag += 1
    if (state.tag > 3) {
      state.tag = 0
    }
  },
  SET_TASKS(state, tasks) {
    state.items = tasks
  },
  SET_CURRENT_DATE(state, date) {
    state.currentDate = date
  },
}

export const actions = {
  setCurrentDate({ commit }, date) {
    commit('SET_CURRENT_DATE', date)
  },
  async addItem({ commit, dispatch }, task) {
    try {
      const newTask = {
        _id: new Date().getTime().toString(),
        ...task,
      }
      await LOCAL_TASKS.put(newTask)
      commit('ADD_ITEM', task)
      dispatch('fetchItems')
    } catch (error) {
      console.log(error)
    }
  },

  async fetchItems({ commit }) {
    try {
      const docs = await LOCAL_TASKS.allDocs({ include_docs: true })

      commit(
        'SET_TASKS',
        docs.rows.map((row) => row.doc)
      )
    } catch (error) {
      console.log(error)
    }
  },

  async removeTask({ dispatch }, task) {
    try {
      await LOCAL_TASKS.remove(task)
      dispatch('fetchItems')
    } catch (error) {
      console.log(error)
    }
  },

  async clearCompleted({ dispatch }) {
    try {
      const result = await LOCAL_TASKS.allDocs({ include_docs: true })

      const promises = result.rows
        .filter((row) => row.doc.isChecked)
        .map((row) => LOCAL_TASKS.remove(row.doc))

      await Promise.all(promises)

      dispatch('fetchItems')
    } catch (e) {
      console.log(e)
    }
  },

  async checkTask({ dispatch }, id) {
    try {
      const task = await LOCAL_TASKS.get(id)

      const response = await LOCAL_TASKS.put({
        _id: id,
        date: task.date,
        _rev: task._rev,
        text: task.text,
        image: task.image,
        tag: task.tag,
        isChecked: !task.isChecked,
      })

      dispatch('fetchItems')
    } catch (e) {
      console.log(e)
      return
    }
  },

  async updateTaskImage({ dispatch }, id) {
    try {
      const task = await LOCAL_TASKS.get(id)

      const image = await Camera.getPhoto({})
      const imageData = await readFile(image.webPath)
      const base64Data = await convertToBase64(imageData)

      const response = await LOCAL_TASKS.put({
        _id: id,
        date: task.date,
        _rev: task._rev,
        text: task.text,
        image: base64Data,
        tag: task.tag,
        isChecked: task.isChecked,
      })

      dispatch('fetchItems')
    } catch (e) {
      console.log(e)
      return
    }
  },

  async changeTag({ dispatch }, id) {
    try {
      const task = await LOCAL_TASKS.get(id)
      let tagChange = task.tag
      if (task.tag === 'Important' || task.tag == null) {
        tagChange = 'Trivial'
      } else if (task.tag === 'Trivial') {
        tagChange = 'Normal'
      } else if (task.tag === 'Normal') {
        tagChange = 'Important'
      }
      const response = await LOCAL_TASKS.put({
        _id: id,
        date: task.date,
        _rev: task._rev,
        text: task.text,
        image: task.image,
        isChecked: task.isChecked,
        tag: tagChange,
      })
      dispatch('fetchItems')
    } catch (e) {
      console.log(e)
      return
    }
  },

  async removeTaskImage({ dispatch }, id) {
    try {
      const task = await LOCAL_TASKS.get(id)

      const response = await LOCAL_TASKS.put({
        _id: id,
        date: task.date,
        _rev: task._rev,
        text: task.text,
        image: null,
        tag: task.tag,
        isChecked: task.isChecked,
      })

      dispatch('fetchItems')
    } catch (e) {
      console.log(e)
      return
    }
  },

  async toggleAllTasks({ dispatch }, checked) {
    try {
      const result = await LOCAL_TASKS.allDocs({ include_docs: true })
      if (checked) {
        const promises = result.rows
          //Get only the task where the date matches the active date in the state
          .filter(
            (row) =>
              !row.doc.isChecked && row.doc.date === this.state.currentDate
          )
          .map((row) => {
            row.doc.isChecked = !row.doc.isChecked
            LOCAL_TASKS.put(row.doc)
          })
        await Promise.all(promises)
      } else {
        const promises = result.rows
          .filter(
            (row) =>
              row.doc.isChecked && row.doc.date === this.state.currentDate
          )
          .map((row) => {
            row.doc.isChecked = !row.doc.isChecked
            LOCAL_TASKS.put(row.doc)
          })

        await Promise.all(promises)
      }

      dispatch('fetchItems')
    } catch (e) {
      console.log(e)
    }
  },

  async changeFilter({ commit, dispatch }, filter) {
    try {
      commit('CHANGE_FILTER', filter)
      dispatch('fetchItems')
    } catch (e) {
      console.log(e)
    }
  },

  async filterTag({ commit, dispatch }) {
    try {
      commit('CHANGE_TAG')
      dispatch('fetchItems')
    } catch (e) {
      console.log(e)
    }
  },

  async updateTask({ dispatch }, task) {
    try {
      const response = await LOCAL_TASKS.put(task)

      dispatch('fetchItems')
    } catch (e) {
      console.log(e)
    }
  },
}

export const getters = {
  tasks: (state) => state.items,

  showCheckBox: (state) => state.items.length > 0,

  allChecked: (state) => state.items.every((item) => item.isChecked),

  getTag: (state) => state.tag,
}

const readFile = async (filePath) => {
  const response = await fetch(filePath)
  const blob = await response.blob()
  return blob
}

const convertToBase64 = async (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })
}
