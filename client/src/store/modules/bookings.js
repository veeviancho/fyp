import axios from "axios"

const state = {
    bookings: [],
    userBookings: [],

    bookingStatus: {
        create: ''
    },
    bookingError: {
        create: ''
    }
}

const getters = {
    bookings: state => state.bookings,
    userBookings: state => state.userBookings,

    bookingStatus: state => state.bookingStatus,
    bookingError: state => state.bookingError
}

const actions = {
    // Create booking
    async createBooking({ commit }, booking) {
        try {
            commit('createBooking_request')
            let res = await axios.post('http://localhost:5000/api/bookings/create', booking)
            if (res.data.success) {
                commit('createBooking_success')
            }
            return res
        } catch (err) {
            console.log(err)
            commit('createBooking_error', err.response.data.msg)
        }
    },

    // Get bookings for a particular room
    async getBookings({ commit }, roomId) {
        let res = await axios.get('' + roomId)
        if (res.data.success) {
            commit('getBookings_success', res.data.bookings)
        }
    },

    // Get bookings for a particular user
    async getUserBookings({ commit }, userId) {
        let res = await axios.get('http://localhost:5000/api/bookings/user/' + userId)
        if (res.data.success) {
            commit('getUserBookings_success', res.data.booking)
        }
    }
}

const mutations = {
    // Create booking
    createBooking_request(state) {
        state.bookingStatus.create = 'loading'
    },
    createBooking_success(state) {
        state.bookingStatus.create = 'success'
    },
    createBooking_error(state, err) {
        state.bookingStatus.create = 'error'
        state.bookingError.create = err
    },

    // Get bookings for a particular room
    getBookings_success(state, bookings) {
        state.bookings = bookings
    },

    // Get bookings for a particular user
    getUserBookings_success(state, bookings) {
        state.userBookings = bookings
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}