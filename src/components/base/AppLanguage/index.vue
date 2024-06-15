<script setup>
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from '@/i18n';

const { locale } = useI18n({ useScope: 'global' });

watch(locale, (val) => {
  setI18nLanguage(val);
});

function changeLanguage (lang) {
  setI18nLanguage(lang);
  localStorage.setItem('language', lang);
};
</script>

<template lang="pug">
section.language
  button(
    v-for="(lang, i) in supportLocales"
    :data-testid="`test-${lang}`"
    :key="`Lang${i}`"
    :value="lang"
    @click="changeLanguage(lang)"
    :class="{'active': locale == lang}"
  )
    img(:src="`./assets/flags/${lang}.svg`" :alt="lang")
    | {{ lang }}
</template>

<style lang="stylus">
.language
  padding 2rem 0
  img
    width 30px
    pointer-events none
  button
    flex 1
    margin 0.5rem
    cursor pointer
    border 0
    background #eee
    padding 0.2rem
    border-radius 5px
    font-size 0
    text-decoration none
    font-size 0
    display inline-flex
    border 2px solid transparent
    transition .3s all
    overflow hidden
    &.active,
    &:hover
      color #fff
      background #fff
      border 2px solid var(--main-color)
      box-shadow 0 1px 0 rgba(255, 255, 255, 1), 0 2px 5px rgba(0, 0, 0, 0.2)
      transform scale(1.2)
</style>
