import PouchDB from 'pouchdb';
const LOCAL_TASKS = new PouchDB('tasks')

export const state = () => ({
  taskInput: null,
  items: [],
  filter: 'all',
  editMode: false
})

export const mutations = {
  ADD_ITEM(state, item) {
    state.items.push(item)
  },

  CHANGE_FILTER(state, filter) {
    state.filter = filter
  },

  SET_TASKS(state, tasks) {
    state.items = tasks
  }
}

export const actions = {
  async addItem({ commit, dispatch }, task) {
    try {
      const newTask = {
        _id: new Date().getTime().toString(),
        ...task
      }
      await LOCAL_TASKS.put(newTask)
      commit('ADD_ITEM', task)
      dispatch('fetchItems')
    }
    catch (error) {
      console.log(error)
    }
  },

  async fetchItems({ commit }) {
    try {
      const docs = await LOCAL_TASKS.allDocs({ include_docs: true })

      commit("SET_TASKS", docs.rows.map(row => row.doc))
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

      const promises = result.rows.filter(row => row.doc.isChecked).map(row => LOCAL_TASKS.remove(row.doc))

      await Promise.all(promises)

      dispatch('fetchItems')
    }
    catch (e) {
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
        isChecked: !task.isChecked
      })

      dispatch('fetchItems')
    }
    catch (e) {
      console.log(e)
      return
    }
  },

  async toggleAllTasks({ dispatch }, checked) {
    try {
      const result = await LOCAL_TASKS.allDocs({ include_docs: true })

      if (checked) {
        const promises = result.rows.filter(row => !row.doc.isChecked).map(row => {
          row.doc.isChecked = !row.doc.isChecked
          LOCAL_TASKS.put(row.doc)
        })

        await Promise.all(promises)
      }

      else {
        const promises = result.rows.filter(row => row.doc.isChecked).map(row => {
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

  allChecked: (state) => state.items.every(item => item.isChecked),

}
