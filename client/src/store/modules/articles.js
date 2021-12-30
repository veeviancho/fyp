import axios from 'axios'

const state = {
    articles: [],
    articleItem: {}
}

const getters = {
    articles: state => state.articles,
    articleItem: state => state.articleItem
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
}

export default {
    state,
    getters,
    actions,
    mutations
}