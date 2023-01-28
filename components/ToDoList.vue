<template>
  <div>

    <ToDoInputField
      :show-check-box="showCheckBox"
      :all-checked="allChecked"
      class=""/>


      <div>
        <transition-group name="list">
          <ToDoListItem
            v-for="(item) in filteredTasks"
            :key="item._id"
            :item="item"
            class="px-3"/>
        </transition-group>
    
        <ToDoFooter :items="items"/>
      </div>
  </div>
</template>


<script>

import ToDoInputField from "./ToDoInputField.vue"
import ToDoListItem from "./ToDoListItem.vue"
import ToDoFooter from "./ToDoFooter.vue"

export default {

    beforeMount(){
      this.$store.dispatch('fetchItems')
      this.tasks = this.$store.getters.tasks
    },

  components: {
    ToDoInputField, ToDoListItem, ToDoFooter,
  },

  computed: {

    showCheckBox(){
      return this.$store.getters.showCheckBox
    },

    allChecked(){
      return this.$store.getters.allChecked
    },

    items(){
      return this.$store.state.items
    },

    filteredTasks(){
      const filter = this.$store.state.filter

      switch (filter) {
        case 'active':
          return this.$store.state.items.filter(item => !item.isChecked)
        case 'completed':
          return this.$store.state.items.filter(item => item.isChecked)
        default:
          return this.$store.state.items
      }
    },
  }
}
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(20px);
}
</style>
