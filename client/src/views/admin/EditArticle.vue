<template>
<div class="modal is-active" v-if="articleItem">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="editArticle">

        <div class="field">
            <label class="label">Title &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[0]" @click="show[0]=true;">Edit</small>
                <small class="edit-btn" v-if="show[0]" @click="this.title=''; show[0]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[0]">{{ articleItem.title }}</p>
                <input class="input is-warning" type="text" placeholder="Article title" v-if="show[0]" v-model="title">
            </div>
        </div>

        <div class="field">
            <label class="label">Content &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[1]" @click="show[1]=true">Edit</small>
                <small class="edit-btn" v-if="show[1]" @click="this.content=''; show[1]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[1]">{{ articleItem.content }}</p>
                <textarea class="textarea is-warning" type="textarea" rows="12" placeholder="Article content" v-if="show[1]" v-model="content"></textarea>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Author &nbsp;&nbsp;
                        <small class="edit-btn" v-if="!show[2]" @click="show[2]=true">Edit</small>
                        <small class="edit-btn" v-if="show[2]" @click="this.author=''; show[2]=false">Cancel</small>
                    </label>
                    <div class="control">
                        <p v-if="!show[2]">{{ articleItem.author ? articleItem.author : "No author entered" }}</p>
                        <input class="input is-warning" type="text" placeholder="Author" v-if="show[2]" v-model="author">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Programme &nbsp;&nbsp;
                        <small class="edit-btn" v-if="!show[3]" @click="show[3]=true">Edit</small>
                        <small class="edit-btn" v-if="show[3]" @click="this.programme=''; show[3]=false">Cancel</small>
                    </label>
                    <div class="control">
                        <p v-if="!show[3]">{{ articleItem.programme ? articleItem.programme : "No programme entered" }}</p>
                        <div class="select is-fullwidth is-warning" v-if="show[3]">
                        <select v-model="programme">
                            <option>Communications Engineering</option>
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
                    <label class="label">Category &nbsp;&nbsp;
                        <small class="edit-btn" v-if="!show[4]" @click="show[4]=true">Edit</small>
                        <small class="edit-btn" v-if="show[4]" @click="this.category=''; show[4]=false">Cancel</small>
                    </label>
                    <div class="control">
                        <p v-if="!show[4]">{{ articleItem.category ? articleItem.category : "No category entered" }}</p>
                        <input class="input is-warning" type="text" placeholder="Category" v-if="show[4]" v-model="category">
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                    <label class="label">Tags &nbsp;&nbsp;
                        <small class="edit-btn" v-if="!show[5]" @click="show[5]=true">Edit</small>
                        <small class="edit-btn" v-if="show[5]" @click="this.tags=''; show[5]=false">Cancel</small>
                    </label>
                    <div class="control">
                        <p v-if="!show[5]">{{ articleItem.tags[0] == '' ? "No tag entered" : articleItem.tags.toString().replace(/,/g, " ") }}</p>
                        <input class="input is-warning" type="text" placeholder="tag1 tag2 tag3..." v-if="show[5]" v-model="tags">
                    </div>
                </div>
            </div>
        </div>

        <div class="columns">
        <div class="column">
        <div class="field">
            <label class="label">Featured Article &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[6]" @click="show[6]=true;">Edit</small>
                <small class="edit-btn" v-if="show[6]" @click="this.featured=''; show[6]=false">Cancel</small>
            </label>
            <p v-if="!show[6]">{{ featuredArticle }}</p>
            <div class="control" v-if="show[6]">
                <input class="radio is-warning" type="radio" v-model="featured" value=true> Yes
                <input class="radio is-warning" type="radio" v-if="show[6]" v-model="featured" value=false> No
            </div>
        </div> 
        </div>
        <div class="column">
        <div class="field">
            <label class="label">Views</label>
            <div class="control">
                <p>{{ articleItem.views }}</p>
            </div>
        </div>
        </div>
        </div>
    
        <!-- update message -->
        <p class="has-text-danger has-text-centered mb-3" v-if="articleError.update">{{ articleError.update }}</p>
        <!-- <p class="has-text-success has-text-centered mb-3 white" v-if="success_msg">{{ success_msg }}</p> -->

        <button type="submit" class="button is-outlined is-fullwidth" v-if="showBtn()">
            Update
        </button>

    </form>

  </div>
  <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            title: this.title,
            content: this.content,
            author: this.author,
            programme: this.programme,
            category: this.category,
            tags: this.tags,
            featured: this.featured,
            show: [false, false, false, false, false, false, false]
        }
    },
    props: ['articleItem'],
    computed: {
        ...mapGetters(['articleStatus', 'articleError']),
        featuredArticle() {
            if (this.articleItem.featured == true) {
                return "Yes"
            } else {
                return "No"
            }
        }
    },
    methods: {
        ...mapActions(['updateArticle']),
        close() {
            for (let i=0; i<this.show.length; i++) {
                this.show[i] = false
            }
            this.$emit('close')
        },
        showBtn() {
            return this.show.some(item => item == true)
        },
        editArticle() {
            let article = {
                id: this.articleItem._id,
                title: this.title,
                content: this.content,
                author: this.author,
                programme: this.programme,
                category: this.category,
                tags: this.tags != undefined ? this.tags.split(" ") : this.tags,
                featured: this.featured,
            }
            console.log(article.featured)

            // Update featured article (change all to false)
            if (article.featured == 'true') {
                try {
                    axios.put('http://localhost:5000/api/articles/updateFeatured')
                }
                catch (err) {
                    console.log(err)
                }
            }

            // Update the article
            this.updateArticle(article).then(() => {
                if (this.articleStatus.update === "success") {
                    window.location.reload()
                }
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

.edit-btn {
    color: #329AA0;
    font-weight: normal;
    cursor: pointer;
    text-decoration: underline;
}

.edit-btn:hover {
    color: #184f52;
    /* font-weight: bold; */
    text-decoration: none;
}

.button {
    color: black;
}
</style>
