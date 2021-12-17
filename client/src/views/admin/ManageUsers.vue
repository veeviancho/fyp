<template>
<div class="admin-content">

    <div>
        <button class="button is-link mb-6">
            <fa icon="plus"/> &nbsp;Add New User
        </button>
        <!-- <CreateWorkshop v-show="createVisible" @close="closeCreate"/> -->   
    </div>
    
    <table class="table is-hoverable" v-if="usersList">

        <colgroup>
            <col span="1" style="width: 4%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 21%;">
            <col span="1" style="width: 17%;">
            <col span="1" style="width: 17%;">

            <col span="1" style="width: 8%;">
            <col span="1" style="width: 12%;">
        </colgroup>

        <thead>
        <tr>
            <th>No</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Bookings</th>
            <th>Workshops</th>

            <th>Edit</th>
            <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user._id">
            <td>{{ users.indexOf(user) + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>@{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>bookings</td>
            <td>{{ user.workshops }}</td>
            <td>
                <button class="button is-info" @click="editUser(user._id)">Edit</button>
            </td>
            <td>
                <button class="button is-danger" @click="removeUser(user._id)">Remove</button>
            </td>
        </tr>
        </tbody>
    </table>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters(['usersList']),
        users: function() {
            return this.usersList.filter(user => !user.isAdmin)
        }
    },
    methods: {
        ...mapActions(['getAllUsers'])
    },
    created() {
        this.getAllUsers();
    }
}

</script>

<style scoped>
table {
    width: 100%; 
    table-layout: fixed;
}
</style>