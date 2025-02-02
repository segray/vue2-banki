<template>
  <div class="slider" @mousemove="arrowsShow" @mouseleave="arrowsHide">
    <div class="slider__wrapper">
      <div
        class="slider__items"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div class="slider__item" v-for="(item, index) in items" :key="index">
          <img :src="item.src" :alt="item.alt" />
        </div>
      </div>
    </div>
    <div
      class="slider__nav"
      :class="{ 'slider__nav--hidden': !arrowsShowFlag }"
    >
      <svg @click="prev" class="slider__button slider__button--prev">
        <use xlink:href="#arrow"></use>
      </svg>
      <svg
        @click="next"
        class="slider__button slider__button--next"
        transform="rotate(180)"
      >
        <use xlink:href="#arrow"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // массив изображений {src, alt}
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // текущий слайд
      currentIndex: 0,

      // показ стрелок перехода
      arrowsShowFlag: false,

      // таймаут для скрытия стрелок
      arrowsHideTimeoutId: null,
    };
  },
  methods: {
    // предыдущий слайд
    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.items.length) % this.items.length;
    },
    // следующий слайд
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    // показ стрелок при активности пользователя
    arrowsShow() {
      clearTimeout(this.arrowsHideTimeoutId);
      this.arrowsShowFlag = true;
      this.arrowsHideTimeoutId = setTimeout(() => {
        this.arrowsHide();
      }, 200);
    },
    // скрытие стрелок при отсутствии активности
    arrowsHide() {
      clearTimeout(this.arrowsHideTimeoutId);
      this.arrowsShowFlag = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  position: relative;

  &__wrapper {
    overflow: hidden;
  }

  &__items {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }

  &__item {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__button {
    padding: 10px;
    cursor: pointer;
    stroke: white;
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.4;
    transition: opacity 0.3s ease-in-out;

    &--hidden {
      opacity: 0;
      transition: opacity 2s ease-in-out;
    }
  }
}

</style>
