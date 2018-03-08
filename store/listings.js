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
    state.SingleListing = payload.context[0]
  },
  setTechnologies (state, payload) {
    state.technologies.frontend.framework = payload.frontend.framework
    state.technologies.frontend.plateform = payload.frontend.plateforms
    state.technologies.frontend.libraries = payload.frontend.libraries
    state.technologies.frontend.html = payload.frontend.html
    state.technologies.frontend.css = payload.frontend.css
    state.technologies.backend.framework = payload.backend.framework
    state.technologies.backend.plateform = payload.backend.plateforms
    state.technologies.backend.libraries = payload.backend.libraries
  }
}
export const actions = {
    fetchListings ({state, commit}, payload) {
      return axios.get('http://localhost:3000/api/v1/listings?limit=' + payload.limit + '&offset=' + payload.offset + '&order=' + payload.order + '')
        .then(function (response) {
          commit('setListings', response.data.Context)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchTechnologies ({state, commit}, payload) {
      return axios.get('http://localhost:3000/api/v1/technologies')
        .then(function (response) {
          commit('setTechnologies', response.data.Context)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchSingleListing (vuexContext, payload) {
      return axios.get('http://localhost:3000/api/v1/listings/' + payload.id + '/' + payload.title)
        .then(response => {
          vuexContext.commit('setSingleListing', response.data)
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    submit(vuexContext, payload) {
      return axios.post('http://localhost:3000/api/v1/listings/', { context: payload })
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
  }
}
