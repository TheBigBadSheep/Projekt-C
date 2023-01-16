<template>
  <div>

    <ToDoInputField
      :show-check-box="showCheckBox"
      :all-checked="allChecked"
      @taskAdded="test()"
      class=""/>


    <!--transition-group name="list"-->
      <ToDoListItem
        v-for="(item) in filteredTasks"
        :key="item._id"
        :item="item"
        @onChanged="test()"
        @onCheckedNiklas="(id) => markAsCheckedNiklas(id)"
        class="px-3"/>
    <!--/transition-group-->

    <ToDoFooter
      @changedFilter="test()"
      :items="items"
    />
  </div>
</template>


<script>

import ToDoInputField from "./ToDoInputField.vue"
import ToDoListItem from "./ToDoListItem.vue"
import ToDoFooter from "./ToDoFooter.vue"

export default {

    mounted(){
      this.$store.dispatch('fetchItems')
      this.tasks = this.$store.getters.tasks
    },

    components: {
      ToDoInputField, ToDoListItem, ToDoFooter,
    },

    data() {
      return {
        tasks: []
      }
    },

    computed: {

        itemsFiltered(){
          return this.$store.getters.filteredItems
        },

        allTasks(){
          return this.$store.getters.tasks
        },

        activeTasks(){
          return this.$store.getters.getActiveTasksa
        },

        completedTasks(){
          return this.$store.getters.getCompletedTasksa
        },

        showCheckBox(){
          return this.$store.getters.showCheckBox
        },

        allChecked(){
        return this.$store.getters.allChecked
        },

        items(){
          return this.$store.state.items
        },

        filter(){
          return this.$store.state.filter
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
    },

    methods: {
        test(){
          const filter = this.$store.state.filter;

          if(filter === 'all'){
            this.tasks = this.$store.state.items
            return
          }

          if(filter === 'active'){
            this.tasks = this.activeTasks
            return
          }

          if(filter === 'completed'){
            this.tasks = this.completedTasks
            return
          }
        },

        markAsCheckedNiklas(id){
          const index = this.items.findIndex( item => item.id === id )
          if(index === -1) return;
          const item = this.items[index];
          item.isChecked = true;
          this.items.splice(index, 1, item)
        },

    },

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
