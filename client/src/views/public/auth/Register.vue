<template>
<body>
  <section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
    <div class="columns is-centered">
      <div class="column is-9-desktop has-navbar-fixed-top">

        <form id="login-form" style="padding: 2em 5em;" @submit.prevent="registerUser">
        <!-- the submit event will no longer reload the page -->
          <h1 class="title is-size-3 has-text-centered has-text-white"><i>Create Account</i></h1>

          <div class="field">
            <div class="control">
              <input class="input is-size-5" type="text" id="name" name="name" v-model="name" placeholder="Name" required>
            </div>
          </div>

          <div class="field">
            <div class="select is-size-5 is-fullwidth">
              <select name="programme" v-model="programme">
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
            <div class="control has-icons-left">
              <input class="input is-size-5" type="text" id="username" name="username" v-model="username" placeholder="Username">
              <span class="icon is-size-5 is-left"><fa icon="user"/></span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-size-5" type="email" id="email" name="email" v-model="email" placeholder="Email Address">
              <span class="icon is-size-5 is-left"><fa icon="envelope"/></span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-size-5" type="password" id="password" name="password" v-model="password" placeholder="Password">
              <span class="icon is-size-5 is-left"><fa icon="lock"/></span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-size-5" type="password" id="password2" name="password2" v-model="password2" placeholder="Confirm Password">
              <span class="icon is-size-5 is-left"><fa icon="lock"/></span>
            </div>
          </div>

          <!-- Display message when registration fails -->
          <p class="has-text-danger has-text-centered mb-3 white" v-if="error.register">{{ error.register }} <fa class="fa" icon="info-circle" v-if="error.info" @click="showModal"/></p>
          <ErrorMsg v-show="isModalVisible" @close="closeModal"/>

          <!-- Display message when registration is successful -->
          <p class="has-text-success has-text-centered mb-3 white" v-if="success_msg">{{ success_msg }}</p>

          <div class="control">
            <button type="submit" v-bind:class="[isLoading ? 'is-loading': '', 'button is-fullwidth']">Sign Up</button>&nbsp;
          </div>
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
import ErrorMsg from '@/components/student/user/ErrorMsg.vue';

export default {
    name: 'Register',
    data () {
      return {
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        programme: 'Communications Engineering',
        isModalVisible: false,
        success_msg: ''
      }
    },
    components: {
      ErrorMsg
    },
    computed: {
      ...mapGetters(['error', 'authState']),
      isLoading() {
        return this.authState === 'loading';
    }
    },
    methods: {
      ...mapActions(['register']),
      capitalize() {
        let str = this.name.toLowerCase().split(" ");
        for (let i=0; i<str.length; i++) {
          str[i] = str[i][0].toUpperCase() + str[i].slice(1);
        }
        this.name = str.join(" ");
      },
      registerUser() {
        this.capitalize();
        let user = {
          name: this.name,
          username: this.username,
          email: this.email.toLowerCase(),
          password: this.password,
          password2: this.password2,
          programme: this.programme
        }
        console.log(user)
        this.register(user)
          .then(res => {
            if (res.data.success) {
              this.success_msg = res.data.msg
              // this.$router.push('/login')
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
}
</script>

<style lang="scss" scoped>
.column {
  border-radius: 1em;
  background-color: rgba(0,0,0,0.3);
}

.fa {
  color: rgb(186, 186, 187);
  cursor: pointer;
}
</style>
