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
                            <!-- <span>Available seats: <b>{{ takenSeats ? roomId.maxUsers - takenSeats : roomId.maxUsers }}/ {{ roomId.maxUsers }}</b></span> -->
                            {{ status }}
                        </div>

                        <!-- <span class="tag is-danger is-light" v-if="!item.bookRoom && item.bookWorkshop">Booked for workshop</span>
                            <span class="tag is-danger is-light" v-if="item.bookRoom || item.count === item.maxUsers">Fully booked</span>
                            <span class="tag is-primary is-light" v-if="!(item.bookRoom || item.count === item.maxUsers || item.bookWorkshop)">{{ item.count ? item.maxUsers - item.count : item.maxUsers }} / {{ item.maxUsers }} available</span> -->
                    



                        {{ results }}
                    </div>
                </section>
            </div>
            <hr>

            <form class="field" @submit.prevent>
            <div class="columns">
                <div class="column mx-5">
                    <label class="has-text-white py-1">DATE</label>
                    <input class="input" type="date" placeholder="Find Workshops" v-model="date" required @change="getSeatData()">
                </div>
                <div class="column mx-5">
                    <div class="columns">
                        <div class="column">
                            <label class="has-text-white py-1">START TIME</label>
                            <input class="input" type="time" v-model="startTime" required @change="getSeatData()">
                        </div>
                        <div class="column">
                            <label class="has-text-white py-1">END TIME</label>
                            <input class="input" type="time" v-model="endTime" required @change="getSeatData()">
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column mx-5">
                    <label class="has-text-white py-1">PURPOSE</label>
                    <input class="input" type="text" placeholder="State purpose of visit (if any)" v-model="purpose">
                    <p class="has-text-success white" v-if="successMsg">{{ successMsg }}</p>
                    <p class="has-text-danger white" v-if="bookingError.create">{{ bookingError.create }}</p>
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
                :time-from="8 * 60"
            />

            <!-- <vue-cal
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
import Moment from 'moment';
import { extendMoment } from 'moment-range';

export default {
    data() {
        return {
            successMsg: '',
            viewImage: false,
            date: localStorage.getItem('date'),
            startTime: localStorage.getItem('startTime'),
            endTime: localStorage.getItem('endTime'),
            purpose: '',
            status: ''
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
        // takenSeats() {
        //     
        //     let bookings = this.bookings.filter(item => {
        //         // Get bookings that clash with the timing entered
        //         let date1 = item.date + "T" + item.start + "+00:00" + "/" + item.date + "T" + item.end + "+00:00"
        //         let range1  = moment.range(date1);
        //         let date2 = this.date + "T" + this.startTime + "+00:00" + "/" + this.date + "T" + this.endTime + "+00:00" 
        //         let range2 = moment.range(date2);
        //         return range1.overlaps(range2)
        //     })

        //     let temp = bookings.filter(booking => booking.roomId === this.id && !booking.bookRoom)
        //     // Add count to each item in rooms
        //     return temp.length
        // }
    },
    props: ['id'],
    methods: {
        ...mapActions(['getAllRooms', 'getRoomFromId', 'createBooking', 'getWorkshop', 'getWorkshopForRoom', 'getBookings', 'getBookingForRoom']),
        getSeatData() {
            const moment = extendMoment(Moment);

            let bookings = this.bookings
            let workshops = this.workshop
            let room = this.roomId

            // Get bookings that clash with the timing entered
            bookings = bookings.filter(item => {
                let date1 = item.date + "T" + item.start + "+00:00" + "/" + item.date + "T" + item.end + "+00:00"
                let range1  = moment.range(date1);
                let date2 = this.date + "T" + this.startTime + "+00:00" + "/" + this.date + "T" + this.endTime + "+00:00" 
                let range2 = moment.range(date2);
                return range1.overlaps(range2)
            })

            // Get workshops that clash with the timing entered
            workshops = workshops.filter(item => {
                let date1 = item.date + "T" + item.startTime + "+00:00" + "/" + item.date + "T" + item.endTime + "+00:00"
                let range1  = moment.range(date1);
                let date2 = this.date + "T" + this.startTime + "+00:00" + "/" + this.date + "T" + this.endTime + "+00:00" 
                let range2 = moment.range(date2);
                return range1.overlaps(range2)
            })

            let fullRoom = bookings.filter(booking => booking.bookRoom === true)
            let seatsRoom = bookings.filter(booking => booking.bookRoom === false)

            // Full Room Booking
            if (fullRoom.length > 0) {
                this.status = 'Room is fully booked'
            }

            // Workshop Booking
            else if (workshops.length > 0) {
                this.status = 'Room is booked for Workshop'
            }

            // Reserved seats reached maximum
            else if (seatsRoom.length === room.maxUsers) {
                this.status = 'All seats are reserved'
            }

            else {
                let taken = seatsRoom.length ? room.maxUsers - seatsRoom.length : room.maxUsers
                this.status = 'Available seats: ' + taken + ' / ' + room.maxUsers
            } 


        },
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
                        this.purpose = ''
                        this.getBookings(this.id).then(() => {
                            this.getBookingForRoom([this.bookings, this.id])
                            this.getSeatData()
                        })
                    } else {
                        this.successMsg = ''
                        setTimeout(this.errorMsgDisplay, 5000)
                    }
                })
            }
        },
        errorMsgDisplay() {
            this.bookingError.create = ''
        }
    },
    created() {
        this.getAllRooms().then(() => {
            this.getRoomFromId(this.id).then(() => {
                this.getWorkshop().then(() => {
                    this.getWorkshopForRoom([this.workshop, this.roomId])
                    this.getBookings(this.id).then(() => {
                        this.getBookingForRoom([this.bookings, this.id])
                        this.getSeatData()
                    })
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