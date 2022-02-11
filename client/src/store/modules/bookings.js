import axios from "axios"

const state = {
    bookings: [],
    userBookings: [],
    pastUserBookings: [],

    bookingStatus: {
        create: '',
        remove: ''
    },
    
    bookingError: {
        create: '',
        remove: ''
    }
}

const getters = {
    bookings: state => state.bookings,
    userBookings: state => state.userBookings,
    pastUserBookings: state => state.pastUserBookings,

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
            let current = res.data.booking
            let past = res.data.booking
            let today = new Date()

            // Current Bookings
            current = current.filter(item => {
                let bookingDate = Date.parse(String(item.date) + "T" + String(item.end) + ":00")
                return bookingDate >= today.getTime()
            })
            commit('getUserBookings_success', current)

            // Past Bookings
            past = past.filter(item => {
                let bookingDate = Date.parse(String(item.date) + "T" + String(item.end) + ":00")
                return bookingDate < today.getTime()
            })
            commit('getPastUserBookings_success', past)
        }
    },

    // Cancel booking
    async removeBooking({ commit }, bookingId) {
        try {
            commit('removeBooking_request')
            let res = await axios.delete('http://localhost:5000/api/bookings/delete/' + bookingId)
            if (res.data.success) {
                commit('removeBooking_success')
            }
        }
        catch (err) {
            commit('removeBooking_error', err.response.data.msg)
        }
    }

}

const mutations = {
    // Create booking
    createBooking_request(state) {
        state.bookingStatus.create = 'loading'
        state.bookingError.create = ''
    },
    createBooking_success(state) {
        state.bookingStatus.create = 'success'
        state.bookingError.create = ''
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
    },
    getPastUserBookings_success(state, bookings) {
        state.pastUserBookings = bookings
    },

    // Remove bookings
    removeBooking_request(state) {
        state.bookingStatus.remove = 'loading'
    },
    removeBooking_success(state) {
        state.bookingStatus.remove = 'success'
    },
    removeBooking_error(state, err) {
        state.bookingStatus.remove = 'error'
        state.bookingError.remove = err
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}