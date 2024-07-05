<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Hammer from 'hammerjs';

const { t } = useI18n();
const slideContainer = ref(null);
const activeSlideIndex = ref(0);
const slides = ref([]);
const props = defineProps({
  name: String,
  type: String,
  nav: Boolean,
  animation: Object,
  border: Boolean,
  squared: Boolean,
});

let slideAnimationInitial = null;
let slideAnimationOptions = null;
let hammer = null;

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

  // Configuração do HammerJS para pan (arrastar)
  hammer = new Hammer(slideContainer.value, {
    recognizers: [
      [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]
    ]
  });

  let panDirection = null;
  let panStartX = null;
  const minPanDistance = 100; // Defina a distância mínima de pan aqui

  hammer.on("panstart", (event) => {
    panDirection = null;
    panStartX = event.center.x;
  });

  hammer.on("pan", (event) => {
    const currentX = event.center.x;
    const deltaX = currentX - panStartX;

    if (!panDirection) {
      panDirection = Math.abs(deltaX) >= minPanDistance ? (deltaX > 0 ? "right" : "left") : null;
    }

    // Evita múltiplos avanços e retrocessos
    if (panDirection === 'left' && deltaX < -minPanDistance) {
      nextHandler();
      panStartX = currentX; // Atualiza a posição inicial para evitar avanços múltiplos
      panDirection = null;
    } else if (panDirection === 'right' && deltaX > minPanDistance) {
      prevHandler();
      panStartX = currentX; // Atualiza a posição inicial para evitar avanços múltiplos
      panDirection = null;
    }
  });

  hammer.on("panend", () => {
    panDirection = null;
  });
});

onUnmounted(() => {
  stopSlideAnimation();
  hammer.destroy();
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
  border-radius 10px
  box-sizing border-box
  color #000
  margin 0 auto
  max-height 100vh
  max-width 1000px
  min-height 300px
  overflow hidden
  position relative
  width calc(100% - 20px)
  background #fff
  cursor grab

  &:active
    cursor grabbing

  &.border
    box-shadow 0 0 0 2px #fff, 0 0 0 3px #222, 0 5px 20px rgba(0, 0, 0, 0.5)

  &.squared
    border-radius 0
    .slide-navigation .btn
      border-radius 0

  .btn
    background #fff
    border 1px solid #444
    border-radius 100%
    box-shadow 0 0 0 2px rgba(#fff, 0.5), 0 0 10px 10px rgba(#000, 0.1)
    cursor pointer
    font-size 0
    font-weight bold
    height 40px
    outline none
    position absolute
    top 50%
    transform translateY(-50%)
    transition 0.3s all
    user-select none
    width 40px
    z-index 1

    &:hover
      background #444
      border 1px solid #fff
      box-shadow 0 0 10px 10px rgba(#fff, 0.5)
      color #fff
      transform translateY(-50%) scale(1.2)
      &:before, &:after
        color #fff

    &:before, &:after
      font-family "Font Awesome 6 Free"
      background transparent
      content ""
      color #444
      font-size 1.5rem
      display flex
      text-rendering auto
      -webkit-font-smoothing antialiased
      transform translateX(5px)

  .prev
    left 10px
    &:before
      content "\f053"
    &:active
      transform translateX(-5px) translateY(-50%) scale(1.2)

  .next
    right 10px
    &:before
      content "\f054"
    &:active
      transform translateX(5px) translateY(-50%) scale(1.2)

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
