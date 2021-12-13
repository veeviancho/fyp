<template>
<body v-bind:class="[this.$route.meta.isAdmin ? 'light-bg' : 'dark-bg']">
  <div v-if="!this.$route.meta.isAdmin">
    <Nav/>
    <router-view/>
  </div>

  <div v-if="this.$route.meta.isAdmin">
    <div class="columns">
      <div class="column is-one-fifth"><AdminNav/></div>
      <div class="column"><router-view/></div>
    </div>
  </div>
</body>
</template>

<script>
import Nav from '@/components/general/Navbar.vue';
import AdminNav from '@/components/general/AdminNavbar.vue';

export default {
  name: 'App',
  components: {
    Nav,
    AdminNav
  }
}
</script>

<style lang="scss">
.has-navbar-fixed-top{
  padding-top: 6rem;
  margin: auto;
  max-width: 92%;
}

.light-bg {
  min-height: 100vh;
  background-color: white;
}

.dark-bg {
  min-height: 100vh;
  background-color: #313843;
}

html {
  scroll-behavior: smooth;
}

button:hover,
button:focus {
  background-color: #329AA0;
  color: white;
}

//For development purposes
.pink {
    border: 2px solid pink;
}

</style>


