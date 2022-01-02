import axios from 'axios'

const state = {
    articles: [],
    articleItem: {},

    articleStatus: {
        create: ''
    },

    articleError: {
        create: ''
    }
}

const getters = {
    articles: state => state.articles,
    articleItem: state => state.articleItem,
    articleStatus: state => state.articleStatus,
    articleError: state => state.articleError
}

const actions = {
    // Get all articles
    async getArticles({ commit }) {
        try {
            let res = await axios.get('http://localhost:5000/api/articles/all')
            if (res.data.success) {
                commit('getArticles_success', res.data.article)
            }
        } catch (err) {
            console.log(err)
        }
    },

    // Get article by ID
    async getArticleById({ commit }, id) {
        const article = state.articles.find(item => item._id === id)
        commit('getArticleById_success', article)
    },

    // Post article
    async postArticle({ commit }, article) {
        try {
            commit('postArticle_request')
            let res = await axios.post('http://localhost:5000/api/articles/create', article)
            if (res.data.success) {
                commit('postArticle_success')
            }
        }
        catch (err) {
            commit('postArticle_error', err)
        }
    }
}

const mutations = {
    // Get all articles
    getArticles_success(state, articles) {
        state.articles = articles
    },

    // Get article by ID
    getArticleById_success(state, article) {
        state.articleItem = article
    },

    // Create article
    postArticle_request(state) {
        state.articleStatus.create = 'loading'
    },
    postArticle_success(state) {
        state.articleStatus.create = 'success'
    },
    postArticle_error(state, err) {
        state.articleStatus.create = 'error'
        state.articleError.create = err.response.data.msg
    },

    
}

export default {
    state,
    getters,
    actions,
    mutations
}