<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/app/stores/ProductsStore'
import { useCartStore } from '@/app/stores/CartStore'
import { CardItem } from '@/widgets/products/cardItem'
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

const itemsPerPage = 8
const currentPage = ref(1)

const displayedItems = () => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return filteredProducts.value.slice(startIndex, endIndex)
}

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

const route = useRoute()
const router = useRouter()

const changePage = (pageNumber: number) => {
  currentPage.value = pageNumber
  router.push({ query: { page: pageNumber } })
}

const setPageFromUrl = () => {
  currentPage.value = parseInt(route.query.page as string) || 1
}

watch(
  () => cartStore.list,
  () => {
    productsStore.updateIsOrdered()
  }
)

watch(
  () => route.query.page,
  () => {
    setPageFromUrl()
  }
)

onMounted(() => {
  productsStore.fetchData()
  setPageFromUrl()
})
</script>

<template>
  <div class="grid-cols-4 grid gap-10 mt-8" v-auto-animate>
    <card-item v-for="product in displayedItems()" :key="product.id" :product="product"></card-item>
  </div>

  <div class="flex justify-center gap-4 mt-10">
    <span
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      @click="changePage(pageNumber)"
      class="inline-block text-black py-2 px-4 transition border cursor-pointer"
      :class="{
        'border-green-400': pageNumber === currentPage,
        'bg-green-400': pageNumber === currentPage
      }"
      >{{ pageNumber }}</span
    >
  </div>
</template>

<style scoped></style>
