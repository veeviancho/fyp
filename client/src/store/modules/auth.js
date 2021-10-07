import axios from 'axios';

const state = {
    status: '',
    token: localStorage.getItem('token') || '', //set to empty string if not found
    user: {},
    // msg: ''
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user
};

const actions = {
    // Login Action
    async login({ commit }, user) {
        commit('login_request'); //commit are for the mutations
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
        // const msg = res.data.msg;
        // commit('auth_failed', msg);
        return res;
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
        commit('register_request');
        let res = await axios.post('http://localhost:5000/api/users/register', user);
        if (res.data.success) {
            commit('register_success');
        }
        return res;
    }
};

const mutations = {
    // Login mutations
    login_request(state) {
        state.status = 'loading'
    },
    login_success(state, token, user) {
        state.status = 'success'
        state.token = token
        state.user = user
    },
    // auth_failed(state, msg) {
    //     state.status = 'failed'
    //     state.msg = msg
    // },
    // Logout mutation
    logout(state) {
        state.status = ''
        state.token = ''
        state.user = ''
    },
    //register mutation
    register_request(state) {
        state.status = 'loading'
    },
    register_success(state) {
        state.status = 'success'
    }
};

export default {
    state,
    mutations, 
    actions,
    getters
}