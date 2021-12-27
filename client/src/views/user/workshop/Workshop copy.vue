<template>
<div class="hero is-fullheight">
    <section class="section is-medium" v-if="popularWorkshop">
        <p class="has-text-grey-light mt-5">POPULAR WORKSHOP</p>
        <h1>{{ popularWorkshop.title }}</h1>
        <p class="has-text-grey-light" v-if="popularWorkshop.organiser">by <i>{{ popularWorkshop.organiser }}</i></p>
        <p class="has-text-white desc">{{ popularWorkshop.description }}</p>
        <br>
        <router-link :to="'/workshop/' + popularWorkshop._id "><button class="button">Read More</button></router-link>
    </section>

    <div style="margin: 3rem auto; width: 92%;">
    <div class="columns">
        <div class="column">
            <div>
                <!-- Search Bar -->
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="text" v-model="searchInput" placeholder="Find Workshops">
                        <span class="icon is-small is-left"><fa icon="search"/></span>
                    </p>
                </div>
            </div>
        
            <div class="columns">
                <!-- Filter box -->
                <div class="column is-one-quarter" style="margin-top: 2em;">
                    <div class="notification">
                        <aside class="menu">
                        <p class="menu-label">
                            Date
                        </p>
                        <ul><input type="date" v-model="filterBy.date"></ul>

                        <p class="menu-label">
                            Time
                        </p>
                        <ul><input type="time" v-model="filterBy.time"></ul>

                        <p class="menu-label">
                            Venue
                        </p>
                        <ul class="menu-list">
                            <li v-for="item in workshop.filter((el,i,arr) => el.venue != '' && arr.findIndex(ele => ele.venue === el.venue) === i)" :key="item._id">
                                <input type="checkbox" :value="item.venue" v-model="filterBy.venue">
                                <label class="check-name">{{ item.venue }}</label>
                            </li>
                        </ul>
                        

                        <p class="menu-label">
                            Organiser
                        </p>
                        <ul class="menu-list">
                            <li v-for="item in workshop.filter((element, index, self) => element.organiser != '' && self.findIndex(el=>(element.organiser === el.organiser)) === index)" :key="item._id">
                                <input type="checkbox" id="organiser" :value="item.organiser" v-model="filterBy.organiser">
                                <label for="organiser" class="check-name">{{ item.organiser }}</label>
                            </li>
                        </ul>
                        

                        <p class="menu-label">
                            Programme
                        </p>
                        <ul class="menu-list">
                            <li v-for="item in workshop.filter((element, index, self) => element.programme != '' && index === self.findIndex(el=>(element.programme === el.programme)))" :key="item._id">
                                <input type="checkbox" id="organiser" :value="item.programme" v-model="filterBy.programme">
                                <label for="organiser" class="check-name">{{ item.programme }}</label>
                            </li>
                        </ul>

                        <p class="menu-label">
                            Category
                        </p>
                        <ul class="menu-list">
                            <li v-for="item in workshop.filter((element, index, self) => element.category != '' && self.findIndex(el=>(element.category === el.category)) === index)" :key="item._id">
                                <input type="checkbox" id="organiser" :value="item.category" v-model="filterBy.category">
                                <label for="organiser" class="check-name">{{ item.category }}</label>
                            </li>
                        </ul>

                        <p class="menu-label">
                            Display
                        </p>
                        <ul class="menu-list">
                            <li><input type="checkbox" value="no" v-model="filterBy.isFull"><label class="check-name">Vacant workshops</label></li>
                            <li><input type="checkbox" value="yes" v-model="filterBy.isFull"><label class="check-name">Full worshops</label></li>
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
                                <option value='date'>Date</option>
                                <option value='popularity'>Popularity</option>
                                <!-- <option value='reviewsNo'>No of Reviews</option> -->
                               
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
                        <div v-for="item in filteredWorkshop" :key="item.id">
                            <div><WorkshopEvent :workshopItem="item"/></div>
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
import WorkshopEvent from './WorkshopEvent.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            order: 'descending',
            sortBy: 'datePosted',
            searchInput: '',
            filterBy: {
                date: '',
                time: '',
                venue: [],
                organiser: [],
                programme: [],
                category: [],
                isFull: []
            }
        }
    },
    components: {
        WorkshopEvent
    },
    computed: {
        ...mapGetters(['workshop', 'popularWorkshop']),
        filteredWorkshop() {
            let tempWorkshop = this.workshop

            // Search bar
            if (this.searchInput != '')
                tempWorkshop = tempWorkshop.filter(arr => {
                    return arr.title.toLowerCase().includes(this.searchInput.toLowerCase())
                })

            // Filtering
            for (let prop in this.filterBy) {
                if (this.filterBy[prop] != '') {
                    // special case for time
                    if (prop == 'time') {
                        tempWorkshop = tempWorkshop.filter(element => {
                            return this.filterBy.time <= element.endTime && this.filterBy.time >= element.startTime
                        })
                    } else {
                        tempWorkshop = tempWorkshop.filter(element => {
                            return element[prop].includes(this.filterBy[prop])
                        })
                    }
                }
            }

            // Sorting selection
            tempWorkshop = tempWorkshop.sort( (a,b) => {
                if (this.sortBy === 'datePosted') {
                    return new Date(a.createdAt) - new Date(b.createdAt)
                }

                else if (this.sortBy === 'title') {
                    let titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase()
                    if (titleA < titleB) {
                        return -1
                    }
                    if (titleA > titleB) {
                        return 1
                    }
                    return 0
                }

                else if (this.sortBy === 'date') {
                    return new Date(a.date) - new Date(b.date)
                }

                else if (this.sortBy === 'popularity') {
                    return a.points - b.points
                }
            })

            if (this.order == 'descending') {
                tempWorkshop.reverse()
            }

            return tempWorkshop
        },
        
    },
    methods: {
        ...mapActions(['getWorkshop'])
    },
    created() {
        this.getWorkshop()
    },
}
</script>

<style scoped>
.icon {
    cursor: pointer;
}

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
    background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://www.demcointeriors.com/wp-content/uploads/2017/05/Richland-Library-Sandhills-Interior-Rendering-1024x569.jpg') no-repeat center center/cover;
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