<template>
    <section class="section is-large">
        <h1 class="title">
            <transition name="hello">
                <span v-if="user">Hello </span>
            </transition>
            <transition name="fade">
                <router-link :to="{ name: 'Profile' }" class="student-name italic " v-if="user">
                    {{ user.name }}
                </router-link>
            </transition>
        </h1>
        <p class="subtitle">
            “Live as if you were to die tomorrow. Learn as if you were to live forever.”
            <br>
            <span class="italic">-Mahatma Gandhi.</span>
        </p>
        <router-link :to="{ name: 'Workshops' }"><button class="button is-outlined">View Workshops</button></router-link>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        ...mapActions(['getProfile'])
    },
    created() {
        this.getProfile();
    }
}
</script>

<style scoped>
.title {
    font-size: 4rem;
}

.student-name {
    text-decoration: underline;
    /* color: hsl(0, 0%, 21%); */
    color: #5272A4;
    /* background-color: #92abd1; */
}

.student-name:hover {
    text-decoration: none;
    /* color: hsl(0, 0%, 21%); */
    color: #7a9cce;
    /* background-color: #dfeafa; */
}

.italic {
    font-style: italic;
}

.hello-enter-active {
    transition: all 0.4s ease-out;
}

.hello-enter-from {
    /* transform: translateX(-20px); */
    opacity: 0;
}

.fade-enter-active {
    transition: all 0.8s ease-out;
    transition-delay: 1s;
}

.fade-enter-from {
    /* transform: translateX(-20px); */
    opacity: 0;
}

/* .hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #5272A4;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #92abd1;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
} */

</style>
