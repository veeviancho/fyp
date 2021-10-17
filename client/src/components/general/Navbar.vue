<template>
<div id="navbar">
<nav v-bind:class="[isLoggedIn ? '' : 'is-black', 'navbar is-fixed-top']" role="navigation" aria-label="main navigation">

  <div class="navbar-brand">
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasic" class="navbar-menu">
    
    <nav class="navbar-start" v-if="!isLoggedIn">
      <router-link :to="{ name: 'Home' }" active-class="public-active" class="navbar-item py-5 px-6">HOME</router-link>
      <router-link :to="{ name: 'About' }" active-class="public-active" class="navbar-item py-5 px-6">ABOUT</router-link>
      <router-link :to="{ name: 'Articles' }" active-class="public-active" class="navbar-item py-5 px-6">ARTICLES</router-link>
      <router-link :to="{ name: 'Login' }" active-class="public-active" class="navbar-item py-5 px-6">LOGIN</router-link>
    </nav>

    <nav class="navbar-start" v-if="isLoggedIn">
      <router-link :to="{ name: 'Home' }" active-class="active" class="navbar-item py-5 px-6">HOME</router-link>
      <router-link :to="{ name: 'About' }" active-class="public-active" class="navbar-item py-5 px-6">ABOUT</router-link>
      <router-link :to="{ name: 'Articles' }" active-class="active" class="navbar-item py-5 px-6">ARTICLES</router-link>

      <div class="navbar-item has-dropdown is-hoverable">
        <router-link :to="{ name: 'Workshops' }" active-class="active" class="navbar-item py-5 px-6">WORKSHOPS</router-link>
        <div class="navbar-dropdown">
          <router-link :to="{ name: 'Workshops' }" active-class="active" class="navbar-item">Manage</router-link>
        </div>
      </div>

      <router-link :to="{ name: 'Book A Room!' }" active-class="active" class="navbar-item py-5 px-6">BOOKINGS</router-link>
      <router-link :to="{ name: 'Real-time Activities' }" active-class="active" class="navbar-item py-5 px-6">ACTIVITIES</router-link>
      <router-link :to="{ name: 'Profile' }" active-class="active" class="navbar-item py-5 px-6">PROFILE</router-link>

      <a class="navbar-item py-5 px-6" @click="logoutUser"><fa icon="power-off"/></a>
    </nav>
  </div>

</nav>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      // if(confirm("Confirm Logout?")) {
        this.logout();
        this.$router.push('/login');
        window.location.reload();
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-start {
  flex-grow: 1;
  justify-content: center;
}

.navbar-item:hover {
  color: black;
  // text-decoration: underline;
  // text-decoration-thickness: 0.2em;
}

.navbar-item:focus,
.active {
  background-color: rgb(250,250,250);
  color: black;
  font-weight: bold;
}

.public-active {
  font-weight: bold;
  background-color: rgba(0,0,0,0.5);
}

</style>