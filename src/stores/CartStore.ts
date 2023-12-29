import { defineStore } from 'pinia'
import type { Product } from '@/types'
import { useProductsStore } from '@/stores/ProductsStore'
import { useFavoritesStore } from '@/stores/FavoritesStore'

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

      const favoritesStore = useFavoritesStore()
      const favoriteIndex = favoritesStore.list.findIndex((p) => p.id === product.id)

      if (favoriteIndex !== -1) {
        favoritesStore.list[favoriteIndex].isOrdered = true
        localStorage.setItem('favorites-list', JSON.stringify(favoritesStore.list))
      }

      localStorage.setItem('orders-list', JSON.stringify(this.list))
    },
    deleteProductFromCart(product: Product) {
      product.isOrdered = false
      const productsStore = useProductsStore()
      const favoritesStore = useFavoritesStore()
      const productIndex = productsStore.list.findIndex((p) => p.id === product.id)
      const favoriteIndex = favoritesStore.list.findIndex((p) => p.id === product.id)

      if (productIndex !== -1) {
        productsStore.list[productIndex].isOrdered = false

        if (favoriteIndex !== -1) {
          favoritesStore.list[favoriteIndex].isOrdered = false
        }

        this.list = this.list.filter((p) => p.id !== product.id)
        localStorage.setItem('orders-list', JSON.stringify(this.list))
        localStorage.setItem('favorites-list', JSON.stringify(favoritesStore.list))
      }
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
