// import axios from 'axios';

const state = {
    roomWorkshopEvents: [],
    roomBookingEvents: [],
    seatBookingEvents: []
}

const getters = {
    roomEvents: state => state.roomWorkshopEvents.concat(state.roomBookingEvents).concat(state.seatBookingEvents)
}

const actions = {
    // Get events for a room
    getWorkshopForRoom({ commit }, [workshop, room]) {
        const workshops = workshop.filter(item => {
            return item.venue == room.title
        })
        let events = []
        for (let i=0; i<workshops.length; i++) {
            events.push({
                start: workshops[i].date + ' ' + workshops[i].startTime,
                end: workshops[i].date + ' ' + workshops[i].endTime,
                title: workshops[i].title,
                content: "Organiser: <br>" + workshops[i].organiser,
                class: 'workshop'
            })
        }
        commit('roomWorkshop_success', events)
    },

    // Get bookings for a room
    getBookingForRoom({ commit }, [booking, roomId]) { 
        // Full Room Bookings
        const bookings = booking.filter(item => {
            return item.roomId == roomId && item.bookRoom == true
        })
        let events = []
        for (let i=0; i<bookings.length; i++) {
            // If it is closed
            if (bookings[i].closed) {
                events.push({
                    start: bookings[i].date + ' ' + bookings[i].start,
                    end: bookings[i].date + ' ' + bookings[i].end,
                    title: 'Closed',
                    class: 'Room Booking'
                })
            } else {
                events.push({
                    start: bookings[i].date + ' ' + bookings[i].start,
                    end: bookings[i].date + ' ' + bookings[i].end,
                    title: 'User Full Room Booking',
                    class: 'Room Booking'
                })
            }
        }
        commit('roomBooking_success', events)
    },

    // Get fully reserved seats for a room
    // getFull({ commit }, [booking, room]) {
    //     // Non Full Room Bookings
    //     const bookings = booking.filter(item => {
    //         return item.roomId == room._id && item.bookRoom == false
    //     })
       
    //     bookings.forEach(item => {
    //         // Get list of bookings that have clashed timing
    //         let res = axios.get('/api/bookings/get/clashed')
    //         if (res.data.bookings) {
    //             let events = res.data.bookings
    //             // If length of array = maximum no of users at a time
    //             if (events.length == room.maxUsers) {
    //                 // Get the shortest range and add into calendar

    //             }
    //         }
    //     })
    // }
}

const mutations = {
    // Get workshop events for a room
    roomWorkshop_success(state, events) {
        state.roomWorkshopEvents = events
    },

    // Get booking events for a room
    roomBooking_success(state, events) {
        state.roomBookingEvents = events
    },

    // Get seat booking events for a room
    seatBooking_success(state, events) {
        state.seatBookingEvents = events
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}