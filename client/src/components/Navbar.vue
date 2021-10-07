<template>
<div id="navbar">
    <aside class="menu">
        <router-link to="/">
          <span class="image py-2" style="background-color: #1d3785"><img src="../assets/logo.png"></span>
        </router-link>

      <p class="menu-label px-2">Lifelong Learning</p>
      <ul class="menu-list">
        <li><router-link :to="{ name: 'NTU Initiatives' }">
          <span class="icon"><fa icon="university"/></span>
          NTU Initiatives
        </router-link></li>
        <li><router-link :to="{ name: 'News, Events, and Trends'}">
          <span class="icon"><fa icon="newspaper"/></span>
          News, Events, and Trends
        </router-link></li>
        <li><router-link :to="{ name: 'Tips and Tricks'}">
          <span class="icon"><fa icon="lightbulb"/></span>
          Tips and Tricks
        </router-link></li>
      </ul>

      <p class="menu-label px-2">General</p>
      <ul class="menu-list">
        <li><router-link :to="{ name: 'How to Get Here?' }">
          <span class="icon"><fa icon="map-marked-alt"/></span>
          How to Get Here?
        </router-link></li>
        <li v-if="isLoggedIn">
          <router-link :to="{ name: 'Workshops' }">
            <span class="icon"><fa icon="laptop-code"/></span>
            Workshops
          </router-link>
          <ul>
            <li><router-link :to="{ name: 'History' }">Attended Workshops</router-link></li>
            <li><router-link :to="{ name: 'Upcoming Workshops' }">Upcoming Workshops</router-link></li>
          </ul>
        </li>

        <li v-if="isLoggedIn">
          <router-link :to="{ name: 'Book A Room!' }">
          <span class="icon"><fa icon="calendar-check"/></span>
          Book A Room!
          </router-link>
          <ul>
            <li><router-link :to="{ name: 'Manage Bookings' }">Manage Bookings</router-link></li>
          </ul>
        </li>
      </ul>
      
      <p class="menu-label px-2" v-if="isLoggedIn">What's happening?</p>
      <ul class="menu-list" v-if="isLoggedIn">
        <li><router-link :to="{ name: 'Real-time Activities' }">
          <span class="icon"><fa icon="bullhorn"/></span>
          Real-time Activities
        </router-link></li>
        <li><router-link :to="{ name: 'Timetable' }">
          <span class="icon"><fa icon="calendar-alt"/></span>
          Timetable
        </router-link></li>
      </ul>
      

      <p class="menu-label px-2">User</p>
      <ul class="menu-list">
        <li v-if="isLoggedIn"><router-link :to="{ name: 'Profile' }">
          <span class="icon"><fa icon="user"/></span>
          Profile
        </router-link></li>
        <li v-if="!isLoggedIn"><router-link :to="{ name: 'Login' }">
          <span class="icon"><fa icon="user"/></span>
          Login
        </router-link></li>
      </ul>
    </aside>
    </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style lang="scss">
.page {
  max-width: 92%;
  margin: 0 auto;
}

#login-form {
  border: 1px solid #b8b7b7;
  padding: 2em 3em;
  border-radius: 0.3em;
  background-color: white;
}
</style>
