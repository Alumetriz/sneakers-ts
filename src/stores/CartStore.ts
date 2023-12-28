import { defineStore } from 'pinia'
import type { Product } from '@/types'

interface StateShape {
  list: Product[]
  cartIsOpen: boolean
}

export const useCartStore = defineStore('CartStore', {
  state: (): StateShape => ({
    list: [
      {
        id: 2,
        title: 'Мужские Кроссовки Nike Air Max 270',
        price: 15600,
        imageUrl: '/sneakers/sneakers-2.jpg',
        isFavorite: false,
        isOrdered: false
      }
    ],
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
