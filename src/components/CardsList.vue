<script setup lang="ts">
import CardItem from '@/components/CardItem.vue'
import { useProductsStore } from '@/stores/ProductsStore'
import { onMounted } from 'vue'

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.fetchData()
})
</script>

<template>
  <div class="grid-cols-4 grid gap-10 mt-8">
    <card-item
      v-for="product in productsStore.list"
      :key="product.id"
      :product="product"
    ></card-item>
  </div>
</template>

<style scoped></style>
