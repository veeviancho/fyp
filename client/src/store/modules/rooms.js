import axios from 'axios'

const state = {
    rooms: [],
    roomStatus: {
        create: ''
    },
    roomError: {
        create: ''
    }
}

const getters = {
    rooms: state => state.rooms,
    roomStatus: state => state.roomStatus,
    roomError: state => state.roomError
}

const actions = {
    // async getAllRooms({ commit }) {
    //     let res = axios.get('http://')
    // }

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