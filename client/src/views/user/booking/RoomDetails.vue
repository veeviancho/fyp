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

            <form class="field" @submit.prevent>
            <div class="columns">
                <div class="column mx-5">
                    <label class="has-text-white py-1">DATE</label>
                    <input class="input" type="date" placeholder="Find Workshops" v-model="date" required>
                </div>
                <div class="column mx-5">
                    <div class="columns">
                        <div class="column">
                            <label class="has-text-white py-1">START TIME</label>
                            <input class="input" type="time" v-model="startTime" required>
                        </div>
                        <div class="column">
                            <label class="has-text-white py-1">END TIME</label>
                            <input class="input" type="time" v-model="endTime" required>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column mx-5">
                    <label class="has-text-white py-1">PURPOSE</label>
                    <input class="input" type="text" placeholder="State purpose of visit (if any)" v-model="purpose">
                    <p class="has-text-success white" v-if="successMsg">{{ successMsg }}</p>
                    <p class="has-text-danger white" v-if="bookingError.create && !successMsg">{{ bookingError.create }}</p>
                </div>
            </div>

            <button class="button ml-5 mb-2" type="submit" @click="makeBooking(false)">Book A Seat</button>
            <button class="button ml-5 mb-2" type="submit" @click="makeBooking(true)">Book The Room</button>
            </form>

        </div>

        <div class="section" v-if="roomId">
            <vue-cal    
                class="vuecal" 
                style="height: 700px" 
                :disable-views="['years', 'year']"
                :time-step="30"
                :events="roomEvents"
            />

            <!-- <vue-cal
                :min-date="minDate"
                :max-date="maxDate"
                :disable-days="closedDays"
                :time-from="8 * 60" 
                :time-to="24 * 60" 
            /> -->
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
            purpose: ''
        }
    },
    components: {
        RoomImage,
        VueCal
    },
    computed: {
        ...mapGetters(['roomId', 'bookingStatus', 'bookingError', 'roomEvents', 'workshop', 'bookings']),
        results() {
            if (this.date && this.startTime && this.endTime) {
                return this.date + " " + this.startTime + "-" + this.endTime
            }
            return ''
        },

        calendarEvents() {
            // let arr1 = this.roomWorkshopEvents
            // let arr2 = this.bookings.filter(item => item.bookRoom == true)

            // return temp
            return 'hello'
        }

        // minDate () {
        //     return new Date()
        // },
        // maxDate () {
        //     return new Date().addDays(14)
        // },

        // closedDays() {
        //     return [
        //             new Date().subtractDays(2).format(),
        //             new Date().format(),
        //             new Date().addDays(2).format()
        //         ]
        // }

    },
    props: ['id'],
    methods: {
        ...mapActions(['getAllRooms', 'getRoomFromId', 'createBooking', 'getWorkshop', 'getWorkshopForRoom', 'getBookings', 'getBookingForRoom']),
        makeBooking(bookRoom) {
            if (this.date && this.startTime && this.endTime) {
                let details = {
                    bookRoom: bookRoom ? true : false,
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
                        this.successMsg = "Successfully booked for the date " + details.date + " from " + details.start + " to " + details.end
                        this.date = ''
                        this.startTime = ''
                        this.endTime = ''
                        this.purpose = ''
                    }
                })
            }
        }
    },
    created() {
        this.getAllRooms().then(() => {
            this.getRoomFromId(this.id).then(() => {
                this.getWorkshop().then(() => {
                    this.getWorkshopForRoom([this.workshop, this.roomId])
                })
                this.getBookings(this.id).then(() => {
                    this.getBookingForRoom([this.bookings, this.id])
                })
            })
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