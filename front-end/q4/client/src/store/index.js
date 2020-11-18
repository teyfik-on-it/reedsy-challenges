import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: {},
    list: null,
    comments: {},
  },
  mutations: {
    setBooks(state, books) {
      state.list = books;
    },
    setBook(state, book) {
      state.map[book.slug] = book;
      state.map = {...state.map};
    },
    setComments(state, {slug, comments}) {
      state.comments[slug] = comments;
    },
    addComment({comments}, comment) {
      const {slug} = comment;

      comments[slug] = comments[slug] || [];
      comments[slug] = comments[slug].concat(comment).sort((a, b) => a.id - b.id);
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
    fetchComments({commit}, slug) {
      api.comments.getComments(slug).then(comments => {
        commit('setComments', {slug, comments});
      });
    },
    addComment({commit}, payload) {
      api.comments.addComment(payload).then(comment => {
        commit('addComment', comment);
      });
    },
  },
  modules: {},
});
