import dayjs from 'dayjs'
import PouchDB from 'pouchdb'
const LOCAL_CALENDAR = new PouchDB('calendar')

export const state = () => ({
  dates: [],
  currentDate: '',
})

export const mutations = {
  ADD_DATE(state, date) {
    for (let i = 0; i < state.dates.length; i++) {
      if (state.dates[i].name === date) {
        return
      }
    }
    state.dates.push({ name: date })

    state.currentDate = date
  //  console.log("STORE", date)
  //  console.log('Dates in state: ', state.dates)
  },
  SET_CURRENT_DATE(state, date) {
    state.currentDate = date
  //  console.log("STORE CURRENT DATE", date)
  },
}

export const getters = {
  getSavedDates: (state) => {
    const savedDates = []
    for (let i = 0; i < state.dates.length; i++) {
      savedDates.push(state.dates[i].name)
    }
    return savedDates
  },
  getCurrentDate: (state) => {
    return state.currentDate
  },
}

export const actions = {
  addDate({ commit }, date) {
    commit('ADD_DATE', date)
  },
  setCurrentDate({ commit }, date) {
    commit('SET_CURRENT_DATE', date)
  },
  getCurrentDate: (state) => {
    return state.currentDate
  },
}
