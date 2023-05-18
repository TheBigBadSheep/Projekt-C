<template>
    <div class=" bg-ToDo-Green">     
      <header class="flex justify-center ">
        <p class="current-date"></p>
        <div class="flex p-4 font-medium">
          <button id="prev" @click="changeMonthLeft" class="p-4">Prev. Month</button>
          <button id="next" @click="changeMonthRight" class="p-4">Next Month</button>
          <button id="jumpBack" @click="jumpToCurrentMonthDate" class="p-4"> Current Month </button>
          <div class="p-4"> {{currentMonth}} / {{currentYear}} </div>
        </div>
      </header>
      <div class="grid grid-cols-7 space-x-5 ">
        <div v-for="index in monthDays" :key=index class="text-center">
          <NuxtLink :to="'/calendar/' + index + '-' + currentMonth + '-' + currentYear"  >
            <div class="py-5 hover:bg-green-100 rounded-lg flex flex-col" :class="(index === currentDay && currentYear === savedDate[2] && currentMonth === savedDate[1]) ? 'bg-blue-500' : ''"
            @click="saveDateInStore(index + '-' + currentMonth + '-' + currentYear)"  >
            <div :class="checkForDateInStore(index + '-' + currentMonth + '-' + currentYear) === true ? 'opacity-100 place-self-center' : 'opacity-0'"> 
              <div class="h-3 w-3 rounded-full bg-green-800">
              </div> 
          </div>
              {{index}}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
      components: {},
  
      data() {
        return {
          days: null,
          currentDate: null,
          currentYear: null,
          currentMonth: null,
          currentDay: null,
          selectedDate: null,
          savedDate: null,
          months: ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"],
          calendarDays: null,
          daysInMonth: null,
          storeDates: null,
        }
      },
  
      computed: {
        monthDays(){
          return this.daysInMonth
        },
        
      },
  
      methods: {
        renderCalendar () {
           // Let calendar know how many days each month has
           let x
           if ( this.currentMonth === 4 || this.currentMonth === 6 || this.currentMonth === 9 || this.currentMonth === 11) {
            x = 30
          }else{
            x = 31
          }
           if ( this.currentMonth === 2 ) x = 28
           this.daysInMonth = x
        },
        changeMonthLeft(){
          if (this.currentMonth === 0) {
            this.currentMonth = 12
            this.currentYear -= 1
            this.renderCalendar()
          }else{
            this.currentMonth -=  1
            console.log(this.currentMonth)
            this.renderCalendar()
          }
        },
        changeMonthRight(){
          if (this.currentMonth === 12 ) {
            this.currentMonth = 1
            this.currentYear += 1
            console.log(this.currentMonth)
            this.renderCalendar()
          }else{
            this.currentMonth +=  1
            console.log(this.currentMonth)
            this.renderCalendar()
          }
        },
        jumpToCurrentMonthDate(){
          this.currentMonth = this.savedDate[1]
          this.currentYear = this.savedDate[2]
          this.renderCalendar()
        },
        saveDateInStore(x){
          this.$store.dispatch('calendar/addDate', x)
        },
        checkForDateInStore(x){
          let active = false
          this.storeDates.forEach(date => {
            if (x === date){
              return active = true
            }
          })
          if(active === true){
            return true
          }
        }
      },
      mounted(){
        this.date = new Date()

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1 //January is 0!
        var yyyy = today.getFullYear();

        this.currentMonth = mm
        this.currentYear = yyyy
        this.currentDay = dd

        today = dd + '/' + mm + '/' + yyyy;

        this.savedDate = [dd,mm,yyyy]
        this.renderCalendar()
        console.log("Current Date: ", today)

       this.storeDates = this.$store.getters['calendar/getSavedDates']
        },
  
    }
  </script>
  
  <style>
  /* Import Google font - Poppins */
header .current-date{
  font-size: 1.45rem;
  font-weight: 500;
}
.calendar{
  padding: 20px;
}
.calendar ul{
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  text-align: center;
}
.calendar .days{
  margin-bottom: 20px;
}
.calendar li{
  color: #333;
  width: calc(100% / 7);
  font-size: 1.07rem;
}
.calendar .weeks li{
  font-weight: 500;
  cursor: default;
}
.calendar .days li{
  z-index: 1;
  cursor: pointer;
  position: relative;
  margin-top: 30px;
}
.days li.inactive{
  color: #aaa;
}
.days li.active{
  color: #fff;
}
.days li::before{
  position: absolute;
  content: "";
  left: 50%;
  top: 50%;
  height: 40px;
  width: 40px;
  z-index: -1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.days li.active::before{
  background: #27a832;
}
.days li:not(.active):hover::before{
  background: #f2f2f2;
}
  </style>