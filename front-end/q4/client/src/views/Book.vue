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

        <div class="d-flex mt-3 wrapper">
          <div class="flex-fill">
            <main class="elevation-z4 p-2 bg-white">
              <h2>Synopsis</h2>
              <p class="mt-2">{{ book.synopsis }}</p>
            </main>

            <footer class="d-flex justify-between elevation-z4 p-2 bg-white mt-3 align-center flex-wrap no-wrap justify-center">
              <h3>Rating: {{ book.rating }}/10</h3>

              <div class="ml-3"></div>

              <div>
                <span>Upvoted {{ book.upvotes }} times</span>
                <Button class="ml-3">Upvote</Button>
              </div>
            </footer>
          </div>
          <div class="ml-3"></div>
          <aside>
            <figure>
              <img v-bind:src="book.cover" v-bind:alt="book.title" class="elevation-z4">
            </figure>
          </aside>
        </div>

        <Comments class="my-2" v-bind:slug="book.slug"/>
      </template>

      <Loading v-else title="Please wait" desc="Loading book" class="mt-3"/>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading';
import Button from '@/components/Button';
import {mapState} from 'vuex';
import Comments from '@/components/Comments';

export default {
  name: 'Book',
  components: {Comments, Loading, Button},
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
  padding: 1rem;
  min-width: 320px;

  .container {
    max-width: 740px;
  }

  aside {
    min-width: 240px;

    img {
      max-width: 100%;
      border-radius: 12px;
    }
  }

  .no-wrap {
    white-space: nowrap;
  }

  @media (min-width: 560px) {
    aside {
      flex: 0 1 30%;
    }
  }

  @media (max-width: 559px) {
    .wrapper {
      align-items: center;
      flex-direction: column-reverse;

      aside {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
