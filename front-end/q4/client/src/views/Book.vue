<template>
  <div class="book">
    <div class="container">
      <nav class="mt-3">
        <router-link to="/books">
          <Button>Back</Button>
        </router-link>
      </nav>

      <template v-if="book">

        <header class="mt-3">
          <Card>
            <h1>{{ book.title }}</h1>
            <h2><i>{{ book.author }}</i></h2>
          </Card>
        </header>

        <div class="d-flex mt-3 wrapper">
          <div class="flex-fill">
            <main>
              <Card>
                <h2>Synopsis</h2>
                <p class="mt-2">{{ book.synopsis }}</p>
              </Card>
            </main>

            <footer class="mt-3">
              <Card class="d-flex justify-between align-center flex-wrap no-wrap justify-center">
                <h3>Rating: {{ book.rating }}/10</h3>

                <div class="ml-3"></div>

                <div>
                  <span>Upvoted {{ book.upvotes }} times</span>
                  <Button class="ml-3">Upvote</Button>
                </div>
              </Card>
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

      <template v-else>
        <Card class="mt-3">
          <Loading desc="Loading book"/>
        </Card>
      </template>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading';
import Button from '@/components/Button';
import {mapState} from 'vuex';
import Comments from '@/components/Comments';
import Card from '@/components/Card';

export default {
  name: 'Book',
  components: {Card, Comments, Loading, Button},
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
