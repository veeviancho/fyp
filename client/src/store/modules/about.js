import axios from "axios"

const state = {
    about: {},
    messages: '',

    aboutStatus: {
        contact: ''
    },

    aboutError: {
        contact: ''
    }
}

const getters = {
    about: state => state.about,
    messages: state => state.messages,
    aboutStatus: state => state.aboutStatus,
    aboutError: state => state.aboutError
}

const actions = {
    // Get about information
    async getAbout({ commit }) {
        try {
            let res = await axios.get('http://localhost:5000/api/about/read')
            if (res.data.success) {
                commit('getAbout_success', res.data.about[0])
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    // Create contact information
    async createContact({ commit }, contact) {
        try {
            commit('createContact_request')
            let res = await axios.post('http://localhost:5000/api/about/create/contact', contact)
            if (res.data.success) {
                commit('createContact_success')
            }
        }
        catch (err) {
            commit('createContact_error', err.response.data.msg)
        }
    },

    // Get messages
    async getContact({ commit }) {
        try {
            let res = await axios.get('http://localhost:5000/api/about/contact/read')
            if (res.data.success) {
                commit('getMsg_success', res.data.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

}

const mutations = {
    // Get about information
    getAbout_success(state, about) {
        state.about = about
    },

    // Create Contact
    createContact_request(state) {
        state.aboutStatus.contact = 'loading'
    },
    createContact_success(state) {
        state.aboutStatus.contact = 'success'
    },
    createContact_error(state, err) {
        state.aboutStatus.contact = 'error',
        state.aboutError.contact = err
    },

    // Get messages
    getMsg_success(state, msg) {
        state.messages = msg
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}