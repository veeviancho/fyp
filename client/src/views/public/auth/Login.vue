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
              <input class="input is-size-5" type="text" v-model="email" placeholder="Email Address" required>
              <span class="icon is-size-5 is-left"><fa icon="envelope"/></span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-size-5" type="password" v-model="password" placeholder="Password" required>
              <span class="icon is-size-5 is-left"><fa icon="lock"/></span>
            </div>
          </div>
          
          <!-- Display message when login fails -->
          <p class="has-text-danger has-text-centered mb-3" v-if="error.login">{{ error.login }} <span><a class="resend" v-if="link" @click="resendClicked">{{ this.resend }}</a></span></p>

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
      email: '',
      password: '',
      isModalVisible: false,
      link: false
    }
  },
  components: {
    ForgotPassword
  },
  computed: {
    // ...mapGetters(['msg'])
    ...mapGetters(['authState', 'error', 'resend']),
    isLoading() {
      return this.authState === 'loading';
    }
  },
  methods: {
    // Adding actions to the methods of this component
    ...mapActions(['login', 'resendLink']),
    loginUser() {
      // Assign user to be passed to vuex login action
      let user = {
        email: this.email.toLowerCase(),
        password: this.password
      }
      // Call vuex login action
      this.login(user)
        // Then whatever the respond that is sent back, we will use it here
        .then(res => {
          if (res.data.success) {
            if (res.data.user.username === "admin") {
              this.$router.push('/admin')
            } else {
              this.$router.push('/')
            }
          }
        })
        .catch(err => {
          // this.error = "Wrong information. Please re-enter!!"
          console.log(err)
          if (this.error.resend) {
            console.log(this.error.resend)
            this.link = true
          } else {
            this.link = false
          }
        })
    },
    resendClicked() {
      let email = this.email
      this.resendLink(email).then(res => {
        if (res.data.success) {
          console.log(res.data.msg)
        }
      })
      .catch(err => {
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
.resend {
  text-decoration: underline;
}

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
