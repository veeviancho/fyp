import axios from 'axios';

const state = {
    workshop_status: '',
    workshop: [],
    workshop_error: [],
    workshopItem: {}
}

const getters = {
    workshop_status: state => state.workshop_status,
    workshop: state => state.workshop,
    workshopItem: (state) => state.workshopItem,
    workshop_error: state => state.workshop_error
}

const actions = {
    // Get workshops
    async getWorkshop({ commit }) {
        try {
            let res = await axios.get('http://localhost:5000/api/workshops/all');
            if (res.data.success) {
                commit('getWorkshop_success', res.data.workshop);
            }
        } catch (err) {
            console.log(err)
        }
    },

    // Get workshop from ID
    async getWorkshopFromId({ commit }, id) {
        const workshopId = state.workshop.find(item => item._id === id)
        commit('workshopID_success', workshopId)
    },

    // Register User to Workshop (update workshop)
    async registerForWorkshop({ commit }, [workshopId, userId] ) {
        try {
            commit('workshop_request');
            let res = await axios.put('http://localhost:5000/api/workshops/register/' + workshopId + '/' + userId);
            if (res.data.success) {
                console.log("hello")
                commit('workshop_success', res.data.workshop);
                console.log(state.workshop_status)
            }
            return res;
        } catch (err) {
            commit('workshop_error', [workshopId, err])
        }
    }
}

const mutations = {

    workshopID_success(state, workshop) {
        state.workshopItem = workshop
    },

    // Get workshops
    getWorkshop_success(state, workshop) {
        state.workshop = workshop
    },

    // Register user to workshop
    workshop_request(state) {
        state.workshop_status = 'loading'
        state.workshop_error = ''
    },
    workshop_success(state, workshop) {
        state.workshop_status = 'success'
        state.workshop_error = ''
        state.workshop = workshop
    },
    workshop_error(state, [id, err]) {
        state.workshop_status = 'error'
        state.workshop_error = [id, err.response.data.msg]
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}