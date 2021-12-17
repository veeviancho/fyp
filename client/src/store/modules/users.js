import axios from 'axios';

const state = {
    usersList: [],
    userById: {}
};

const getters = {
    usersList: state => state.usersList,
    userById: state => state.userById
};

const actions = {
    // Get all users
    async getAllUsers({ commit }) {
        try {
            let res = await axios.get("http://localhost:5000/api/members/all")
            if (res.data.success) {
                commit("getUsers_success", res.data.users)
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    // Get user from ID
    async getUserFromId({ commit }, userId) {
        let user = state.usersList.find(item => item._id === userId)
        commit("getUserFromId_success", user)
    }

    // Remove User from Workshop
    

};

const mutations = {
    // Get all users
    getUsers_success(state, users) {
        state.usersList = users
    },

    // Get user from ID
    getUserFromId_success(state, user) {
        state.userById = user
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}