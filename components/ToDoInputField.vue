<template>
    <div class="pl-14 pb-24 rounded-lg">
        <div class="flex">
            <input
                v-model="item"
                class="w-full text-2xl px-8 shadow-inner bg-white py-3 border-2 rounded-lg bg-white border-ToDo-DarkGreen placeholder-gray-500 text-gray-900 italic-font focus:outline-none
                sm:text-2xl sm:py-2"
                type="text"
                placeholder="What needs to be done?"
                @keypress.enter="addItem">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11 mt-1 ml-2 text-ToDo-DarkGreen hover:text-white transition ease-in-out duration-200 cursor-pointer " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
                @click="addItem">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        showCheckBox:{
            type: Boolean, default: false
        },
        allChecked:{
            type: Boolean, default: false
        }
    },
    data () {
        return {
            item: ''
        }
    },

    computed: {
        activeArrowStyle(){
          if(this.allChecked) return 'opacity-100'
          return 'opacity-30'
        },
    },

    methods: {
        addItem(){
            this.$store.dispatch('addItem', this.item)
            this.item = ''
        },
        checkAll(){
            this.$store.dispatch('checkAllToDos')
        }
    }

}
</script>

<style scoped>

  .italic-font::placeholder {
    font-style: italic;
    color: rgb(209, 213, 219)
  }
</style>