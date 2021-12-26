<template>

<router-link :to="'/workshop/' + workshopItem._id"> 

  <article :class="[fullWorkshop ? 'full' : 'not-full', 'media']">

    <div class="media-content mr-3">
      <div class="content">
        <h1 :class="[fullWorkshop ? 'title gray' : 'title white']">{{ workshopItem.title }}
          <span :class="[fullWorkshop ? 'tag-full' : 'tag-not-full', 'tag is-small']">#{{ workshopItem.rank }}</span>
        </h1>
        <p class="desc">{{ workshopItem.description }}</p>
      </div>

      <small class="is-size-7">
        <span class="info"><strong :class="[fullWorkshop ? 'gray' : 'white']">Date:</strong> {{ workshopItem.date }}</span>
        <span class="info"><strong :class="[fullWorkshop ? 'gray' : 'white']">Time:</strong> {{ workshopItem.startTime }}-{{ workshopItem.endTime }}</span>
        <span class="info"><strong :class="[fullWorkshop ? 'gray' : 'white']">Venue:</strong> {{ workshopItem.venue }}</span>
        <span class="info"><strong :class="[fullWorkshop ? 'gray' : 'white']" v-if="workshopItem.organiser">Organiser:</strong> {{ workshopItem.organiser }}</span>
        <span class="info"><strong :class="[fullWorkshop ? 'gray' : 'white']">Posted on:</strong> {{ workshopItem.createdAt.slice(0,10) }}</span>
      </small>
    </div>

  </article>
</router-link>

</template>

<script>
export default {
    name: 'WorkshopEvent',
    props: ['workshopItem'],
    computed: {
      fullWorkshop() {
        return this.workshopItem.users.length === this.workshopItem.maxUsers
      }
    }
}
</script>

<style lang="scss" scoped>
.not-full {
  padding: 1.5em 2.0em;
  margin-bottom: 1.5em;
  border-radius: 0.4em;
  color: white;
  border: 0.3em solid #FFDA7A;
}

.full {
  padding: 1.5em 2.0em;
  margin-bottom: 1.5em;
  border-radius: 0.4em;
  color: gray !important;
  border: 0.3em solid #b19757;
}

.tag-not-full {
  background-color: #FFDA7A;
  margin-left: 1rem;
}

.tag-full {
  background-color: #b19757;
  margin-left: 1rem;
}

.white {
  color: white;
}

.gray {
  color: gray !important;
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
  // small {
  //   margin-right: 1rem;
  // }
  .title {
    font-size: 4vw;
  }
  p {
    font-size: 3vw;
  }
}
</style>