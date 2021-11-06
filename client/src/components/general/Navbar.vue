<template>
<div id="navbar">
<nav v-bind:class="[this.$route.name=='Home' ? 'is-fixed-top' : '', 'navbar px-4']" role="navigation" aria-label="main navigation">

  <div class="navbar-brand">
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasic" class="navbar-menu">
    <nav class="navbar-start">
      <h1 class="navbar-item title px-5 py-5">EEE Lifelong Learning Space</h1>
    </nav>
    
    <nav class="navbar-end">
      <router-link :to="{ name: 'Home' }" active-class="active" class="navbar-item py-5 px-5">HOME</router-link>
      <router-link :to="{ name: 'About' }" active-class="active" class="navbar-item py-5 px-5">ABOUT</router-link>
      <router-link :to="{ name: 'Articles' }" active-class="active" class="navbar-item py-5 px-5">ARTICLES</router-link>
      <router-link :to="{ name: 'Login' }" class="navbar-item pr-5" v-if="!isLoggedIn && this.$route.name!='Login'"><button class="button">LOGIN</button></router-link>
      <router-link :to="{ name: 'Workshops' }" active-class="active" class="navbar-item py-5 px-4" v-if="isLoggedIn">WORKSHOPS</router-link>
      <router-link :to="{ name: 'Book A Room!' }" active-class="active" class="navbar-item py-5 px-4" v-if="isLoggedIn">BOOK A ROOM</router-link>
      <router-link :to="{ name: 'Real-time Activities' }" active-class="active" class="navbar-item py-5 px-4" v-if="isLoggedIn">REAL-TIME</router-link>
      <router-link :to="{ name: 'Profile' }" active-class="active" class="navbar-item py-5 px-4" v-if="isLoggedIn">PROFILE</router-link>
      <a class="navbar-item py-5 px-4" @click="logoutUser" v-if="isLoggedIn"><fa icon="power-off"/></a>
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
        // window.location.reload();
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: transparent;
  background-image: none;
  position: absolute;
  // z-index: 100;
  width: 100%;
}

.navbar-item {
  color: white;
}

.title {
  font-size: 2vw;
}

@media (max-width: 1255px) {
  .title {
    display: none;
  }
  .navbar-end {
    flex-grow: 1;
    justify-content: center;
  }
}

.navbar-item:hover {
  background-color: transparent;
  font-weight: bold;
}

.navbar-item:focus,
.active {
  background-color: transparent;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 0.2px black;
  text-decoration: underline 3px;
}

button:hover {
  background-color: #329AA0;
}

button:focus {
  color: white;
}

</style>