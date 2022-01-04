<template>
<router-link :to="'/articles/' + articleItem._id">
  <article class="media">
    <div class="media-content mr-3">

      <div class="content">
        <h1 class="title">{{ articleItem.title }}</h1>
        <p class="desc">{{ articleItem.content }}</p>
      </div>

      <small class="is-size-7" v-if="articleItem.tags && articleItem.tags[0] != ''">Tags: 
        <span class="tag is-small" v-for="(tag, index) in articleItem.tags" :key="index">
          {{ tag }}
        </span>
      </small>

    </div>
  </article>
</router-link>
</template>

<script>
export default {
  props: ['articleItem']
}
</script>

<style lang="scss" scoped>
.media {
  padding: 1.5em 2.0em;
  margin-bottom: 1.5em;
  border-radius: 0.4em;
  color: white;
  border: 0.3em solid #33CDC4;
}

.tag {
  background-color: #329AA0;
  color: white;
  margin-left: 0.5rem;
}

.title {
  color: white;
}

.media:hover {
  background-color: rgba(0, 0, 0, 0.25);
}
</style>