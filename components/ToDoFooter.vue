<template>
  <footer v-show="items.length > 0">
    <div class="py-4 space-y-4">
      <div class="flex justify-center disable-select space-x-4">
        <span
          v-if="!allChecked"
          @click="toggleAllTasks"
          class="bg-gray-100 text-sm text-gray-400 py-0.5 px-3 rounded-md cursor-pointer hover:text-gray-600 transition ease-in-out duration-200"
          >Check All</span
        >
        <span
          v-if="allChecked"
          @click="toggleAllTasks"
          class="bg-gray-100 text-sm text-gray-400 py-0.5 px-3 rounded-md cursor-pointer hover:text-gray-600 transition ease-in-out duration-200"
          >Uncheck All</span
        >
        <button
          class="bg-gray-100 text-sm text-gray-400 py-0.5 px-3 rounded-md cursor-pointer hover:text-red-400 transition ease-in-out duration-200"
          @click="clearCompleted"
        >
          Clear completed
        </button>
      </div>
      <div class="relative">
        <div class="flex flex-row w-screen items-center justify-around">
          <span
            v-if="itemsLeft.length == 1"
            class="fixed md:inset-x-14 text-xs sm:text-sm opacity-80 mt-5 sm:mt-0 -ml-3"
          >
            {{ itemsLeft.length }} Item left
          </span>
          <span
            v-if="itemsLeft.length != 1"
            class="fixed md:inset-x-14 text-xs sm:text-sm opacity-80 mt-5 sm:mt-0 -ml-3"
          >
            {{ itemsLeft.length }} Items left
          </span>
        </div>
        <div class="w-full flex justify-center gap-4 -mt-0.5 lg:ml-0">
          <button
            class="text-xs sm:text-sm rounded-lg px-2 border-2 border-transparent opacity-80 transition ease-in-out duration-200"
            :class="filter == 'all' ? 'bg-white shadow-sm' : ''"
            @click="changeFilter('all')"
          >
            All
          </button>
          <button
            class="text-xs sm:text-sm rounded-lg px-2 border-2 border-transparent opacity-80 transition ease-in-out duration-200"
            :class="filter == 'active' ? 'bg-white shadow-sm' : ''"
            @click="changeFilter('active')"
          >
            Active
          </button>
          <button
            class="text-xs sm:text-sm rounded-lg px-2 border-2 border-transparent opacity-80 transition ease-in-out duration-200"
            :class="filter == 'completed' ? 'bg-white shadow-sm' : ''"
            @click="changeFilter('completed')"
          >
            Completed
          </button>
          <button
            class="flex flex-row items-center space-x-2 text-xs sm:text-sm rounded-lg px-2 bg-white shadow-sm transition ease-in-out duration-200 z-30"
            @click="filterTag()"
          >
            <div class="rounded-full w-2 h-2" :class="tagColor"></div>
            <span>Tag</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    items: {
      default: () => [],
    },
  },

  data() {
    return {
      filter: 'all',
      areAllChecked: false,
      tag: '',
    }
  },

  computed: {
    itemsLeft() {
      return this.items.filter((item) => !item.isChecked)
    },
    atLeastOneChecked() {
      return this.itemsLeft.length < this.items.length
    },
    allChecked() {
      return this.itemsLeft.length === 0
    },
    currentTag() {
      return this.$store.getters['getTag']
    },
    tagColor() {
      switch (this.currentTag) {
        case 3:
          return 'bg-tag-important'
        case 2:
          return 'bg-tag-normal'
        case 1:
          return 'bg-gray-100'
        default:
          return 'bg-gray-200'
      }
    },
  },
  methods: {
    changeFilter(filter) {
      this.filter = filter
      this.$store.dispatch('changeFilter', filter)
      this.$emit('changedFilter', filter)
    },

    clearCompleted() {
      this.$store.dispatch('clearCompleted')
    },

    toggleAllTasks() {
      this.areAllChecked = !this.areAllChecked
      this.$store.dispatch('toggleAllTasks', this.areAllChecked)
    },
    filterTag() {
      this.$store.dispatch('filterTag')
    },
  },
}
</script>
<style>
.disable-select {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
