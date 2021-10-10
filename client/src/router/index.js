import { createRouter, createWebHistory } from 'vue-router'

// Public views
import Home from '../views/public/Home.vue'
import Articles from '../views/public/Articles.vue'
import Maps from '../views/public/Map.vue'
import Login from '../views/public/auth/Login.vue'
import Register from '../views/public/auth/Register.vue'

// User views
import Workshop from '../views/user/workshop/Workshop.vue'
import Details from '../views/user/workshop/WorkshopDetails.vue'
import History from '../views/user/workshop/History.vue'
import Upcoming from '../views/user/workshop/Upcoming.vue'

import Booking from '../views/user/booking/Booking.vue'
import Manage from '../views/user/booking/Manage.vue'

import Activities from '../views/user/activities/RealTime.vue'
import Timetable from '../views/user/activities/Timetable.vue'

import Profile from '../views/user/profile/Profile.vue'

const routes = [
  // Public views
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/map',
    name: 'How to Get Here?',
    component: Maps
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  // User views
  {
    path: '/workshop',
    name: 'Workshops',
    component: Workshop
  },
  {
    path: '/workshop/details',
    name: 'Workshop Details',
    component: Details
  },
  {
    path: '/workshop/history',
    name: 'History',
    component: History
  },
  {
    path: '/workshop/upcoming-workshops',
    name: 'Upcoming Workshops',
    component: Upcoming
  },
  {
    path: '/booking',
    name: 'Book A Room!',
    component: Booking
  },
  {
    path: '/booking/manage',
    name: 'Manage Bookings',
    component: Manage
  },
  {
    path: '/activities',
    name: 'Real-time Activities',
    component: Activities
  },
  {
    path: '/timetable',
    name: 'Timetable',
    component: Timetable
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active'
})

export default router
