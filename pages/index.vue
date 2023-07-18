<template>
  <div
    class="h-screen w-full bg-gradient-to-br from-ToDo-gradient-purple to to-ToDo-gradient-teal flex items-center justify-center"
  >
    <nuxt-link to="/calendar">
      <div id="rotator">
        <span class="hover:scale-110 font-lemon text-white text-9xl">TODO</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import ToDoList from '../components/ToDoList.vue'

export default {
  transition: 'startPage',

  components: {
    ToDoList,
  },

  data() {
    return {
      cursorPositionX: 0,
      cursorPositionY: 0,
    }
  },

  computed: {},

  methods: {},

  mounted() {
    const elem = document.getElementById('rotator')

    document.addEventListener('mousemove', (event) => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      const centerX = windowWidth / 2
      const centerY = windowHeight / 2

      const mouseX = event.clientX
      const mouseY = event.clientY

      const deltaX = mouseX - centerX
      const deltaY = mouseY - centerY

      const percentageX = deltaX / centerX
      const percentageY = deltaY / centerY

      const maxRotation = 30
      const maxTranslation = 100

      const alpha = maxRotation * percentageX
      const beta = maxRotation * percentageY
      const gamma = 0

      const translationX = maxTranslation * percentageX
      const translationY = -maxTranslation * percentageY
      const translationZ = -300

      elem.style.transform = `perspective(1000px) translate3d(${translationX}px, ${translationY}px, ${translationZ}px) rotateY(${alpha}deg) rotateX(${-beta}deg) rotateZ(${gamma}deg)`
    })
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
