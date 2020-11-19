import comments from '../data/comments';

const {shallowMount} = require('@vue/test-utils');

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

  it('should display delete confirm', function () {
    wrapper.setProps({
      confirm: true,
    });

    expect(wrapper.find('footer p').exists()).toBeTruthy();
  });
});
