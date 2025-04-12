import { defineStore } from 'pinia'
import getInks from '../source_data'

/**
 * @typedef {Object} Ink
 * @property {string} name - Ink name
 * @property {string} stockNo - Stock number
 * @property {string[]} colors - Color variants
 * @property {boolean|string} uvResistant - UV resistance
 * @property {boolean|string} archival - Archival quality
 * @property {boolean|string} tamperProof - Tamperproof
 * @property {boolean|string} waterproof - Waterproof
 * @property {boolean|string} fluorescent - Fluorescent
 * @property {boolean|string} lubricated - Lubricated
 * @property {boolean|string} freezeResistant - Freeze resistant
 * @property {boolean} exclusive - Exclusive edition
 * @property {string} notes - Additional notes
 */

export const useInkStore = defineStore('inks', {
  state: () => ({
    inks: [],
    filteredInks: [],
    filters: [],
    selectColor: 'all',
    isLoading: false,
    error: null
  }),

  actions: {
    async initialize() {
      this.isLoading = true
      try {
        const data = getInks()
        this.inks = Array.isArray(data) ? data : []
        this.filteredInks = [...this.inks]
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },

    async filterInks() {
      this.isLoading = true
      try {
        if (!this.inks.length) await this.initialize()

        this.filteredInks = this.inks.filter(ink => {
          if (!ink) return false

          // Color filter
          const colorMatch = this.selectColor === 'all' ||
                           (ink.colors && ink.colors.includes(this.selectColor))

          // Property filters
          const propertyMatch = this.filters.length === 0 ||
                              this.filters.every(filter => {
                                const value = ink[filter]
                                return value === true || value === 'partial'
                              })

          return colorMatch && propertyMatch
        })
      } catch (error) {
        this.error = error.message
        this.filteredInks = []
      } finally {
        this.isLoading = false
      }
    }
  }
})
