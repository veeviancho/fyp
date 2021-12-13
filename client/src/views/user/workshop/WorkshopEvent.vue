<template>

<router-link :to="'/workshop/' + workshopItem._id"> 
  <article class="media">

    <div class="media-content mr-3">
      <div class="content">
        <h1 class="title">{{ workshopItem.title }}<span class="tag is-small">#4</span></h1>
        <p class="desc">{{ workshopItem.description }}</p>
      </div>

      <small class="is-size-7">
        <span class="info"><strong class="has-text-white">Date:</strong> {{ workshopItem.date }}</span>
        <span class="info"><strong class="has-text-white">Time:</strong> {{ workshopItem.startTime }}-{{ workshopItem.endTime }}</span>
        <span class="info"><strong class="has-text-white">Venue:</strong> {{ workshopItem.venue }}</span>
        <span class="info"><strong class="has-text-white" v-if="workshopItem.organiser">Organiser:</strong> {{ workshopItem.organiser }}</span>
        <span class="info"><strong class="has-text-white">Posted on:</strong> {{ workshopItem.createdAt.slice(0,10) }}</span>
      </small>
    </div>

  </article>
</router-link>

</template>

<script>
export default {
    name: 'WorkshopEvent',
    props: ['workshopItem']
}
</script>

<style lang="scss" scoped>
.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* show 3 lines max */
          line-clamp: 3; 
  -webkit-box-orient: vertical;
}

.media {
  padding: 1.5em 2.0em;
  margin-bottom: 1.5em;
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
  cursor: pointer;
}

.info {
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