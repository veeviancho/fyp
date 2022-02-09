const state = {
    roomWorkshopEvents: []
}

const getters = {
    roomWorkshopEvents: state => state.roomWorkshopEvents
}

const actions = {
    // Get events for a room
    getWorkshopForRoom({ commit }, [workshop, roomId]) {
        const workshops = workshop.filter(item => {
            return item.venue == roomId.title
        })
        let events = []
        for (let i=0; i<workshops.length; i++) {
            events.push({
                start: workshop[i].date + ' ' + workshop[i].startTime,
                end: workshop[i].date + ' ' + workshop[i].endTime,
                title: workshop[i].title,
                content: "Organiser: <br>" + workshop[i].organiser,
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