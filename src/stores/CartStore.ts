import { defineStore } from 'pinia'
import type { Product } from '@/types'

interface StateShape {
  list: Product[]
  cartIsOpen: boolean
}

export const useCartStore = defineStore('CartStore', {
  state: (): StateShape => ({
    list: [],
    cartIsOpen: false
  }),
  actions: {
    openCart() {
      this.cartIsOpen = true
    },
    closeCart() {
      this.cartIsOpen = false
    }
  },
  getters: {}
})
