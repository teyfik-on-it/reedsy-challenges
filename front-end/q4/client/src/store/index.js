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
      state.comments = {...state.comments};
    },
    addComment(state, comment) {
      const {slug} = comment;
      const {comments} = state;


      comments[slug] = comments[slug] || [];
      comments[slug] = comments[slug].concat(comment).sort((a, b) => b.id - a.id);

      state.comments = {...state.comments};
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
