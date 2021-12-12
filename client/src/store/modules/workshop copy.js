import axios from 'axios'

const state = {
    workshop_status: '',
    workshop: [],
    error: '',
    register_status: ''
    // registered: false
}

const getters = {
    workshop_status: state => state.workshop_status,
    workshop: state => state.workshop,
    workshopFromId: (state) => (id) => {
        return state.workshop.find(item => item._id === id)
    },
    workshop_error: state => state.workshop_error
}

const actions = {
    // Get all workshops
    async getWorkshop({ commit }) {
        try {
            commit('workshop_request');
            let res = await axios.get('http://localhost:5000/api/workshops/all');
            if (res.data.success) {
                commit('workshop_success', res.data.workshop);
            }
        } catch (err) {
            commit('workshop_error', err)
        }
    },

    // Register User to Workshop (update workshop)
    async registerForWorkshop({ commit }, [workshopId, userId] ) {
        try {
            commit('workshop_request');
            let res = await axios.put('http://localhost:5000/api/workshops/register/' + workshopId + '/' + userId);
            if (res.data.success) {
                commit('registerWorkshop_success', res.data.workshop);
            }
            return res;
        } catch (err) {
            commit('workshop_error', err)
        }
    }
};

const mutations = {
    // Get Workshops
    workshop_request(state) {
        state.workshop_status = 'loading'
        state.workshop_error = ''
    },
    workshop_success(state, workshop) {
        state.workshop_status = 'success'
        state.workshop = workshop
        state.workshop_error = ''
    },
    workshop_error(state, err) {
        state.workshop_status = 'error'
        state.workshop_error = err.response.data.msg
    },
    
    // Register User to Workshop
    registerWorkshop_success(state, workshop) {
        state.status.workshop = 'success'
        state.workshop = workshop
        state.error.register = ''
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}