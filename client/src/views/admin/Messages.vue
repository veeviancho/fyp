<template>
<div class="admin-content">
    <table class="table is-hoverable">
        <thead>
        <tr id="head">
        <th>No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Message</th>
        <th>View</th>
        <th>Delete</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(value, key) in messages" :key="key" :class="[value.contact.seen ? 'read' : 'unread']">
            <td>{{ key + 1 }}</td>
            <td>{{ value.contact.name }}</td>
            <td>{{ value.contact.email }}</td>
            <td><div class="desc">{{ value.contact.message }}</div></td>
            <td>
                <button class="button" @click="viewModal=true; modalData=value; seenMsg(value._id)">View</button>
                <ViewMsg :contactItem="modalData" v-show="viewModal && modalData==value" @close="viewModal=false"/>
            </td>
            <td>
                <button class="button is-danger" @click="removeMsg(value._id)">Delete</button>
            </td>
        </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewMsg from './ViewMessage.vue'
import axios from 'axios'

export default {
    data() {
        return {
            viewModal: false,
            modalData: ''
        }
    },
    components: {
        ViewMsg
    },
    computed: {
        ...mapGetters(['messages'])
    },
    methods: {
        ...mapActions(['getContact', 'deleteMsg']),
        seenMsg(id) {
            let res = axios.put('http://localhost:5000/api/about/seenMsg/' + id)
            if (res.data.success) {
                this.getContact()
            }
        },
        async removeMsg(id) {
            let confirmDel = confirm("Are you sure you want to delete the message?")
            if (confirmDel) {
                try {
                    let res = await axios.delete('http://localhost:5000/api/about/delete/' + id)
                    if (res.data.success) {
                        alert("Message successfully deleted!")
                        this.getContact()
                    } else {
                        alert("Unable to delete message at the moment!")
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
    },
    created() {
        this.getContact()
    }
}
</script>

<style scoped>
.unread {
    color: black;
}

.read {
    color: gray;
    /* background-color: rgb(247, 247, 247); */
}

.button {
    color: black;
}

table {
    width: 100%;
}
</style>
