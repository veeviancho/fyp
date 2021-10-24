<template>
<router-link :to="{ name: 'Workshop Details' }">
<article class="media">
  <figure class="media-left">
    <p class="image is-128x128 is-square">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content mr-3">
    <div class="content">
      <p>
        <strong class="has-text-info">Workshop Title</strong> <strong class="tag is-small">#4</strong>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
      </p>
    </div>
    <!-- <small class="is-size-7">Tags: <span class="tag is-small is-info is-light">Name</span> <span class="tag is-small">Name</span></small>
    <br> -->
    <small class="is-size-7"><strong>Date:</strong> 12/11/2021</small>&nbsp;
    <small class="is-size-7"><strong>Time:</strong> 3:30-4:30pm</small>&nbsp;
    <small class="is-size-7"><strong>Venue:</strong> Space #1</small>&nbsp;
    <small class="is-size-7"><strong>Organiser:</strong> Organiser #1</small>&nbsp;
  </div>
  <div class="media-right">
    <strong class="has-text-info">10pts</strong>
  </div>
</article>
</router-link>
</template>

<script>
export default {
    name: 'WorkshopEvent'
}
</script>

<style lang="scss" scoped>
.media {
  border: 1px solid #e6e7e9;
  padding: 1em 1.5em;
  border-radius: 0.3em;
  color: gray;
}

.media:hover {
  border: 0.15em solid #3c7a89;
}

</style>