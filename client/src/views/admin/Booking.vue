<template>
<div class="admin-content">
    <router-link :to="{ name: 'Admin Home' }"><button class="button router">Back</button></router-link>
    &nbsp;
    <button class="button is-link mb-6" @click="this.createVisible = true"><fa icon="plus"/> &nbsp;Close the Room</button>
    <CreateBooking :id="id" v-show="createVisible" @close="this.createVisible = false"/>

    <h1 class="title">List of Bookings for
        <router-link :to="'/rooms/' + roomId._id">
            <span class="workshop">{{ roomId.title }}</span>
        </router-link>
    </h1>

    <p>Showing results for: &nbsp;<input class="mb-5 px-2 py-1" type="date" v-model="dateValue"></p>
    
    <table class="table is-hoverable">
    <thead>
        <tr id="head">
            <th>No</th>
            <th>User</th>
            <th>Start</th>
            <th>End</th>
            <th>Purpose</th>
            <th>Full Room Booking</th>
            <th>Remove</th>
        </tr>
    </thead>
    
    <tbody>
    <tr v-for="item in viewBookings" :key="item._id">
        <td>{{ viewBookings.indexOf(item) + 1 }}</td>
        <td>{{ item.userId ? "@" + item.username : "CLOSED" }}</td>
        <td>{{ item.start }}</td>
        <td>{{ item.end }}</td>
        <td>{{ item.purpose ? item.purpose : "NIL" }}</td>
        <td>{{ item.bookRoom ? "Yes" : "No" }}</td>
        <td>
            <button class="button is-danger" @click="deleteBooking(item._id)">Remove</button>
        </td>
    </tr>
    </tbody>

    </table>
</div>
</template>

<script>
import CreateBooking from './CreateBooking.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            dateValue: '',
            createVisible: false,
        }
    },
    props: ['id'],
    components: {
        CreateBooking
    },
    computed: {
        ...mapGetters(['bookings', 'roomId', 'usersList']),
        viewBookings() {
            let temp = this.bookings
        
            temp = temp.filter(item => {
                return item.date == this.dateValue
            })
       
            return temp
        }
    },
    methods: {
        ...mapActions(['getBookings', 'getAllUsers', 'getAllRooms', 'getRoomFromId', 'removeBooking']),
        getToday() {
            let temp = new Date()
            // let month = String(parseInt(temp.getMonth()) + 1).padStart(2, "0")
            this.dateValue = temp.format('YYYY-MM-DD');
            // this.dateValue = temp.getFullYear() + '-' + month + '-' + temp.getDate()
        },
        getUsername() {
            let temp = this.bookings
            let users = this.usersList
            temp.forEach(item => {
                if (item.userId) {
                    // console.log(temp)
                    let user = users.find(element => {
                        return element._id === item.userId
                    })
                    if (user.username) {
                        item.username = user.username
                    } else {
                        item.username = "user"
                    }
                    // console.log(item)
                }
            })
        },
        deleteBooking(id) {
            let confirmDelete = confirm("Are you sure you want to delete the booking?")
            if (confirmDelete) {
                this.removeBooking(id).then(res => {
                    if (res.data.success) {
                        this.getBookings(this.id)
                    }
                })
            }
            
        }
    },
    created() {
        this.getToday()
        this.getAllRooms().then(() => {
            this.getRoomFromId(this.id)
        })
        this.getBookings(this.id).then(() => {
            this.getAllUsers().then(() => {
                this.getUsername()
            })
        })
    }
}
</script>

<style scoped>
.router {
    color: black;
    margin-bottom: 2rem;
}

.table {
    width: 100%;
    margin: 2rem 0;
}

.workshop {
    color: #329AA0;
}

.workshop:hover {
    text-decoration: underline;
}

</style>
