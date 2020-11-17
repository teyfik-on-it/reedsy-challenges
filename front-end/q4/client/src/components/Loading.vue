<template>
  <div class="loading">
    <h1 v-if="title" class="mb-2">{{ title }}</h1>
    <p v-if="desc">{{ desc }}</p>
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    desc: String,
    title: String,
  },
};
</script>

<style scoped lang="scss">
$color: #4a89dc;
$edge: 2rem;
$margin: .4rem;
$border-width: $edge / 10;

.loading {
  display: flex;
  align-items: center;
  flex-direction: column;

  .spinner {
    display: inline-block;
    width: $edge;
    height: $edge;
    margin-top: $margin;

    &:after {
      position: absolute;
      content: " ";
      display: block;
      width: $edge;
      height: $edge;
      //margin: $margin;
      border-radius: 50%;
      box-sizing: border-box;
      border: $border-width solid $color;
      border-color: $color transparent $color transparent;
      animation: spinner 1.2s linear infinite;

      @keyframes spinner {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
