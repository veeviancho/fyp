import axios from 'axios';

const state = {
    token: localStorage.getItem('token') || '', //set to empty string if not found
    user: {},
    status: ''
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user
};

const mutations = {
    // Login mutations
    auth_request(state) {
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.status = 'success'
        state.token = token
        state.user = user
    }
};

const actions = {
    // Login Action
    async login({ commit }, user) {
        commit('auth_request'); //commit are for the mutations
        // try {
            let res = await axios.post('http://localhost:5000/api/users/login', user) //awaiting response from the server
            if (res.data.success) {
                // Getting token and user data from server
                const token = res.data.token;
                const user = res.data.user;
                // Store token in local storage
                localStorage.setItem('token', token);
                // Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }
            return res;
        // }
        // catch {
        //     commit('auth_error', err);
        // }
    },
    // Register Action
};

export default {
    state,
    mutations, 
    actions,
    getters
}