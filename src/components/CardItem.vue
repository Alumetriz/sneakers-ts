<script setup lang="ts">
import type { PropType } from 'vue'
import type { Product } from '@/types'
import { useCartStore } from '@/app/stores/CartStore'
import { useFavoritesStore } from '@/app/stores/FavoritesStore'
import { Icon } from '@/shared/icon'

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const toggleProductToCart = () => {
  if (!props.product?.isOrdered) {
    cartStore.addProductToCart(props.product)
  } else {
    cartStore.deleteProductFromCart(props.product)
  }
}

const toggleProductToFavorites = () => {
  if (!props.product?.isFavorite) {
    favoritesStore.addProductToFavorites(props.product)
  } else {
    favoritesStore.deleteProductFromFavorites(props.product)
  }
}
</script>

<template>
  <div
    class="relative border border-gray-200 p-8 rounded-3xl cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <div @click="toggleProductToFavorites">
      <Icon
        :key="!product.isFavorite ? 'like' : 'liked'"
        :type="!product.isFavorite ? 'like' : 'liked'"
        icon-style="absolute cursor-pointer h-9 w-9"
      ></Icon>
    </div>
    <img :src="`images/${product.imageUrl}`" alt="Sneakers" />

    <h3 class="mt-2">{{ product.title }}</h3>

    <div class="flex items-center justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-[#BDBDBD]">Цена:</span>
        <span class="font-bold text-sm"> {{ product.price?.toLocaleString('ru-RU') }} руб.</span>
      </div>

      <div @click="toggleProductToCart">
        <Icon
          :key="!product.isOrdered ? 'add' : 'added'"
          :type="!product.isOrdered ? 'add' : 'added'"
          icon-style="cursor-pointer h-9 w-9"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
