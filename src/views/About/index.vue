<script setup>
import AppVersion from '@/components/base/AppVersion/index.vue';

import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template lang="pug">
section.page
  p {{ t("about") }}
  div.examples
    a.example(href="https://slidecontent-angularjs.web.app" target="_blank")
      img(src="@/assets/logos/logo-angular.svg" width="150" alt="Agunlar Logo")
      | SlideContent Angular
    a.example(href="https://slidecontent-ember.web.app" target="_blank")
      img(src="@/assets/logos/logo-ember.svg" width="80" alt="Ember Logo")
      | SlideContent Ember
    a.example(href="https://slidecontent-reactjs.web.app" target="_blank")
      img(src="@/assets/logos/logo-react.svg" width="90" alt="React Logo")
      | SlideContent React
</template>

<style lang="stylus" scoped>
.examples
  max-width 900px
  margin 0 auto
  display flex
  justify-content center
  flex-direction row
  align-items stretch
  +mobile()
    flex-direction column

.example
  display flex
  flex 1
  align-items center
  justify-content center
  flex-direction column
  padding 1rem 2rem 2rem
  border-radius 10px
  margin 2rem 0.5rem 0
  text-decoration none
  color var(--main-color)
  border 2px solid #eee
  font-weight bold
  box-shadow 0 10px 10px rgba(0, 0, 0, .06), 0 0 0 2px #fff
  transition 0.3s all
  background #fff

  &:hover
    transform scale(1.1)

  img
    height 80px
    margin-bottom 10px
</style>
