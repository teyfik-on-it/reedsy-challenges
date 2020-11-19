import Vuex from 'vuex';
import AddComment from '@/components/AddComment';
import {createLocalVue, shallowMount} from '@vue/test-utils';
import Loading from '@/components/Loading';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AddComment', function () {
  let error = false;
  let promise;
  let wrapper;
  const addComment = () => {
    wrapper.vm.addComment({preventDefault: jest.fn()});

    return wrapper.vm.$nextTick();
  };
  const fillForm = () => {
    wrapper.find('[name=author]').setValue('tevfik');
    wrapper.find('[name=rate]').setValue(3);
    wrapper.find('[name=content]').setValue('wonderful book');
  };

  beforeEach(() => {
    error = false;
    promise = null;
    wrapper = shallowMount(AddComment, {
      localVue,
      propsData: {slug: 'example-slug'},
      store: new Vuex.Store({
        actions: {
          addComment: () => {
            promise = (async () => {
              await new Promise(_ => setTimeout(_, 100));

              if (error) {
                throw new Error();
              }
            })();

            return promise;
          },
        },
      }),
    });
  });

  it('should display errors', async function () {
    await addComment();

    expect(wrapper.find('.error').exists()).toBeTruthy();
  });

  it('should hide 1 error', async function () {
    await addComment();

    const expected = wrapper.findAll('.error').length - 1;

    wrapper.find('[name=author]').setValue('tevfik');

    await addComment();

    expect(wrapper.findAll('.error').length).toBe(expected);
  });

  it('should not show any error(s)', async function () {
    fillForm();
    await addComment();

    expect(wrapper.findAll('.error').length).toBe(0);
  });

  it('should be pending', async function () {
    fillForm();
    await addComment();

    expect(wrapper.findComponent(Loading).exists()).toBeTruthy();
  });

  it('should display error', async function () {
    fillForm();
    addComment();

    await promise;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.alert-danger').exists()).toBeFalsy();
  });
});
