<script setup>
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/base/AppHeader/index.vue';
import AppFooter from './components/base/AppFooter/index.vue';
</script>

<template lang='pug'>
AppHeader
main
  RouterView
AppFooter
</template>

<style lang='stylus'>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

@font-face {
  font-family: 'Font Awesome 6 Free';
  font-style: normal;
  font-weight: 900;
  font-display: block;
  src: url("assets/webfonts/fa-solid-900.woff2") format("woff2"), url("assets/webfonts/fa-solid-900.ttf") format("truetype");
}

@import "./_reset.styl"

:root
  --primary #289f6a
  --secondary #647eff
  --main-color #2c3e50

html
  background var(--primary)

body
  margin 0
  padding 0
  background #fff
  &:before,
  &:after
    content ""
    display flex
    height 20px
    background var(--primary)
    background linear-gradient(90deg, var(--primary) 46%, var(--secondary) 100%)
    box-shadow 0 0 0 1px #fff, 0 0 20px rgba(0,0,0,.4)

#app
  -moz-osx-font-smoothing grayscale
  -webkit-font-smoothing antialiased
  color var(--main-color)
  font-family 'Avenir', Helvetica, Arial, sans-serif
  text-align center
  min-height calc(100vh - 40px)
  display flex
  flex-direction column

.page
  margin-top 2rem
  padding 4rem
  border-top 1px solid #eee
  box-shadow 0 15px 25px rgba(0, 0, 0, .06), 0 -5px 15px rgba(0, 0, 0, .02)
</style>
