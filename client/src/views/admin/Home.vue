<template>
<div class="admin-content">
    <div>
        <button class="button is-link mb-6" @click="this.createVisible = true"><fa icon="plus"/> &nbsp;Add New Room</button>
        <CreateRoom v-show="createVisible" @close="this.createVisible = false"/>
        &nbsp;
        <router-link :to="{ name: 'Home' }"><button class="button">Home</button></router-link>
    </div>
    <table class="table is-hoverable">
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
        <tr>
        <td>1</td>
        <td>Room #1</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
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
import { mapGetters } from 'vuex'

export default {
    name: 'Admin Home',
    data() {
        return {
            createVisible: false,
        }
    },
    computed: {
        ...mapGetters(['roomStatus'])
    },
    components: {
        CreateRoom
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