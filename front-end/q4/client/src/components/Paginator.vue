<template>
  <div class="paginator d-flex align-center">
    <div class="form-control wrapper">
      <label class="no-wrap" for="per-page">Items per page</label>
      <select id="per-page" v-model="perPage" name="perPage" @change="onPerPageChange()">
        <option v-for="item in perPageOptions" v-bind:key="item" v-bind:value="item">{{ item }}</option>
      </select>
    </div>

    <div class="ml-2 desktop"></div>

    <div class="current-page wrapper">
      <span>{{ start }} – {{ end }} of {{ total }}</span>
    </div>

    <div class="ml-2 desktop"></div>

    <div class="controls wrapper">
      <button v-bind:disabled="!canPrev" @click="prev()">Prev</button>
      <button v-bind:disabled="!canNext" @click="next()">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paginator',
  components: {},
  props: {
    total: {
      type: Number,
      required: true,
    },
    storageKey: String,
    perPageOptions: {
      type: Array,
      default() {
        return [5, 10, 25, 50, 100];
      },
    },
  },
  data() {
    return {
      currentPage: null,
      perPage: null,
      prevPerPage: null,
    };
  },
  computed: {
    lastPage() {
      return Math.floor(this.total / this.perPage);
    },
    canPrev() {
      return this.currentPage > 0;
    },
    canNext() {
      return this.currentPage < this.lastPage;
    },
    start() {
      return this.currentPage * this.perPage + 1;
    },
    end() {
      return this.currentPage * this.perPage + this.perPage;
    },
  },
  mounted() {
    this.perPage = this.getPerPage();
    this.currentPage = this.getCurrentPage();
    this.prevPerPage = this.perPage;

    this.publish();
  },
  methods: {
    getKey(key) {
      if (null == this.storageKey) {
        return;
      }

      return this.storageKey + ':' + key;
    },
    getStorage(key) {
      key = this.getKey(key);

      if (null == key) {
        return;
      }

      return localStorage.getItem(key);
    },
    setStorage(key, value) {
      key = this.getKey(key);

      if (null == key) {
        return;
      }

      if (null == value) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    },
    parseStorage(key) {
      const value = this.getStorage(key);

      if (null == value) {
        return;
      }

      return parseInt(value, 10);
    },
    getPerPage() {
      const perPage = this.parseStorage('per-page');

      if (this.perPageOptions.includes(perPage)) {
        return perPage;
      }

      return this.perPageOptions[0];
    },
    getCurrentPage() {
      if (null == this.perPage) {
        return null;
      }

      const page = this.parseStorage('page');

      if (Number.isInteger(page) && page > -1 && this.currentPage < this.total / this.perPage) {
        return page;
      }

      return 0;
    },
    prev() {
      this.currentPage--;
      this.publish();
    },
    next() {
      this.currentPage++;
      this.publish();
    },
    onPerPageChange() {
      this.currentPage = Math.floor((this.currentPage * this.prevPerPage) / this.perPage);
      this.prevPerPage = this.perPage;
      this.publish();
    },
    publish() {
      this.setStorage('page', this.currentPage);
      this.setStorage('per-page', this.perPage);
      this.$emit('skip', this.currentPage * this.perPage);
      this.$emit('take', this.perPage);
    },
  },
};
</script>

<style lang="scss" scoped>
.paginator {
  .wrapper {
    display: flex;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
  }

  .current-page {
    user-select: none;
  }

  button, select {
    border: unset;
    outline: unset;
    background-color: unset;
    box-shadow: 0 0 0 1px #ccc;
    padding: .4rem .8rem;
  }


  button {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }

  label + select {
    margin-left: .5rem
  }

  button + button {
    margin-left: 1rem;
  }

  @media (max-width: 560px) {
    & {
      width: 100%;
      flex-direction: column;

      .desktop {
        display: none;
      }

      .wrapper {
        width: 100%;

        &:nth-child(n+2) {
          margin-top: .5rem;
        }
      }
    }
  }
}
</style>
