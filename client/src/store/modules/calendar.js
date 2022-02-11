const state = {
    roomWorkshopEvents: []
}

const getters = {
    roomWorkshopEvents: state => state.roomWorkshopEvents
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
    }
}

const mutations = {
    // Get workshop events for a room
    roomWorkshop_success(state, events) {
        state.roomWorkshopEvents = events
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}