import {shallowMount} from '@vue/test-utils';
import BookWidget, {maxLength} from '@/components/BookWidget';
import Button from '@/components/Button';


describe('BookWidget', () => {
  const book = {
    author: 'Marcel Proust',
    cover: 'http://DESKTOP-5OOEV84:3000/images/01.jpg',
    rating: '9.9',
    slug: 'in-search-of-lost-time',
    synopsis:
      'In Search of Lost Time, also translated as Remembrance of Things Past,' +
      ' novel in seven parts by Marcel Proust, published in French as À la re' +
      'cherche du temps perdu from 1913 to 1927. The novel is the story of Pr' +
      'oust\'s own life, told as an allegorical search for truth.\nIn Search ' +
      'of Lost Time, also translated as Remembrance of Things Past, novel in ' +
      'seven parts by Marcel Proust, published in French as À la recherche du' +
      ' temps perdu from 1913 to 1927. The novel is the story of Proust\'s ow' +
      'n life, told as an allegorical search for truth.',
    title: 'In Search of Lost Time',
    upvoted: false,
    upvotes: 1111,
  };
  const wrapper = shallowMount(BookWidget, {
    propsData: {
      book,
    },
    stubs: ['router-link'],
  });

  it('should have a prop that holds trimmed synopsis', function () {
    const synopsis = wrapper.find('.synopsis');

    expect(synopsis.exists()).toBeTruthy();

    if (maxLength > book.synopsis.length) {
      expect(synopsis.text()).toBe(book.synopsis);
    } else {
      expect(synopsis.text()).toBe(book.synopsis.substring(0, maxLength) + '...');
    }
  });

  it('should represent upvote state', function () {
    const button = wrapper.findComponent(Button);

    expect(button.exists()).toBeTruthy();

    if (book.upvoted) {
      expect(button.text()).toBe('Upvoted');
    } else {
      expect(button.text()).toBe('Upvote');
    }
  });
});
