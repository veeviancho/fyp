<template>
    <div class="has-navbar-fixed-top has-text-white">

        <div class="section" v-if="workshopItem">
            <div class="workshop-details">
                <h1 class="title has-text-white">{{ workshopItem.title }}</h1>
                <!-- <p>Points: {{ workshop.points }}</p> -->
                <p>{{ workshopItem.description }}</p>
            </div>
            <hr>
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
                <p class="has-text-danger has-text-centered mb-3 white" v-if="workshop_error[0] === this.id">{{ workshop_error[1] }}</p>

                <p><button type="submit" class="button is-fullwidth" @click="registerWorkshop()" :disabled='isDisabled' v-if='showButton'>{{ buttonMsg }}</button></p>
                <p><button type="submit" class="button is-fullwidth deregister" @click="deregisterWorkshop()" :disabled='isDisabled2' v-if='!showButton'>Deregister from workshop</button></p>

            </div>
        </div>  
        <!-- <div class="section">
            <div class="workshop-details">
                <h1 class="title has-text-white">Past Reviews</h1>
            </div>
        </div>     -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Workshop Details',
    data() {
        return {
            buttonMsg: "",
            success_msg: "",
            isDisabled: "",
            isDisabled2: "",
            showButton: "",
            userId: localStorage.getItem('userId')
        }
    },
    props: ['id'],
    computed: {
        ...mapGetters(['workshop_status', 'workshop', 'workshopItem', 'workshop_error']),
    },
    methods: {
        ...mapActions(['getWorkshop', 'registerForWorkshop', 'getWorkshopFromId', 'deregisterFromWorkshop']),
        registerWorkshop() {
            let registration = confirm("You are registrating for " + this.workshopItem.title + ". Do you want to continue?")
            if (registration) {
                this.registerForWorkshop([this.id, this.userId])
                .then(res => {
                    if (res.data.success) {
                        this.success_msg = res.data.msg
                        // Temporarily update frontend
                        this.workshopItem.users.length += 1
                        this.isDisabled = true
                        this.buttonMsg = "You have registered for this workshop"
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        deregisterWorkshop() {
            let deregistration = confirm("You are deregistrating from " + this.workshopItem.title + ". Do you want to continue?")
            if (deregistration) {
                this.deregisterFromWorkshop([this.id, this.userId])
                .then(res => {
                    if (res.data.success) {
                        this.success_msg = res.data.msg
                        // Temporarily update frontend
                        this.workshopItem.users.length -= 1
                        this.showButton = false
                        this.isDisabled2 = true
                    }
                })
            }
        }
    },
    created() {
        this.getWorkshop().then( () => {
            this.getWorkshopFromId(this.id);
            if (this.workshopItem.users.includes(this.userId)) {
                this.showButton = false
                this.isDisabled2 = false
            } else if (this.workshopItem.users.length == this.workshopItem.maxUsers) {
                this.showButton = true
                this.isDisabled = true
                this.buttonMsg = "This workshop is full"
            } else {
                this.showButton = true
                this.isDisabled = false
                this.buttonMsg = "Register for this Workshop"
            }
        });
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
    width: 70%
}

.workshop-details {
    margin: 0 1rem 0;
}

.section {
    background-color: #161C20;
    margin: 0 0 2rem 0;
}

.has-navbar-fixed-top {
    padding: 10% 0;
}

</style>