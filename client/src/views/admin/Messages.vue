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
            <td><button class="button">View</button></td>
            <td><button class="button is-danger">Delete</button></td>
        </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
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
</style>
