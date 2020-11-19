import Books from '@/views/Books';
import Vuex from 'vuex';
import {createLocalVue, shallowMount} from '@vue/test-utils';
import Loading from '@/components/Loading';
import list from '../data/list';
import BookWidget from '@/components/BookWidget';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Books', () => {
  const createWrapper = (fill = true) => {
    return shallowMount(Books, {
      localVue,
      store: new Vuex.Store({
        state: {list: fill ? list : null},
        actions: {fetchBooks: jest.fn()},
      }),
      stubs: ['router-link'],
    });
  };

  it('should be loading', function () {
    const wrapper = createWrapper(false);

    expect(wrapper.findComponent(Loading).exists()).toBeTruthy();
  });

  it('should be loaded', function () {
    const wrapper = createWrapper();

    expect(wrapper.findComponent(Loading).exists()).toBeFalsy();
  });

  it('should list 10 items', function () {
    const wrapper = createWrapper();

    expect(wrapper.findAllComponents(BookWidget).length).toBe(list.books.length);
  });

  it('should filter items', async function () {
    const wrapper = createWrapper();
    const input = wrapper.find('input');

    expect(input.exists()).toBeTruthy();

    const expectations = [
      {query: 'dy', count: 2},
      {query: 'l', count: 4},
      {query: 't', count: 7},
      {query: 'y', count: 6},
    ];

    for (const exp of expectations) {
      input.setValue(exp.query);
      await wrapper.vm.$nextTick();
      expect(wrapper.findAllComponents(BookWidget).length).toBe(exp.count);
    }
  });
});
