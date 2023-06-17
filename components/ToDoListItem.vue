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
      <img
        v-if="item.image"
        :src="item.image"
        class="h-40 w-64 object-cover rounded-md border-2 border-ToDo-Green"
      />

      <textarea
        v-model="inputValue"
        class="no-scrollbar resize-none w-full bg-white text-2xl border-2 border-ToDo-Green rounded-lg px-5 py-3 hover:shadow-inner focus:shadow-inner focus:outline-none focus:border-gray-200 transition ease-in-out duration-200"
        :class="{ 'line-through opacity-30': item.isChecked }"
        type="text"
        @change="updateTask"
      />
    </div>

    <div class="absolute flex flex-col h-8 w-8 inset-y-0 right-6">
      <img
        src="../assets/deleteButton.svg"
        class="h-8 w-8 mt-3 opacity-10 hover:opacity-100 transition ease-out duration-100 cursor-pointer"
        @click="removeTask"
      />
      <img
        src="../assets/gallery.svg"
        class="h-8 w-8 mt-3 opacity-10 hover:opacity-100 transition ease-out duration-100 cursor-pointer"
        @click="updateTaskImage"
      />
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
    updateTask() {
      const task = {
        _id: this.item._id,
        _rev: this.item._rev,
        text: this.inputValue,
        isChecked: this.item.isChecked,
        image: this.item.image,
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
