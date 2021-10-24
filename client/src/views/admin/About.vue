<template>
<div class="has-navbar-fixed-top">
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
        <td>About</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>2</td>
        <td>Opening Hours</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>3</td>
        <td>Address</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>4</td>
        <td>How to Get Here?</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        </tbody>
    </table>
</div>
</template>

<script>
export default {
    name: 'Table'
}
</script>

<style lang="scss" scoped>
</style>