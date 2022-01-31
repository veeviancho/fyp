<template>
    <div class="has-navbar-fixed-top has-text-white">
        <RoomImage :roomImg="roomId.imageLink" v-show="viewImage==true" @close="viewImage=false"/>
        <div class="section" v-if="roomId" @click="viewImage=true">
            <div class="workshop-details">
                <section class="image" :style="{  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.7)), url(' + roomId.imageLink + ')' }">
                    <div class="roomDetails">
                        <h1 class="title has-text-white">{{ roomId.title }}</h1>
                        <p>{{ roomId.description }}</p>
                    </div>
                </section>
            </div>
            <hr>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import RoomImage from './ViewImage.vue'

export default {
    data() {
        return {
            viewImage: false
        }
    },
    components: {
        RoomImage
    },
    computed: {
        ...mapGetters(['roomId'])
    },
    props: ['id'],
    methods: {
        ...mapActions(['getAllRooms', 'getRoomFromId'])
    },
    created() {
        this.getAllRooms().then(() => {
            this.getRoomFromId(this.id)
        })
    }
}
</script>

<style scoped>
.image {
    background-repeat: no-repeat;
    background-attachment: center;
    background-position: center;
    background-size: cover;
}

.roomDetails {
    padding: 5rem;
    text-align: center;
}

.section {
    background-color: #161C20;
    margin: 0 0 2rem 0;
    cursor: pointer;
}

p {
    margin-top: 1.5em;
}

.has-navbar-fixed-top {
    width: 70%;
    padding: 10% 0;
}
</style>