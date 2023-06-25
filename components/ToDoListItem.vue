<template>
  <div class="relative h-full items-center flex flex-row gap-4">
    <div @click="checkTask" class="h-fit w-10">
      <svg
        v-if="item.isChecked"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-10 w-10 text-ToDo-LightGreen"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
      <svg
        v-if="!item.isChecked"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-10 w-10 text-ToDo-LightGreen"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <div class="flex flex-row space-x-3 w-full min-h-fit">
      <div v-if="item.image" class="relative h-32 w-48">
        <img
          :src="item.image"
          class="h-full w-full object-cover rounded-md border-2 border-ToDo-Green"
        />
        <img
          src="../assets/deleteButton.svg"
          class="absolute bg-white opacity-60 p-1 rounded-full h-6 w-6 right-2 top-2 transition ease-out duration-100 cursor-pointer"
          @click="removeTaskImage"
        />
      </div>
      <textarea
        v-model="inputValue"
        rows="3"
        class="no-scrollbar resize-none pl-5 pr-12 sm:pr-12 py-3 w-full bg-white text-md sm:text-2xl border-2 border-ToDo-Green rounded-lg hover:shadow-inner focus:shadow-inner focus:outline-none focus:border-gray-200 transition ease-in-out duration-200"
        :class="{ 'line-through opacity-30': item.isChecked }"
        type="text"
        @change="updateTask"
      />
    </div>

    <div class="absolute flex flex-col h-6 w-6 sm:h-8 sm:w-8 inset-y-0 right-6">
      <img
        src="../assets/deleteButton.svg"
        class="h-full w-full mt-3 opacity-10 hover:opacity-100 transition ease-out duration-100 cursor-pointer"
        @click="removeTask"
      />
      <img
        src="../assets/gallery.svg"
        class="h-full w-full mt-3 opacity-10 hover:opacity-100 transition ease-out duration-100 cursor-pointer"
        @click="updateTaskImage"
      />
      <button class="p-2 rounded-lg bg-ToDo-Green" @click="changeTag">{{ this.item.tag }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      default: () => null,
      type: Object,
    },
  },

  data() {
    return {
      inputValue: this.item.text,
      tag: ['Important', 'Normal', 'Trivial'],
    }
  },
  methods: {
    checkTask() {
      this.$store.dispatch('checkTask', this.item._id)
      console.log(this.item)
      this.emitChange()
    },

    removeTask() {
      this.$store.dispatch('removeTask', this.item)
      this.emitChange()
    },

    updateTaskImage() {
      this.$store.dispatch('updateTaskImage', this.item._id)
      this.emitChange()
    },

    removeTaskImage() {
      this.$store.dispatch('removeTaskImage', this.item._id)
      this.emitChange()
    },

    changeTag(){
      this.$store.dispatch('changeTag', this.item._id)
    },

    updateTask() {
      const task = {
        _id: this.item._id,
        _rev: this.item._rev,
        text: this.inputValue,
        isChecked: this.item.isChecked,
        image: this.item.image,
        tag: this.item.tag,
        date: (this.currentDate =
          this.$store.getters['calendar/getCurrentDate']), //dayjs().format('DD-MM-YYYY'),
      }
      this.$store.dispatch('updateTask', task)
      this.emitChange()
    },
    emitChange() {
      this.$emit('onChanged')
    },
  },
}
</script>
<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
