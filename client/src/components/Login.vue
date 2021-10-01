<!-- Login page -->
<!-- style="background-image: url('https://eastudy.sg/wordpress/wp-content/uploads/2018/06/0625EN01.jpg'); background-repeat: no-repeat; background-size: cover; opacity: 0.5"> -->

<template>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
      <div class="column is-9-desktop">
        <form id="login-form" style="padding: 4em 7em">
          <h1 class="title is-size-3 has-text-centered"><i>Login</i></h1>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-size-5" type="text" placeholder="Username">
                <p>&nbsp;</p>
                <span class="icon is-size-5 is-left"><fa icon="user"/></span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-size-5" type="password" placeholder="Password">
                <p>&nbsp;</p>
                <span class="icon is-size-5 is-left"><fa icon="lock"/></span>
              </div>
          </div>
          <div class="control">
            <button class="button is-warning is-outlined is-fullwidth">Login</button>&nbsp;
          </div>
          <a>Forgot Password?</a>
          <br>
          <span style="text-align: center">Don't have an account? <router-link :to="{ name: 'Signup' }">Sign up</router-link> now.</span>
        </form>
      </div>
    </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
    name: 'Login'
}
</script>
