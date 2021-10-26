import { createRouter, createWebHistory } from 'vue-router'

// Public views
import Home from '../views/public/Home.vue'
import Articles from '../views/public/Articles.vue'
import About from '../views/public/About.vue'
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

import Welcome from '../components/student/user/Welcome.vue'
import Profile from '../views/user/profile/Profile.vue'

// Admin views
import AdminHome from '../views/admin/Home.vue'
import AdminAbout from '../views/admin/About.vue'
import AdminArticles from '../views/admin/Articles.vue'
import AdminWorkshop from '../views/admin/Workshop.vue'
import AdminBooking from '../views/admin/Booking.vue'
import AdminRealTime from '../views/admin/RealTime.vue'
import AdminProfile from '../views/admin/RealTime.vue'

const routes = [
  // Public views
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      public: true
    }
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
    meta: {
      public: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      public: true
    }
  },
  // Public views - not accessible when logged in
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      public: true,
      onlyLoggedOut: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      public: true,
      onlyLoggedOut: true
    }
  },

  // User views - not accessible when not logged in
  // Workshops
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
  // Bookings
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
  // Activities
  {
    path: '/realtime',
    name: 'Real-time Activities',
    component: Activities
  },
  {
    path: '/timetable',
    name: 'Timetable',
    component: Timetable
  },
  // User
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  { 
    path: '/:pathMatch(.*)*', 
    meta: {
      notFound: true
    } 
  },

  // Admin views
  {
    path: '/admin',
    name: 'Admin Home',
    component: AdminHome,
  },
  {
    path: '/admin/about',
    name: 'Admin About',
    component: AdminAbout
  },
  {
    path: '/admin/articles',
    name: 'Admin Articles',
    component: AdminArticles
  },
  {
    path: '/admin/workshop',
    name: 'Admin Workshop',
    component: AdminWorkshop
  },
  {
    path: '/admin/booking',
    name: 'Admin Booking',
    component: AdminBooking
  },
  {
    path: '/admin/realtime',
    name: 'Admin Real Time',
    component: AdminRealTime
  },
  {
    path: '/admin',
    name: 'Admin Profile',
    component: AdminProfile
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active'
})

// Global Route Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyLoggedOut = to.matched.some(record => record.meta.onlyLoggedOut)
  const notFound = to.matched.some(record => record.meta.notFound)

  //if not logged in and is not a public page, redirect to Login page
  //if not logged in and not found, redirect to login page
  if (!token && !isPublic || (!token && notFound)) next ({ name: 'Login' });

  //if logged in and wants to access login/register/etc pages, redirect to profile page
  //if logged in and wants to access a page that doesn't exist, redirect to profile page
  else if ((token && onlyLoggedOut) || (token && notFound)) next ({ name : 'Profile'});
  
  //else continue to the route user intended to access
  else next();
});

export default router
