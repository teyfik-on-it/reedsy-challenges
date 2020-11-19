import Vuex from 'vuex';
import {createLocalVue, shallowMount} from '@vue/test-utils';
import Loading from '@/components/Loading';
import comments from '../data/comments';
import Comments from '@/components/Comments';
import Comment from '@/components/Comment';
import AddComment from '@/components/AddComment';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Comments', () => {
  const createWrapper = (fill = true) => {
    return shallowMount(Comments, {
      localVue,
      propsData: {slug: 'example-slug'},
      store: new Vuex.Store({
        state: {comments: fill ? comments : {}},
        actions: {fetchComments: jest.fn()},
      }),
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

  it('should list 1 item', function () {
    const wrapper = createWrapper();

    expect(wrapper.findAllComponents(Comment).length).toBe(comments['example-slug'].length);
  });

  it('should not display the add comment form', function () {
    const wrapper = createWrapper();

    expect(wrapper.findComponent(AddComment).exists()).toBeFalsy();
  });

  it('should display the add comment form', function () {
    const wrapper = createWrapper();

    wrapper.setProps({
      showForm: true,
    });

    expect(wrapper.findComponent(AddComment).exists()).toBeFalsy();
  });
});
