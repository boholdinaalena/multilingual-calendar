<template>
  <div class="month">
    <span class="month-arrow" @click="modifyMonth(-1)">
      <button><img src="../../assets/arr_left.svg" alt="<"></button>
    </span>
    <span>
      {{ $t(`month[${viewMonth}]`).slice(0, 3) }}
      <slot />
    </span>

    <span class="month-arrow" @click="modifyMonth(1)">
      <button><img src="../../assets/arr_right.svg" alt=">"</button>
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emits = defineEmits(['changeMonth', 'changeYear'])

const viewMonth = ref(new Date().getMonth());

const modifyMonth = (v) => {
  if (viewMonth.value <= 0 && v === -1) {
    viewMonth.value = 11;
    emits('changeYear', -1)
  } else if (viewMonth.value === 11 && v === 1) {
    viewMonth.value = 0;
    emits('changeYear', 1)
  } else {
    viewMonth.value += v;
  }

  emits('changeMonth', viewMonth.value)
};

</script>

<style lang="scss" scoped>
.month {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  &-arrow {
    img {
      width: 10px;
    }
  }
}
</style>
