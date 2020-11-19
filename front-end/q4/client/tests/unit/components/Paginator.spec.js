import Paginator from '@/components/Paginator';
import {shallowMount} from '@vue/test-utils';
import '../mocks/localStorage';

describe('Paginator', () => {
  it('should be disabled on last page', async function () {
    const wrapper = shallowMount(Paginator, {
      propsData: {total: 240},
    });

    wrapper.find('[name=perPage]').setValue(100);
    await wrapper.vm.$nextTick();

    const next = wrapper.findAll('button').at(1);

    next.trigger('click');
    await wrapper.vm.$nextTick();

    next.trigger('click');
    await wrapper.vm.$nextTick();


    expect(next.element.disabled).toBeTruthy();
  });

  it('should be able to retrieve the last state from localStorage', function () {
    let wrapper;

    wrapper = shallowMount(Paginator, {
      propsData: {
        total: 50,
        storageKey: 'test',
      },
    });

    wrapper.find('[name=perPage]').setValue(25);
    wrapper.findAll('button').at(1).trigger('click');
    wrapper.destroy();

    wrapper = shallowMount(Paginator, {
      propsData: {
        total: 50,
        storageKey: 'test',
      },
    });

    expect(wrapper.vm.$data.perPage).toBe(25);
    expect(wrapper.vm.$data.currentPage).toBe(1);
  });
});
