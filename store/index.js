export const state = () => ({
    items: [],
    filter: 'all',
  })

export const mutations = {
    ADD_ITEM (state, item){
        if(item.length > 0){
            state.items.push({
                id: Math.floor(Math.random() * 1000),
                name: item,
                isChecked: false,
            });
        }
    },

    CHANGE_FILTER(state, filter){
        state.filter = filter
    },

    MARK_AS_CHECKED(state, id){
        const index = state.items.findIndex( item => item.id === id )
          if(index === -1) return;

          if(!state.items[index].isChecked){
            const item = state.items[index];
            item.isChecked = true;
            state.items.splice(index, 1, item)
          }else{
            const item = state.items[index];
            item.isChecked = false;
            state.items.splice(index, 1, item)
          }
    },

    REMOVE_ITEM(state, id){
        const index = state.items.findIndex( item => item.id === id )
        state.items.splice(index, 1)
    },

    EDIT_TODO(state, payload){
        const index = state.items.findIndex( item => item.id === payload.id )
        const item = { ...state.items[index] };
        item.name = payload.inputValue;
        state.items.splice(index, 1, item)
    },

    CHECK_ALL(state){
        const allChecked = !state.items.every(item => item.isChecked)
        state.items = state.items.map(item => {
            item.isChecked = allChecked
            return item
        });
    },

    CLEAR_COMPLETED(state){
        state.items = state.items.filter(item => !item.isChecked)
    }
}


export const getters = {
    showCheckBox: (state) => state.items.length > 0,
    allChecked: (state) =>  state.items.every(item => item.isChecked),
    filteredItems: (state) => {
        if (state.filter === 'all'){
            return state.items
          }else if(state.filter === 'active'){
            return state.items.filter(item => !item.isChecked)
          }else if(state.filter === 'completed'){
            return state.items.filter(item => item.isChecked)
          }
    }
}


export const actions = {
    addItem ({commit},item){
        commit('ADD_ITEM', item)
    },

    removeItem({commit}, id){
        commit('REMOVE_ITEM', id)
    },

    changeFilter({commit}, filter){
        commit('CHANGE_FILTER', filter)
    },

    markAsChecked({commit}, id){
        commit('MARK_AS_CHECKED', id)
    },

    editToDo({commit}, payload){
        commit('EDIT_TODO', payload)
    },

    checkAllToDos({commit}){
        commit('CHECK_ALL')
    },

    clearCompleted({commit}){
        commit('CLEAR_COMPLETED')
    },

}