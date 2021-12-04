<template>
<body>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
      <div class="column is-9-desktop">

        <form @submit.prevent="loginUser">
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
            <button type="submit" v-bind:class="[isLoading ? 'is-loading': '', 'button is-fullwidth']">Login</button>&nbsp;
          </div>
        </form>

        <a @click="showModal">Forgot Password?</a>
        <ForgotPassword v-show="isModalVisible" @close="closeModal"/>
        <br>
        <span style="text-align: center; color: rgb(200,200,200);">Don't have an account? <router-link :to="{ name: 'Register' }">Sign up</router-link> now.</span>

      </div>
    </div>
    </div>
  </div>
</section>
</body>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ForgotPassword from '@/components/student/user/ForgotPassword.vue'

export default {
  // Adding data values that will bind to the HTML elements
  data() {
    return {
      username: '',
      password: '',
      isModalVisible: false
    }
  },
  components: {
    ForgotPassword
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
            this.$router.push('/')
          }
        })
        .catch(err => {
          // this.error = "Wrong information. Please re-enter!!"
          console.log(err)
        })
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.column {
  border-radius: 1em;
  background-color: rgba(0,0,0,0.3);
  padding: 4em 7em;
}

a {
  color: white;
}

a:hover {
  color: white;
  font-weight: bold;
}

@media (max-width:600px) {
  #login-form {
    padding: 2em 3.5em;
  }
}
</style>
