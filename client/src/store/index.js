import { createStore } from 'vuex'
import auth from './modules/auth'
import workshop from './modules/workshop'
import users from './modules/users'
import rooms from './modules/rooms'

export default createStore({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    auth,
    workshop,
    users,
    rooms
  }
})
