<template>

<article class="media">
  <div class="media-content mr-3">
    <div class="content">
      <h1 class="title">Workshop Title<span class="tag is-small">#4</span></h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
    </div>

    <small class="is-size-7"><strong class="has-text-white">Date:</strong> 12/11/2021</small>
    <small class="is-size-7"><strong class="has-text-white">Time:</strong> 3:30-4:30pm</small>
    <small class="is-size-7"><strong class="has-text-white">Venue:</strong> Space #1</small>
    <small class="is-size-7"><strong class="has-text-white">Organiser:</strong> Organiser #1</small>
  </div>

</article>

</template>

<script>
export default {
    name: 'WorkshopEvent'
}
</script>

<style lang="scss" scoped>
.media {
  padding: 1.5em 2.0em;
  border-radius: 0.4em;
  color: white;
  border: 0.3em solid #FFDA7A;
}

.tag {
  background-color: #FFDA7A;
  margin-left: 1rem;
}

.title {
  color: white;
}

.media:hover {
  background-color: rgba(0, 0, 0, 0.25);
}

small {
  margin-right: 2rem;
}

.column {
  padding-top: 0px;
  padding-bottom: 0px;
}

@media (max-width: 600px) {
  small {
    margin-right: 1rem;
  }
  .title {
    font-size: 4vw;
  }
  p {
    font-size: 3vw;
  }
}
</style>