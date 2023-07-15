<template>
  <div class="h-screen bg-gradient-to-br from-ToDo-gradient-purple to-ToDo-gradient-teal">
    <div class="z-10 sticky flex flex-col w-full h-full ">
      <div class="lg:w-1/2 sm:place-self-center">
        <ToDoList></ToDoList>
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
