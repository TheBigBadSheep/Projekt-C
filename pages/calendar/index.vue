<template>
  <div
    class="bg-gradient-to-br from-ToDo-gradient-purple to-ToDo-gradient-teal h-screen overflow-hidden pt-10 px-4 sm:p-10"
  >
    <div
      class="relative bg-white rounded-xl w-full h-fit flex flex-col shadow-xl"
    >
      <span
        class="absolute hidden sm:block z-10 -left-2 -top-7 text-xl font-black text-green-200 drop-shadow"
        >SELECT DATE</span
      >
      <div class="h-fit px-4 py-8 flex flex-row justify-around">
        <button id="prev" @click="changeMonthLeft">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button id="jumpBack" @click="jumpToCurrentMonthDate">
          <span class="font-bold">
            {{ monthLabel }}
            <span class="font-normal">{{ currentYear }}</span></span
          >
        </button>

        <button id="next" @click="changeMonthRight">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-7 p-4 sm:gap-2 gap-1">
        <div v-for="index in monthDays" :key="index">
          <NuxtLink
            :to="'/calendar/' + index + '-' + currentMonth + '-' + currentYear"
          >
            <div
              class="w-full p-2.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-100 hover:shadow-sm transition ease-in-out duration-100"
              :class="
                index === currentDay &&
                currentYear === savedDate[2] &&
                currentMonth === savedDate[1]
                  ? 'border-2 border-green-400 shadow-md'
                  : ''
              "
              @click="
                saveDateInStore(index + '-' + currentMonth + '-' + currentYear)
              "
            >
              <div class="flex flex-col justify-between h-12 sm:h-24 sm:pb-4">
                <span class="font-bold text-sm">{{ index }}</span>
                <div
                  :class="
                    checkForDateInStore(
                      index + '-' + currentMonth + '-' + currentYear
                    ) === true
                      ? 'opacity-100 place-self-center'
                      : 'opacity-0'
                  "
                >
                  <div
                    class="h-2 w-2 sm:h-5 sm:w-5 rounded-full shadow-2xl bg-gray-600"
                  ></div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
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
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      calendarDays: null,
      daysInMonth: null,
      storeDates: null,
    }
  },

  computed: {
    monthDays() {
      return this.daysInMonth
    },
    monthLabel() {
      return dayjs()
        .month(this.currentMonth - 1)
        .format('MMMM')
    },
  },

  methods: {
    renderCalendar() {
      // Let calendar know how many days each month has
      let x
      if (
        this.currentMonth === 4 ||
        this.currentMonth === 6 ||
        this.currentMonth === 9 ||
        this.currentMonth === 11
      ) {
        x = 30
      } else {
        x = 31
      }
      if (this.currentMonth === 2 && this.currentYear % 2 !== 0) x = 28
      if (this.currentMonth === 2 && this.currentYear % 2 === 0) x = 29
      this.daysInMonth = x
    },
    changeMonthLeft() {
      if (this.currentMonth === 0) {
        this.currentMonth = 12
        this.currentYear -= 1
        this.renderCalendar()
      } else {
        this.currentMonth -= 1
        console.log(this.currentMonth)
        this.renderCalendar()
      }
    },
    changeMonthRight() {
      if (this.currentMonth === 12) {
        this.currentMonth = 1
        this.currentYear += 1
        //  console.log(this.currentMonth)
        this.renderCalendar()
      } else {
        this.currentMonth += 1
        //  console.log(this.currentMonth)
        this.renderCalendar()
      }
    },
    jumpToCurrentMonthDate() {
      this.currentMonth = this.savedDate[1]
      this.currentYear = this.savedDate[2]
      this.renderCalendar()
    },
    saveDateInStore(x) {
      this.$store.dispatch('calendar/addDate', x)
      this.$store.dispatch('calendar/setCurrentDate', x)
      this.$store.dispatch('setCurrentDate', x)
    },
    checkForDateInStore(x) {
      let active = false
      this.storeDates.forEach((date) => {
        if (x === date.date) {
          //console.log("TEST", this.storeDates = this.$store.getters['calendar/getSavedDates'])
          //console.log(date)
          return (active = true)
        }
      })
      if (active === true) {
        return true
      }
    },
  },

  async mounted() {
    this.date = new Date()

    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1 //January is 0!
    var yyyy = today.getFullYear()

    this.currentMonth = mm
    this.currentYear = yyyy
    this.currentDay = dd

    today = dd + '/' + mm + '/' + yyyy

    this.savedDate = [dd, mm, yyyy]

    try {
      await this.$store.dispatch('fetchItems')
      this.storeDates = this.$store.getters.tasks
      this.renderCalendar()
    } catch {
      console.log('Error fetching the store data')
    }

    //  console.log("Current Date: ", today)
    // this.storeDates = this.$store.getters['calendar/getSavedDates']
  },
}
</script>

<style>
/* Import Google font - Poppins */
header .current-date {
  font-size: 1.45rem;
  font-weight: 500;
}
.calendar {
  padding: 20px;
}
.calendar ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  text-align: center;
}
.calendar .days {
  margin-bottom: 20px;
}
.calendar li {
  color: #333;
  width: calc(100% / 7);
  font-size: 1.07rem;
}
.calendar .weeks li {
  font-weight: 500;
  cursor: default;
}
.calendar .days li {
  z-index: 1;
  cursor: pointer;
  position: relative;
  margin-top: 30px;
}
.days li.inactive {
  color: #aaa;
}
.days li.active {
  color: #fff;
}
.days li::before {
  position: absolute;
  content: '';
  left: 50%;
  top: 50%;
  height: 40px;
  width: 40px;
  z-index: -1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.days li.active::before {
  background: #27a832;
}
.days li:not(.active):hover::before {
  background: #f2f2f2;
}
</style>
