<template>
  <div>
    <ToDoInputField
      :show-check-box="showCheckBox"
      :all-checked="allChecked"
      class=""
    />

    <div>
      <transition-group name="list">
        <ToDoListItem
          v-for="item in filteredTasks"
          v-if="item._id"
          :key="item._id"
          :item="item"
          class="px-3 mb-5"
        />
      </transition-group>

      <ToDoFooter :items="items" />
    </div>
  </div>
</template>

<script>
import ToDoInputField from './ToDoInputField.vue'
import ToDoListItem from './ToDoListItem.vue'
import ToDoFooter from './ToDoFooter.vue'

export default {
  data() {
    return {
      currentDate: null,
    }
  },
  beforeMount() {
    this.$store.dispatch('fetchItems')
    this.tasks = this.$store.getters.tasks
  },

  components: {
    ToDoInputField,
    ToDoListItem,
    ToDoFooter,
  },

  computed: {
    showCheckBox() {
      return this.$store.getters.showCheckBox
    },

    allChecked() {
      return this.$store.getters.allChecked
    },

    tags() {
      return this.$store.getters.getTag
    },

    items() {
      this.currentDate = this.$store.getters['calendar/getCurrentDate']
      if (!this.currentDate) return //If there's no date do nothing
      const filter = this.$store.state.filter

      let todaysTasks = this.$store.state.items.filter(
        (item) => item.date === this.currentDate
      )
      if (!todaysTasks) return
      if (todaysTasks.filter((item) => !item.isChecked).length > 0) {
        return todaysTasks.filter((item) => !item.isChecked)
      } else {
        return todaysTasks.filter((item) => item.isChecked)
      }
    },

    filteredTasks() {
      this.currentDate = this.$store.getters['calendar/getCurrentDate']
      if (!this.currentDate) return //If there's no date do nothing
      const filter = this.$store.state.filter
      const priority = this.$store.state.tag

      let todaysTasks = this.$store.state.items.filter(
        (item) => item.date === this.currentDate
      )

      switch (filter) {
        case 'active':
          switch (priority) {
            case 1:
              return todaysTasks.filter(
                (item) => !item.isChecked && item.tag == 'Trivial'
              )
            case 2:
              return todaysTasks.filter(
                (item) => !item.isChecked && item.tag == 'Normal'
              )
            case 3:
              return todaysTasks.filter(
                (item) => !item.isChecked && item.tag == 'Important'
              )
            default:
              return todaysTasks.filter((item) => !item.isChecked)
          }
        case 'completed':
          switch (priority) {
            case 1:
              return todaysTasks.filter(
                (item) => item.isChecked && item.tag == 'Trivial'
              )
            case 2:
              return todaysTasks.filter(
                (item) => item.isChecked && item.tag == 'Normal'
              )
            case 3:
              return todaysTasks.filter(
                (item) => item.isChecked && item.tag == 'Important'
              )
            default:
              return todaysTasks.filter((item) => item.isChecked)
          }
        default:
          switch (priority) {
            case 1:
              return todaysTasks.filter((item) => item.tag == 'Trivial')
            case 2:
              return todaysTasks.filter((item) => item.tag == 'Normal')
            case 3:
              return todaysTasks.filter((item) => item.tag == 'Important')
            default:
              return todaysTasks
          }
      }
    },

    filterTags() {},
  },

  mounted() {
    //console.log(this.$store.getters['calendar/getSavedDates'])
  },
}
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(20px);
}
</style>
