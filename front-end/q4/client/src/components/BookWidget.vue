<template>
  <div class="book-widget d-flex elevation-z4 p-2">
    <div class="d-flex flex-fill flex-column">
      <header>
        <router-link v-bind:to="'/book/' + book.slug">
          <h2>{{ book.title }} <small>{{ book.rating }}/10</small></h2>
          <h3>{{ book.author }}</h3>
        </router-link>
      </header>

      <main class="flex-fill my-2">
        <p class="synopsis">{{ trimmedSynopsis }}</p>
      </main>

      <footer class="d-flex justify-between align-center">
        <Button v-bind:outline="book.upvoted" v-bind:disabled="book.upvoted">
          {{ book.upvoted ? 'Upvoted' : 'Upvote' }}
        </Button>

        <span v-if="book.upvotes === 0">Never upvoted</span>
        <span v-else-if="book.upvotes > 1">Upvoted {{ book.upvotes }} times</span>
        <span v-else>Upvoted once</span>
      </footer>
    </div>

    <aside class="ml-3">
      <router-link v-bind:to="'/book/' + book.slug">
        <figure>
          <img v-bind:src="book.cover" v-bind:alt="book.title" class="elevation-z2">
        </figure>
      </router-link>
    </aside>
  </div>
</template>

<script>
import Button from '@/components/Button';

export const maxLength = 200;

export default {
  name: 'BookWidget',
  props: ['book'],
  components: {Button},
  computed: {
    trimmedSynopsis() {
      if (maxLength > this.book.synopsis.length) {
        return this.book.synopsis;
      }

      return this.book.synopsis.substring(0, maxLength) + '...';
    },
  },
};
</script>

<style scoped lang="scss">
.book-widget {
  img {
    max-width: 140px;
    border-radius: 10px;
  }
}
</style>
