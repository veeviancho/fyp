<template>
<div class="admin-content">
    <div>
        <router-link :to="{ name: 'About' }"><button class="button mb-6">About</button></router-link>
    </div>
    <table class="table is-hoverable">
        <thead>
        <tr id="head">
        <th>No</th>
        <th>Title</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
        </thead>

        <tbody>

        <tr>
        <td>1</td>
        <td>Description</td>
        <td>{{ about.description }}</td>
        <td><button class="button">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>2</td>
        <td>About</td>
        <td>{{ about.aboutDesc }}</td>
        <td><button class="button">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>3</td>
        <td>Opening Hours</td>
        <td>
            <p v-for="(value, key) in about.openingHours" :key="key">
                <b>{{ key }}</b>: {{ value }}
            </p>
        </td>
        <td><button class="button">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>4</td>
        <td>Address</td>
        <td>{{ about.address }}</td>
        <td><button class="button">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>5</td>
        <td>How to get here?</td>
        <td>
            <p v-for="(value, key) in about.getHere" :key="key">
                <b>{{ key }}</b>: {{ value }}
            </p>
        </td>
        <td><button class="button">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        </tbody>
    </table>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Table',
    computed: {
        ...mapGetters(['about'])
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
.icon {
    color: red;
    height: 25px;
    width: 100%;
    vertical-align: middle;
    text-align: center;
}

.icon:hover {
    height: 30px;
    cursor: pointer;
}

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