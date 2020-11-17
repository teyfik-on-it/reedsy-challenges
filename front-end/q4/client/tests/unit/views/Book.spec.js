import Book from '@/views/Book';
import Vuex from 'vuex';
import {createLocalVue, shallowMount} from '@vue/test-utils';
import Loading from '@/components/Loading';
import book from '../data/book';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Book', () => {
  const $route = {params: {slug: book.slug}};

  it('should be loading', function () {
    const wrapper = shallowMount(Book, {
      localVue,
      store: new Vuex.Store({
        state: {map: {}},
        actions: {fetchBook: jest.fn()},
      }),
      mocks: {$route},
      stubs: ['router-link'],
    });

    expect(wrapper.findComponent(Loading).exists()).toBeTruthy();
  });

  it('should be loaded', function () {
    const wrapper = shallowMount(Book, {
      localVue,
      store: new Vuex.Store({
        state: {
          map: {
            [book.slug]: book,
          },
        },
      }),
      mocks: {$route},
      stubs: ['router-link'],
    });

    expect(wrapper.findComponent(Loading).exists()).toBeFalsy();
  });
});
