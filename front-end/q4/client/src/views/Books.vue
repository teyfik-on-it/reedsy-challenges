<template>
  <div class="books">
    <div class="container">
      <div class="d-flex justify-center my-2">
        <h1>Top books of all time</h1>
      </div>

      <template v-if="books">
        <div class="mb-2">
          <label class="d-flex">
            <input type="text" v-model="search" placeholder="Filter books" class="flex-fill"/>
          </label>
        </div>

        <ul>
          <li v-bind:key="book.slug" v-for="book of books">
            <BookWidget v-bind:book="book"/>
          </li>
        </ul>
      </template>

      <Loading v-else desc="Loading books"/>
    </div>

    <div class="sticky bottom w-100 p-2 d-flex justify-center bg-light elevation-t6" v-if="books">
      <p v-if="count > books.length">Showing {{ books.length }}/{{ count }} result<template v-if="books.length > 1">s</template></p>
      <p v-else>{{ count }} book<template v-if="count > 1">s</template></p>
    </div>
  </div>
</template>

<script>
import BookWidget from '@/components/BookWidget';
import Loading from '@/components/Loading';
import {mapState} from 'vuex';

export default {
  name: 'Books',
  components: {BookWidget, Loading},
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
  padding-bottom: 5rem;

  .container {
    max-width: 640px;
  }

  li + li {
    margin-top: 2rem;
  }

  input {
    margin: 0;
    border: 0;
    font-size: 16px;
    padding: .4rem 0;
    outline: unset;
    border-bottom: 2px solid #ccc;
    transition: border-bottom-color .2s;

    &:focus {
      border-bottom-color: $blue-jeans;
    }
  }
}
</style>
