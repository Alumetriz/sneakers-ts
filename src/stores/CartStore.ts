import { defineStore } from 'pinia'
import type { Product } from '@/types'
import { useProductsStore } from '@/stores/ProductsStore'

interface StateShape {
  list: Product[]
  cartIsOpen: boolean
}

export const useCartStore = defineStore('CartStore', {
  state: (): StateShape => ({
    list: JSON.parse(localStorage.getItem('orders-list') as string) || [],
    cartIsOpen: false
  }),
  actions: {
    openCart() {
      this.cartIsOpen = true
    },
    closeCart() {
      this.cartIsOpen = false
    },
    addProductToCart(product: Product) {
      product.isOrdered = true
      this.list.push(product)
      localStorage.setItem('orders-list', JSON.stringify(this.list))
    },
    deleteProductFromCart(product: Product) {
      product.isOrdered = false
      const productsStore = useProductsStore()
      productsStore.list[product.id].isOrdered = false
      this.list = this.list.filter((p) => p.id !== product.id)
      localStorage.setItem('orders-list', JSON.stringify(this.list))
    }
  },
  getters: {}
})
