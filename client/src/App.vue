<template>
<div>
  <Nav/>
  <router-view/>
</div>
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

body {
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


