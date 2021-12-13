<template>
<div class="has-navbar-fixed-top">
    <div>
        <button class="button is-link mb-6"><fa icon="plus"/> &nbsp;Add</button>
        &nbsp;
        <router-link :to="{ name: 'Workshops' }"><button class="button mb-6">View Workshops Page</button></router-link>
    </div>
    <table class="table is-hoverable">

        <colgroup>
            <col span="1" style="width: 4%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 30%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 7%;">
            <col span="1" style="width: 10%;">
        </colgroup>

        <thead>
        <tr id="head">
        <th>No</th>
        <th>Title</th>
        <th>Description</th>
        <th>Date</th>
        <th>Time</th>
        <th>Venue</th>
        <!-- Organiser, programme, category -->
        <th>Edit</th>
        <th>Delete</th>
        </tr>
        </thead>

        <tbody>

        <tr v-for="item in workshop" :key="item.id">
        <td>{{ workshop.indexOf(item) + 1 }}</td>
        <td>{{ item.title }}</td>
        <td><div class="desc">{{ item.description }}</div></td>
        <td>{{ item.date }}</td>
        <td>{{ item.startTime }} - {{ item.endTime }}</td>
        <td>{{ item.venue }}</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        </tbody>
    </table>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Table',
    computed: {
        ...mapGetters(['workshop'])
    },
    methods: {
        ...mapActions(['getWorkshop'])
    },
    created() {
        this.getWorkshop()
    }
}
</script>

<style lang="scss" scoped>
table {
    width: 100%; 
    table-layout: fixed;
}

.desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* show 3 lines max */
            line-clamp: 3; 
    -webkit-box-orient: vertical;
}

.button {
    color: black;
}
</style>