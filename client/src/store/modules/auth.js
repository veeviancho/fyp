import axios from 'axios';

const state = {
    status: '',
    token: localStorage.getItem('token') || '', //set to empty string if not found
    user: {},
    error: null, //registration error
    info: null,
    loginError: null,
    updateError: null
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error,
    info: state => state.info,
    loginError: state => state.loginError,
    updateError: state => state.updateError
};

const actions = {

    // Login Action
    async login({ commit }, user) {
        commit('login_request'); //commit are for the mutations
        try {
            let res = await axios.post('http://localhost:5000/api/users/login', user) //awaiting response from the server
            if (res.data.success) {
                // Getting token and user data from server
                const token = res.data.token;
                const user = res.data.user;
                // Store token in local storage
                localStorage.setItem('token', token);
                // Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('login_success', token, user);
            }
            return res;
        } catch (err) {
            commit('login_error', err)
        }
    },

    // Logout Action
    logout({ commit }) {
        commit('logout');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        return;
    },

    // Register Action
    async register({ commit }, user) {
        try {
            commit('register_request');
            let res = await axios.post('http://localhost:5000/api/users/register', user);
            if (res.data.success) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },

    // Get User Profile
    async getProfile({ commit }) {
        commit('profile_request');
        let res = await axios.get('http://localhost:5000/api/users/profile');
        commit('profile_success', res.data.user);
        return res;
    },

    // Update User Profile
    async update({ commit }, user) {
        try {
            commit('update_request');
            let res = await axios.put('http://localhost:5000/api/users/update/' + user.id, user);
            if (res.data.success) {
                commit('update_success', res.data.user);
            }
            return res;
        } catch (err) {
            commit('update_error', err)
        }
    }
};

const mutations = {
    // Login mutations
    login_request(state) {
        state.status = 'loading'
        state.error = null
        state.loginError = null
        state.updateError = null
    },
    login_success(state, token, user) {
        state.status = 'success'
        state.token = token
        state.user = user
        state.error = null
        state.loginError = null
        state.updateError = null
    },
    login_error(state, err) {
        state.status = 'failed',
        state.loginError = err.response.data.msg2
        state.error = null
        state.updateError = null
    },
    // Logout mutation
    logout(state) {
        state.status = ''
        state.token = ''
        state.user = ''
        state.error = null
        state.loginError = null
        state.updateError = null
    },
    // Register mutation
    register_request(state) {
        state.status = 'loading'
        state.error = null
        state.loginError = null
        state.updateError = null
    },
    register_success(state) {
        state.status = 'success'
        state.error = null
        state.loginError = null
        state.updateError = null
    },
    register_error(state, err) {
        state.status = 'failed'
        state.error = err.response.data.msg
        state.info = err.response.data.info
        state.loginError = null
        state.updateError = null
    },
    // Profile mutation
    profile_request(state) {
        state.status = 'loading'
    },
    profile_success(state, user) {
        state.status = 'success'
        state.user = user
    },
    // Update mutation
    update_request(state) {
        state.status = 'loading'
        state.updateError = null
        state.loginError = null
        state.error = null
    },
    update_success(state, user) {
        state.status = 'success'
        state.user = user
        state.updateError = null
        state.loginError = null
        state.error = null
    },
    update_error(state, err) {
        state.status = 'failed'
        state.updateError = err.response.data.msg3
        state.loginError = null
        state.error = null
    }
};

export default {
    state,
    mutations, 
    actions,
    getters
}