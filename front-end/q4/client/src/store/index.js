import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: {},
    list: null,
  },
  mutations: {
    setBooks(state, books) {
      state.list = books;
    },
    setBook(state, book) {
      state.map[book.slug] = book;
      state.map = {...state.map};
    },
  },
  actions: {
    fetchBooks({commit}) {
      api.books.getBooks().then(books => {
        commit('setBooks', books);
      });
    },
    fetchBook({commit}, slug) {
      api.books.getBook(slug).then(book => {
        commit('setBook', book);
      });
    },
  },
  modules: {},
});
