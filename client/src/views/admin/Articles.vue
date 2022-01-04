<template>
<div class="admin-content">
    <div>
        <button class="button is-link mb-6" @click="viewCreate = true"><fa icon="plus"/> &nbsp;Post New Article</button>
        &nbsp;
        <CreateArticle v-show="viewCreate" @close="viewCreate = false"/>
        <router-link :to="{ name: 'Articles' }"><button class="button mb-6">Articles</button></router-link>
    </div>

    <p class="has-text-danger has-text-centered mb-3" v-if="articleError.remove">{{ articleError.remove }}</p>
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

        <tr v-for="article in articles" :key="article._id" :class="[article.featured==true ? 'has-text-info' : '']">
        <td>{{ articles.indexOf(article) + 1 }}</td>
        <td>{{ article.title }}</td>
        <td><div class="desc">{{ article.content }}</div></td>
        <td>{{ article.tags.toString().replace(/,/g, ", ") }}</td>
        <td>{{ article.category }}</td>
        <td>{{ article.programme }}</td>
        <td>
            <button class="button is-info" @click="editBtn(article)">Edit</button>
            <EditArticle v-show="viewEdit && this.modalData == article" :articleItem="article" @close="viewEdit = false"/>
        </td>
        <td>
            <button class="button is-danger" @click="deleteArticle(article)">Delete</button>
        </td>
        </tr>

        </tbody>
    </table>
</div>
</template>

<script>
import CreateArticle from './CreateArticle.vue'
import EditArticle from './EditArticle.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Table',
    data() {
        return {
            viewCreate: false,
            viewEdit: false,
            modalData: ''
        }
    },
    components: {
        CreateArticle,
        EditArticle
    },
    computed: {
        ...mapGetters(['articles', 'articleStatus', 'articleError'])
    },
    methods: {
        ...mapActions(['getArticles', 'removeArticle']),
        editBtn(item) {
            this.viewEdit = true
            this.modalData = item
        },
        deleteArticle(article) {
            let confirmDelete = confirm("Are you sure you want to delete the article " + article.title + "?")
            if (confirmDelete) {
                this.removeArticle(article._id)
                .then(() => {
                    if (this.articleStatus.remove === "success") {
                        window.location.reload()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
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

table {
    width: 100%; 
    table-layout: fixed;
}
</style>