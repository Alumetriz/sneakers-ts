import { defineStore } from 'pinia'
import { useCartStore } from '@/stores/CartStore'
import { useFavoritesStore } from '@/stores/FavoritesStore'
import type { Product } from '@/types'
import axios from 'axios'

interface StateShape {
  list: Product[]
}

export const useProductsStore = defineStore('ProductsStore', {
  state: (): StateShape => ({
    list: JSON.parse(localStorage.getItem('products') as string) || []
  }),
  actions: {
    async fetchData() {
      try {
        const { data }: { data: Product[] } = await axios.get(
          'https://6574bc99b2fbb8f6509c9af4.mockapi.io/sneakers'
        )

        this.list = data.map((product) => {
          return {
            ...product,
            isFavorite: false,
            isOrdered: false
          }
        })

        this.updateIsOrdered()
        localStorage.setItem('products', JSON.stringify(this.list))
      } catch (e) {
        console.log(e)
      }
    },
    updateIsOrdered(): void {
      const cartStore = useCartStore()
      const favoritesStore = useFavoritesStore()

      const orderedIds = cartStore.list.map((product) => product.id)
      const favoritesIds = favoritesStore.list.map((product) => product.id)

      this.list.forEach((product) => {
        product.isOrdered = orderedIds.includes(product.id)
        product.isFavorite = favoritesIds.includes(product.id)
      })
    }
  }
})
