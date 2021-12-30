<template>
    <div class="has-navbar-fixed-top has-text-white" >

        <div class="section" v-if="articleItem">
            <div class="workshop-details">
                <h1 class="title has-text-white">{{ articleItem.title }}</h1>
                <small v-if="articleItem.author != ''">by <i>{{ articleItem.author }}</i></small>
                <p style="white-space: pre-line">{{ articleItem.content }}</p>
            
            <!-- <small class="is-size-7" v-if="articleItem.tags">Tags: 
                <span class="tag is-small" v-for="(tag, index) in articleItem.tags.split(' ')" :key="index">
                {{ tag }}
                </span>
            </small> -->

            <p class="has-text-grey"><fa icon="eye"/> &nbsp;{{ articleItem.views }} view<span v-if="articleItem.views > 1">s</span></p>

            </div>
            <!-- <hr>
            <div class="workshop-details">
                <div class="columns">
                    <p class="column"><b>Date: </b>{{ workshopItem.date }}</p>
                    <p class="column"><b>Time: </b>{{ workshopItem.startTime }} - {{ workshopItem.endTime }}</p>
                </div>
                <div class="columns">
                    <p class="column"><b>Venue: </b>{{ workshopItem.venue }}</p>
                    <p class="column"><b>Organiser: </b>{{ workshopItem.organiser }}</p>
                </div>
                <div class="columns">
                    <p class="column"><b>Programme: </b>{{ workshopItem.programme }}</p>
                    <p class="column"><b>Category: </b>{{ workshopItem.category }}</p>
                </div>

                <div class="columns">
                    <p class="column" v-if="workshopItem.createdAt"><b>Posted on: </b>{{ workshopItem.createdAt.slice(0, 10) }}</p>
                    <p class="column" v-if="workshopItem.users"><b>Registered Users: </b>{{ workshopItem.users.length }}/{{ workshopItem.maxUsers }}</p>
                    <p class="column" v-if="!workshopItem.users"><b>Registered Users: </b>0/{{ workshopItem.maxUsers }}</p>
                </div>

                <p class="has-text-success has-text-centered mb-3 white" v-if="success_msg">{{ success_msg }}</p>
                <p class="has-text-danger has-text-centered mb-3 white" v-if="workshopError.register[0] === this.id">{{ workshopError.register[1] }}</p>

                <p><button type="submit" class="button is-fullwidth" @click="registerWorkshop()" :disabled='isDisabled' v-if='showButton'>{{ buttonMsg }}</button></p>
                <p><button type="submit" class="button is-fullwidth deregister" @click="deregisterWorkshop()" :disabled='isDisabled2' v-if='!showButton'>Deregister from workshop</button></p>

            </div> -->
        </div>
    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['id'],
    computed: {
        ...mapGetters(['articleItem'])
    },
    methods: {
        ...mapActions(['getArticles', 'getArticleById'])
    },
    created() {
        this.getArticles().then( () => {
            this.getArticleById(this.id)
        })
    }
}

</script>

<style scoped>
.button:disabled {
    color: white;
    background-color: #161C20
}

.deregister {
    color: hsl(348, 100%, 61%);
}

.deregister:hover {
    background-color: #990000;
}

p {
    margin: 1.5em 0;
}

.has-navbar-fixed-top {
    width: 70%;
    padding: 10% 0;
}

.workshop-details {
    margin: 0 1rem 0;
}

.section {
    background-color: #161C20;
    margin: 0 0 2rem 0;
}

/* .tag {
  background-color: #329AA0;
  color: white;
  margin-left: 0.5rem;
} */
</style>