<template>
  <div class="books h-100 d-flex flex-column">
    <header>
      <div class="container">
        <Card class="d-flex justify-center">
          <h1>Top books of all time</h1>
        </Card>
      </div>
    </header>

    <main class="flex-fill">
      <div class="container">
        <template v-if="!books">
          <Card class="mt-3">
            <Loading desc="Loading books"/>
          </Card>
        </template>

        <template v-else-if="!books.length">
          <Card class="mt-3">
            <p>No book found</p>
          </Card>
        </template>

        <template v-else>
          <Card class="mt-3">
            <label class="d-flex">
              <input type="text" v-model="search" placeholder="Filter books" class="search-control flex-fill"/>
            </label>
          </Card>

          <BookWidget v-bind:book="book" v-bind:key="book.slug" v-for="book of books"/>
        </template>
      </div>
    </main>

    <footer v-if="books">
      <div class="container">
        <Card class="d-flex justify-center">
          <p v-if="count > books.length">
            Showing {{ books.length }}/{{ count }} result{{ books.length > 1 ? 's' : '' }}
          </p>

          <p v-else>
            {{ count }} book{{ books.length > 1 ? 's' : '' }}
          </p>
        </Card>
      </div>
    </footer>
  </div>
</template>

<script>
import BookWidget from '@/components/BookWidget';
import Loading from '@/components/Loading';
import {mapState} from 'vuex';
import Card from '@/components/Card';

export default {
  name: 'Books',
  components: {Card, BookWidget, Loading},
  data() {
    return {search: ''};
  },
  computed: {
    ...mapState(['list']),
    count() {
      return this.list?.meta.count;
    },
    books() {
      const search = this.search.toLocaleLowerCase();

      return this.list?.books.filter(book => {
        return book.title.toLocaleLowerCase().includes(search);
      });
    },
  },
  mounted() {
    if (null == this.list) {
      this.$store.dispatch('fetchBooks');
    }
  },
};
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.books {
  padding: 1rem 1rem 5.5rem 1rem;

  .container {
    max-width: 640px;
  }

  main {
    .search-control {
      margin: 0;
      border: 0;
      font-size: 16px;
      padding: .4rem 0;
      outline: unset;
      border-bottom: 2px solid #ccc;
      transition: border-bottom-color .2s;
      background-color: transparent;

      &:focus {
        border-bottom-color: $blue-jeans;
      }
    }

    ::v-deep .book-widget {
      margin-top: 1.5rem;
    }
  }


  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 1rem;
  }
}
</style>
