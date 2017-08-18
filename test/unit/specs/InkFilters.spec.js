import Vue from 'vue'
import InkFilters from '@/components/InkFilters'
import Vuex from 'vuex'

Vue.use(Vuex)

const inks = [
  { name: 'ink1', stockNo: '12345', colors: ['brown'], uvResistant: true, archival: true, tamperProof: true, waterproof: true, fluorescent: false, lubricated: false, freezeResistant: false, exclusive: false, notes: '' },
  { name: 'ink2', stockNo: '67890', colors: ['blue'], uvResistant: true, archival: true, tamperProof: true, waterproof: true, fluorescent: false, lubricated: false, freezeResistant: false, exclusive: true, notes: 'Love Inks Inc exclusive' },
  { name: 'ink3', stockNo: '45678', colors: ['blue', 'black'], uvResistant: 'partial', archival: 'partial', tamperProof: true, waterproof: true, fluorescent: false, lubricated: false, freezeResistant: false, exclusive: false, notes: '' }
]

const mockStore = {
  state: {
    inks: inks,
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

    expect(
      vm.$el.querySelectorAll('.filters ul li').length
    ).to.equal(8)

    expect(
      vm.$el.querySelectorAll('.filters select.colors option').length
    ).to.equal(4)
  })
})
