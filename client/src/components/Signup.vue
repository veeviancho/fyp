<template>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
      <div class="column is-9-desktop">

        <form id="login-form" style="padding: 4em 7em">
          <h1 class="title is-size-3 has-text-centered"><i>Create Account</i></h1>

          <!-- <div class="control has-text-centered">
            <label class="radio"><input type="radio" name="rsvp"> Student</label>
            <label class="radio" disabled><input type="radio" name="rsvp" disabled> Admin</label>
          </div> -->

          <br>

          <div class="field">
            <div class="control">
              <input class="input is-size-5" type="text" placeholder="Name">
            </div>
          </div>

          <div class="field">
            <div class="select is-size-5 is-fullwidth">
              <select>
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
              <input class="input is-size-5" type="text" placeholder="Email Address">
              <span class="icon is-size-5 is-left"><fa icon="envelope"/></span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-size-5" type="text" placeholder="Username">
              <span class="icon is-size-5 is-left"><fa icon="user"/></span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-size-5" type="password" placeholder="Password">
              <span class="icon is-size-5 is-left"><fa icon="lock"/></span>
            </div>
          </div>

          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-size-5" type="password" placeholder="Confirm Password">
              <span class="icon is-size-5 is-left"><fa icon="lock"/></span>
            </div>
          </div>

          <div class="control">
            <button class="button is-warning is-outlined is-fullwidth">Sign Up</button>&nbsp;
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
    name: 'Signup'
}
</script>
