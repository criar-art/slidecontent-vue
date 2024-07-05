<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const slideContainer = ref(null);
const props = defineProps({
  name: String,
  type: String,
  nav: Boolean,
  animation: Object,
  border: Boolean,
  squared: Boolean,
});
const activeSlideIndex = ref(0);
const slides = ref([]);

let slideAnimationInitial = null;
let slideAnimationOptions = null;

const updateActiveSlide = (index) => {
  slides.value.forEach((slide, i) => {
    slide.classList.toggle('actived', i === index);
  });
  activeSlideIndex.value = index;
};

const startSlideAnimation = () => {
  slideAnimationInitial = setInterval(nextHandler, 6000);
  if (props.animation) {
    clearInterval(slideAnimationInitial);
    slideAnimationOptions = setInterval(() => {
      if (props.animation.direction === 'prev') {
        prevHandler();
      } else {
        nextHandler();
      }
    }, props.animation.time);

    if (props.animation.disabled) {
      clearInterval(slideAnimationOptions);
    }
  }
};

const stopSlideAnimation = () => {
  clearInterval(slideAnimationInitial);
  clearInterval(slideAnimationOptions);
};

const prevHandler = () => {
  const newIndex = (activeSlideIndex.value - 1 + slides.value.length) % slides.value.length;
  updateActiveSlide(newIndex);
};

const nextHandler = () => {
  const newIndex = (activeSlideIndex.value + 1) % slides.value.length;
  updateActiveSlide(newIndex);
};

const bulletHandler = (index) => {
  updateActiveSlide(index);
};

onMounted(() => {
  slides.value = slideContainer.value.querySelectorAll('.slide-item');
  const initialActiveSlide = Array.from(slides.value).findIndex(slide => slide.classList.contains('actived'));
  if (initialActiveSlide !== -1) {
    activeSlideIndex.value = initialActiveSlide;
  }
  if (slides.value.length > 0) {
    startSlideAnimation();
  }
});

onUnmounted(() => {
  stopSlideAnimation();
});
</script>

<template lang="pug">
section.slide-content(ref="slideContainer" :class="[type, border ? 'border' : '', squared ? 'squared' : '']")
  div.slide-slots
    slot
  .slide-navigation(v-if="nav")
    button.btn.prev(type="button" @click="prevHandler")
      | {{ t("to_left") }}
    button.btn.next(type="button" @click="nextHandler")
      | {{ t("to_right") }}
  .slide-bullets(v-if="nav")
    button.bullet(v-for="(slide, index) in slides" :key="index" :class="{ active: index === activeSlideIndex }" @click="bulletHandler(index)")
</template>

<style scoped lang="stylus">
.slide-content
  border-radius 15px
  box-sizing border-box
  color #000
  margin 0 auto
  max-height 100vh
  max-width 1000px
  min-height 300px
  overflow hidden
  position relative
  width calc(100% - 20px)
  &.border
    box-shadow 0 0 0 2px #fff, 0 0 0 3px #222, 0 5px 20px rgba(0,0,0,.5)
  &.squared
    border-radius 0
    .slide-navigation .btn
      border-radius 0

.slide-navigation
  .btn
    background #fff
    border 1px solid #444
    border-radius 100%
    box-shadow 0 0 1px 1px rgba(#fff, .5), 0 0 10px 2px rgba(#000, .2)
    cursor pointer
    font-size 0
    font-weight bold
    height 40px
    outline none
    position absolute
    top 50%
    transform translateY(-50%)
    transition .3s all
    user-select none
    width 40px
    z-index 1
    &:hover
      background #444
      border 1px solid #fff
      box-shadow 0 0 10px 10px rgba(#fff, .5)
      color #fff
      transform translateY(-50%) scale(1.2)
      &:before,
      &:after
        color #fff
    &:before,
    &:after
      font-family 'Font Awesome 6 Free'
      background transparent
      content ""
      display flex
      color #444
      font-size 1.5rem
      text-rendering auto
      -webkit-font-smoothing: antialiased
      transform translateX(5px)
  .prev
    left 10px
    &:active
      transform translateX(-5px) translateY(-50%) scale(1.2)
    &:before
      content "\f053"

  .next
    right 10px
    &:active
      transform translateX(5px) translateY(-50%) scale(1.2)
    &:before
      content "\f054"

.slide-bullets
  display flex
  justify-content center
  margin-top 10px
  z-index 10
  position absolute
  bottom 20px
  left 50%
  transform translateX(-50%)
  .bullet
    width 30px
    height 10px
    border-radius 10px
    background-color #fff
    margin 0 5px
    border 2px solid #fff
    cursor pointer
    &.active
      background-color rgba(#444, 0.5)
      cursor default
</style>
