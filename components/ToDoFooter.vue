<template>
    <div>
        <footer v-show="items.length > 0">
            <div class="bg-white h-9 py-1">
                <div class="flex justify-center pl-6 sm:pl-14 mb-4 disable-select">
                    <span v-if="!allChecked" @click="toggleAllTasks" class="bg-gray-100 text-sm text-gray-400 py-0.5 px-3 rounded-md cursor-pointer hover:text-gray-600 transition ease-in-out duration-200">Check All</span>
                    <span v-if="allChecked" @click="toggleAllTasks" class="bg-gray-100 text-sm text-gray-400 py-0.5 px-3 rounded-md cursor-pointer hover:text-gray-600 transition ease-in-out duration-200">Uncheck All</span>
                </div>
                <div class="relative py-1 pb-10">
                    <div class="flex w-screen justify-center">
                        <span v-if="itemsLeft.length == 1" class="fixed md:inset-x-14 text-xs sm:text-sm opacity-80 mt-5 sm:mt-0 -ml-3"> {{ itemsLeft.length }} Item left </span>
                        <span v-if="itemsLeft.length != 1" class="fixed md:inset-x-14 text-xs sm:text-sm opacity-80 mt-5 sm:mt-0 -ml-3"> {{ itemsLeft.length }} Items left </span>
                    </div>
                    <div class="w-full flex justify-center gap-4 -mt-0.5 pl-14 lg:ml-0">
                        <button
                            class="text-xs sm:text-sm rounded-lg px-2 border-2 border-transparent opacity-80 transition ease-in-out duration-200"
                            :class="filter == 'all' ? 'border-ToDo-LightGreen border-opacity-20s shadow-sm' : ''"
                            @click="changeFilter('all')"> All
                        </button>
                        <button
                            class="text-xs sm:text-sm rounded-lg px-2 border-2 border-transparent opacity-80 transition ease-in-out duration-200"
                            :class="filter == 'active' ? 'border-ToDo-LightGreen border-opacity-20s shadow-sm' : ''"
                            @click="changeFilter('active')"> Active
                        </button>
                        <button
                            class="text-xs sm:text-sm rounded-lg px-2 border-2 border-transparent opacity-80 transition ease-in-out duration-200"
                            :class="filter == 'completed' ? 'border-ToDo-LightGreen border-opacity-20s shadow-sm' : ''"
                            @click="changeFilter('completed')"> Completed
                        </button>
                    </div>
                    <div class="py-1">
                        <span v-show="atLeastOneChecked">
                            <button
                            class="absolute top-1 right-0 opacity-0 text-null -ml-28 sm:opacity-80 hover:text-red-400 mt-1 sm:mt-0 sm:text-sm transition ease-in-out duration-200"
                            @click="clearCompleted"> Clear completed
                            </button>

                        </span>
                    </div>
                </div>

            </div>
        </footer>
    </div>
</template>

<script>
export default {

    props: {
        items: {
            default: () => [],
            type: Array
        },
    },

    data() {
        return {
            filter: 'all',
            allChecked: false
        }
    },

    computed: {
        itemsLeft(){
            return this.items.filter(item => !item.isChecked)
        },
        atLeastOneChecked(){
            return this.itemsLeft.length !== this.items.length
        },
        
        allChecked(){
            return this.itemsLeft.length === 0
        },
    },
    methods: {
        changeFilter(filter){
            this.filter = filter
            this.$store.dispatch('changeFilter', filter)
            this.$emit('changedFilter')
        },

        clearCompleted(){
            this.$store.dispatch('clearCompleted')
        },

        toggleAllTasks(){
            this.allChecked = !this.allChecked
            this.$store.dispatch('toggleAllTasks', this.allChecked)
        }
    }
}
</script>
<style>
.disable-select {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>