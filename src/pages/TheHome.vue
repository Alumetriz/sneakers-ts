<script setup lang="ts">
import { CardsList } from '@/widgets/products/cardsList'
import { Header } from '@/widgets/header'
import { FilterPanel } from '@/features/products/filterPanel'
import { ref } from 'vue'

const searchParam = ref('')
const sortParam = ref('')

const getSearchParam = (payload: string) => {
  searchParam.value = payload
}

const getSortParam = (payload: string) => {
  sortParam.value = payload
}
</script>

<template>
  <Header />
  <div class="p-11 min-h-[100vh]">
    <filter-panel @search-product="getSearchParam" @sort-products="getSortParam"></filter-panel>

    <cards-list :search-param="searchParam" :sort-param="sortParam"></cards-list>
  </div>
</template>

<style lang="scss" scoped></style>
