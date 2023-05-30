<template>
  <div class="h-screen">
    <div class="flex justify-center items-center w-full bg-ToDo-Green h-full text-white text-4xl shadow-inner-xl">
      <div class="flex justify-center items-center group  h-auto">
      <span class="h-10 mt-9 group-hover:opacity-0 transform duration-300 ease-in-out">T</span>
      <nuxt-link to="/calendar"> 
      <div class="hover:rotate-180 transform duration-500 ease-in-out h-80"> 
      <svg xmlns="http://www.w3.org/2000/svg" class="h-80 mt-9 w-80 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      </div>
      </nuxt-link>
      <span class="h-10 mt-9 group-hover:opacity-0 transform duration-300 ease-in-out">DO</span>
      </div>
    </div>
  </div>
</template>


<script>

import ToDoList from "../components/ToDoList.vue"

export default {
    transition: "startPage",
    
    components: {
      ToDoList
    },

    data() {
      return {

      }
    },

    computed: {

    },

    methods: {

    },

  }
</script>

<style>
.startPage-enter-active,
.startPage-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
}
.startPage-enter,
.startPage-leave-to {
  opacity: 0;
}
</style>