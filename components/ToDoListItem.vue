<template>
  <div class="relative items-center flex flex-row gap-4">
    <div
      :class="[tagColor, item.isChecked ? 'opacity-60' : 'opacity-100']"
      class="z-30 absolute -top-3 left-16 transition ease-in-out duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-8 h-8"
      >
        <path
          fill-rule="evenodd"
          d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <button @click="checkTask" class="z-20 h-fit w-10">
      <svg
        v-if="item.isChecked"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-10 w-10 text-white"
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
        class="h-10 w-10 text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
    <div class="relative flex flex-row w-full min-h-fit mr-4">
      <textarea
        v-model="inputValue"
        rows="2"
        class="z-10 px-12 py-3 w-full font-bold text-base rounded-2xl no-scrollbar bg-transparent resize-none hover:shadow-inner focus:shadow-inner focus:outline-none transition ease-in-out duration-200"
        :class="{ 'line-through opacity-30': item.isChecked }"
        type="text"
        @change="updateTask"
      />
      <div
        :class="item.isChecked ? 'opacity-10' : 'opacity-40'"
        class="-z-10 absolute inset-0 w-full h-full rounded-2xl bg-white backdrop-blur-md transition ease-in-out duration-200"
      />
    </div>

    <button
      @click="toggleMenu"
      :class="menuOpen ? '-rotate-90' : 'rotation-0'"
      class="z-20 absolute right-4 -bottom-6 text-white transform ease-in-out duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-8 h-8"
      >
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div
      :class="
        menuOpen
          ? 'opacity-100 right-12 pointer-events-auto'
          : 'opacity-0 -right-10 pointer-events-none'
      "
      class="absolute z-10 bg-white text-ToDo-gradient-purple rounded-full py-1 px-4 -bottom-5 flex flex-row space-x-4 transform ease-in-out duration-200"
    >
      <button @click="updateTaskImage">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <button @click="changeTag">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <button @click="removeTask">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <button
      @click="openImageModal"
      v-if="item.image"
      class="absolute left-20 -bottom-8 z-20 w-10 h-10"
    >
      <img
        :src="item.image"
        :class="item.isChecked ? 'opacity-20' : 'opacity-80'"
        class="h-full w-full rounded-full object-cover border-2 border-white shadow-md hover:opacity-100 transition ease-in-out duration-200"
      />
      
    </button>
    <button @click="removeTaskImage" v-if="item.image" class="h-4 w-4 ml-7 z-50 absolute left-20 -bottom-8 text-ToDo-gradient-purple border-white bg-white rounded-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4 "
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
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
      menuOpen: false,
    }
  },
  computed: {
    tagColor() {
      switch (this.item.tag) {
        case 'Important':
          return 'text-tag-important'
        case 'Trivial':
          return 'text-tag-trivial'
        default:
          return 'text-tag-normal'
      }
    },
  },
  methods: {
    openImageModal() {
      this.$emit('modal', this.item.image)
    },

    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },

    checkTask() {
      this.$store.dispatch('checkTask', this.item._id)
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

    changeTag() {
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
