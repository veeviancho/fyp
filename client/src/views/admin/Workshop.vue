<template>
<div class="has-navbar-fixed-top">
    <div>
        <button class="button is-link mb-6" @click="openCreate()">
            <fa icon="plus"/> &nbsp;Add New Workshop
        </button>

        <CreateWorkshop v-show="createVisible" @close="closeCreate"/>

        &nbsp;

        <router-link :to="{ name: 'Workshops' }">
            <button class="button mb-6">View Workshops Page</button>
        </router-link>
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

            <td><button class="button is-info" @click="openEdit(item)">Edit</button></td>
            <EditWorkshop :workshopItem="modalData" v-show="editVisible && modalData == item" @close="closeEdit"/>

            <td><button class="button is-danger">Delete</button></td>
        </tr>

        </tbody>
    </table>

</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EditWorkshop from './EditWorkshop.vue'
import CreateWorkshop from './CreateWorkshop.vue'

export default {
    name: 'Table',
    data() {
        return {
            editVisible: false,
            modalData: null,
            createVisible: false
        }
    },
    components: {
        EditWorkshop,
        CreateWorkshop
    },
    computed: {
        ...mapGetters(['workshop'])
    },
    methods: {
        ...mapActions(['getWorkshop']),
        openEdit(item) {
            this.modalData = item;
            this.editVisible = true;
        },
        closeEdit() {
            this.editVisible = false;
        },
        openCreate() {
            this.createVisible = true;
        },
        closeCreate() {
            this.createVisible = false;
        }
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

.has-navbar-fixed-top, .button {
    font-size: 1.1vw;
}
</style>