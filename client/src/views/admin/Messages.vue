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
        <tr v-for="(value, key) in messages" :key="key">
            <td>{{ key + 1 }}</td>
            <td>{{ value.contact.name }}</td>
            <td>{{ value.contact.email }}</td>
            <td><div class="desc">{{ value.contact.message }}</div></td>
            <td>
                <button class="button" @click="viewModal=true; modalData=value">View</button>
                <ViewMsg :contactItem="modalData" v-show="viewModal && modalData==value" @close="viewModal=false"/>
            </td>
            <td><button class="button is-danger">Delete</button></td>
        </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewMsg from './ViewMessage.vue'

export default {
    data() {
        return {
            viewModal: false
        }
    },
    components: {
        ViewMsg
    },
    computed: {
        ...mapGetters(['messages'])
    },
    methods: {
        ...mapActions(['getContact'])
    },
    created() {
        this.getContact()
    }
}
</script>

<style scoped>
.button {
    color: black;
}

table {
    width: 100%;
}
</style>
