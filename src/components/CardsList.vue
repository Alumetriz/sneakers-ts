<script setup lang="ts">
import CardItem from '@/components/CardItem.vue'
import { useProductsStore } from '@/stores/ProductsStore'
import { computed, onMounted } from 'vue'
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

onMounted(() => {
  productsStore.fetchData()
})

const filteredProducts = computed((): Product[] => {
  return productsStore.list.filter((product) => product.title.includes(props.searchParam))
})
</script>

<template>
  <div class="grid-cols-4 grid gap-10 mt-8">
    <card-item v-for="product in filteredProducts" :key="product.id" :product="product"></card-item>
  </div>
</template>

<style scoped></style>
