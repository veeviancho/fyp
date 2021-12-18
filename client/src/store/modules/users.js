import axios from 'axios';

const state = {
    usersList: [],
    userById: {},
    deleteUserRequest: ''
};

const getters = {
    usersList: state => state.usersList,
    userById: state => state.userById,
    deleteUserRequest: state => state.deleteUserRequest
};

const actions = {
    // Get all users
    async getAllUsers({ commit }) {
        try {
            let res = await axios.get("http://localhost:5000/api/users/all")
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
    },

    // Delete user
    async deleteUser({ commit }, id) {
        try {
            let res = await axios.delete("http://localhost:5000/api/users/delete/" + id)
            if (res.data.success) {
                commit('deleteUser_success')
            }
            return res
        }
        catch (err) {
            console.log(err)
        }
    }
};

const mutations = {
    // Get all users
    getUsers_success(state, users) {
        state.usersList = users
    },

    // Get user from ID
    getUserFromId_success(state, user) {
        state.userById = user
    },

    // Delete user
    deleteUser_success(state) {
        state.deleteUser = "success"
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}