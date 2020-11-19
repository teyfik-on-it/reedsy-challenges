<template>
  <div>
    <Card class="d-flex justify-between align-center">
      <h2>Comments</h2>
      <Button @click="toggleForm()">Comment</Button>
    </Card>

    <AddComment v-if="showForm" class="mt-3" v-bind:slug="slug" @cancel="toggleForm()"/>

    <template v-else-if="items">
      <div v-if="!items.length" class="mt-3 elevation-z4 bg-white p-2">
        <p>No comments found</p>
      </div>

      <Comment v-for="comment in items" v-bind:key="comment.id" class="mt-3" v-bind:comment="comment"/>
    </template>

    <Card v-else class="mt-3">
      <Loading desc="Loading comments"/>
    </Card>
  </div>
</template>

<script>
import Loading from '@/components/Loading';
import {mapState} from 'vuex';
import Comment from '@/components/Comment';
import Button from '@/components/Button';
import AddComment from '@/components/AddComment';
import Card from '@/components/Card';

export default {
  name: 'Comments',
  components: {Card, AddComment, Button, Comment, Loading},
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {showForm: false};
  },
  mounted() {
    if (null == this.items) {
      this.$store.dispatch('fetchComments', this.slug);
    }
  },
  computed: {
    ...mapState(['comments']),
    items() {
      return this.comments[this.slug];
    },
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
  },
};
</script>

<style scoped>

</style>
