<template>
<div class="modal is-active">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="updateUser">

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input is-warning" type="text" id="name" name="name" v-model="name" placeholder="New name">
        </div>
      </div> 

      <div class="field">
        <label class="label">Programme</label>
        <div class="select is-fullwidth is-warning">
          <select name="programme" v-model="programme">
            <option disabled>Change Programme</option>
            <option>Communications Engineering</option>
            <option>Computer Control & Automation</option>
            <option>Electronics</option>
            <option>Power Engineering</option>
            <option>Signal Processing</option>
            <option>Green Electronics</option>
            <option>Integrated Circuit Design</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input is-warning" type="text" v-model="username" placeholder="New username">
        </div>
      </div>     

      <div class="field">
        <label class="label">About Me</label>
        <div class="control">
          <textarea class="textarea is-warning" type="textarea" maxlength="1000" placeholder="Write something!" v-model="about"></textarea>
        </div>
      </div>

      <p class="has-text-danger has-text-centered mb-3" v-if="error.update">{{ error.update }}</p>

      <button type="submit" class="button is-outlined is-fullwidth">Update</button>

    </form>

  </div>
  <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Edit Profile',
  data() {
    return {
      name: this.name,
      programme: this.programme,
      username: this.username,
      about: this.about
    }
  },
  computed: {
    ...mapGetters(['user', 'error']),
  },
  methods: {
    ...mapActions(['update', 'getProfile']),
    close() {
      this.$emit('close');
    },
    capitalize() {
      let str = this.name.toLowerCase().split(" ");
      for (let i=0; i<str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].slice(1);
      }
      this.name = str.join(" ");
    },
    updateUser() {
      if (this.name) {
        this.capitalize();
      }
      let user = {
        id: this.user._id,
        name: this.name,
        programme: this.programme,
        username: this.username,
        about: this.about
      }
      // console.log(user)
      this.update(user)
      .then(res => {
        if (res.data.success) {
          this.getProfile()
          this.close()
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getProfile();
  }
}
</script>

<style scoped>
button {
  color: black;
}

</style>

