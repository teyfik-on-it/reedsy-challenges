<template>
  <button v-bind:type="type" @click="$emit('click', $event)" v-bind:class="{outline}" v-bind:disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: String,
    outline: Boolean,
    disabled: Boolean,
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/colors";

button {
  padding: .6rem .8rem;
  min-width: 100px;
  border: unset;
  cursor: pointer;
  border-radius: 6px;
  outline: unset;
  background-color: $sunflower-light;

  &.outline {
    color: $sunflower-dark;
    box-shadow: inset 0 0 0 2px $sunflower-light;
    font-weight: bold;
    background-color: transparent;

    &:hover:not(:disabled), &:focus:not(:disabled) {
      color: inherit;
      font-weight: unset;
      background-color: $sunflower-light;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled), &:focus:not(:disabled) {
    background-color: $sunflower-dark;
  }

  &:active {
    box-shadow: inset 0 3px 4px 1px rgba(#000, .18);
  }
}
</style>
