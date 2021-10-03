<template>
  <div class="columns is-gapless">
    <div class="column is-one-fifth"><Nav/></div>
    <div class="column"><router-view/></div>
  </div>
</template>

<script>
import Nav from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>
