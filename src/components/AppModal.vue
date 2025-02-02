<template>
  <transition name="modal">
    <div class="modal" @click="close">
      <div class="modal__content" @click.stop>
        <svg
          class="modal__close"
          stroke="currentColor"
          role="button"
          @click="close"
          width="24"
          height="24"
          viewBox="0 0 1 2"
        >
          <use xlink:href="#close"></use>
        </svg>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(black, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &__close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  &__content {
    background-color: #F6F3F3;
    padding: 20px;
    position: relative;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
