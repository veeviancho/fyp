<template>
<body>
  <nav class="box">
    <a href="#top">home</a>/
    <a href="#space-1">space 1</a>/
    <a href="#space-2">space 2</a>/
    <a href="#space-3">space 3</a>/
    <a href="#space-4">space 4</a>
  </nav>

  <section id="top">
    <h1>EEE Lifelong Learning Space</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Augue interdum velit euismod in. Nec feugiat nisl pretium fusce id velit. Leo a diam sollicitudin tempor id eu nisl.</p>
    <br>
    <router-link :to="{ name: 'About' }"><button class="button">Explore</button></router-link>
  </section>

  <section id="space-1">
    <h1>Space 1</h1>
    <p>Some description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br> Book this room now.</p>
    <br>
    <router-link :to="{ name: 'Login' }"><button class="button">Login</button></router-link>
  </section>

  <section id="space-2">
    <h1>Space 2</h1>
    <p>Some description. Book this room now.</p>
    <br>
    <router-link :to="{ name: 'Login' }"><button class="button">Login</button></router-link>
  </section>

  <section id="space-3">
    <h1>Space 3</h1>
    <p>Some description. Book this room now.</p>
    <br>
    <router-link :to="{ name: 'Login' }"><button class="button">Login</button></router-link>
  </section>

  <section id="space-4">
    <h1>Space 4</h1>
    <p>Some description. Book this room now.</p>
    <br>
    <router-link :to="{ name: 'Login' }"><button class="button">Login</button></router-link>
  </section>

</body>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Home',
    computed: {
      ...mapGetters(['isLoggedIn'])
    }
}
</script>

<style lang="scss" scoped>

// Home Navbar Style
nav {
  background-color: rgba(255,255,255,0.3);
  color: white;
  margin: 6rem 10rem;
  padding: 0.3em 0;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
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
  font-size: 4rem;
  font-weight: bold;
}

p {
  font-size: 1.5rem;
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
</style>