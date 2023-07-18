<template>
  <div class="h-screen flex flex-col space-y-8 justify-between sm:p-0 p-4">
    <div class="w-full flex flex-col space-y-8 items-center justify-center">
      <nuxt-link to="/calendar">
        <span class="font-lemon w-full text-white text-8xl text-center"
          >TODO</span
        >
      </nuxt-link>
      <ToDoInputField
        :show-check-box="showCheckBox"
        :all-checked="allChecked"
        class=""
      />
    </div>

    <div class="relative grow h-full overflow-y-scroll overflow-x-hidden pt-8">
      <div
        v-if="modalImage"
        class="z-50 fixed inset-0 h-full w-full flex justify-center items-center bg-black/50"
        @click="modalImage = null"
      >
        <div class="w-80 p-4 bg-white rounded-2xl">
          <img
            :src="modalImage"
            class="object-cover rounded-2xl w-full h-full"
          />
        </div>
      </div>
      <transition-group name="list" class="z-40 space-y-12">
        <ToDoListItem
          v-for="item in filteredTasks"
          :key="item._id"
          :item="item"
          @modal="onOpenImageModal"
        />
      </transition-group>
    </div>
    <ToDoFooter class="shrink-0" :items="items" />
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
      modalImage: null,
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

  methods: {
    onOpenImageModal(image) {
      this.modalImage = image
    },
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

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #b4adff;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #c2bdff;
}
</style>
