<!-- Login page -->
<!-- style="background-image: url('https://eastudy.sg/wordpress/wp-content/uploads/2018/06/0625EN01.jpg'); background-repeat: no-repeat; background-size: cover; opacity: 0.5"> -->

<template>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
      <div class="column is-9-desktop">
        <form id="login-form" style="padding: 4em 7em" @submit.prevent="loginUser">
          <!-- the submit event will no longer reload the page -->
          <h1 class="title is-size-3 has-text-centered"><i>Login</i></h1>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-size-5" type="text" v-model="username" placeholder="Username" required>
                <p>&nbsp;</p>
                <span class="icon is-size-5 is-left"><fa icon="user"/></span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-size-5" type="password" v-model="password" placeholder="Password" required>
                <p>&nbsp;</p>
                <span class="icon is-size-5 is-left"><fa icon="lock"/></span>
              </div>
          </div>
          <div class="control">
            <button type="submit" class="button is-warning is-outlined is-fullwidth">Login</button>&nbsp;
          </div>
          <a>Forgot Password?</a>
          <br>
          <span style="text-align: center">Don't have an account? <router-link :to="{ name: 'Register' }">Sign up</router-link> now.</span>
        </form>
      </div>
    </div>
    </div>
  </div>
</section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  // Adding data values that will bind to the HTML elements
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // Adding actions to the methods of this component
    ...mapActions(['login']),
    loginUser() {
      console.log(`username: ${this.username}, password ${this.password}`);
      // Assign user to be passed to vuex login action
      let user = {
        username: this.username,
        password: this.password
      }
      // Call vuex login action
      this.login(user)
        // Then whatever the respond that is sent back, we will use it here
        .then(res => {
          if (res.data.success) {
            // If success, the user will be directed to the home page
            this.$router.push('/profile')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
};
</script>
