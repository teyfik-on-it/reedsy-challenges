import dexie from '@/dexie';

const table = dexie.table('comments');

const addComment = async (comment) => {
  comment = {...comment, createdAt: new Date};
  comment.id = await table.add(comment);

  return comment;
};
const getComments = async (slug) => table.where({slug}).toArray();
const deleteComment = async (id) => table.delete(id);

const comments = {addComment, getComments, deleteComment};

export default comments;
