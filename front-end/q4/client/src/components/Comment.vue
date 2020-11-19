<template>
  <div class="comment elevation-z4 bg-white p-2">
    <header class="d-flex justify-between align-center">
      <h3>{{ comment.author }}</h3>
      <span>{{ '⭐'.repeat(comment.rating) }}</span>
    </header>

    <main class="mt-2">
      <p>{{ comment.content }}</p>
    </main>

    <footer class="d-flex justify-between mt-2">
      <div>
        <p v-if="confirm">
          This comment will be deleted, do you confirm?
          <span class="btn danger" @click="deleteComment()">Yes</span>
          <span class="btn primary ml-1" @click="toggleConfirm()">No</span>
        </p>

        <span v-else class="btn danger" @click="toggleConfirm()">Delete</span>
      </div>

      <span>{{ createdAt }}</span>
    </footer>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Comment',
  props: {comment: {required: true}},
  computed: {
    createdAt() {
      return moment(this.comment.createdAt).fromNow();
    },
  },
  data() {
    return {
      confirm: false,
    };
  },
  methods: {
    toggleConfirm() {
      this.confirm = !this.confirm;
    },
    deleteComment() {
      this.$store.dispatch('deleteComment', this.comment);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/colors";

.comment {
  .btn {
    cursor: pointer;
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }
  }

  .primary {
    color: $blue-jeans;
  }

  .danger {
    color: $grapefruit-dark;
  }
}
</style>
