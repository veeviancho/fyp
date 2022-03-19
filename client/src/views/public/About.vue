<template>
<body>
<div class="hero is-fullheight has-navbar-fixed-top">

<div class="section mb-6">
  <div class="columns">

    <div class="column is-6">
      <img 
        style="width:100%;"
        :src="about.imageLink">
    </div>

    <div class="column column-right is-6">
      <div class="">
      <h1 class="title has-text-white mx-5">About</h1>
      <p class="has-text-white" v-if="about">{{ about.aboutDesc }}</p>

      <h1 class="title has-text-white mt-5 mx-5">Opening Hours</h1>
      <table class="mb-4">
        <tr v-for="(value, key) in about.openingHours" :key="key">
          <th>{{ key }}</th>
          <td>{{ value }}</td>
        </tr>
      </table>
      <a href="#map"><button class="button is-fullwidth my-2">How to Get Here?</button></a>
      <a href="#contact-us"><button class="button is-fullwidth my-2">Contact Us</button></a>
      </div>
    </div>

  </div>
</div>

<div id="map" class="section mb-6">
  <div class="columns">

    <div class="column column-left is-6">
      <h1 class="title has-text-white mx-5">Address</h1>
      <p class="has-text-white" v-if="about">{{ about.address }}</p>
      <iframe
        width="100%"
        height="500rem"
        style="margin: 2rem auto"
        loading="lazy"
        allowfullscreen
        :src="address">
      </iframe>
    </div>

    <div class="column is-6">
      <h1 class="title has-text-white mx-5">How to Get Here?</h1>
      <p class="has-text-white text-left" v-for="(value, key) in about.getHere" :key="key">
        <b>{{ key }}</b> <br/>{{ value }}
        <br/><br/>
      </p>
    </div>

  </div>
</div>

<div id="contact-us" class="section mb-6">

  <div class="contact-form">
  <div class="contact-title">
    <h1 class="title has-text-white">Contact Us</h1>
  </div>
  <form @submit.prevent="submitContact">
    <div class="contact-info">
      <input class="contact-name" type="text" placeholder="Name" v-model="name" required>
      <input class="contact-email" type="email" placeholder="Email" v-model="email" required>
    </div>
    <br/>
    <textarea class="contact-feedback" type="textarea" rows="10" placeholder="Message" v-model="message" required></textarea>

    <p class="has-text-danger has-text-centered mb-3" v-if="aboutError.contact">{{ aboutError.contact }}</p>
    <p class="has-text-success has-text-centered mb-3 white" v-if="successMsg">{{ successMsg }}</p>

    <button class="button is-fullwidth mt-5" type="submit">SEND</button>
  </form>

  </div>

</div>

</div>
</body>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      successMsg: ''
    }
  },
  computed: {
    ...mapGetters(['about', 'aboutStatus', 'aboutError']),
    address() {
      let src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAX-VzgMYlJNPXG8mYCqSE2zDUjbm1fg8c&q="
      let venue = this.about.address ? this.about.address : ''
      venue = venue.replace(/\s/g, '+')
      src += venue
      return src
    }
  },
  methods: {
    ...mapActions(['getAbout', 'createContact']),
    submitContact() {
      let contact = {
        name: this.name,
        email: this.email,
        message: this.message
      }
      this.createContact(contact)
      .then(() => {
        if (this.aboutStatus.contact === 'success') {
          this.name = ''
          this.email = ''
          this.message = ''
          this.successMsg = "Message successfully sent!"
          console.log("success")
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getAbout()
  }
}
</script>

<style lang="scss" scoped>
.column {
  margin: auto;
}

.column-right {
  border-left: 1px solid white;
}

.column-left {
    border-right: 1px solid white;
}

.title {
  border-bottom: 1px solid white;
  text-align: center;
}

.section {
  background-color: #161C20;
}

p {
  text-align: center;
}

.text-left {
  text-align: left;
}

table {
  margin: auto;
}

th, td {
  color: white;
  padding: 0.1rem 2rem;
}

.contact-form {
  padding: 2em 10em;
}

.contact-title {
  margin: 0 10em 2.5em;
}

.contact-info {
  display: flex;
  justify-content: space-between;
}

.contact-name, .contact-email {
  width: 45%;
  text-align: center;
  color: white;
  background-color: #313843;
  padding: 1rem 1.5rem;
  border: none;
}

.contact-feedback {
  width: 100%;
  color: white;
  background-color: #313843;
  padding: 1rem 1.5rem;
  border: none;
}

::placeholder {
  color: #B1B1B1;
}

.column {
  padding: 0 4rem;
}

@media (max-width: 768px) {
  .column-right {
    border-left: none;
  }
  .column-left {
    border-right: none;
  }
  .contact-title {
    margin: 0px 0px 2.5em;
  }
  .contact-form {
    padding: 0px 0px;
  }
  .column {
    padding: 0 0.5rem;
    font-size: 2.5vw;
  }
  .title {
    font-size: 4.5vw;
  } 
}

@media (min-width: 768px) and (max-width: 1000px) {
  .contact-title {
    margin: 0 0 2.5em;
  }
}
</style>
