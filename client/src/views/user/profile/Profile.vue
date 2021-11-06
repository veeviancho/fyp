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

            <div class="column yellow mr-5 my-3">
            <div class="px-5 py-3">
                Registered Workshops
                <div class="my-5">
                    <span class="title is-1 has-text-white">0</span> &nbsp; 
                    <span class="subtitle is-5 has-text-white"><a class="yellow-box px-3 py-2">attended</a> workshops</span>
                </div>
                <div class="my-5">
                    <span class="title is-1 has-text-white">0</span> &nbsp; 
                    <span class="subtitle is-5 has-text-white"><a class="yellow-box px-3 py-2">upcoming</a> workshops</span>
                </div>
            </div>
            </div>


            <div class="column green ml-5 my-3">
            <div class="px-5 py-3">
                Booked Rooms
                 <div class="my-5">
                    <span class="title is-1 has-text-white">0</span> &nbsp; 
                    <span class="subtitle is-5 has-text-white"><a class="green-box px-3 py-2">past</a> bookings</span>
                </div>
                <div class="my-5">
                    <span class="title is-1 has-text-white">0</span> &nbsp; 
                    <span class="subtitle is-5 has-text-white"><a class="green-box px-3 py-2">upcoming</a> bookings</span>
                </div>
            </div>
            </div>

        </div>
    </div>
    

    <div class="section my-6">
        <div class="column">
            <div class="columns">
                <div class="column">
                    <span class="title is-4 category px-3 py-2">Technical Skills</span> &nbsp;
                    <span class="has-text-white desc">You have attended <strong class="has-text-white">0</strong> technical skills workshops</span>

                    <table class="has-text-white mt-6">
                        <tr>
                            <td>01/01/2021</td>
                            <td><b>Workshop #1</b></td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</td>
                        </tr>
                        <tr>
                            <td>01/01/2021</td>
                            <td><b>Workshop #2</b></td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</td>
                        </tr>
                        <tr>
                            <td>01/01/2021</td>
                            <td><b>Workshop #3</b></td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</td>
                        </tr>
                        <tr>
                            <td>01/01/2021</td>
                            <td><b>Workshop #4</b></td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="section mb-6">
        <div class="column">
            <div class="columns">
                <div class="column">
                    <span class="title is-4 category px-3 py-2">Soft Skills</span> &nbsp;
                    <span class="has-text-white desc">You have attended <strong class="has-text-white">0</strong> soft skills workshops</span>

                    <table class="has-text-white mt-6">
                        <tr>
                            <td>01/01/2021</td>
                            <td><b>Workshop #1</b></td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</td>
                        </tr>
                        <tr>
                            <td>01/01/2021</td>
                            <td><b>Workshop #2</b></td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</td>
                        </tr>
                        <tr>
                            <td>01/01/2021</td>
                            <td><b>Workshop #3</b></td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</td>
                        </tr>
                        <tr>
                            <td>01/01/2021</td>
                            <td><b>Workshop #4</b></td>
                            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...</td>
                        </tr>
                    </table>
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
            isModalVisible: false
        }
    },
    components: {
        EditProfile
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        ...mapActions(['getProfile']),
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    },
    created() {
        this.getProfile();
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
}

.green {
    border: 5px solid #33CDC4;
    border-radius: 9px;
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
  .desc {
      line-height: 3rem;
  }
}
</style>