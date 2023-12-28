<script setup lang="ts">
import CardItem from '@/components/CardItem.vue'
import { useProductsStore } from '@/stores/ProductsStore'
import { useCartStore } from '@/stores/CartStore'
import { computed, onMounted, watch } from 'vue'
import type { Product } from '@/types'

const props = defineProps({
  searchParam: {
    type: String,
    default: ''
  },
  sortParam: {
    type: String,
    default: 'name_asc'
  }
})

const productsStore = useProductsStore()
const cartStore = useCartStore()

const filteredProducts = computed((): Product[] => {
  const searchParams = props.searchParam.toLowerCase().split(' ')

  return productsStore.list
    .filter((product) => {
      const title = product.title.toLowerCase()
      return searchParams.every((param) => title.includes(param))
    })
    .sort((a, b) => {
      if (props.sortParam === 'name_asc') {
        return a.title.localeCompare(b.title)
      } else if (props.sortParam === 'price_asc') {
        return a.price - b.price
      } else if (props.sortParam === 'price_desc') {
        return b.price - a.price
      }
      return 0
    })
})

onMounted(() => {
  productsStore.fetchData()
})

watch(
  () => cartStore.list,
  () => {
    productsStore.updateIsOrdered()
  }
)
</script>

<template>
  <div class="grid-cols-4 grid gap-10 mt-8" v-auto-animate>
    <card-item v-for="product in filteredProducts" :key="product.id" :product="product"></card-item>
  </div>
</template>

<style scoped></style>
