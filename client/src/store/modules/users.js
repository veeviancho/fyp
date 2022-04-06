import axios from 'axios';

const state = {
    usersList: [],
    userById: {},
    userByUsername: {},
    deleteUserRequest: '',
    resetError: {
        findEmail: '',
        verifyCode: '',
        resetPW: ''
    },
    resetStatus: {
        findEmail: '',
        verifyCode: ''
    }
};

const getters = {
    usersList: state => state.usersList,
    userById: state => state.userById,
    userByUsername: state => state.userByUsername,
    deleteUserRequest: state => state.deleteUserRequest,
    resetError: state => state.resetError,
    resetStatus: state => state.resetStatus
};

const actions = {
    // Get all users
    async getAllUsers({ commit }) {
        try {
            let res = await axios.get("/api/users/all")
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

    // Get user from username
    async findByUsername({ commit }, username) {
        try {
            let res = await axios.get("/api/users/get/" + username)
            if (res.data.success) {
                commit("findByUsername_success", res.data.user)
            }
            return res.data.user
        }
        catch (err) {
            console.log(err)
        }
    },

    // Delete user
    async deleteUser({ commit }, id) {
        try {
            let res = await axios.delete("/api/users/delete/" + id)
            if (res.data.success) {
                commit('deleteUser_success')
            }
            return res
        }
        catch (err) {
            console.log(err)
        }
    },

    // Reset password
    async findEmail({ commit }, email) {
        try {
            commit('findEmail_request')
            let res = await axios.get("/api/users/findEmail/" + email)
            if (res.data.success) {
                commit('findEmail_success')
            }
            return res
        }
        catch (err) {
            commit('findEmail_error', err)
            console.log(err)
        }
    },

    async verifyCode({ commit }, [code, userId]) {
        try {
            commit('verifyCode_request')
            let res = await axios.get("/api/users/verifyCode/" + code + '/' + userId)
            if (res.data.success) {
                commit('verifyCode_success')
            }
            return res
        }
        catch (err) {
            commit('verifyCode_error', err)
            console.log(err)
        }
    },

    async resetPW({ commit }, [userId, data]) {
        try {
            let res = await axios.put("/api/users/resetPw/" + userId, data)
            console.log(userId)
            if (res.data.success) {
                commit('resetPW_success')
            }
            return res
        }
        catch (err) {
            commit('resetPW_error', err)
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

    // Get user from username
    findByUsername_success(state, user) {
        state.userByUsername = user
    },

    // Delete user
    deleteUser_success(state) {
        state.deleteUser = "success"
    },

    // Reset password: Step 1 (Find Email)
    findEmail_request(state) {
        state.resetError.findEmail = ''
        state.resetStatus.findEmail = 'loading'
    },
    findEmail_success(state) {
        state.resetError.findEmail = ''
        state.resetStatus.findEmail = 'success'
    },
    findEmail_error(state, err) {
        state.resetError.findEmail = err.response.data.msg
        state.resetStatus.findEmail = 'error'
    },

    // Reset password: Step 2 (Verify Code)
    verifyCode_request(state) {
        state.resetError.verifyCode = ''
        state.resetStatus.verifyCode = 'loading'
    },
    verifyCode_success(state) {
        state.resetError.verifyCode = ''
        state.resetStatus.verifyCode = 'success'
    },
    verifyCode_error(state, err) {
        state.resetError.verifyCode = err.response.data.msg
        state.resetStatus.verifyCode = 'error'
    },

    // Reset password: Step 3 (Password reset)
    resetPW_success(state) {
        state.resetError.resetPW = ''
    },
    resetPW_error(state, err) {
        state.resetError.resetPW = err.response.data.msg
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}