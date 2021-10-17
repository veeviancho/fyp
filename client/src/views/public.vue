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

</style>