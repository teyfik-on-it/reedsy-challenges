import dexie from '@/dexie';

const table = dexie.table('comments');

const addComment = async (comment) => ({...comment, createdAt: new Date(), id: await table.add(comment)});
const getComments = async (slug) => table.where({slug}).toArray();

const comments = {addComment, getComments};

export default comments;
