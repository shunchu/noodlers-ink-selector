import Vue from 'vue'
import InkFilters from '@/components/InkFilters'

describe('InkFilters.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(InkFilters)
    const vm = new Constructor().$mount()

    expect(
      vm.$el.querySelector('.filters h4').textContent
    ).to.equal('Filters')
  })
})
