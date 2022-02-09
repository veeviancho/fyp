<template>
    <div class="hero is-fullheight">
        
        <section class="section is-small">
            <form class="field has-navbar-fixed-top">
                <h1 class="title top-title has-text-white">{{ user.name }}'s Upcoming Bookings</h1>
            </form>
        </section>

        <div class="content" v-if="userBookings">

            <div v-for="item in sortedBookings" :key="item._id">

                <article class="media" @mouseover="hover=true; buttonId=item._id" @mouseleave="hover=false; buttonId=''">

                    <figure class="media-left">
                        <p class="image is-128x128 is-square">
                            <img :src="item.roomImage">
                        </p>
                    </figure>

                    <div class="media-content">
                        <strong class="has-text-white">Venue:</strong> {{ item.roomTitle }} <br>
                        <strong class="has-text-white">Date:</strong> {{ item.date }} <br>
                        <strong class="has-text-white">Time:</strong> {{ item.start }} - {{ item.end }} <br>
                        <strong class="has-text-white">Purpose of Visit:</strong> {{ item.purpose ? item.purpose : "NIL" }} <br>
                        <!-- <strong class="has-text-white">No of booked seats:</strong> {{ item.date }} <br> -->
                        <small>*Please make sure to leave the venue <i>before</i> the end of your booked session.</small>

                        <div><button v-if="hover && buttonId==item._id" @click="deleteBooking()" class="cancelBtn button mt-3 mb-5">Cancel Booking</button></div>
                    </div>

                </article>


            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            hover: false,
            buttonId: ''
        }
    },
    computed: {
        ...mapGetters(['user', 'userBookings', 'roomId']),
        sortedBookings() {
            let temp = this.userBookings
            temp = temp.sort( (a,b) => {
                return new Date(a.date) - new Date(b.date)
            })
            return temp
        }
    },
    methods: {
        ...mapActions(['getProfile', 'getUserBookings', 'getAllRooms', 'getRoomFromId']),
        getRoomDetails() {
            for (let i=0; i<this.userBookings.length; i++) {
                let roomId = this.userBookings[i].roomId
                this.getAllRooms().then(() => {
                    this.getRoomFromId(roomId)
                    this.userBookings[i].roomImage = this.roomId.imageLink
                    this.userBookings[i].roomTitle = this.roomId.title
                })
            }
        },
        deleteBooking() {
            // something
        }
    },
    created() {
        this.getProfile()
        this.getUserBookings(localStorage.getItem('userId')).then(() => {
            this.getRoomDetails()
        })
    }
}
</script>

<style scoped>

.cancelBtn {
   animation-name:block1;
   animation-duration:1s;
   animation-fill-mode:forwards;
}

@keyframes block1 {
   0% {
      top:-50px;
   }
   100% {
      top:0;
   }
}


.section {
    background-color: #161C20;
}

.media {
    padding: 1.7em 0.5em 0 0;
    margin-bottom: 1.5em;
    border-radius: 0.4em;
    color: white;
    border: 0.3em solid #33CDC4;
}

.media:hover {
  background-color: rgba(0, 0, 0, 0.25);
  cursor: default;
}

.top-title {
    text-align: center;
    font-style: italic;
}

.content {
    width: 80%;
    margin: 3rem auto;
}

.hero {
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
}
</style>
