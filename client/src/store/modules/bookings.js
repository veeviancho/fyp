import axios from "axios"

const state = {
    bookings: [],

    bookingStatus: {
        create: '',
        get: ''
    },
    bookingError: {
        create: ''
    }
}

const getters = {
    bookings: state => state.bookings,
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
        state.bookingStatus.get = 'success'
        state.bookings = bookings
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}