import axios from 'axios'

const state = {
    rooms: [],
    roomStatus: {
        getAll: '',
        create: ''
    },
    roomError: {
        getAll: '',
        create: ''
    }
}

const getters = {
    rooms: state => state.rooms,
    roomStatus: state => state.roomStatus,
    roomError: state => state.roomError
}

const actions = {
    // Get Rooms
    async getAllRooms({ commit }) {
        try {
            commit('getAllRooms_request')
            let res = await axios.get('http://localhost:5000/api/rooms/all')
            if (res.data.success) {
                commit('getAllRooms_success', res.data.rooms)
            }
        } catch (err) {
            commit('getAllRooms_error', )
        }
    },

    // Create room
    async createRoom({ commit }, room) {
        try {
            commit('createRoom_request')
            let res = await axios.post("http://localhost:5000/api/rooms/create", room)
            if (res.data.success) {
                commit('createRoom_success')
            }
        } catch (err) {
            commit('createRoom_error', err)
        }
    }
}

const mutations = {
    // Get all rooms
    getAllRooms_request(state) {
        state.roomStatus.getAll = 'loading'
        state.roomError.getAll = ''
    },
    getAllRooms_success(state, rooms) {
        state.roomStatus.getAll = 'success'
        state.roomError.getAll = ''
        state.rooms = rooms
    },
    getAllRooms_error(state, err) {
        state.roomStatus.getAll = 'error'
        state.roomError.getAll = err.response.data.msg
    },

    // Create room
    createRoom_request(state) {
        state.roomStatus.create = 'loading'
        state.roomError.create = ''
    },
    createRoom_success(state) {
        state.roomStatus.create = 'success'
        state.roomError.create = ''
    },
    createRoom_error(state, err) {
        state.roomStatus.create = 'error'
        state.roomError.create = err.response.data.msg
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}