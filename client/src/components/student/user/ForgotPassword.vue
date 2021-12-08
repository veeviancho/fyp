<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    
    <!-- Step 1: Get Email -->
    <div class="box" v-show="show1">
      <p class="form-title">To reset your password, a code will be sent to your email.</p>
      <form @submit.prevent="updateUser">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" id="email" name="email" v-model="email" placeholder="johndoe@e.ntu.edu.sg">
          </div>
        </div>
        <p class="has-text-danger has-text-centered mb-3"></p>
        <button type="submit" class="button is-outlined is-fullwidth" @click="showNext()">Send Code to Email</button>
      </form>
    </div>

    <!-- Step 2: Enter Code -->
    <div class="box" v-show="show2">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <p>{{ email }}</p>
          <div class="small"><small class="has-text-success">A code has been sent to the above address!</small></div>
        </div>
      </div>
      <form @submit.prevent="updateUser">
      <div class="field">
        <label class="label">Enter Code</label>
        <div class="control">
          <input class="input" type="text" id="code" name="code" placeholder="Code">
        </div>
      </div>
      <button type="submit" class="button is-outlined is-fullwidth" @click="showNext()">Proceed</button>
      </form>
    </div>

    <!-- Step 3: Reset Password -->
    <div class="box" v-show="show3">
      <form @submit.prevent="updateUser">
      <div class="field">
        <label class="label">New Password</label>
        <div class="control">
          <input class="input" type="password" id="password" name="password" placeholder="New Password">
        </div>
      </div> 
      <div class="field">
        <label class="label">Confirm Password</label>
        <div class="control">
          <input class="input" type="password" id="password2" name="password2" placeholder="Confirm Password">
        </div>
      </div> 
      <button type="submit" class="button is-outlined is-fullwidth">Update</button>
      </form>
    </div>

  </div>
  <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
export default {
  name: 'Forgot Password',
  data() {
    return {
      email: '',
      show1: true,
      show2: false,
      show3: false
    }
  },
  methods: {
    close() {
      this.$emit('close');
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
    },
    showNext() {
      if (this.show1 === true) {
        this.show1 = false;
        this.show2 = true;
        console.log(this.email);
      } else if (this.show2 === true) {
        this.show2 = false;
        this.show3 = true;
      }
    }
  }
}
</script>

<style scoped>
button {
  color: black;
}

.small {
  padding: 0.2rem 0rem;
}

input:focus {
  border: 1px solid #329AA0;
}

.box {
  padding: 2rem 2rem;
}

.form-title {
  margin: 0 0 1rem 0;
}

</style>

