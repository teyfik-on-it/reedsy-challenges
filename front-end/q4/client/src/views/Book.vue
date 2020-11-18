<template>
  <div class="book">
    <div class="container">
      <template v-if="book">
        <nav class="mt-3">
          <router-link to="/books">
            <Button>Back</Button>
          </router-link>
        </nav>

        <header class="elevation-z4 p-2 mt-3 bg-white">
          <h1>{{ book.title }}</h1>
          <h2><i>{{ book.author }}</i></h2>
        </header>

        <div class="d-flex mt-3">
          <div class="flex-fill">
            <main class="elevation-z4 p-2 bg-white">
              <h2>Synopsis</h2>
              <p class="mt-2">{{ book.synopsis }}</p>
            </main>

            <footer class="d-flex justify-between elevation-z4 p-2 mt-3 align-center bg-white">
              <h3>Rating: {{ book.rating }}/10</h3>

              <div>
                <span>Upvoted {{ book.upvotes }} times</span>
                <Button class="ml-3">Upvote</Button>
              </div>
            </footer>
          </div>

          <aside class="ml-3">
            <figure>
              <img v-bind:src="book.cover" v-bind:alt="book.title" class="elevation-z4">
            </figure>
          </aside>
        </div>
      </template>

      <Loading v-else title="Please wait" desc="Loading book" class="mt-3"/>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading';
import Button from '@/components/Button';
import {mapState} from 'vuex';

export default {
  name: 'Book',
  components: {Loading, Button},
  computed: {
    ...mapState(['map']),
    slug() {
      return this.$route.params.slug;
    },
    book() {
      return this.map[this.slug];
    },
  },
  mounted() {
    if (null == this.book) {
      this.$store.dispatch('fetchBook', this.slug);
    }
  },
};
</script>

<style scoped lang="scss">
.book {
  .container {
    max-width: 740px;
  }

  img {
    max-width: 240px;
    border-radius: 12px;
  }
}
</style>
