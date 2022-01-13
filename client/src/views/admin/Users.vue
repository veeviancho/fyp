<template>
<div class="admin-content">

    <div>
        <button class="button is-link mb-6" @click="openCreate()">
            <fa icon="plus"/> &nbsp;Add New User
        </button>
        <CreateUser v-show="createVisible" @close="closeCreate()"/>   
    </div>
    
    <table class="table is-hoverable" v-if="usersList">

        <colgroup>
            <col span="1" style="width: 4%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 21%;">

            <col span="1" style="width: 8%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 12%;">
        </colgroup>

        <thead>
        <tr>
            <th>No</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>

            <th>Edit</th>
            <th>Manage</th>
            <th>Remove</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user._id">
            <td>{{ users.indexOf(user) + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>@{{ user.username }}</td>
            <td>{{ user.email }}</td>

            <td>
                <button class="button is-info" @click="editUser(user)">Edit</button>
                <EditUser :userItem="modalData" v-show="editVisible && modalData == user" @close="closeEdit()"/>
            </td>

            <td>
                <button class="button green">Bookings</button>
            </td>
            <td>
                <button class="button is-danger" @click="removeUser(user)">Remove</button>
            </td>
        </tr>
        </tbody>
    </table>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditUser from './EditUser.vue'
import CreateUser from './CreateUser.vue'

export default {
    data() {
        return {
            createVisible: false,
            editVisible: false,
            modalData: {}
        }
    },
    components: {
        CreateUser,
        EditUser
    },
    computed: {
        ...mapGetters(['usersList']),
        users: function() {
            return this.usersList.filter(user => !user.isAdmin)
        }
    },
    methods: {
        ...mapActions(['getAllUsers', 'deleteUser']),
        openCreate() {
            this.createVisible = true
        },
        closeCreate() {
            this.createVisible = false
        },
        editUser(data) {
            this.modalData = data
            this.editVisible = true
        },
        closeEdit() {
            this.editVisible = false
        },
        removeUser(user) {
            console.log(user)
            let confirmRemove = confirm('Are you sure you want to remove the user "' + user.username + '"?')
            if (confirmRemove) {
                this.deleteUser(user._id)
                .then(res => {
                    if (res.data.success) {
                        window.location.reload();
                    }
                })
                .catch(err => {
                    console.log(err)
                })

            }
        }
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

.green {
    background-color: #329AA0;
}
</style>