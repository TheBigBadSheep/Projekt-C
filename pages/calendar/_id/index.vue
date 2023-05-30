<template>
  <div class="h-full">
    <nuxt-link to="/calendar">
      <div
        class="flex absolute z-20 justify-center w-full text-white text-4xl shadow-inner-x">
        <span class="h-10 mt-9">T</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 mt-9 w-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="h-10 mt-9">DO</span>
      </div>
    </nuxt-link>
    <div
      class="-z-10 absolute flex justify-center w-full bg-ToDo-Green h-56 -mt-2 l"
    ></div>
    <div class="z-10 sticky flex flex-col w-full">
      <div class="w-11/12 lg:w-1/2 sm:place-self-center">
        <ToDoList class="mt-28"></ToDoList>
      </div>
    </div>
  </div>
</template>

<script>
import ToDoList from '../../../components/ToDoList.vue'

export default {
  transition: 'TodoIndexTransition',
  components: {
    ToDoList,
  },

  data() {
    return {}
  },

  computed: {},

  methods: {
    goToCalendar() {},
  },
}
</script>

<style>
.TodoIndexTransition-enter-active,
.TodoIndexTransition-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
}
.TodoIndexTransition-enter,
.TodoIndexTransition-leave-to {
  opacity: 0;
}
</style>
</script>

<style></style>
