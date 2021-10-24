<template>

    <div class="has-navbar-fixed-top">
        <article class="media">
        <figure class="media-left">
            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
        </figure>
        <div class="media-content ml-5">
            <div class="content">
                <div class="content">
                <p>
                    <span class="is-size-3"><strong>{{ user.name }}</strong> <small>@{{ user.username }}</small></span>
                    <br>
                    Student
                    <br>
                    {{ user.programme }}
                    <br>
                    <button class="button is-small is-light" style="margin: 0.5em 0" @click="showModal">Edit Profile</button>
                    <EditProfile v-show="isModalVisible" @close="closeModal"/>
                    &nbsp;
                    <button class="button is-small is-light" style="margin: 0.5em 0">Profile Report</button>
                    <!-- <a href="mailto:name@email.com">Email Address</a> -->
                </p>
                </div>
            </div>
        </div>
        </article>

        <section class="section">
            <div class="is-size-5">About Me:</div>
            <div class="description">{{ user.about }}</div>
        </section>

        <section class="section">
            <div class="is-size-5">Workshops Attended:</div>
            <div class="description">
                <ul>
                    <li>Workshop #1</li>
                    <li>Workshop #2</li>
                    <li>Workshop #3</li>
                </ul>
            </div>
        </section>

        <!-- <nav class="level">
            <div class="level-item has-text-centered">
            <div>
                <p class="heading">Workshops Attended</p>
                <p class="title">12</p>
            </div>
            </div>
            <div class="level-item has-text-centered">
            <div>
                <p class="heading">Reviews Given</p>
                <p class="title">5</p>
            </div>
            </div>
        </nav>
        &nbsp;
        <nav class="level">
            <div class="level-item has-text-centered">
            <div>
                <p class="heading">Total Points</p>
                <p class="title">22</p>
            </div>
            </div>
            <div class="level-item has-text-centered">
            <div>
                <p class="heading">Rank</p>
                <p class="title">#8</p>
            </div>
            </div>
        </nav> -->
    </div>
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
.media {
    max-width: 92%;
    margin: auto;
    color: gray;
    display: flex;
    align-items: center;
}

.description {
    color: gray;
}

.level {
    max-width: 40%;
    margin: 0 25%;
}

.media-left {
    max-height: 20%;
    max-width: 20%;
}
</style>