<template>
<body>
<div class="hero is-fullheight">
    <section class="section is-small">
        <form class="field has-navbar-fixed-top" @submit.prevent="showResults()">
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
            <button class="button ml-5 mb-2" type="submit">Show Results</button>
            <button class="button ml-5 mb-2">Show Current</button>
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
                            <span class="tag is-primary is-light">10 / {{ item.maxUsers }} available</span>
                            <!-- <span class="tag is-danger is-light">10 / 20</span>
                            <span class="tag is-yellow">10 / 20</span> -->
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

export default {
    name: 'Room',
    data() {
        return {
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
        ...mapGetters(['rooms'])
    },
    methods: {
        ...mapActions(['getAllRooms', 'getBookings']),
        getToday() {
            let temp = new Date()
      
            let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

            this.filterBy.startTime = temp.format('HH:00');
            let endTime = temp.format('HH:00');
            endTime = String(Number(endTime.slice(0,2)) + 1).padStart(2,'0') + endTime.slice(2,5)
            if (endTime == '24:00') {
                endTime = '00:00'
            }
            this.filterBy.endTime = endTime;
            this.filterBy.date = temp.format('YYYY-MM-DD');

            this.results.date = temp.format('DD-MM-YYYY') + ' ' + dayArr[temp.getDay()]
            this.results.startTime = temp.format('HH:00')
            this.results.endTime = endTime;
        },
        showResults() {
            localStorage.setItem('date', this.filterBy.date);
            localStorage.setItem('startTime', this.filterBy.startTime);
            localStorage.setItem('endTime', this.filterBy.endTime);
        }
    },
    created() {
        this.getAllRooms();
        this.getToday();
        this.showResults();
        this.getBookings();
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