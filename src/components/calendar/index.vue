<template>
  <div class="calendar">
    <div class="calendar-body">
      <div class="calendar-header">
        <Month 
            @changeMonth="changeViewMonth"
            @changeYear="changeViewYear">
            <Year :viewYear="viewValues.year"/>
        </Month>
      </div>
      <Dates 
        :viewValues="viewValues" 
        :selectedDateDay="selectedDate"
        @changeSelected="changeSelected"/>
    </div>
    <div class="calendar-selected">
      {{ $t('selected') }}: {{ selectedDate.toLocaleDateString() }}
    </div>
  </div>
</template>

<script setup>
import Year from "./Year.vue";
import Month from "./Month.vue";
import Dates from "./Dates.vue";
import { ref, reactive } from "vue";

const selectedDate = ref(new Date());
const viewValues = reactive({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
});

const changeViewMonth = (v) => {
    viewValues.month = v
}

const changeViewYear = (v) => {
    viewValues.year += v
}

const changeSelected = (set) => {
    console.log(set)
    selectedDate.value = new Date(set.year, set.month, set.day)
}

</script>

<style lang="scss" scoped>
.calendar {
  width: 225px;

  &-body {
    min-height: 220px;
  border: 1px solid black;
  }

  &-header {
    display: flex;
  }

  &-selected {
    margin: 20px 0;
  }
}
</style>
