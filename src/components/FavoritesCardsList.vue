<script setup lang="ts">
import CardItem from '@/components/CardItem.vue'
import { useFavoritesStore } from '@/app/stores/FavoritesStore'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div class="grid-cols-4 grid gap-10 mt-8">
    <card-item
      v-for="favorite in favoritesStore.list"
      :key="favorite.id"
      :product="favorite"
    ></card-item>
  </div>
</template>

<style scoped></style>
