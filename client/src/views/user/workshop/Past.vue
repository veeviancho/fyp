<template>
    <div class="hero is-fullheight">
        <section class="section is-small">
        <form class="field has-navbar-fixed-top">
            <h1 class="title has-text-white">{{ user.name }}'s Past Workshops</h1>
        </form>
        </section>
        <div class="content">
            <div v-for="item in pastUserWorkshop" :key="item.id">
                <div><WorkshopEvent :workshopItem="item"/></div>
            </div>
        </div>
    </div>
</template>

<script>
import WorkshopEvent from './PastWorkshopEvent.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        WorkshopEvent
    },
    computed: {
        ...mapGetters(['user', 'pastWorkshop', 'pastUserWorkshop'])
    },
    methods: {
        ...mapActions(['getWorkshop', 'getProfile', 'getUserWorkshop'])
    },
    created() {
        this.getWorkshop().then( () => {
            this.getUserWorkshop(localStorage.getItem('userId'));
        })
        this.getProfile();
    }
}
</script>

<style scoped>
.section {
    background-color: #161C20;
}

.title {
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
