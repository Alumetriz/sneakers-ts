import { defineStore } from 'pinia'
import type { Product } from '@/types'
import { useProductsStore } from '@/stores/ProductsStore'

interface StateShape {
  list: Product[]
  cartIsOpen: boolean
  cartIsEmpty: boolean
  productsIsBought: boolean
}

export const useCartStore = defineStore('CartStore', {
  state: (): StateShape => ({
    list: JSON.parse(localStorage.getItem('orders-list') as string) || [],
    cartIsOpen: false,
    cartIsEmpty: true,
    productsIsBought: false
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
    },
    buyProducts() {
      this.list = []
      this.productsIsBought = true
      localStorage.setItem('orders-list', JSON.stringify(this.list))

      setTimeout(() => {
        this.productsIsBought = false
      }, 3000)
    }
  },
  getters: {
    calcCartPrice(state: StateShape): number {
      return state.list.reduce((acc, cur) => acc + cur.price, 0)
    },
    calcPercent(): number {
      return this.calcCartPrice * 0.05
    },
    ordersLength(state): number {
      return state.list.length
    }
  }
})
