// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Inks from './source_data'
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/icons.css'

Vue.use(BootstrapVue)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    inks: Inks(),
    filters: [],
    filteredInks: [],
    selectedColor: undefined
  },

  actions: {
    filterInks ({ commit }) {
      commit('filterInks')
    },
    selectColor ({ commit }, color) {
      commit('selectColor', color)
    }
  },

  mutations: {
    filterInks (state) {
      const filters = state.filters
      let filteredInks = state.inks

      for (let i = 0; filters.length > i; i++) {
        filteredInks = filteredInks.filter(ink => ink[filters[i]])
      }

      if (state.selectedColor) {
        filteredInks = filteredInks.filter(ink => ink['colors'].indexOf(state.selectedColor) !== -1)
      }

      state.filteredInks = filteredInks
    },
    selectColor (state, color) {
      state.selectedColor = color
      store.dispatch('filterInks')
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
