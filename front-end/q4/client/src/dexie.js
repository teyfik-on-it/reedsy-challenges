import Dexie from 'dexie';

class _Dexie extends Dexie {
  constructor() {
    super('app');

    this.version(1).stores({
      comments: '++id, slug, rating, author, content',
    });
  }
}

const dexie = new _Dexie();

export default dexie;
