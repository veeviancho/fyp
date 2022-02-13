<template>
<div class="admin-content">
    <router-link :to="{ name: 'Admin Home' }"><button class="button router">Back</button></router-link>
    &nbsp;
    <button class="button is-link mb-6" @click="this.createVisible = true"><fa icon="plus"/> &nbsp;Add New Booking</button>
    <CreateBooking :id="id" v-show="createVisible" @close="this.createVisible = false"/>

    <h1 class="title">List of Bookings for (Room)
        <!-- <router-link :to="'/rooms/' + workshopItem._id">
            <span class="workshop">kljlkf</span>
        </router-link> -->
    </h1>

    <p>Showing results for: &nbsp;<input class="mb-5 px-2 py-1" type="date" v-model="dateValue"></p>
    
    <table class="table is-hoverable">
    <thead>
        <tr id="head">
            <th>User</th>
            <th>Start</th>
            <th>End</th>
            <th>Purpose</th>
            <th>Edit</th>
            <th>Remove</th>
        </tr>
    </thead>
    
    <tbody>
    <!-- <tr v-for="user in users" :key="user._id">
        <td>{{ users.indexOf(user) + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>@{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.programme }}</td>
        <td>{{ user.date.slice(0,10) }}</td>
        <td>
            <button class="button is-danger" @click="removeUser(user._id)">Remove</button>
        </td>
    </tr> -->

    <tr>
        <td>???</td>
    </tr>
    </tbody>

    </table>
</div>
</template>

<script>
import CreateBooking from './CreateBooking.vue'

export default {
    data() {
        return {
            dateValue: '',
            createVisible: false,
        }
    },
    components: {
        CreateBooking
    },
    computed: {
    },
    methods: {
        getToday() {
            let temp = new Date()
            let month = String(parseInt(temp.getMonth()) + 1).padStart(2, "0")
            this.dateValue = temp.getFullYear() + '-' + month + '-' + temp.getDate()
        }
    },
    props: ['id'],
    created() {
        this.getToday()
    }
}
</script>

<style scoped>
.router {
    color: black;
    margin-bottom: 2rem;
}

/* .table {
    width: 100%;
    margin: 2rem 0;
}

.workshop {
    color: #329AA0;
}

.workshop:hover {
    text-decoration: underline;
}
*/
</style>
