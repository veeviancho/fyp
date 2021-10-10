<template>
<nav class="level" style="max-width: 92%; margin: 3em auto;">
  <!-- Left side -->
  <div class="level-left">
      <p class="title">{{ $route.name }}</p>
  </div>

  <!-- Right side -->
  <div class="level-right">
    <!-- only if logged in -->
    <!-- <p class="level-item"><a>Back</a></p> -->
    <button class="level-item button" v-if="isLoggedIn" @click.prevent="logoutUser"><fa icon="power-off"/>&nbsp;Logout</button>
  </div>
</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Title',
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout();
      this.$router.push('/login')
    }
  }
}
</script>