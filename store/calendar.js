export const state = () => ({
    dates: [],
  })

export const mutations = {
    ADD_DATE (state, date){
        state.dates.push({
            name: date,
        });
        console.log(state.dates)
    },
}


export const getters = {
    showCheckBox: (state) => state.items.length > 0,
    allChecked: (state) =>  state.items.every(item => item.isChecked),
}


export const actions = {
    addDate ({commit},date){
        commit('ADD_DATE', date)
    },
}