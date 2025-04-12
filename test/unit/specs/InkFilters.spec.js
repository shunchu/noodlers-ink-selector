import Vue from 'vue'
import InkFilters from '@/components/InkFilters'
import 'babel-polyfill'
import Vuex from 'vuex'
import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

Vue.use(Vuex)

const inks = [
  { name: 'ink1', stockNo: '12345', colors: ['brown'], uvResistant: true, archival: true, tamperProof: true, waterproof: true, fluorescent: false, lubricated: false, freezeResistant: false, exclusive: false, notes: '' },
  { name: 'ink2', stockNo: '67890', colors: ['blue'], uvResistant: true, archival: true, tamperProof: true, waterproof: true, fluorescent: false, lubricated: false, freezeResistant: false, exclusive: true, notes: 'Love Inks Inc exclusive' },
  { name: 'ink3', stockNo: '45678', colors: ['blue', 'black'], uvResistant: 'partial', archival: 'partial', tamperProof: true, waterproof: true, fluorescent: false, lubricated: false, freezeResistant: false, exclusive: false, notes: '' }
]

const mockStore = new Vuex.Store({
  state: {
    inks: inks,
    filters: [],
    filteredInks: [],
    selectedColor: undefined
  },

  actions: {
    filterInks: sinon.stub(),
    selectColor: sinon.stub()
  },

  mutations: {
    filterInks: sinon.stub(),
    selectColor: sinon.stub()
  }
})

const Constructor = Vue.extend(InkFilters)

describe('InkFilters.vue', () => {
  let vm

  beforeEach(() => {
    vm = new Constructor({ store: mockStore }).$mount()
  })

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

describe('template actions', () => {
  let vm

  beforeEach(() => {
    vm = new Constructor({ store: mockStore })
  })

  it('should respond to filter checkboxes', () => {
    sinon.spy(vm, 'updateInks')
    vm.$mount()

    const archivalCheckbox = vm.$el.querySelector('.filters ul li input[value="archival"]')
    const clickEvent = new window.Event('click')

    archivalCheckbox.dispatchEvent(clickEvent)
    vm._watcher.run()

    sinon.assert.calledOnce(vm.updateInks)
  })

  // haven't figured out how to test in unit tests yet
  xit('should respond to color selector', () => {})
})
