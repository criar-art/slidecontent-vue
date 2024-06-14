<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const show = ref(false);
const showCode = () => show.value = !show.value;
</script>

<template lang="pug">
section.source
  code(:class="{'show': show }")
    slot
  h3(@click="showCode" aria-label="show code" role="button")
    svg(width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512")
      path(d="M508.177 245.995C503.607 240.897 393.682 121 256 121S8.394 240.897 3.823 245.995a15.002 15.002 0 000 20.01C8.394 271.103 118.32 391 256 391s247.606-119.897 252.177-124.995a15.004 15.004 0 000-20.01zM256 361c-57.891 0-105-47.109-105-105s47.109-105 105-105 105 47.109 105 105-47.109 105-105 105z")
      path(d="M271 226c0-15.09 7.491-28.365 18.887-36.53C279.661 184.235 268.255 181 256 181c-41.353 0-75 33.647-75 75s33.647 75 75 75c37.024 0 67.668-27.034 73.722-62.358C299.516 278.367 271 255.522 271 226z")
    span {{ t("source") }}
</template>

<style lang="stylus">
.source
  h3
    user-select none
    cursor pointer
    width max-content
    margin 0 auto
    padding .8rem 1.2rem
    background #eee
    border-radius 0 0 10px 10px
  code
    display none
    margin-top 2rem
    &.show
      display block
  pre
    background #000
    border-radius 10px
    box-sizing border-box
    color #53b983
    font-size 1.2em
    margin 0 auto
    max-width 1000px
    overflow-x auto
    padding 2em
    text-align left
    +mobile()
      font-size 0.6rem
    @media screen and (max-width: 1020px)
        border-radius 0
    &::selection
      color #fff
      background #53b983
</style>
