<template>
<body>
<div class="has-navbar-fixed-top hero is-fullheight">

    <div class="section mb-6">
        <div class="column">
            <div class="columns">
                <div class="column is-2">
                    <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
                </div>

                <div class="column">
                    <p>
                        <span class="is-size-3"><b><span class="has-text-white">{{ user.name }}</span></b> <small>@{{ user.username }}</small></span>
                        <br>
                        Student
                        <br>
                        {{ user.programme }}
                        <br>
                        <button class="button is-small" style="margin: 0.5em 0" @click="showModal">Edit Profile</button>
                        <EditProfile v-show="isModalVisible" @close="closeModal"/>
                        &nbsp;
                        <button class="button is-small" style="margin: 0.5em 0">Profile Report</button>
                    </p>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <p><i>About Me:</i></p>
                    <span class="has-text-white about">{{ user.about }}</span>
                </div>
            </div>
        </div>
    </div>

    
    <div class="column">
        <div class="columns">

            <div class="column yellow">
            <div class="px-5 py-3">
                Registered Workshops
                <div class="my-5">
                    <span class="title is-1 has-text-white">{{ pastUserWorkshop ? pastUserWorkshop.length : 0 }}</span> &nbsp; 
                    <span class="subtitle is-5 has-text-white"><router-link :to="{ name: 'Past Workshops' }" class="yellow-box px-3 py-2">past</router-link> workshops</span>
                </div>
                <div class="my-5">
                    <span class="title is-1 has-text-white">{{ userWorkshop ? userWorkshop.length : 0 }}</span> &nbsp; 
                    <span class="subtitle is-5 has-text-white"><router-link :to="{ name: 'Upcoming Workshops' }" class="yellow-box px-3 py-2">upcoming</router-link> workshops</span>
                </div>
            </div>
            </div>


            <div class="column green">
            <div class="px-5 py-3">
                Booked Rooms
                 <div class="my-5">
                    <span class="title is-1 has-text-white">{{ pastUserBookings.length }}</span> &nbsp; 
                    <span class="subtitle is-5 has-text-white"><router-link :to="{ name: 'User Past Bookings' }" class="green-box px-3 py-2">past</router-link> bookings</span>
                </div>
                <div class="my-5">
                    <span class="title is-1 has-text-white">{{ userBookings.length }}</span> &nbsp; 
                    <span class="subtitle is-5 has-text-white"><router-link :to="{ name: 'User Bookings' }" class="green-box px-3 py-2">upcoming</router-link> bookings</span>
                </div>
            </div>
            </div>

        </div>
    </div>
    
    <div class="my-6">
    <div class="section mb-6" v-for="(category, index) in workshopCategory" :key="index">
        <div class="column">
            <div class="columns">
                <div class="column">

                    <span class="title is-4 category px-3 py-2">{{ category }}</span> &nbsp;
                    <span class="has-text-white description">You have attended <strong class="has-text-white">{{ pastUserWorkshop.filter(item => item.category === category).length }}</strong> {{ category }} workshops</span>

                    <table class="has-text-white mt-6">
                        <tr v-for="workshopItem in pastUserWorkshop.filter(item => item.category === category)" :key="workshopItem._id">
                            <td>{{ workshopItem.date }}</td>
                            <td><b>{{ workshopItem.title }}</b></td>
                            <td>{{ workshopItem.description }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
</body>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EditProfile from '@/components/student/user/EditProfile.vue'

export default {
    data() {
        return {
            isModalVisible: false,
            workshopCategory: [],
        }
    },
    components: {
        EditProfile
    },
    computed: {
        ...mapGetters(['user', 'userWorkshop', 'pastUserWorkshop', 'userBookings', 'pastUserBookings']),
    },
    methods: {
        ...mapActions(['getProfile', 'getWorkshop', 'getUserWorkshop', 'getUserBookings']),
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        getCategory() {
            let temp = this.pastUserWorkshop
            temp = temp.filter( (el, index, arr) => {
                return el.category != '' &&  index === arr.findIndex(ele => (ele.category === el.category))
            })
            for (let i=0; i<temp.length; i++) {
                this.workshopCategory.push(temp[i].category)
            }
        }
    },
    created() {
        this.getProfile();
        this.getWorkshop().then( () => {
            this.getUserWorkshop(localStorage.getItem('userId'))
            this.getUserBookings(localStorage.getItem('userId'))
            this.getCategory()
        })
    }
}
</script>

<style lang="scss" scoped>
.section {
    background-color: #161C20;
}

body,
.has-navbar-fixed-top {
    background-color: #313843;
}

.column {
    color: #BBB9B9;
}

.yellow {
    border: 5px solid #FFDA7A;
    border-radius: 9px;
    margin: 2rem 2rem 2rem 0;
}

.green {
    border: 5px solid #33CDC4;
    border-radius: 9px;
    margin: 2rem 0 2rem 2rem;
}

@media (max-width: 768px) {
    .yellow {
        margin: 2rem 0 2rem 0;
    }
    .green {
        margin: 2rem 0 2rem 0;
    }
}

.yellow-box:hover {
    background-color: #FFDA7A;
    color: black;
    font-weight: bold;
}

.yellow-box, .green-box {
    font-weight: bold;
}

.green-box:hover {
    background-color: #33CDC4;
    color: black;
    font-weight: bold;
}

.category {
    background-color: #FFDA7A;
    color: black;
    font-weight: bold;
}

td {
    padding: 0 2rem 0 0;
}

@media (max-width: 600px) {
  td, .about, columns .title {
    font-size: 3vw;
  }
  .description {
      line-height: 3rem;
  }
}
</style>