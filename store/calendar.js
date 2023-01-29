export const state = () => ({
    dates: [],
  })

export const mutations = {
    ADD_DATE (state, date){
        for (let i = 0; i < state.dates.length; i++) {
            if(state.dates[i].name === date){
                return
            }
          }
        state.dates.push({
            name: date,
        });
        console.log("Dates in state: ", state.dates)
    },
}


export const getters = {
    getSavedDates: (state) => {
        const savedDates = []
        for (let i = 0; i < state.dates.length; i++) {
            savedDates.push(state.dates[i].name)
        }
        return savedDates
    }
}


export const actions = {
    addDate ({commit},date){
        commit('ADD_DATE', date)
    },
}