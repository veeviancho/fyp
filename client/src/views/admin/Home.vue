<template>
<div class="has-navbar-fixed-top">
    <div>
        <button class="button is-link mb-6"><fa icon="plus"/> &nbsp;Add</button>
        &nbsp;
        <router-link :to="{ name: 'Home' }"><button class="button">Home</button></router-link>
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
        <td>Home</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>2</td>
        <td>Space #1</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>3</td>
        <td>Space #2</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>4</td>
        <td>Space #3</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>5</td>
        <td>Space #4</td>
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
    name: 'Admin Home'
}
</script>

<style lang="scss" scoped>
.button {
    color: black;
}
</style>