<template>
<body>
<div class="hero is-fullheight">
    <section class="section is-small">
        <form class="field has-navbar-fixed-top">
            <div class="columns">
                <div class="column mx-5">
                    <label class="has-text-white py-1">DATE</label>
                    <input class="input" type="date" placeholder="Find Workshops" v-model="filterBy.date">
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
            <button class="button ml-5 mb-2">Show Results</button>
            <button class="button ml-5 mb-2">Show Currently Available Rooms</button>
        </form>
    </section>

    <div style="margin: 3rem auto; max-width: 92%;">
        <h1 class="has-text-white">
            <span class="results">SHOWING RESULTS FOR:</span>
            <span class="subtitle has-text-white">
                <b class="results">{{ filterBy.date }} Tuesday</b>
                <b class="results">12:00PM - 1:00PM</b>
            </span>
        </h1>

        <div class="columns is-multiline my-5">

            <div class="column is-one-quarter" v-for="item in rooms" :key="item._id">
                <router-link :to="'/rooms/' + item._id">
                <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                    <img src="https://styledegree.sg/wp-content/uploads/2020/04/10-Ingenious-Yet-Functional-HDB-Study-Room-Designs-StyleMag.jpg" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="subtitle has-text-weight-bold">
                            {{ item.title }} 
                            <span class="tag is-primary is-light">Available</span>
                            <!-- <span class="tag is-danger is-light">Occupied</span> -->
                        </p>
                        <p class="desc">{{ item.description }}</p> 
                    </div>
                </div>
                </div>
                </router-link>
            </div>

        </div>

        <Timetable/>
    </div>
</div>
</body>
</template>

<script>
import Timetable from '@/components/student/booking/Timetable.vue'
import { mapGetters, mapActions } from  'vuex'

export default {
    name: 'Room',
    data() {
        return {
            filterBy: {
                date: '',
                startTime: '09:00',
                endTime: '10:00'
            }
        }
    },
    components: {
        Timetable
    },
    computed: {
        ...mapGetters(['rooms']),
        // dateNow() {
        //     const today = new Date()
        //     let dd = today.getDate()
        //     // let dd = String(today.getDate()).padStart(2, '0');
        //     let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        //     let yyyy = today.getFullYear();

        //     return mm + '/' + dd + '/' + yyyy;
        // },
        // timeNow() {
        //     const today = new Date()
        //     return today
        // }
    },
    methods: {
        ...mapActions(['getAllRooms']),
        getToday() {
            let temp = new Date()
            let month = String(parseInt(temp.getMonth()) + 1).padStart(2, "0")
            this.filterBy.date = temp.getFullYear() + '-' + month + '-' + temp.getDate()
        }
    },
    created() {
        this.getAllRooms();
        this.getToday();
    }
}
</script>

<style lang="scss" scoped>
.card-content {
    min-height: 21vh;
}

.section {
    background-color: #161C20;
}

.results {
    margin-right: 3vw;
}

@media (max-width: 600px) {
    .results {
        font-size: 1rem;
    }
}
</style>