<template>
<div class="admin-content">
    <div>
        <button class="button is-link mb-6" @click="this.createVisible = true"><fa icon="plus"/> &nbsp;Add New Room</button>
        <CreateRoom v-show="createVisible" @close="this.createVisible = false"/>
        &nbsp;
        <router-link :to="{ name: 'Home' }"><button class="button">Home</button></router-link>
    </div>
    <table class="table is-hoverable" v-if="rooms">
        <thead>
        <tr id="head">
        <th>No</th>
        <th>Title</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Manage</th>
        <th>Delete</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="room in rooms" :key="room._id">
        <td>{{ rooms.indexOf(room) + 1 }}</td>
        <td>{{ room.title }}</td>
        <td>{{ room.description }}</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button btn">Bookings</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import CreateRoom from './CreateRoom.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Admin Home',
    data() {
        return {
            createVisible: false,
        }
    },
    components: {
        CreateRoom
    },
    computed: {
        ...mapGetters(['rooms', 'roomStatus'])
    },
    methods: {
        ...mapActions(['getAllRooms'])
    },
    created() {
        this.getAllRooms()
    }
}
</script>

<style lang="scss" scoped>
.button {
    color: black;
}

.btn {
    color: white;
    background-color: #329AA0;
}
</style>