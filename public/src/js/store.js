import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
//Axios binding and Token Authentication
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = 'http://localhost/api';
const token_type = localStorage.getItem('token_type')
const access_token = localStorage.getItem('access_token')
if (access_token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token_type + ' ' + access_token
}

export default new Vuex.Store({
    state: {
        status: '',
        access_token: localStorage.getItem('access_token') || '',
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, access_token, user) {
            state.status = 'success'
            state.access_token = access_token
            state.user = user
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.access_token = ''
        },
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post('/login', user)
                    .then(resp => {
                        const token_type = resp.data.token_type
                        const access_token = resp.data.access_token
                        const refresh_token = resp.data.refresh_token
                        localStorage.setItem('token_type', token_type)
                        localStorage.setItem('access_token', access_token)
                        localStorage.setItem('refresh_token', refresh_token)
                        Vue.prototype.$http.defaults.headers.common['Authorization'] = token_type + ' ' + access_token
                        commit('auth_success', access_token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token_type')
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('refresh_token')
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token_type')
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                delete Vue.prototype.$http.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.access_token,
        authStatus: state => state.status,
    }
})