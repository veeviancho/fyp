<template>
<div id="app">
  <div v-if="!isLoggedIn"><PublicView/></div>
  <div v-if="isLoggedIn"><UserView/></div>
  <div v-if="isLoggedIn && isAdmin"><AdminView/></div>
</div>
</template>

<script>
import PublicView from '@/views/public.vue';
import UserView from '@/views/user.vue';
import AdminView from '@/views/admin.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    PublicView,
    UserView,
    AdminView
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style lang="scss">
.has-navbar-fixed-top{
  margin: 6rem auto;
  // background-color: pink;
  max-width: 92%;
}
</style>


