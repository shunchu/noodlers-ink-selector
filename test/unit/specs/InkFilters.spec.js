import Vue from 'vue'
import InkFilters from '@/components/InkFilters'
import Vuex from 'vuex'

Vue.use(Vuex)

const mockStore = {
  state: {
    inks: [],
    filters: [],
    filteredInks: [],
    selectedColor: undefined
  }
}

const Constructor = Vue.extend(InkFilters)
const vm = new Constructor({store: mockStore}).$mount()

describe('InkFilters.vue', () => {
  it('should render correct contents', () => {
    expect(
      vm.$el.querySelector('.filters h4').textContent
    ).to.equal('Filters')
  })
})
