<template>
<body>
  <nav class="box home-nav">
    <a href="#top">Top</a>
    <span v-for="item in rooms" :key="item._id">
      <a :href="'#' + item._id">{{ item.title }}</a>
    </span>
  </nav>

  <section id="top" class="bgImg" :style="{  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.7)), url(' + about.imageLink + ')' }">
    <h1>
      Welcome
      <transition name="fade" v-if="isLoggedIn">
        <router-link :to="{ name: 'Profile' }" class="student-name" v-if="user">{{ user.name }}</router-link>
      </transition>
    </h1>
    <p>{{ about.description }}</p>
    <br>
    <router-link :to="{ name: 'About' }"><button class="button">Explore</button></router-link>
  </section>

  <div v-for="item in rooms" :key="item._id">
  <!-- <section :id="item._id" class="bgImg" :style="{  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.7)), url(' + item.imageLink + ')' }"> -->
  <section 
    :id="item._id" class="bgImg" 
    :style="{  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.7)), url(' + item.imageLink + ')' }"
  >
    <h1>{{ item.title }}</h1>
    <p>{{ item.description }}</p>
    <br>
    <router-link :to="{ name: 'Login' }"><button class="button" v-if="!isLoggedIn">Login</button></router-link>
    <router-link :to="'/rooms/' + item._id"><button class="button" v-if="isLoggedIn">Book Now</button></router-link>

  </section>
  </div>

</body>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',
    computed: {
      ...mapGetters(['isLoggedIn', 'user', 'rooms', 'about'])
    },
    methods: {
      ...mapActions(['getProfile', 'getAllRooms', 'getAbout'])
    },
    created() {
      this.getAbout();
      this.getAllRooms();
      if (this.isLoggedIn) {
        this.getProfile();
      }
    }
}
</script>

<style lang="scss" scoped>

.bgImg {
  background-repeat: no-repeat;
  background-attachment: center;
  background-position: center;
  background-size: cover;
}

// Home Navbar Style
nav {
  background-color: rgba(255,255,255,0.3);
  // background-color: transparent;
  color: white;
  margin: 6rem 10rem;
  padding: 0.3em 0;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  // border-bottom: 1px solid white;
}

a:hover {
  color: black;
}

a {
  text-align: center;
  margin: 0 2.5rem;
  font-size: 1rem;
  color: white;
}

// Content Style

body {
  height: 100vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}

section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 5rem 5rem;

  scroll-snap-align: start;
}

h1 {
  font-size: 6vh;
  font-weight: bold;
  text-align: center;
}

.student-name {
  // padding: 0rem 1rem;
  font-size: 6vh;
  margin: 0px;
  text-decoration: underline;
}

.student-name:hover {
  background-color: #FFDA7A;
  color: black;
  text-decoration: none;
}

.fade-enter-active {
  transition: all 0.9s ease-out;
//   transition-delay: 0.5s;
}

.fade-enter-from {
  opacity: 0;
}

#top {
  background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://static.dezeen.com/uploads/2017/06/dezeen-features-haworth-office-culture_dezeen_2364_col_12-852x522.jpg') no-repeat center center/cover;
}

p {
  font-size: 2.5vh;
  text-align: center;
}

button {
  background-color: rgba(0,0,0,0);
  color: white;
  width: 10rem;
}

button:hover {
  background-color: rgba(255,255,255,0.3);
  color: white;
}

@media (max-width: 1023px) {
  .home-nav {
    display: none;
  }
  p {
    font-size: 2vh;
  }
}

</style>