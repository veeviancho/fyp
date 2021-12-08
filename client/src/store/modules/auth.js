import axios from 'axios';

const state = {
    status: '',
    token: localStorage.getItem('token') || '', //set to empty string if not found
    user: {},
    error: {
        register: null,
        info: null,
        login: null,
        update: null,
        // verify: null,
    },
    // verify: '',
    // resend: {}
    resend: 'Resend'
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error,
    // verify: state => state.verify
    resend: state => state.resend
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

    // // Verify Email
    // async verify({ commit }) {
    //     try {
    //         let res = await axios.get('http://localhost:5000/api/users/' + res.params.email + '/' + res.params.token);
    //         if (res.data.success) {
    //             commit('verify_success');
    //         }
    //     } catch (err) {
    //         commit('verify_error', err)
    //     }
    // },

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
    },

    // Resend Email Confirmation Link
    async resendLink( { commit }, email) {
        try {
            commit('resend_request')
            let res = await axios.post('http://localhost:5000/api/users/resend/' + email);
            if (res.data.success) {
                commit('resend_success');
            }
            return res;
        } catch (err) {
            commit('resend_error', err)
        }
    }
};

const mutations = {
    // Verify mutations
    // verify_success(state) {
    //     state.verify = 'success'
    //     state.error = {}
    // },
    // verify_error(state, err) {
    //     state.error.verify = err.response.data.msg
    // },

    // Login mutations
    login_request(state) {
        state.status = 'loading'
        state.error = {}
    },
    login_success(state, token, user) {
        state.status = 'success'
        state.token = token
        state.user = user
        state.error = {}
    },
    login_error(state, err) {
        state.status = 'failed',
        state.error.login = err.response.data.msg
        state.error.resend = err.response.data.verify_error
        state.error.register = null
        state.error.update = null
    },
    // Logout mutation
    logout(state) {
        state.status = ''
        state.token = ''
        state.user = ''
        state.error = {}
    },
    // Register mutation
    register_request(state) {
        state.status = 'loading'
        state.error = {}
    },
    register_success(state) {
        state.status = 'success'
        state.error = {}
    },
    register_error(state, err) {
        state.status = 'failed'
        state.error.register = err.response.data.msg
        state.error.info = err.response.data.info
        state.error.login = null
        state.error.update = null
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
        state.error = {}
    },
    update_success(state, user) {
        state.status = 'success'
        state.user = user
        state.error = {}
    },
    update_error(state, err) {
        state.status = 'failed'
        state.error.update = err.response.data.msg
        state.error.login = null,
        state.error.register = null
    },
    // Resend link mutation
    resend_request(state) {
        state.resend = "Sending..."
    },
    resend_success(state) {
        state.resend = "Sent!"
    },
    resend_error(state, err) {
        state.resend = err.response.data.msg
    }
};

export default {
    state,
    mutations, 
    actions,
    getters
}