import comments from '../data/comments';
import {shallowMount} from '@vue/test-utils';
import Comment from '@/components/Comment';

describe('Comment', () => {
  const comment = comments['example-slug'][0];
  const wrapper = shallowMount(Comment, {
    propsData: {comment},
  });

  it('should have 4 stars', function () {
    expect(wrapper.find('header span').text()).toBe('⭐⭐⭐⭐');
  });

  it('should not display delete confirm', function () {
    expect(wrapper.find('footer p').exists()).toBeFalsy();
  });

  it('should display delete confirm', async function () {
    wrapper.find('.btn.danger').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('footer p').exists()).toBeTruthy();
  });
});
