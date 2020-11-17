import httpClient from '@/api/httpClient';

const getBook = (slug) => httpClient.get('/books/' + slug).then(_ => _.data);
const getBooks = () => httpClient.get('/books').then(_ => _.data);

const books = {getBook, getBooks};

export default books;
