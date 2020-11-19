<template>
  <Card class="add-comment ">
    <form action="" @submit="addComment($event)">
      <header>
        <h2>Add Comment</h2>
      </header>

      <div v-if="error" class="mt-2 p-2 alert-danger" @click="error = null">
        <h3>Error</h3>
        <p class="mt-1">Could not add the comment</p>
      </div>

      <Loading v-if="pending" desc="Adding comment"/>

      <template v-else>
        <main class="mt-2">
          <div class="d-flex">
            <div class="flex-fill">
              <label for="comment-author">Author</label>
              <input id="comment-author" v-model="comment.author" maxlength="50" name="author" type="text"
                     @input="runValidation()">
              <p v-if="errors.author" class="mt-1 error">{{ errors.author }}</p>
            </div>

            <div class="ml-3"></div>

            <div class="rating-wrapper">
              <label for="comment-rate">Rate</label>
              <select id="comment-rate" v-model="comment.rating" name="rate" @change="runValidation()">
                <option v-bind:value="null">Not selected</option>
                <option v-bind:value="1">1</option>
                <option v-bind:value="2">2</option>
                <option v-bind:value="3">3</option>
                <option v-bind:value="4">4</option>
                <option v-bind:value="5">5</option>
              </select>
              <p v-if="errors.rating" class="mt-1 error">{{ errors.rating }}</p>
            </div>
          </div>

          <div class="form-control">
            <label for="comment-content">Content</label>
            <textarea id="comment-content" v-model="comment.content" maxlength="280" name="content"
                      @input="runValidation()"></textarea>
            <p v-if="errors.content" class="mt-1 error">{{ errors.content }}</p>
          </div>
        </main>

        <footer class="d-flex justify-between mt-3">
          <Button outline type="button" @click="$emit('cancel')">Cancel</Button>
          <Button type="submit">Comment</Button>
        </footer>
      </template>
    </form>
  </Card>
</template>

<script>
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Card from '@/components/Card';

export default {
  name: 'AddComment',
  components: {Card, Loading, Button},
  props: {slug: {type: String, required: true}},
  data() {
    return {
      error: false,
      invalid: true,
      touched: false,
      pending: false,
      errors: {
        author: null,
        content: null,
        rating: null,
      },
      comment: {
        slug: null,
        author: '',
        content: '',
        rating: null,
      },
    };
  },
  methods: {
    validate($field) {
      const $value = this.comment[$field];

      if (null == $value || '' === $value) {
        return 'Required field';
      }

      switch ($field) {
        case 'author':
          if ($value.length > 50) {
            return 'Too long';
          }

          if (/^\p{L}(\s+\p{L})$/u.test($value)) {
            return 'Only letters and spaces';
          }
          break;

        case 'content':
          if ($value.length > 280) {
            return 'Too long';
          }
          break;
      }

      return null;
    },
    runValidation() {
      if (!this.touched) {
        return;
      }

      this.errors = {};
      this.invalid = false;

      for (const $field of ['author', 'content', 'rating']) {
        this.errors[$field] = this.validate($field);
        this.invalid = this.invalid || !!this.errors[$field];
      }
    },
    addComment($event) {
      $event.preventDefault();

      this.touched = true;
      this.runValidation();

      if (this.invalid) {
        return;
      }

      this.pending = true;
      this.$store.dispatch('addComment', this.comment).then(() => {
        this.pending = false;
        this.$emit('cancel');
      }).catch(() => {
        this.error = true;
        this.pending = false;
      });
    },
  },
  mounted() {
    this.comment.slug = this.slug;
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/colors";

.add-comment {
  label, input {
    display: block;
  }

  label {
    padding: .4rem 0;
  }

  input, textarea, select {
    width: 100%;
    border: unset;
    outline: unset;
    background-color: unset;
    box-shadow: 0 0 0 1px #ccc;
    padding: .4rem .8rem;
    margin: 0;
  }

  textarea {
    resize: vertical;
    min-height: 4rem;
  }

  .rating-wrapper {
    min-width: 180px;
  }

  .error {
    color: $grapefruit-dark;
    font-size: small;
  }

  .alert-danger {
    color: $grapefruit-dark;
    border: 1px solid $grapefruit-dark;
    border-radius: 4px;
    background-color: rgba($grapefruit-light, .24);
    cursor: pointer;
  }
}
</style>
