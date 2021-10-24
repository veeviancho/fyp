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
  // margin: 6rem auto;
  padding-top: 6rem;
  margin: auto;
  // background-color: pink;
  max-width: 92%;
}

html {
  scroll-behavior: smooth;
}
</style>


