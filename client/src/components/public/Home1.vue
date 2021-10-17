<template>
<body>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#blog">Blog</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <section id="home">#Home</section>
  <section id="about">#About</section>
  <section id="blog">#Blog</section>
  <section id="contact">#Contact</section>
</body>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

nav {
  background: #34495e;
  height: 4rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

nav a {
  color: #ecf0f1;
}

ul {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

ul li {
  margin-right: 1rem;
}

section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: #ecf0f1;
}

section#home {
  background: #16a085;
}
section#about {
  background: #c0392b;
}
section#blog {
  background: #f39c12;
}
section#contact {
  background: #2c3e50;
}
</style>