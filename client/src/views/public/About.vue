<template>
<body>
<div class="hero is-fullheight has-navbar-fixed-top">

<div class="section mb-6">
  <div class="columns">

    <div class="column is-6">
      <img src="https://static.dezeen.com/uploads/2017/06/dezeen-features-haworth-office-culture_dezeen_2364_col_12-852x522.jpg">
    </div>

    <div class="column column-right is-6">
      <div class="">
      <h1 class="title has-text-white mx-5">About</h1>
      <p class="has-text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet</p>

      <h1 class="title has-text-white mt-5 mx-5">Opening Hours</h1>
      <table class="mb-4">
        <tr>
          <th>Mon-Fri</th>
          <td>8:30AM - 9:30PM</td>
        </tr>
        <tr>
          <th>Sat</th>
          <td>8:30AM - 5PM</td>
        </tr>
        <tr>
          <th>Sun</th>
          <td>CLOSED</td>
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

    <div class="column is-6">
      <h1 class="title has-text-white mx-5">Address</h1>
      <p class="has-text-white">50 Nanyang Ave, 639798 Singapore</p>

      map map map
    </div>

    <div class="column is-6 column-right">
      <h1 class="title has-text-white mx-5">How to Get Here?</h1>
      <p class="has-text-white text-left">
        <b>BY CAR</b> <br/>
        The university is flanked by the PIE to the south and Jalan Bahar to the east. There are two entrances when travelling via the PIE, take either the Jalan Bahar entrance (Exit 36) or the Pioneer North entrance (Exit 38). 

        <br/><br/>
        <b>BY BUS</b> <br/>
        Service 179 & 199: Both services depart from Boon Lay Bus Interchange (next to Boon Lay MRT Station) to the University. The services ply from 0600-2400 hrs on weekdays and Saturdays, and from 0630-0020hrs on Sundays and Public Holidays.
      
        <br/><br/>
        <b>BY NTU SHUTTLE BUS SERVICE</b> <br/>
        Campus Rider is a free shuttle bus service to and from Pioneer MRT station.
      </p>
    </div>

  </div>
</div>

<div id="contact-us" class="section mb-6">

  <div class="contact-form">
  <div class="contact-title">
    <h1 class="title has-text-white mx-5">Contact Us</h1>
  </div>
  <form>
    <div class="contact-info">
      <input class="contact-name" type="text" placeholder="Name">
      <input class="contact-email" type="email" placeholder="Email">
    </div>
    <br/>
    <textarea class="contact-feedback" type="textarea" rows="10" placeholder="Message"></textarea>
    <button class="button is-fullwidth mt-5" type="submit">SEND</button>
  </form>

  </div>

</div>

</div>
</body>
</template>

<style lang="scss" scoped>
.column {
  margin: auto;
}

.column-right {
  border-left: 1px solid white;
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
</style>
