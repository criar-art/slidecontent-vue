
<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template lang='pug'>
RouterLink.logo(to='/')
  h1 {{ t('title') }}
  img(alt='Vue logo' src='@/assets/logo.svg' width='100')
</template>

<style lang='stylus'>
.logo
  text-decoration none
  color var(--main-color)
  display inline-block
  h1
    font-size 2.5em
    margin-bottom 1rem
    font-weight bold
    +mobile()
      font-size 1.2em
</style>
