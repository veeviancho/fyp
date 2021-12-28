<template>
    <div class="has-navbar-fixed-top has-text-white">

        <div class="section" v-if="roomId">
            <div class="workshop-details">
                <h1 class="title has-text-white">{{ roomId.title }}</h1>
                <!-- <p>Points: {{ workshop.points }}</p> -->
                <p>{{ roomId.description }}</p>
            </div>
            <hr>
            <!-- <div class="workshop-details">
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
        <!-- <div class="section">
            <div class="workshop-details">
                <h1 class="title has-text-white">Past Reviews</h1>
            </div>
        </div>     -->
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters(['roomId'])
    },
    props: ['id'],
    methods: {
        ...mapActions(['getAllRooms', 'getRoomFromId'])
    },
    created() {
        this.getAllRooms().then(() => {
            this.getRoomFromId(this.id)
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
    margin-top: 1.5em;
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
</style>