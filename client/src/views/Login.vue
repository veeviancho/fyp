<!-- Login page -->
<!-- style="background-image: url('https://eastudy.sg/wordpress/wp-content/uploads/2018/06/0625EN01.jpg'); background-repeat: no-repeat; background-size: cover; opacity: 0.5"> -->

<template>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
      <div class="column is-9-desktop">
        <form id="login-form" style="padding: 4em 7em" @submit.prevent="loginUser">
          <!-- The submit event will no longer reload the page -->
          <h1 class="title is-size-3 has-text-centered"><i>Login</i></h1>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-size-5" type="text" v-model="username" placeholder="Username" required>
              <span class="icon is-size-5 is-left"><fa icon="user"/></span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-size-5" type="password" v-model="password" placeholder="Password" required>
              <span class="icon is-size-5 is-left"><fa icon="lock"/></span>
            </div>
          </div>
          
          <!-- Display message when login fails -->
          <p class="has-text-danger-dark has-text-centered mb-3">{{ error }}</p>

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
      password: '',
      error: '',
      // msg: ''
    }
  },
  computed: {
    // ...mapGetters(['msg'])
  },
  methods: {
    // Adding actions to the methods of this component
    ...mapActions(['login']),
    loginUser() {
      // console.log(`username: ${this.username}, password ${this.password}`);
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
            // If success, user will be directed to the home page
            // console.log(res.data)
            this.$router.push('/profile')
          }
        })
        .catch(err => {
          // this.error = msg
          console.log(err)
        })
    }
  }
};
</script>
