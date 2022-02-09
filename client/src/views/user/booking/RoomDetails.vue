<template>
    <div class="has-navbar-fixed-top has-text-white">
        <RoomImage :roomImg="roomId.imageLink" v-show="viewImage==true" @close="viewImage=false"/>
        <div class="section" v-if="roomId">
            <div class="workshop-details">
                <section class="image" @click="viewImage=true" :style="{  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.7)), url(' + roomId.imageLink + ')' }">
                    <div class="roomDetails">
                        <h1 class="title has-text-white">{{ roomId.title }}</h1>
                        <p>{{ roomId.description }}</p>
                        <div class="availability">
                            Available seats: <b>10 / {{ roomId.maxUsers }}</b>
                        </div>
                        {{ results }}
                    </div>
                </section>
            </div>
            <hr>

            <form class="field" @submit.prevent="makeBooking">
            <div class="columns">
                <div class="column mx-5">
                    <label class="has-text-white py-1">DATE</label>
                    <input class="input" type="date" placeholder="Find Workshops" v-model="date">
                </div>
                <div class="column mx-5">
                    <div class="columns">
                        <div class="column">
                            <label class="has-text-white py-1">START TIME</label>
                            <input class="input" type="time" v-model="startTime">
                        </div>
                        <div class="column">
                            <label class="has-text-white py-1">END TIME</label>
                            <input class="input" type="time" v-model="endTime">
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column mx-5">
                    <label class="has-text-white py-1">PURPOSE</label>
                    <input class="input" type="text" placeholder="State purpose of visit (if any)" v-model="purpose">
                    <p class="has-text-success white" v-if="successMsg">{{ successMsg }}</p>
                    <!-- <p class="has-text-danger has-text-centered mb-3 white" v-if="workshopError.register[0] === this.id">{{ workshopError.register[1] }}</p> -->
                </div>
            </div>

            <button class="button ml-5 mb-2" type="submit">Book</button>
            </form>

        </div>

        <div class="section" v-if="roomId">
            <vue-cal style="height: 700px" />
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import RoomImage from './ViewImage.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
    data() {
        return {
            successMsg: '',
            viewImage: false,
            date: localStorage.getItem('date'),
            startTime: localStorage.getItem('startTime'),
            endTime: localStorage.getItem('endTime'),
            purpose: '',
        }
    },
    components: {
        RoomImage,
        VueCal
    },
    computed: {
        ...mapGetters(['roomId', 'bookingStatus', 'bookingError']),
        results() {
            if (this.date && this.startTime && this.endTime) {
                return this.date + " " + this.startTime + "-" + this.endTime
            }
            return ''
        }
    },
    props: ['id'],
    methods: {
        ...mapActions(['getAllRooms', 'getRoomFromId', 'createBooking']),
        makeBooking() {
            console.log('hey')
            let details = {
                userId: localStorage.getItem('userId'),
                roomId: this.id,
                date: this.date,
                start: this.startTime,
                end: this.endTime, 
                purpose: this.purpose
            }
            this.createBooking(details).then( () => {
                if (this.bookingStatus.create == 'success') {
                    localStorage.removeItem('date')
                    localStorage.removeItem('startTime')
                    localStorage.removeItem('endTime')
                    this.successMsg = "Successfully booked!"
                    this.date = ''
                    this.startTime = ''
                    this.endTime = ''
                    this.purpose = ''
                }
            })
        }
    },
    created() {
        this.getAllRooms().then(() => {
            this.getRoomFromId(this.id)
        })
    }
}
</script>

<style scoped>
.image {
    background-repeat: no-repeat;
    background-attachment: center;
    background-position: center;
    background-size: cover;
    cursor: pointer;
}

.roomDetails {
    padding: 5rem;
    text-align: center;
}

.section {
    background-color: #161C20;
    margin: 0 0 2rem 0;
}

.availability {
    margin: 2rem 15vw 0.5rem 15vw;
    padding: 1rem;
    border: 1px solid white;
}

p {
    margin-top: 1.5em;
}

.has-navbar-fixed-top {
    width: 70%;
    padding: 10% 0;
}
</style>