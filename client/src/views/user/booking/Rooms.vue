<template>
<body>
<div class="hero is-fullheight">
    <section class="section is-small">
        <form class="field has-navbar-fixed-top" @submit.prevent="showResults()">
            <div class="columns">
                <div class="column mx-5">
                    <label class="has-text-white py-1">DATE</label>
                    <input class="input" type="date" :min=today placeholder="Find Workshops" v-model="filterBy.date">
                </div>
                <div class="column mx-5">
                    <div class="columns">
                        <div class="column">
                            <label class="has-text-white py-1">START TIME</label>
                            <input class="input" type="time" v-model="filterBy.startTime">
                        </div>
                        <div class="column">
                            <label class="has-text-white py-1">END TIME</label>
                            <input class="input" type="time" v-model="filterBy.endTime">
                        </div>
                    </div>
                </div>
            </div>
            <button class="button ml-5 mb-2" type="submit">Show Results</button>
            <button class="button ml-5 mb-2" @click="showCurrent()">Show Current</button>
        </form>
    </section>

    <div style="margin: 3rem auto; max-width: 92%;">
        <h1 class="has-text-white">
            SHOWING RESULTS FOR: 
            <b>
                <span class="ml-3">{{ results.date }}</span>
                <span class="ml-3">{{ results.startTime }}<span v-if="results.endTime">-{{ results.endTime }}</span></span>
            </b>
        </h1>

        <div class="columns is-multiline my-5">

            <div class="column is-one-quarter" v-for="item in rooms" :key="item._id">
                <router-link :to="'/rooms/' + item._id">
                <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                    <img :src="item.imageLink" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="subtitle has-text-weight-bold">
                            {{ item.title }} 
                            <span class="tag is-danger is-light" v-if="!item.bookRoom && item.bookWorkshop">Booked for workshop</span>
                            <span class="tag is-danger is-light" v-if="item.bookRoom || item.count === item.maxUsers">Fully booked</span>
                            <span class="tag is-primary is-light" v-if="!(item.bookRoom || item.count === item.maxUsers || item.bookWorkshop)">{{ item.count ? item.maxUsers - item.count : item.maxUsers }} / {{ item.maxUsers }} available</span>
                            <!-- <span class="tag is-yellow">10 / 20</span> -->
                        </p>
                        <p class="desc">{{ item.description }}</p>
                    </div>
                </div>
                </div>
                </router-link>
            </div>
        </div>
    </div>
</div>
</body>
</template>

<script>
import { mapGetters, mapActions } from  'vuex'
import Moment from 'moment';
import { extendMoment } from 'moment-range';

export default {
    name: 'Room',
    data() {
        return {
            today: '',
            filterBy: {
                date: '',
                startTime: '',
                endTime: ''
            },
            results: {
                date: '',
                startTime: '',
                endTime: ''
            }
        }
    },
    computed: {
        ...mapGetters(['rooms', 'allBookings', 'workshop']),
    },
    methods: {
        ...mapActions(['getAllRooms', 'getAllBookings', 'getWorkshop']),
        getToday() {
            let temp = new Date()
      
            let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

            let startTime = temp.format('HH:00');
            startTime = String(Number(startTime.slice(0,2))).padStart(2,'0') + startTime.slice(2,5)
            if (startTime == '24:00') {
                startTime = '00:00'
            }

            let endTime = temp.format('HH:00');
            endTime = String(Number(endTime.slice(0,2)) + 1).padStart(2,'0') + endTime.slice(2,5)
            if (endTime == '24:00') {
                endTime = '00:00'
            }

            this.today = temp.format('YYYY-MM-DD');

            this.filterBy.date = temp.format('YYYY-MM-DD');
            this.filterBy.startTime = startTime;
            this.filterBy.endTime = endTime;

            this.results.date = temp.format('DD-MM-YYYY') + ' ' + dayArr[temp.getDay()]
            this.results.startTime = startTime;
            this.results.endTime = endTime;
        },
        showCurrent() {
            this.getToday()
            this.showResults()
        },
        showResults() {
            this.results.date = this.filterBy.date
            this.results.startTime = this.filterBy.startTime
            this.results.endTime = this.filterBy.endTime

            const moment = extendMoment(Moment);

            localStorage.setItem('date', this.filterBy.date);
            localStorage.setItem('startTime', this.filterBy.startTime);
            localStorage.setItem('endTime', this.filterBy.endTime);

            let bookings = this.allBookings

            bookings = bookings.filter(item => {
                // Get bookings that clash with the timing entered
                let date1 = item.date + "T" + item.start + "+00:00" + "/" + item.date + "T" + item.end + "+00:00"
                let range1  = moment.range(date1);
                let date2 = this.filterBy.date + "T" + this.filterBy.startTime + "+00:00" + "/" + this.filterBy.date + "T" + this.filterBy.endTime + "+00:00" 
                let range2 = moment.range(date2);
                return range1.overlaps(range2)
            })

            let workshops = this.workshop
            workshops = workshops.filter(item => {
                // Get bookings that clash with the timing entered
                let date1 = item.date + "T" + item.startTime + "+00:00" + "/" + item.date + "T" + item.endTime + "+00:00"
                let range1  = moment.range(date1);
                let date2 = this.filterBy.date + "T" + this.filterBy.startTime + "+00:00" + "/" + this.filterBy.date + "T" + this.filterBy.endTime + "+00:00" 
                let range2 = moment.range(date2);
                return range1.overlaps(range2)
            })
            
            this.rooms.forEach(item => {
                // Room becomes unavailable if whole room is occupied (for room booking / workshop booking)
                let temp1 = bookings.filter(booking => {
                    return booking.roomId === item._id && booking.bookRoom
                })
                // console.log(temp1)
                if (temp1.length >= 1) {
                    item.bookRoom = true
                } else {
                    item.bookRoom = false
                }

                let temp2 = workshops.filter(workshop => workshop.venue === item.title)
                if (temp2.length >= 1) {
                    item.bookWorkshop = true
                } else {
                    item.bookWorkshop = false
                }

                // Count no of seat bookings for each room
                let temp3 = bookings.filter(booking => booking.roomId === item._id && !booking.bookRoom)
                // Add count to each item in rooms
                item.count = temp3.length

                // console.log(item)
            })
        }
    },
    created() {
        this.getAllRooms();
        this.getToday();
        this.getWorkshop().then(() => {
            this.getAllBookings().then(() => {
                this.showResults();
            })
        })
    }
}
</script>





<style lang="scss" scoped>
.is-yellow {
    color: hsl(36, 100%, 26%);
    background-color: hsl(48, 100%, 90%);
}

.card-content {
    min-height: 21vh;
}

.section {
    background-color: #161C20;
}

@media (max-width: 600px) {
    .results {
        font-size: 1rem;
    }
}
</style>