<template>
    <div id="profile">
        <PageTitle/>
        <article class="media">
        <figure class="media-left">
            <p class="image is-128x128 is-square">
            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
            </p>
        </figure>
        <div class="media-content ml-5">
            <div class="content">
                <div class="content">
                <p>
                    <span class="is-size-3"><strong>Name</strong> <small>@username</small></span>
                    <br>
                    Student
                    <br>
                    Infocommunication Engineering
                    <br>
                    <button class="button is-small is-light" style="margin: 0.5em 0">Edit Profile</button>
                    &nbsp;
                    <button class="button is-small is-light" style="margin: 0.5em 0">Profile Report</button>
                    <!-- <a href="mailto:name@email.com">Email Address</a> -->
                </p>
                </div>
            </div>
        </div>
        </article>

        <section class="section">
            <div class="is-size-5">About me:</div>
            <div class="about-me">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
        </section>

        <nav class="level">
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
        </nav>
    </div>
</template>

<script>
import PageTitle from '@/components/general/PageTitle.vue'

export default {
    components: {
        PageTitle
    }
}
</script>

<style lang="scss" scoped>
.media {
  max-width: 92%;
  margin: 0 auto;
  color: gray;
}

.about-me {
  max-width: 92%;
  color: gray;
}

.level {
    max-width: 40%;
    margin: 0 25%;
}
</style>