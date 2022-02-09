import { createStore } from 'vuex'
import auth from './modules/auth'
import workshop from './modules/workshop'
import users from './modules/users'
import rooms from './modules/rooms'
import articles from './modules/articles'
import bookings from './modules/bookings'
import about from './modules/about'
import calendar from './modules/calendar'

export default createStore({
  modules: {
    auth,
    workshop,
    users,
    rooms,
    articles,
    bookings,
    about,
    calendar
  }
})
