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
        <template v-if="!items">
          <Card class="mt-3">
            <Loading desc="Loading books"/>
          </Card>
        </template>

        <template v-else-if="!items.length">
          <Card class="mt-3">
            <p>No book found</p>
          </Card>
        </template>

        <template v-else-if="!filteredItems.length">
          <Card class="mt-3">
            <p>No book matched</p>
          </Card>
        </template>

        <template v-else>
          <Card class="mt-3">
            <label class="d-flex">
              <input v-model="search" class="search-control flex-fill" placeholder="Filter books" type="text"/>
            </label>
          </Card>

          <BookWidget v-for="book in paginatedItems" v-bind:key="book.id" v-bind:book="book"/>
        </template>
      </div>
    </main>

    <footer v-if="paginatedItems">
      <div class="container">
        <Card class="d-flex justify-end mt-3">
          <Paginator
              storage-key="books"
              v-bind:total="239"
              v-on:skip="skip = $event"
              v-on:take="take = $event"/>
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
import Paginator from '@/components/Paginator';

export default {
  name: 'Books',
  components: {Paginator, Card, BookWidget, Loading},
  data() {
    return {
      search: '',
      skip: null,
      take: null,
    };
  },
  computed: {
    ...mapState(['list']),
    items() {
      return this.list?.books;
    },
    filteredItems() {
      if (null == this.items) {
        return null;
      }

      const search = this.search.toLocaleLowerCase();

      return this.items.filter(book => {
        return book.title.toLocaleLowerCase().includes(search);
      });
    },
    paginatedItems() {
      if (null == this.filteredItems) {
        return null;
      }

      return this.filteredItems.slice(this.skip, this.skip + this.take);
    },
  },
  mounted() {
    if (null == this.list) {
      this.$store.dispatch('fetchBooks');
    }
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/colors";

.books {
  padding: 1rem;

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
}
</style>
