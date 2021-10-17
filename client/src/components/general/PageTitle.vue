<template class="has-navbar-fixed-top">

<nav class="level">
  <div class="level-left">
      <p class="title">{{ $route.name }}</p>
  </div>

  <!-- Right side -->
  <div class="level-right">
    <!-- only if logged in -->
    <!-- <p class="level-item"><a>Back</a></p> -->
  </div>
</nav>

</template>

<script>
export default {
  name: 'Title',
}
</script>

<style lang="scss" scoped>
.level {
  margin-top: 5em;
}
</style>