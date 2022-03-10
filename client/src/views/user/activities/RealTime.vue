<template>
<body>
    <div class="has-navbar-fixed-top px-6 hero is-fullheight">

    <div :class="[ (realTime == '' || todayRealTime == '') ? 'status' : '']">

    <div class="columns title has-text-white my-6">
        <div class="column">
            <span class="date">{{ todayDate }}</span>
            <span class="date">{{ todayDay }}</span>
        </div>

        <div class="column">
        <span class="date ml-6" v-if="hours">
            <span v-if="hours"><b>{{ hours }}</b></span> :
            <span v-if="minutes"><b>{{ minutes }}</b></span> :
            <span v-if="seconds"><b>{{ seconds }}</b></span>&nbsp;
            <span v-if="am_pm"><b>{{ am_pm }}</b></span>
        </span>
        </div>
    </div>

    <div class="my-6" v-if="realTime != ''">
    <p class="subtitle has-text-centered has-text-white"><i>Happening now</i></p>
    <div class="section">
    <table class="table is-hoverable">
        <thead>
            <th>No</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Registered</th>
        </thead>
        <tbody>
            <tr v-for="item in realTime" :key="item._id">
                <td>{{ realTime.indexOf(item) + 1 }}</td>
                <td>{{ item.startTime }} - {{ item.endTime }}</td>
                <td>{{ item.venue }}</td>
                <td><router-link :to="'/workshop/' + item._id ">{{ item.title }}</router-link></td>
                <td><div class="desc">{{ item.description }}</div></td>
                <td>{{ item.category }}</td>
                <td>{{ item.users.length }}/{{ item.maxUsers }}</td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>

    <div class="section my-6" v-else>
        <p class="subtitle has-text-white">There is no activity happening right now.</p>
    </div>

    <div class="my-6" v-if="todayRealTime != ''">
    <p class="subtitle has-text-white has-text-centered"><i>Today's Activities</i></p>
    <div class="section">
    <table class="table is-hoverable">
        <thead>
            <th>No</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Registered</th>
        </thead>
        <tbody>
            <tr v-for="item in todayRealTime" :key="item._id">
                <td>{{ todayRealTime.indexOf(item) + 1 }}</td>
                <td>{{ item.startTime }} - {{ item.endTime }}</td>
                <td>{{ item.venue }}</td>
                <td><router-link :to="'/workshop/' + item._id ">{{ item.title }}</router-link></td>
                <td><div class="desc">{{ item.description }}</div></td>
                <td>{{ item.category }}</td>
                <td>{{ item.users.length }}/{{ item.maxUsers }}</td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>

    <div class="section my-6" v-else>
        <p class="subtitle has-text-white">There is no activity happening today.</p>
    </div>

    </div>

    </div>
</body>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Table',
    data() {
        return {
            hours: '',
            minutes: '',
            seconds: '',
            am_pm: '',
            time: '',
            todayRealTime: '',
            realTime: ''
        }
    },
    computed: {
        ...mapGetters(['workshop']),
        todayDate() {
            let temp = new Date()
            let month = String(parseInt(temp.getMonth()) + 1).padStart(2, "0")
            let date = String(parseInt(temp.getDate())).padStart(2, "0")
            return date + '/' + month + '/' + temp.getFullYear()
        },
        todayDay() {
            let temp = new Date()
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            return days[temp.getDay()]
        }
    },
    methods: {
        ...mapActions(['getRealTime', 'getWorkshop']),
        getTiming() {
            let temp = new Date()

            let hours = Number(String(temp.toTimeString()).slice(0, 2))
            this.minutes = String(temp.toTimeString()).slice(3, 5)
            this.seconds = String(temp.toTimeString()).slice(6, 8)
            if (hours == 0) {
                this.hours = 12
                this.am_pm = "AM"
            } else if (hours == 12) {
                this.hours = hours
                this.am_pm = "PM"
            } else if (hours < 12) {
                this.hours = hours
                this.am_pm = "AM"
            } else {
                this.hours = hours - 12
                this.am_pm = "PM"
            }

            this.time = temp.getTime()
        },
        getTodayRealTime() {
            let today = new Date()
            let workshopsToday = this.workshop
          
            workshopsToday = workshopsToday.filter(item => {
                let dateWorkshop = Date.parse(item.date)
                let dateToday = Date.parse(today.getFullYear() + '-' + String(Number(today.getMonth())+1).padStart(2, '0') + '-' + String(Number(today.getDate())).padStart(2, '0'))
                return dateWorkshop == dateToday
            })
        
            workshopsToday = workshopsToday.sort( (a,b) => {
                return (Date.parse(String(a.date) + "T" + String(a.startTime) + ":00")) - (Date.parse(String(b.date) + "T" + String(b.startTime) + ":00"))
            })
            // console.log(workshopsToday)
            this.todayRealTime = workshopsToday
        },
        getRealTime() {
            let today = new Date()
            let workshopsNow = this.todayRealTime

            workshopsNow = workshopsNow.filter(item => {
                let timeNow = today.getTime()
                let start = Date.parse(String(item.date) + "T" + String(item.startTime) + ":00")
                let end = Date.parse(String(item.date) + "T" + String(item.endTime) + ":00")
                return start < timeNow && end > timeNow
            })
            
            this.realTime = workshopsNow
        }
    },
    created() {  
        this.getTiming();  
        setInterval(this.getTiming, 1000);
        this.getWorkshop().then(() => {
            this.getTodayRealTime()
            this.getRealTime()
        })
    }
}
</script>

<style lang="scss" scoped>
a {
    font-weight: bold;
    color: white;
}

a:hover {
    color: #329AA0;
    font-weight: bold;
}

.column {
    display: flex;
    justify-content: center;
}

table {
    width: 100%;
    background-color: transparent;
    color: white
}

th {
    color: white !important;
}

tr:hover {
    background-color: rgba(0,0,0,0.1) !important;
}

.date {
    padding: 1rem 1.5rem;
    margin-right: 2rem;
    border-left: 2px solid white;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    background-color: rgba(0,0,0,0.1)
}

.time {
    padding: 1rem 1.5rem;
    margin-right: 0.1rem;
    border-left: 2px solid white;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    background-color: rgba(0,0,0,0.1)
}

.title {
    font-weight: bold;
}

.section {
    background-color: #161C20;
    margin: 0 0 2rem 0;
}

// .status {
//     display: flex;
//     flex-flow: column wrap;
//     justify-content: flex-start;
// }

// .vacancy {
//     color: green;
// }

// .no-vacancy {
//     color: red;
// }
</style>