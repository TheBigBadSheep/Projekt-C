<template>
    <div class=" bg-ToDo-Green">     
      <header class="flex justify-center ">
        <p class="current-date"></p>
        <div class="flex p-4 font-medium">
          <button id="prev" @click="changeMonthLeft" class="p-4">Left</button>
          <button id="next" @click="changeMonthRight" class="p-4">Right</button>
          <button id="jumpBack" @click="jumpToCurrentMonthDate" class="p-4"> Check</button>
          <div class="p-4"> {{currentYear}} </div>
        </div>
      </header>
    <!--  <div class="calendar">
        <ul class="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <NuxtLink :to="'/calendar/' + urlSlug">
          <ul class="days"></ul>
        </NuxtLink>  
        <ul @click="printmything(3)" class="days"></ul>
        <div v-for="index in calendarDays">{{index}}</div>
      </div> -->
      <div class="grid grid-cols-7 space-x-5">
        <div v-for="index in monthy" class="text-center">
          <NuxtLink :to="'/calendar/' + index + '-' + currentMonth + '-' + currentYear">
            <div class="py-5 hover:bg-green-100 rounded-lg" :class="(index === currentDay && currentYear === savedDate[2] && currentMonth === savedDate[1]) ? 'bg-blue-500' : ''">
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
          daysInMonth: null

        }
      },
  
      computed: {
        monthy(){
          return this.daysInMonth
        }
      },
  
      methods: {
        renderCalendar () {

          // JS -> didnt work out as I wanted TODO: Remake with vue
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          /*
          let firstDayofMonth = new Date(this.currentYear, this.currentMonth, 1).getDay(), // getting first day of month
            lastDateofMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate(), // getting last date of month
            lastDayofMonth = new Date(this.currentYear, this.currentMonth, lastDateofMonth).getDay(), // getting last day of month
            lastDateofLastMonth = new Date(this.currentYear, this.currentMonth, 0).getDate(); // getting last date of previous month
            let liTag = "";
            let tagli 

            for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
                liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
            }

            for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
                // adding active class to li if the current day, month, and year matched
                let isToday = i === this.date.getDate() && this.currentMonth === new Date().getMonth() 
                            && this.currentYear === new Date().getFullYear() ? "active" : "";
                liTag += `<li class="${isToday}">${i}</li>`;
            }

            for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
                liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
            }
            this.currentDate.innerText = `${this.months[this.currentMonth]} ${this.currentYear}`; // passing current mon and yr as currentDate text
            this.calendarDays.innerHTML = liTag;
           // console.log(this.calendarDays)
           */
           /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
           let x
           if ( this.currentMonth === 4 || this.currentMonth === 6 || this.currentMonth === 9 || this.currentMonth === 11) {
            x = 30
          }else{
            x = 31
          }
           //if ( this.currentMonth === 1 || 3 || 5 || 7 || 8 || 10 || 12) x = 31
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
        printmything(x){
          
        }
      },
      mounted(){
      //  this.calendarDays = document.querySelector(".days"),
      //  this.currentDate = document.querySelector(".current-date"),

        this.date = new Date()
      //  this.currentYear = this.date.getFullYear()
      //  this.currentMonth = this.date.getMonth()

      //  const currentDay = document.getElementsByClassName('active')[0].innerHTML
      //  this.savedDate = [currentDay, this.currentMonth, this.currentYear]      //Saving day aswell as month/year to use in the router link
      //  this.urlSlug = currentDay + '-' + (this.currentMonth + 1)

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
        console.log(today)
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