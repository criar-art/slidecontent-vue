
<script setup>
import pkg from '../../../../package.json';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const appVersion = pkg.version;
const vueVersion = pkg.dependencies.vue.replace('^', '');
</script>

<template lang='pug'>
p.version
  | Vue
  b {{ vueVersion }}
p.version
  | SlideContent
  b {{ appVersion }}
</template>

<style lang='stylus'>
.version
  font-size 1.2rem
  margin 0
  line-height 2rem
  +mobile()
    font-size 1em
  b
    margin-left .5rem
</style>
