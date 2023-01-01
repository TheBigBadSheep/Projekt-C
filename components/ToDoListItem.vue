<template>
    <div class="relative h-full flex flex-row gap-4">
        <div @click="checkTask" class="h-full w-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            class="h-10 w-10 mt-3 absolute text-ToDo-LightGreen" :class="item.isChecked ? 'opacity-100' : 'opacity-0'">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor"
            class="h-10 w-10 mt-3 absolute text-ToDo-LightGreen" :class="!item.isChecked ? 'opacity-100' : 'opacity-0'">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>

        <input
            v-model="inputValue"
            class="w-full bg-white text-2xl border-2 border-ToDo-Green rounded-lg px-5 py-3 mb-5 hover:shadow-inner focus:shadow-inner focus:outline-none focus:border-gray-200 transition ease-in-out duration-200"
            :class="{'line-through opacity-30': item.isChecked}"
            type="text"
            @change="updateTask"
        >
        
        <div class="absolute h-8 w-8 inset-y-0 right-6 opacity-0 hover:opacity-100 transition ease-out duration-100 cursor-pointer">
            <img src="../assets/deleteButton.svg" class="h-8 w-8 mt-3 " @click="removeTask">
        </div>

        </div>

</template>

<script>
export default {
    props: {
        item: {
            default: () => null,
            type: Object
        }
    },

    data() {
         return {
             inputValue: this.item.text
         }
    },
    methods: {
        checkTask() {
            this.$store.dispatch('checkTask', this.item._id)
        },
        removeTask() {
            this.$store.dispatch('removeTask', this.item)
        },
        updateTask(){
            const task = {
                _id: this.item._id,
                _rev: this.item._rev,
                text: this.inputValue,
                isChecked: this.item.isChecked
            }
            this.$store.dispatch('updateTask', task)
        }

    }
}
</script>