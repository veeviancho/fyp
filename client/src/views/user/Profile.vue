<template>
    <div id="profile">
        <PageTitle/>
        <User/>
    </div>
</template>

<script>
import PageTitle from '../../components/PageTitle.vue'
import User from '../../components/User.vue'

export default {
    components: {
        PageTitle,
        User
    }
}
</script>

<style>
.media {
  max-width: 92%;
  margin: 0 auto;
  color: gray;
}
</style>