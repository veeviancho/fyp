<template>
<div class="admin-content">
    <div>
        <router-link :to="{ name: 'About' }"><button class="button mb-6">About</button></router-link>
        <p class="has-text-danger mb-6" v-if="aboutError.update">{{ aboutError.update }}</p>
        <EditAbout :aboutItem="about" v-show="editVisible" @close="editVisible = false"/>
    </div>

    <!-- <p class="has-text-danger has-text-centered mb-3" v-if="aboutError.update">{{ aboutError.update }}</p> -->
    <table class="table is-hoverable">
        <thead>
        <tr id="head">
        <th>No</th>
        <th>Title</th>
        <th>Description</th>
        <th>Edit</th>
        </tr>
        </thead>

        <tbody>

        <tr>
        <td>1</td>
        <td>Description</td>
        <td>{{ about.description }}</td>
        <td>
            <button class="button is-info" @click="editVisible = true; this.about.number=1">Edit</button>
        </td>
        </tr>

        <tr>
        <td>2</td>
        <td>About</td>
        <td>{{ about.aboutDesc }}</td>
        <td>
            <button class="button is-info" @click="editVisible = true; this.about.number=2">Edit</button>
        </td>
        </tr>

        <tr>
        <td>3</td>
        <td>Opening Hours</td>
        <td>
            <p v-for="(value, key) in about.openingHours" :key="key">
                <b>{{ key }}</b>: {{ value }}
            </p>
        </td>
        <td>
            <button class="button is-info" @click="editVisible = true; this.about.number=3">Edit</button>
        </td>
        </tr>

        <tr>
        <td>4</td>
        <td>Address</td>
        <td>{{ about.address }}</td>
        <td>
            <button class="button is-info" @click="editVisible = true; this.about.number=4">Edit</button>
        </td>
        </tr>

        <tr>
        <td>5</td>
        <td>How to get here?</td>
        <td>
            <p v-for="(value, key) in about.getHere" :key="key">
                <b>{{ key }}</b>: {{ value }}
            </p>
        </td>
        <td>
            <button class="button is-info" @click="editVisible = true; this.about.number=5">Edit</button>
        </td>
        </tr>

        </tbody>
    </table>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditAbout from './EditAbout.vue'

export default {
    data() {
        return {
            editVisible: false,
        }
    },
    components: {
        EditAbout
    },
    computed: {
        ...mapGetters(['about', 'aboutError'])
    },
    methods: {
        ...mapActions(['getAbout'])
    },
    created() {
        this.getAbout()
    }
}
</script>

<style lang="scss" scoped>
.button {
    color: black;
}

.button:hover {
    background-color: rgb(238, 237, 237);
    color: black;
}

.is-danger {
    color: white;
}

.is-danger {
    color: white;
}

table {
    width: 100%;
    // table-layout: fixed;
}
</style>