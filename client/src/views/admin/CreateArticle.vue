<template>
<div class="modal is-active">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="create">
  
        <div class="field">
            <label class="label">Title*</label>
            <div class="control"><input class="input is-warning" placeholder="Article Title" type="text" v-model="title" required></div>
        </div>

        <div class="field">
            <label class="label">Content*</label>
            <div class="control">
                <textarea class="textarea is-warning" type="textarea" rows="10" placeholder="Article Content" v-model="content" required></textarea>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Author</label>
                    <div class="control">
                        <input class="input is-warning" type="text" placeholder="Article author" v-model="author">
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label class="label">Programme</label>
                    <div class="control">
                        <div class="select is-fullwidth is-warning">
                        <select name="programme" v-model="programme">
                            <option selected>Communications Engineering</option>
                            <option>Computer Control & Automation</option>
                            <option>Electronics</option>
                            <option>Power Engineering</option>
                            <option>Signal Processing</option>
                            <option>Green Electronics</option>
                            <option>Integrated Circuit Design</option>
                        </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Category</label>
                    <div class="control">
                        <input class="input is-warning" type="text" placeholder="Enter a category" v-model="category">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Tags</label>
                    <div class="control">
                        <input class="input is-warning" type="text" placeholder="tag1 tag2 tag3..." v-model="tags">
                    </div>
                </div>
            </div>
        </div>

        <!-- Error message -->
        <p class="has-text-danger has-text-centered mb-3" v-if="articleError.create">{{ articleError.create }}</p>

        <button type="submit" class="button is-outlined is-fullwidth">
            Post Article
        </button>

    </form>

  </div>
  <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            title: '',
            content: '',
            author: '',
            programme: '',
            category: '',
            tags: '',
            featured: ''
        }
    },
    computed: {
        ...mapGetters(['articleStatus', 'articleError'])
    },
    methods: {
        ...mapActions(['postArticle']),
        close() {
            this.$emit('close')
        },
        create() {
            let article = {
                title: this.title,
                content: this.content,
                author: this.author,
                programme: this.programme,
                category: this.category,
                tags: this.tags.split(' '),
                featured: this.featured
            }
            this.postArticle(article)
                .then(() => {
                    if (this.articleStatus.create == "success") {
                        window.location.reload()
                        console.log("success")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>
.box {
    padding: 2rem 3rem;
}

.modal-content {
    min-width: 55vw;
}

.button {
    color: black;
}

.button:hover {
    color: white
}
</style>