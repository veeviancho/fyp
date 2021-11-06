<template>
<body>
  <nav class="box home-nav">
    <a href="#top">home</a>/
    <a href="#space-1">space 1</a>/
    <a href="#space-2">space 2</a>/
    <a href="#space-3">space 3</a>/
    <a href="#space-4">space 4</a>
  </nav>

  <section id="top">
    <h1>
      Welcome
      <transition name="fade" v-if="isLoggedIn">
        <router-link :to="{ name: 'Profile' }" class="student-name" v-if="user">{{ user.name }}</router-link>
      </transition>
    </h1>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <br>
    <router-link :to="{ name: 'About' }"><button class="button">Explore</button></router-link>
  </section>

  <section id="space-1">
    <h1>Space 1</h1>
    <p>Some description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br> Book this room now.</p>
    <br>
    <router-link :to="{ name: 'Login' }"><button class="button" v-if="!isLoggedIn">Login</button></router-link>
    <router-link :to="{ name: 'Book A Room!' }"><button class="button" v-if="isLoggedIn">Book Now</button></router-link>
  </section>

  <section id="space-2">
    <h1>Space 2</h1>
    <p>Some description. Book this room now.</p>
    <br>
    <router-link :to="{ name: 'Login' }"><button class="button" v-if="!isLoggedIn">Login</button></router-link>
    <router-link :to="{ name: 'Book A Room!' }"><button class="button" v-if="isLoggedIn">Book Now</button></router-link>
  </section>

  <section id="space-3">
    <h1>Space 3</h1>
    <p>Some description. Book this room now.</p>
    <br>
    <router-link :to="{ name: 'Login' }"><button class="button" v-if="!isLoggedIn">Login</button></router-link>
    <router-link :to="{ name: 'Book A Room!' }"><button class="button" v-if="isLoggedIn">Book Now</button></router-link>
  </section>

  <section id="space-4">
    <h1>Space 4</h1>
    <p>Some description. Book this room now.</p>
    <br>
    <router-link :to="{ name: 'Login' }"><button class="button" v-if="!isLoggedIn">Login</button></router-link>
    <router-link :to="{ name: 'Book A Room!' }"><button class="button" v-if="isLoggedIn">Book Now</button></router-link>
  </section>

</body>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',
    computed: {
      ...mapGetters(['isLoggedIn', 'user'])
    },
    methods: {
      ...mapActions(['getProfile'])
    },
    created() {
      if (this.isLoggedIn) {
        this.getProfile();
      }
    }
}
</script>

<style lang="scss" scoped>

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

section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 5rem 5rem;
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

// Background Images

#top {
  background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://static.dezeen.com/uploads/2017/06/dezeen-features-haworth-office-culture_dezeen_2364_col_12-852x522.jpg') no-repeat center center/cover;
}

#space-1 {
  background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://www.demcointeriors.com/wp-content/uploads/2017/05/Richland-Library-Sandhills-Interior-Rendering-1024x569.jpg') no-repeat center center/cover;
}

#space-2 {
  background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://mydecorative.com/wp-content/uploads/2019/11/community-spaces.jpg') no-repeat center center/cover;
}

#space-3 {
  background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://designinc.com.au/cms_uploads/images/1003_fbe-2.jpg') no-repeat center center/cover;
}

#space-4 {
  background: linear-gradient(rgba(0, 0, 0, 0.75),rgba(0, 0, 0, 0.7)), url('https://www.csiwallpanels.com/images/com_hikashop/upload/community.jpg') no-repeat center center/cover;
}

@media (max-width: 1023px) {
  .home-nav {
    display: none;
  }
}

</style>