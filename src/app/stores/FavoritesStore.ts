import { defineStore } from 'pinia'
import { useProductsStore } from '@/app/stores/ProductsStore'
import type { Product } from '@/types'

interface StateShape {
  list: Product[]
}

export const useFavoritesStore = defineStore('FavoritesStore', {
  state: (): StateShape => ({
    list: JSON.parse(localStorage.getItem('favorites-list') as string) || []
  }),
  actions: {
    addProductToFavorites(product: Product) {
      product.isFavorite = true
      this.list.push(product)
      localStorage.setItem('favorites-list', JSON.stringify(this.list))
    },
    deleteProductFromFavorites(product: Product) {
      product.isFavorite = false
      const productsStore = useProductsStore()
      const productIndex = productsStore.list.findIndex((p) => p.id === product.id)

      if (productIndex !== -1) {
        productsStore.list[productIndex].isFavorite = false
        this.list = this.list.filter((p) => p.id !== product.id)
        localStorage.setItem('favorites-list', JSON.stringify(this.list))
      }
    }
  },
  getters: {}
})
