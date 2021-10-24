<template>
<div class="has-navbar-fixed-top">
    <div>
        <button class="button is-link mb-6"><fa icon="plus"/> &nbsp;Add</button>
        &nbsp;
        <router-link :to="{ name: 'Workshops' }"><button class="button mb-6">Workshops</button></router-link>
    </div>
    <table class="table is-hoverable">
        <thead>
        <tr id="head">
        <th>No</th>
        <th>Title</th>
        <th>Description</th>
        <th>Date</th>
        <th>Time</th>
        <th>Venue</th>
        <th>Organiser</th>
        <th>Programme</th>
        <th>Category</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
        </thead>

        <tbody>

        <tr>
        <td>1</td>
        <td>Workshop #1</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</td>
        <td>12.03.2022</td>
        <td>11:00am-12:00pm</td>
        <td>Space #1</td>
        <td>School of EEE</td>
        <td>All</td>
        <td>Education</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>2</td>
        <td>Workshop #2</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</td>
        <td>12.03.2022</td>
        <td>11:00am-12:00pm</td>
        <td>Space #1</td>
        <td>School of EEE</td>
        <td>All</td>
        <td>Education</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>3</td>
        <td>Workshop #3</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</td>
        <td>12.03.2022</td>
        <td>11:00am-12:00pm</td>
        <td>Space #1</td>
        <td>School of EEE</td>
        <td>All</td>
        <td>Education</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>4</td>
        <td>Workshop #4</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</td>
        <td>12.03.2022</td>
        <td>11:00am-12:00pm</td>
        <td>Space #1</td>
        <td>School of EEE</td>
        <td>All</td>
        <td>Education</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>5</td>
        <td>Workshop #5</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</td>
        <td>12.03.2022</td>
        <td>11:00am-12:00pm</td>
        <td>Space #1</td>
        <td>School of EEE</td>
        <td>All</td>
        <td>Education</td>
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