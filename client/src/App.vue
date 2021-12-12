<template>
<body v-bind:class="[this.$route.path == '/admin' ? 'light-bg' : 'dark-bg']">
  <div>
    <Nav/>
    <router-view/>
  </div>
</body>
</template>

<script>
import Nav from '@/components/general/Navbar.vue';

export default {
  name: 'App',
  components: {
    Nav
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


