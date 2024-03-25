<template>
  <div 
    class="lang"
    @click="switchLang()">{{ $t('switchLang') }}</div>
  <div>
    <div class="title">
    {{ $t('title') }}</div>
    <Calendar/>
  </div>
</template>

<script setup>
import Calendar from "./components/calendar/index.vue"
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({useScope: 'global'})


const switchLang = () => {
  locale.value === 'en' ? locale.value = 'ru' : locale.value = 'en'
  localStorage.setItem('lang', locale.value)
}
</script>

<style lang="scss" scoped>
  .title {
    margin: 25px 0;
    font-size: 20pt;
    font-weight: 700;
  }
</style>