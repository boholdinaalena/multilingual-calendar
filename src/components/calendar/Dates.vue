<template>
  <div class="dates">
    <div class="dates-days">
      <div 
        class="dates-day" 
        v-for="day in 7" 
        :key="day">
        {{ $t(`days[${day - 1}]`) }}
      </div>
    </div>
    <div class="dates-container">
      <div class="dates-empty" v-for="empty in dates.firstDayDateNum" ></div>
      <div class="dates-date" v-for="date in dates.countDay">
        <span 
            class="dates-date-highlighted" 
            v-if="highlighedtDay(date)">
            {{ props.selectedDateDay.getDate() }}
        </span>
        <span 
            v-else
            @click="changeSelectedDay(date)">
            {{ date }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, onMounted, watch } from "vue";

const props = defineProps({
  viewValues: {
    type: Object,
  },
  selectedDateDay: {
    type: Object
  }
});

function highlighedtDay(date) {
    if (props.viewValues.year === props.selectedDateDay.getFullYear()
    && props.viewValues.month === props.selectedDateDay.getMonth()
&& props.selectedDateDay.getDate() === date) {
        return true;
    } else return false
}

const emits = defineEmits('changeSelected')

const changeSelectedDay = (date) => {
    const setForDate = {
        day: date,
        month: props.viewValues.month, 
        year: props.viewValues.year
    }
    generateDates()
    emits('changeSelected', setForDate)
}


const dates = reactive({
  m: 0,
  countDay: 0,
  firstDayDate: "",
  firstDayDateNum: 0,
});

watch(
  () => props.viewValues.month,
  (month) => {
    generateDates()
  },
);

const generateDates = (
  m = props.viewValues.month,
  y = props.viewValues.year
) => {
  dates.m = m;
  dates.countDay = new Date(y, m + 1, 0).getDate();
  dates.firstDayDate = days[new Date(y, m, 1).getDay()];
  dates.firstDayDateNum = new Date(y, m, 1).getDay() - 1;
};

onMounted(() => {
  generateDates();
});

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const defaultDays = days.map((el) => el);
defaultDays.shift();
defaultDays.push("Sunday");
</script>

<style lang="scss" scoped>
.dates {
  &-days {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 11px;
    text-transform: uppercase;
    color: #646cff;
    margin: 5px 0;
  }

  &-date {
    display: flex;
    justify-content: center;
    align-items: center;
 
    &-highlighted {
        position: absolute;
        padding: 1px 6px;
        border: 1px solid #646cff;
    }
  }

  &-container {
    display: grid;
    grid-template: repeat(6, auto) / repeat(7, auto);
  }
}
</style>
