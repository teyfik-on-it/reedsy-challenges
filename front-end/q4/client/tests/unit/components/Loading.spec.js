import Loading from '@/components/Loading';
import {shallowMount} from '@vue/test-utils';


describe('Loading', () => {
  const title = 'Lorem ipsum';
  const desc = 'dolor sit amet';
  const wrapper = shallowMount(Loading, {
    propsData: {title, desc},
  });

  it('should contain h1', async function () {
    const h1 = wrapper.find('h1');

    expect(h1.exists()).toBeTruthy();
    expect(h1.text()).toBe(title);
  });

  it('should contain p', async function () {
    const p = wrapper.find('p');

    expect(p.exists()).toBeTruthy();
    expect(p.text()).toBe(desc);
  });
});


