<template>
<div class="has-navbar-fixed-top">
    <div>
        <button class="button is-link mb-6"><fa icon="plus"/> &nbsp;Add</button>
        &nbsp;
        <router-link :to="{ name: 'Articles' }"><button class="button mb-6">Articles</button></router-link>
    </div>
    <table class="table is-hoverable">
        <thead>
        <tr id="head">
        <th>No</th>
        <th>Title</th>
        <th>Content</th>
        <th>Tags</th>
        <th>Category</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
        </thead>

        <tbody>

        <tr>
        <td>1</td>
        <td>Article #1</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...</td>
        <td>Education, Skills</td>
        <td>Education</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>2</td>
        <td>Article #2</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.....</td>
        <td>Education, Skills</td>
        <td>Education</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>3</td>
        <td>Article #3</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.....</td>
        <td>Education, Skills</td>
        <td>Education</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>4</td>
        <td>Article #4</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.....</td>
        <td>Education, Skills</td>
        <td>Education</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        <tr>
        <td>5</td>
        <td>Article #5</td>
        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.....</td>
        <td>Education, Skills</td>
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