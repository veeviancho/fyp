import axios from "axios"

const state = {
    bookingStatus: {
        create: '',
        get: ''
    }
}

const getters = {
    
}

const actions = {
    // Create booking
    async createBooking({ commit }, booking) {
        try {
            let res = await axios.post('http://localhost:5000/api/bookings/create', booking)
            if (res.data.success) {
                console.log('heyno')
                commit('createBooking_success')
            }
            return res
        } catch (err) {
            console.log(err)
        }
    },

    // Get bookings for a particular room
    async getBookings({ commit }, roomId) {
        let res = await axios.get('' + roomId)
        if (res.data.success) {
            commit('getBookings_success')
        }
    }
}

const mutations = {
    // Create booking
    createBooking_success(state) {
        state.bookingStatus.create = 'success'
    },

    // Get bookings for a particular room
    getBookings_success(state) {
        state.bookingStatus.get = 'success'
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}