import axios from 'axios'

export const state = () => ({
  listings: [],
  SingleListing: {},
  technologies: {
    frontend: {
      framework: '',
      plateform: '',
      libraries: '',
      html: '',
      css: ''
    },
    backend: {
      framework: '',
      plateform: '',
      libraries: ''
    }
  },
  plans: [],
  listingsDetails: {
    title: '',
    summary: '',
    price: '4242',
    plan: {id: 2},
    description: '',
    screenshots: ''
  },
  project_technologies: {
    frontend: '',
    backend: ''
  }
})
export const mutations = {
  setListings (state, payload) {
    state.listings = payload
  },
  setSingleListing (state, payload) {
    state.SingleListing = payload
  },
  setTechnologies (state, payload) {
    console.log(payload)
    state.technologies.frontend.framework = payload.frontend.frameworks
    state.technologies.frontend.plateform = payload.frontend.plateforms
    state.technologies.frontend.libraries = payload.frontend.libraries
    state.technologies.frontend.html = payload.frontend.html
    state.technologies.frontend.css = payload.frontend.css
    state.technologies.backend.framework = payload.backend.frameworks
    state.technologies.backend.plateform = payload.backend.plateforms
    state.technologies.backend.libraries = payload.backend.libraries
  },
  SetPlans (state, payload) {
    state.plans = payload
  }
}
export const actions = {
    fetchListings ({state, commit}, payload) {
      return axios.get('http://localhost:4000/api/v1/listings?limit=' + payload.limit + '&offset=' + payload.offset + '&order=' + payload.order + '')
        .then(function (response) {
          console.log(response.data.Context)
          commit('setListings', response.data.Context)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchTechnologies ({state, commit}, payload) {
      return axios.get('http://localhost:4000/api/v1/technologies')
        .then(function (response) {
          commit('setTechnologies', response.data.Context)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    initCreateListing ({state, commit}, payload) {
      return axios.get('http://localhost:4000/api/v1/listings/initSellPages').then(response => {
        commit('setTechnologies', response.data.Context)
        commit('SetPlans', response.data.Context.plans)
      })
    },
    fetchSingleListing (vuexContext, payload) {
      return axios.get('http://localhost:4000/api/v1/listings/' + payload.id + '/' + payload.title)
        .then(response => {
          vuexContext.commit('setSingleListing', response.data.Context)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    submit(vuexContext, payload) {
      console.log(vuexContext)
      const token = vuexContext.rootGetters['authentication/GetAuthUser']
      return axios.post(`http://localhost:4000/api/v1/listings?token=${token.token.value}`, payload)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error.response)
        })
    }
}

export const getters = {
  getListings (state, rootState) {
    return state.listings
  },
  GetSingleListing (state, rootState) {
    return state.SingleListing
  },
  getTechnologies (state, rootState) {
    return state.technologies
  },
  GetPlans(state, rootState) {
    return state.plans
  }
}
