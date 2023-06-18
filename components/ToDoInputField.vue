<template>
  <div class="flex justify-center w-full pb-24 rounded-lg">
    <div class="flex">
      <input
        v-model="item"
        class="w-full sm:text-2xl text-lg px-2 sm:px-8 shadow-inner bg-white py-3 border-2 rounded-lg border-ToDo-DarkGreen placeholder-gray-500 text-gray-900 italic-font focus:outline-none sm:py-2"
        type="text"
        placeholder="What needs to be done?"
        @keypress.enter="addItem"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-11 w-11 mt-1 ml-2 text-ToDo-DarkGreen hover:text-white transition ease-in-out duration-200 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        @click="addItem"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
        />
      </svg>
      <svg
        @click="addImage"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-11 w-11 mt-1 ml-2 text-ToDo-DarkGreen hover:text-white transition ease-in-out duration-200 cursor-pointer"
      >
        <path
          fill-rule="evenodd"
          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { Camera } from '@capacitor/camera'
import { Filesystem } from '@capacitor/filesystem'
import { Capacitor } from '@capacitor/core'

export default {
  props: {
    showCheckBox: {
      type: Boolean,
      default: false,
    },
    allChecked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      item: '',
    }
  },

  computed: {
    activeArrowStyle() {
      if (this.allChecked) return 'opacity-100'
      return 'opacity-30'
    },
  },

  methods: {
    addItem() {
      if (this.item.length > 0) {
        const task = {
          text: this.item,
          isChecked: false,
          date: (this.currentDate =
            this.$store.getters['calendar/getCurrentDate']), //dayjs().format('DD-MM-YYYY'),
        }
        this.$store.dispatch('addItem', task)
        this.item = ''
      }
      this.$emit('taskAdded')
    },
    checkAll() {
      this.$store.dispatch('checkAllToDos')
    },
    async addImage() {
      const image = await Camera.getPhoto({})
      const imageData = await this.readFile(image.webPath)
      const base64Data = await this.convertToBase64(imageData)
      const task = {
        text: this.item,
        image: base64Data,
        isChecked: false,
        date: (this.currentDate =
          this.$store.getters['calendar/getCurrentDate']), //dayjs().format('DD-MM-YYYY'),
      }
      this.$store.dispatch('addItem', task)
      this.item = ''
      this.$emit('taskAdded')
    },
    async readFile(filePath) {
      const response = await fetch(filePath)
      const blob = await response.blob()
      return blob
    },
    async convertToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = reject
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.readAsDataURL(blob)
      })
    },
  },
}
</script>

<style scoped>
.italic-font::placeholder {
  font-style: italic;
  color: rgb(209, 213, 219);
}
</style>
