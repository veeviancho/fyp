<!-- Login page -->
<!-- style="background-image: url('https://eastudy.sg/wordpress/wp-content/uploads/2018/06/0625EN01.jpg'); background-repeat: no-repeat; background-size: cover; opacity: 0.5"> -->

<template>
<body>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
      <div class="column is-9-desktop">
        <form id="login-form" style="padding: 4em 7em" @submit.prevent="loginUser">
          <!-- The submit event will no longer reload the page -->
          <h1 class="title is-size-3 has-text-centered has-text-white"><i>Login</i></h1>

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
          <p class="has-text-danger has-text-centered mb-3" v-if="loginError">{{ loginError }}</p>

          <div class="control">
            <button type="submit" v-bind:class="[isLoading ? 'is-loading': '', 'button is-white is-outlined is-fullwidth']">Login</button>&nbsp;
          </div>
          <a>Forgot Password?</a>
          <br>
          <span style="text-align: center; color: rgb(200,200,200);">Don't have an account? <router-link :to="{ name: 'Register' }">Sign up</router-link> now.</span>
        </form>
      </div>
    </div>
    </div>
  </div>
</section>
</body>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  // Adding data values that will bind to the HTML elements
  data() {
    return {
      username: '',
      password: '',
      // error: '',
    }
  },
  computed: {
    // ...mapGetters(['msg'])
    ...mapGetters(['authState']),
    ...mapGetters(['loginError']),
    isLoading() {
      return this.authState === 'loading';
    }
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
            this.$router.push('/welcome')
          }
        })
        .catch(err => {
          // this.error = "Wrong information. Please re-enter!!"
          console.log(err)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
// body {
//   background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://static.dezeen.com/uploads/2017/06/dezeen-features-haworth-office-culture_dezeen_2364_col_12-852x522.jpg') no-repeat center center/cover;
// }

body {
  background-color: #313843;
}

.column {
  border-radius: 1em;
  background-color: rgba(0,0,0,0.3);
}

a {
  color: white;
}

a:hover {
  color: white;
  font-weight: bold;
}
</style>
