<template>
<div class="admin-content" v-if="workshopItem">
    <router-link :to="{ name: 'Admin Workshop' }"><button class="button router">Back</button></router-link>

    <h1 class="title" @click="console()">List of Users registered for 
        <router-link :to="'/workshop/' + workshopItem._id">
            <span class="workshop">{{ workshopItem.title }}</span>
        </router-link>
    </h1>
    <p>Total number of participants: {{ users.length }}/{{ workshopItem.maxUsers }}</p>
    
    <table class="table is-hoverable">
    <thead>
        <tr id="head">
            <th>No</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email Address</th>
            <th>Programme</th>
            <!-- <th>Workshops registered</th> -->
            <th>Member since</th>

            <th>Remove</th>
        </tr>
    </thead>
    
    <tbody>
    <tr v-for="user in users" :key="user._id">
        <td>{{ users.indexOf(user) + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>@{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.programme }}</td>
        <!-- <td v-for="(workshop, index) in user.workshops" :key="index">
            {{ workshop }}
        </td> -->
        <td>{{ user.date.slice(0,10) }}</td>
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
    data() {
        return {
            users: []
        }
    },
    props: ['id'],
    computed: {
        ...mapGetters(['workshopItem', 'userById'])
    },
    methods: {
        ...mapActions(['getWorkshop', 'getWorkshopFromId', 'getAllUsers', 'getUserFromId', 'deregisterFromWorkshop']),
        removeUser(userId) {
            let confirmRemove = confirm("Remove user from workshop?")
            if (confirmRemove) {
                this.deregisterFromWorkshop([this.id, userId]).then(res => {
                    if (res.data.success) {
                        window.location.reload();
                    }
                })
            }
        }
    },
    created() {
        this.getAllUsers().then( () => {
            this.getWorkshop().then( () => {
                this.getWorkshopFromId(this.id)
                let workshopUsers = this.workshopItem.users
                for (let i=0; i<workshopUsers.length; i++) {
                    this.getUserFromId(workshopUsers[i])
                    this.users.push(this.userById)
                }
            })
        })

    }
}
</script>

<style scoped>
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

.router {
    color: black;
    margin-bottom: 2rem;
}
</style>

