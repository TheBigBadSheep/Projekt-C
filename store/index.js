import PouchDB from 'pouchdb';
const LOCAL_TASKS = new PouchDB('tasks')

export const state = () => ({
  taskInput: null,
  items: [],
  filter: 'all',
  filteredTasks: [],
  editMode: false
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

  CHECK_ALL(state, isChecked) {
    if (isChecked) {
      state.tasks.forEach(task => {
        if (!task.isCompleted) task.isCompleted = true
      })
    }
    else {
      state.tasks.forEach(task => {
        if (task.isCompleted) task.isCompleted = false
      })
    }
  },

  SET_TASK_INPUT(state, task) {
    state.taskInput = task
  },

  CHANGE_FILTER(state, filter) {
    state.filter = filter

    switch (filter) {
      case 'active':
        state.filteredTasks = state.items.filter(item => !item.isChecked)
        break

      case 'completed':
        state.filteredTasks = state.items.filter(item => item.isChecked)
        break

      default:
        state.filteredTasks = state.items
    }

    console.log(state.filteredTasks)

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
      console.log("fetching ...")
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

  async clearCompletedTasks({ commit }, task) {
    try {
      const result = await LOCAL_TASKS.allDocs({ include_docs: true })

      const promises = result.rows.filter(row => row.doc.isCompleted).map(row => LOCAL_TASKS.remove(row.doc))

      await Promise.all(promises)
      commit('CLEAR_COMPLETED', task)
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

  async toggleAllTasks({ commit }, checked) {
    try {
      const result = await LOCAL_TASKS.allDocs({ include_docs: true })

      if (checked) {
        const promises = result.rows.filter(row => !row.doc.isCompleted).map(row => {
          row.doc.isCompleted = !row.doc.isCompleted
          LOCAL_TASKS.put(row.doc)
        })

        await Promise.all(promises)
      }

      else {
        const promises = result.rows.filter(row => row.doc.isCompleted).map(row => {
          row.doc.isCompleted = !row.doc.isCompleted
          LOCAL_TASKS.put(row.doc)
        })

        await Promise.all(promises)
      }

      commit('CHECK_ALL', checked)

    } catch (e) {
      console.log(e)
    }
  },

  setTaskInput({ commit }, task) {
    commit('SET_TASK_INPUT'.task)
  },

  changeFilter({ commit }, filter) {
    commit('CHANGE_FILTER', filter)
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
  }

}

export const getters = {
  getTaskInput: (state) => state.taskInput,

  getTasks: (state) => state.items,

  filteredItems: (state) => {
    if (state.filter === 'all') {
      return state.items
    } else if (state.filter === 'active') {
      return state.items.filter(item => !item.isChecked)
    } else if (state.filter === 'completed') {
      return state.items.filter(item => item.isChecked)
    }
  },

  getCompletedTasks: state => {
    const completedTasks = []
    state.tasks.filter(task => {
      if (task.isCompleted) {
        completedTasks.push(task)
      }
    });
    return completedTasks
  },

  getActiveTasks: state => {
    const activeTasks = []
    state.tasks.filter(task => {
      if (!task.isCompleted) {
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

}
