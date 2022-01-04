<template>
<div class="hero is-fullheight">
    <section class="section is-medium" v-if="featuredArticle">
        <p class="has-text-grey-light mt-5">FEATURED ARTICLE</p>
        <h1>{{ featuredArticle.title }}</h1>
        <p class="has-text-grey-light" v-if="featuredArticle.author != ''">by <i>{{ featuredArticle.author }}</i></p>
        <p class="has-text-white desc">{{ featuredArticle.content }}</p>
        <br>
    <router-link :to="'/articles/' + featuredArticle._id" @click="updateViews(featuredArticle._id)"><button class="button">Read More</button></router-link>
    </section>

    <p v-else class="has-text-white has-navbar-fixed-top"><b>No article has been posted. Please come back later.</b></p>

    <div style="margin: 3rem auto; width: 92%;" v-if="articles.length != 0">
    <div class="columns">
        <div class="column">
            <div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Find Articles" v-model="searchInput">
                        <span class="icon is-small is-left"><fa icon="search"/></span>
                    </p>
                </div>
            </div>
        
            <div class="columns">
                <!-- Left -->
                <div class="column is-one-quarter" style="margin-top: 2em;">
                    <div class="notification">
                        <aside class="menu">
                        
                        <p class="menu-label">
                            Tags
                        </p>
                        <ul class="menu-list">
                            <li v-for="item in filteredTags" :key="item._id">
                                <input type="checkbox" :value="item" v-model="filterBy.tags">
                                <span class="check-name">{{ item }}</span>
                            </li>
                        </ul>

                        <p class="menu-label">
                            Author
                        </p>
                        <ul class="menu-list">
                            <li v-for="item in articles.filter((element, index, self) => element.author != '' && self.findIndex(el=>(element.author === el.author)) === index)" :key="item._id">
                                <input type="checkbox" :value="item.author" v-model="filterBy.author">
                                <span class="check-name">{{ item.author }}</span>
                            </li>
                        </ul>

                        <p class="menu-label">
                            Programme
                        </p>
                        <ul class="menu-list">
                            <li v-for="item in articles.filter((el,i,arr) => el.programme != '' && arr.findIndex(ele => (ele.programme == el.programme)) == i)" :key="item._id">
                                <input type="checkbox" :value="item.programme" v-model="filterBy.programme">
                                <span class="check-name">{{ item.programme }}</span>
                            </li>
                        </ul>

                        <p class="menu-label">
                            Category
                        </p>
                        <ul class="menu-list">
                            <li v-for="item in articles.filter((el,i,arr) => el.category != '' && arr.findIndex(ele => (ele.category == el.category)) == i)" :key="item._id">
                                <input type="checkbox" :value="item.category" v-model="filterBy.category">
                                <span class="check-name">{{ item.category }}</span>
                            </li>
                        </ul>
                        </aside>    
                    </div>
                </div>

                <!-- Sorting Option -->
                <div class="column">
                    <div class="pb-4" style="margin-top: 2em;">
                        <span class="pr-3 has-text-white">Sort by:</span>

                        <div class="select is-small">
                            <select v-model="sortBy">
                                <option value='datePosted'>Date posted</option>
                                <option value='title'>Title</option>
                                <option value='author'>Author</option>
                                <option value='views'>Views</option>    
                            </select>
                        </div>
                        &nbsp;
                        <div class="select is-small">
                            <select v-model="order">
                                <option value='ascending'>Ascending</option>
                                <option value='descending'>Descending</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div v-for="item in filteredArticles" :key="item._id">
                            <div><Article :articleItem="item" @click="updateViews(item._id)"/></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import Article from '@/components/public/Articles.vue'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            sortBy: 'datePosted',
            order: 'descending',
            searchInput: '',
            filterBy: {
                tags: [],
                author: [],
                programme: [],
                category: []
            }
        }
    },
    computed: {
        ...mapGetters(['articles']),
        filteredArticles() {
            let temp = this.articles

            // Search
            if (this.searchInput != '') {
                temp = temp.filter(element => {
                    let title = element.title.toLowerCase()
                    let search = this.searchInput.toLowerCase()
                    return title.includes(search)
                })
            }

            // Filter
            for (let prop in this.filterBy) {
                if (this.filterBy[prop] != '') {
                    temp = temp.filter(element => {
                        return this.filterBy[prop].some(el => {
                            return element[prop].includes(el)
                        })
                    })
                }
            }

            // Sorting
            temp = temp.sort( (a,b) => {
                if (this.sortBy == 'datePosted') {
                    return new Date(a.createdAt) - new Date(b.createdAt)
                }

                else if (this.sortBy == 'title') {
                    let titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase()
                    if (titleA < titleB) {
                        return -1
                    }
                    if (titleA > titleB) {
                        return 1
                    }
                    return 0
                }

                else if (this.sortBy == 'author') {
                    let authorA = a.author.toLowerCase(), authorB = b.author.toLowerCase()
                    if (authorA < authorB) {
                        return -1
                    }
                    if (authorA > authorB) {
                        return 1
                    }
                    return 0
                }

                else if (this.sortBy == 'views') {
                   return a.views - b.views
                }
            })

            if (this.order == 'descending') {
                temp.reverse()
            }

            return temp
        },
        featuredArticle() {
            let temp = this.articles
            
            temp = temp.filter(element => {
                return element.featured == true
            })
            
            console.log(temp)
            if (temp.length != 0) {
                return temp[0]
            } else {
                return this.articles[0]
            }
        },
        filteredTags() {
            let tags = []
            for (let i=0; i<this.articles.length; i++) {
                for (let j=0; j<this.articles[i].tags.length; j++) {
                    if (!tags.includes(this.articles[i].tags[j]) && this.articles[i].tags[j] != '') {
                        tags.push(this.articles[i].tags[j])
                    }
                } 
            }
            return tags
        }
    },
    components: {
        Article
    },
    methods: {
        ...mapActions(['getArticles']),
        updateViews(id) {
            axios.put('http://localhost:5000/api/articles/update-views/' + id)
        }
    },
    created() {
        this.getArticles()
    }
}
</script>

<style scoped>
select {
    background: none !important;
    color: white !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
}

li {
    font-size: 0.89rem;
    margin: 0.2rem 0;
}

section {
    background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://designinc.com.au/cms_uploads/images/1003_fbe-2.jpg') no-repeat center center/cover;
}

h1 {
  font-size: 4.5vw;
  font-weight: bold;
  color: white;
}

button {
  background-color: rgba(0,0,0,0);
  color: white;
  width: 10rem;
}

button:hover {
  background-color: rgba(255,255,255,0.3);
  color: white;
}

.notification {
    background-color: #329AA0;
}

.menu-label {
    color: black;
}

li {
    color: white;
    font-size: 1.5vh;
}

.check-name {
    margin-left: 0.5vw;
}

ul {
    margin: 0 0 2rem 0;
}
</style>