import axios from 'axios';

const state = {
    workshop: [],
    workshopItem: {},
    userWorkshop: [],

    workshopStatus: {
        register: '',
        deregister: '',
        create: '',
        update: ''
    },

    workshopError: {
        register: [],
        deregister: '',
        create: '',
        update: '',
    }
}

const getters = { 
    workshop: state => state.workshop,
    workshopItem: (state) => state.workshopItem,
    userWorkshop: state => state.userWorkshop,
    workshopStatus: state => state.workshopStatus,
    workshopError: state => state.workshopError
}

const actions = {
    // Get workshops
    async getWorkshop({ commit }) {
        try {
            let res = await axios.get('http://localhost:5000/api/workshops/all');
            if (res.data.success) {
                commit('getWorkshops_success', res.data.workshop);
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

    // Get workshops associated with user
    async getUserWorkshop({ commit }, userId) {
        const userWorkshop = state.workshop.filter(item => item.users.includes(userId))
        commit('userWorkshop_success', userWorkshop)
    },

    // Register User to Workshop (update workshop and user)
    async registerForWorkshop({ commit }, [workshopId, userId] ) {
        try {
            commit('workshop_request');
            let res = await axios.put('http://localhost:5000/api/workshops/register/' + workshopId + '/' + userId);
            if (res.data.success) {
                commit('workshop_success', res.data.workshop);
            }
            return res;
        } catch (err) {
            commit('workshop_error', [workshopId, err])
        }
    },

    // Deregister User from Workshop (update workshop and user)
    async deregisterFromWorkshop({ commit }, [workshopId, userId]) {
        try {
            commit('deregister_request');
            let res = await axios.put('http://localhost:5000/api/workshops/deregister/' + workshopId + '/' + userId);
            if (res.data.success) {
                commit('deregister_success');
            }
            return res;
        } catch (err) {
            commit('deregister_error', [workshopId, err])
        }
    },

    // Create Workshop
    async createWorkshop({ commit }, workshop) {
        try {
            commit('create_request')
            let res = await axios.post('http://localhost:5000/api/workshops/create', workshop)
            if (res.data.success) {
                commit('create_success')
            }
            return res
        }
        catch (err) {
            commit('create_error', err)
        }
    },

    // Update Workshop
    async updateWorkshop({ commit }, workshop) {
        try {
            commit('update_request')
            let res = await axios.put('http://localhost:5000/api/workshops/update', workshop)
            if (res.data.success) {
                commit('update_success')
            }
            return res
        }
        catch (err) {
            commit('update_error', err)
        }
    }

}

const mutations = { 
    // Get workshops
    getWorkshops_success(state, workshop) {
        state.workshop = workshop
    },

    // Get one workshop from ID
    workshopID_success(state, workshop) {
        state.workshopItem = workshop
    },

    // Get workshops for user
    userWorkshop_success(state, workshop) {
        state.userWorkshop = workshop
    },

    // Register user to workshop
    workshop_request(state) {
        state.workshopStatus.register = 'loading'
        state.workshopError.register = ''
    },
    workshop_success(state, workshop) {
        state.workshopStatus.register = 'success'
        state.workshopError.register = ''
        state.workshop = workshop
    },
    workshop_error(state, [id, err]) {
        state.workshopStatus.register = 'error'
        state.workshopError.register= [id, err.response.data.msg]
    },

    // Deregister user from workshop
    deregister_request(state) {
        state.workshopStatus.deregister = 'loading'
        state.workshopError.deregister = ''
    },
    deregister_success(state) {
        state.workshopStatus.deregister = 'success'
        state.workshopError.deregister = ''
    },
    deregister_error(state, [id, err]) {
        state.workshopStatus.deregister = 'error'
        state.workshopError.deregister = [id, err.response.data.msg]
    },

    // Create new workshop
    create_request(state) {
        state.workshopStatus.create = 'loading'
        state.workshopError.create = ''
    },
    create_success(state) {
        state.workshopStatus.create = 'success'
        state.workshopError.create = ''
    },
    create_error(state, err) {
        state.workshopStatus.create = 'error'
        state.workshopError.create = err.response.data.msg
    },

    // Update workshop
    update_request(state) {
        state.workshopStatus.update = 'loading'
        state.workshopError.update = ''
    },
    update_success(state) {
        state.workshopStatus.update = 'success'
        state.workshopError.update = ''
    },
    update_error(state, err) {
        state.workshopStatus.update = 'error'
        state.workshopError.update = err.response.data.msg
    }

    // Delete workshop
}

export default {
    state,
    getters,
    actions,
    mutations
}