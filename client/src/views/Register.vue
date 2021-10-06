<template>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
      <div class="column is-9-desktop">

        <form id="login-form" style="padding: 4em 7em" @submit.prevent="register">
        <!-- the submit event will no longer reload the page -->
          <h1 class="title is-size-3 has-text-centered"><i>Create Account</i></h1>

          <br>

          <div class="field">
            <div class="control">
              <input class="input is-size-5" type="text" id="name" name="name" v-model="name" placeholder="Name" required>
            </div>
          </div>

          <!-- <div class="field">
            <div class="select is-size-5 is-fullwidth">
              <select name="programme">
                <option>Communications Engineering</option>
                <option>Computer Control & Automation</option>
                <option>Electronics</option>
                <option>Power Engineering</option>
                <option>Signal Processing</option>
                <option>Green Electronics</option>
                <option>Integrated Circuit Design</option>
              </select>
            </div>
          </div> -->

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

          <div class="control">
            <button type="submit" class="button is-warning is-outlined is-fullwidth" @click="register">Sign Up</button>&nbsp;
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>
</section>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js';

export default {
    name: 'Register',
    data () {
      return {
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
      }
    },
    methods: {
      async register() {
        //call endpoint
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
        //once we get that response, we can print out response data
        console.log(response.data);
      }
    }
}
</script>
