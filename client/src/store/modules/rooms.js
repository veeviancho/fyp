import axios from 'axios'

const state = {
    rooms: [],
    roomStatus: {
        getAll: '',
        create: '',
        update: '',
        remove: ''
    },
    roomError: {
        getAll: '',
        create: '',
        update: '',
        remove: ''
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
    },

    // Update room information
    async updateRoom({ commit }, room) {
        try {
            commit('updateRoom_request')
            console.log(room._id)
            let res = await axios.put("http://localhost:5000/api/rooms/update", room)
            if (res.data.success) {
                commit('updateRoom_success')
            }
        } catch (err) {
            commit('updateRoom_error', err)
        }
    },

    // Remove room
    async removeRoom({ commit }, roomId) {
        try {
            commit('removeRoom_request')
            let res = await axios.delete("http://localhost:5000/api/rooms/delete/" + roomId)
            if (res.data.success) {
                commit('removeRoom_success')
            }
        } catch (err) {
            commit('removeRoom_error', err)
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
    },

    // Update room
    updateRoom_request(state) {
        state.roomStatus.update = 'loading'
        state.roomError.update = ''
    },
    updateRoom_success(state) {
        state.roomStatus.update = 'success'
        state.roomError.update = ''
    },
    updateRoom_error(state, err) {
        state.roomStatus.update = 'error'
        state.roomError.update = err.response.data.msg
    },

    // Remove room
    removeRoom_request(state) {
        state.roomStatus.remove = 'loading'
        state.roomError.remove = ''
    },
    removeRoom_success(state) {
        state.roomStatus.remove = 'success'
        state.roomError.remove = ''
    },
    removeRoom_error(state, err) {
        state.roomStatus.remove = 'error'
        state.roomError.remove = err.response.data.msg
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}