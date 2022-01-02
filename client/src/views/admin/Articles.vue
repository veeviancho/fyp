<template>
<div class="admin-content">
    <div>
        <button class="button is-link mb-6" @click="viewCreate = true"><fa icon="plus"/> &nbsp;Post New Article</button>
        &nbsp;
        <CreateArticle v-show="viewCreate" @close="viewCreate = false"/>
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
        <th>Programme</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
        </thead>

        <tbody>

        <tr v-for="article in articles" :key="article._id">
        <td>{{ articles.indexOf(article) + 1 }}</td>
        <td>{{ article.title }}</td>
        <td><div class="desc">{{ article.content }}</div></td>
        <td>{{ article.tags.toString().replace(/,/g, ", ") }}</td>
        <td>{{ article.category }}</td>
        <td>{{ article.programme }}</td>
        <td><button class="button is-info">Edit</button></td>
        <td><button class="button is-danger">Delete</button></td>
        </tr>

        </tbody>
    </table>
</div>
</template>

<script>
import CreateArticle from './CreateArticle.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Table',
    data() {
        return {
            viewCreate: false
        }
    },
    components: {
        CreateArticle
    },
    computed: {
        ...mapGetters(['articles'])
    },
    methods: {
        ...mapActions(['getArticles'])
    },
    created() {
        this.getArticles()
    }
}
</script>

<style lang="scss" scoped>
.button {
    color: black;
}
</style>