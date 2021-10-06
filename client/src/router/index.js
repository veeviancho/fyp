import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Initiatives from '../views/information/Initiatives.vue'
import News from '../views/information/News.vue'
import Tips from '../views/information/Tips.vue'
import Maps from '../views/Map.vue'
import Workshop from '../views/workshop/Workshop.vue'
import History from '../views/workshop/History.vue'
import Upcoming from '../views/workshop/Upcoming.vue'
import Booking from '../views/booking/Booking.vue'
import Manage from '../views/booking/Manage.vue'
import Activities from '../views/real-time/Activities.vue'
import Rooms from '../views/real-time/Rooms.vue'
import Profile from '../views/user/Profile.vue'
import Details from '../views/workshop/WorkshopDetails.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ntu-initiatives',
    name: 'NTU Initiatives',
    component: Initiatives
  },
  {
    path: '/news',
    name: 'News, Events, and Trends',
    component: News
  },
  {
    path: '/tips-and-tricks',
    name: 'Tips and Tricks',
    component: Tips
  },
  {
    path: '/map',
    name: 'How to Get Here?',
    component: Maps
  },
  {
    path: '/workshop',
    name: 'Workshops',
    component: Workshop
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
    path: '/rooms',
    name: 'Unoccupied Rooms',
    component: Rooms
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/workshop/details',
    name: 'Workshop Details',
    component: Details
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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active'
})

export default router
