import PouchDB from 'pouchdb';
import Vue from 'vue';
const LOCAL_TASKS = new PouchDB('tasks')

export const state = () => ({
  taskInput: null,
  items: [],
  filter: 'all',
  activeTasks: [],
  completedTasks: [],
  editMode: false,
  filteredTasks: []
})

export const mutations = {
  ADD_ITEM(state, item) {
    state.items.push(item)
  },

  CLEAR_COMPLETED(state) {
    state.items = state.items.filter(item => !item.isChecked)
  },

  MARK_AS_CHECKED(state, checkedTask) {
    const foundTask = state.tasks.find(task => {
      return task === checkedTask
    })
    foundTask.isCompleted = !foundTask.isCompleted
  },

  SET_TASK_INPUT(state, task) {
    state.taskInput = task
  },

  CHANGE_FILTER(state, filter) {
    state.filter = filter

    switch (state.filter) {
      case 'active':
        state.activeTasks = state.items.filter(item => !item.isChecked)
        console.log(state.activeTasks)
      case 'completed':
        state.completedTasks = state.items.filter(item => item.isChecked)
        console.log(state.completedTasks)
      default:
        return
    }
  },

  SET_EDIT_MODE(state, value) {
    state.editMode = value
  },

  SET_TASK_TEXT(state, value) {
    const foundTask = state.tasks.find(task => {
      return task.isEditing === true
    })
    foundTask.task = value
  },

  SET_TASKS(state, tasks) {
    //Vue.set(state, "items", tasks)
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
      console.log("DOCS: ", docs.rows.map(row => row.doc))
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

  async checkTask({ state, commit, dispatch }, id) {
    try {
      const task = await LOCAL_TASKS.get(id)

      const response = await LOCAL_TASKS.put({
        _id: id,
        _rev: task._rev,
        text: task.text,
        isChecked: !task.isChecked
      })




      dispatch('fetchItems')
      console.log(state.items)

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

      //commit('CHECK_ALL', checked)

    } catch (e) {
      console.log(e)
    }
  },

  setTaskInput({ commit }, task) {
    commit('SET_TASK_INPUT'.task)
  },

  async changeFilter({ commit, dispatch }, filter) {
    try {
      commit('CHANGE_FILTER', filter)
      dispatch('fetchItems')
    } catch (e) {
      console.log(e)
    }
  },

  async setTaskText({ commit }, text) {
    try {
      commit('SET_TASK_TEXT', text)
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
  getTaskInput: (state) => state.taskInput,

  tasks: (state) => state.items,

  filteredItems: (state) => {
    switch (state.filter) {
      case 'active':
        return state.items.filter(item => !item.isChecked)
      case 'completed':
        return state.items.filter(item => item.isChecked)
      default:
        return state.items
    }
  },

  getCompletedTasks: state => {
    const completedTasks = []
    state.tasks.filter(task => {
      if (task.isChecked) {
        completedTasks.push(task)
      }
    });
    return completedTasks
  },

  getActiveTasks: state => {
    const activeTasks = []
    state.tasks.filter(task => {
      if (!task.isChecked) {
        activeTasks.push(task)
      }
    });
    return activeTasks
  },

  getFilterContent: state => state.filter,

  getEditMode: state => state.editMode,

  getTaskText: state => {
    for (const task of state.tasks) {
      if (task.isEditing === true) return task.task
    }
  },

  showCheckBox: (state) => state.items.length > 0,

  allChecked: (state) => state.items.every(item => item.isChecked),

  getActiveTasksa: (state) => state.activeTasks,
  getCompletedTasksa: (state) => state.completedTasks,
}
