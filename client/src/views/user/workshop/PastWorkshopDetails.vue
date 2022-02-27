<template>
    <div class="has-navbar-fixed-top has-text-white">

        <div class="section" v-if="workshopItem">
            <div class="workshop-details">
                <h1 class="title has-text-white">{{ workshopItem.title }}</h1>
                <p>{{ workshopItem.description }}</p>
            </div>
            <hr>
            <div class="workshop-details">
                <div class="columns">
                    <p class="column"><b>Date: </b>{{ workshopItem.date }}</p>
                    <p class="column"><b>Time: </b>{{ workshopItem.startTime }} - {{ workshopItem.endTime }}</p>
                </div>
                <div class="columns">
                    <p class="column"><b>Venue: </b>{{ workshopItem.venue }}</p>
                    <p class="column"><b>Organiser: </b>{{ workshopItem.organiser }}</p>
                </div>
                <div class="columns">
                    <p class="column"><b>Programme: </b>{{ workshopItem.programme }}</p>
                    <p class="column"><b>Category: </b>{{ workshopItem.category }}</p>
                </div>

                <div class="columns">
                    <p class="column" v-if="workshopItem.createdAt"><b>Posted on: </b>{{ workshopItem.createdAt.slice(0, 10) }}</p>
                    <p class="column" v-if="workshopItem.users"><b>Registered Users: </b>{{ workshopItem.users.length }}/{{ workshopItem.maxUsers }}</p>
                    <p class="column" v-if="!workshopItem.users"><b>Registered Users: </b>0/{{ workshopItem.maxUsers }}</p>
                </div>

                <!-- <p class="has-text-success has-text-centered mb-3 white" v-if="success_msg">{{ success_msg }}</p>
                <p class="has-text-danger has-text-centered mb-3 white" v-if="workshopError.register[0] === this.id">{{ workshopError.register[1] }}</p> -->

            </div>
        </div>  
        <div class="section">
        <div class="workshop-details">
            <h1 class="title has-text-white">Reviews</h1>

            <form class="field" @submit.prevent="addFeedback()" v-show="showForm">
                <label class="label has-text-white star">
                    Your rating: &nbsp; &nbsp;
                    <star-rating v-model:rating="rating" :star-size="20" :show-rating=false :clearable=true></star-rating>
                </label>
                <div class="control">
                    <textarea class="textarea is-warning" type="textarea" placeholder="Enter your feedback regarding the workshop." v-model="feedback"></textarea>
                    <div class="postBtn">
                        <button class="button" type="submit">Submit Review</button>
                    </div>
                </div>
            </form>
            
            <div class="field">      
            <div class="media" v-for="item in allFeedback" :key="item._id">
                <div class="media-content">
                    <span class="subtitle is-6 has-text-white"><b>{{ item.name }}</b></span>&nbsp;
                    <span class="subtitle is-6 has-text-grey-light">@{{ item.username }}</span>
                    <div class="content">{{ item.feedback }}</div>
                    <small class="small has-text-grey-light">{{ item.date.slice(0,10) }}</small> 
                </div>
                <star-rating :star-size=20 :show-rating=false read-only :rating="item.rating"></star-rating>
            </div> 
            </div>

        </div>
        </div>    
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import StarRating from 'vue-star-rating';
import axios from 'axios';

export default {
    name: 'Workshop Details',
    data() {
        return {
            rating: '',
            feedback: '',
            userId: localStorage.getItem('userId'),
        }
    },
    components: {
        StarRating
    },
    props: ['id'],
    computed: {
        ...mapGetters(['workshop_status', 'pastWorkshop', 'workshopItem', 'workshopError', 'usersList']),
        showForm() {
            let answer = true;
            if (this.workshopItem.feedback) {
                for (let i=0; i<this.workshopItem.feedback.length; i++) {
                    if (this.workshopItem.feedback[i].userId == this.userId) {
                        answer = false;
                        return
                    }
                }
            }
            return answer 
        },
        allFeedback() {
            let temp = this.workshopItem.feedback
            if (temp && this.usersList) {
                for (let i=0; i<temp.length; i++) {
                    let user = this.usersList.find(item => item._id === temp[i].userId)
                    if (user) {
                        temp[i].name = user.name
                        temp[i].username = user.username
                    }
                }
            }
            return temp
        }
    },
    methods: {
        ...mapActions(['getWorkshop', 'registerForWorkshop', 'getPastWorkshopFromId', 'deregisterFromWorkshop', 'getAllUsers', 'getUserFromId']),
        async addFeedback() {
            let confirmPost = confirm("Post feedback? Note that this action is irreversible.")
            if (confirmPost) {
                try {
                    let workshopId = this.id
                    let userId = this.userId
                    let body = {
                        userId: userId,
                        rating: this.rating,
                        feedback: this.feedback,
                        date: new Date()
                    }
                    let res = await axios.put("http://localhost:5000/api/workshops/feedback/" + workshopId + '/' + userId, body)
                    if (res.data.success) {
                        this.getWorkshop().then( () => {
                            this.getPastWorkshopFromId(this.id)
                        })
                        // window.location.reload();
                    }
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
    },
    created() {
        this.getWorkshop().then( () => {
            this.getPastWorkshopFromId(this.id);
            this.getAllUsers()
        });
    }
}
</script>

<style scoped>
.star {
    display: flex;
    margin: auto;
}

.postBtn {
    display: flex;
    justify-content: flex-end;
    margin: 0.5rem 0;
}

.button:disabled {
    color: white;
    background-color: #161C20
}

p {
    margin-top: 1.5em;
}

.has-navbar-fixed-top {
    width: 70%;
    padding: 10% 0;
}

.workshop-details {
    margin: 0 1rem 0;
}

.section {
    background-color: #161C20;
    margin: 0 0 2rem 0;
}

.content {
    margin-top: 0.5em;
}

.media-content {
    margin-left: 2rem;
}

.media {
    border: solid 1px rgb(73, 73, 73);
    border-radius: 0.3rem;
    padding: 1rem 1.5rem 1rem 0;
    margin: 1em 0;
}
</style>