import { createStore } from 'vuex'
import auth from './modules/auth'
import workshop from './modules/workshop'
import users from './modules/users'
import rooms from './modules/rooms'
import articles from './modules/articles'

export default createStore({
  modules: {
    auth,
    workshop,
    users,
    rooms,
    articles
  }
})
