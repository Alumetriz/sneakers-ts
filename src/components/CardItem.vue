<script setup lang="ts">
import type { PropType } from 'vue'
import type { Product } from '@/types'

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
})
</script>

<template>
  <div
    class="relative border border-gray-200 p-8 rounded-3xl cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="!product.isFavorite"
      src="/images/like-1.svg"
      alt=""
      class="absolute cursor-pointer h-9 w-9"
    />
    <img v-else src="/images/like-2.svg" alt="" class="absolute cursor-pointer h-9 w-9" />
    <img :src="`images/${product.imageUrl}`" alt="Sneakers" />

    <h3 class="mt-2">{{ product.title }}</h3>

    <div class="flex items-center justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-[#BDBDBD]">Цена:</span>
        <span class="font-bold text-sm"> {{ product.price?.toString() }} руб.</span>
      </div>

      <img
        v-if="!product.isOrdered"
        src="/images/plus.svg"
        alt="Add"
        class="cursor-pointer h-9 w-9"
      />
      <img v-else src="/images/checked.svg" alt="Added" class="cursor-pointer h-9 w-9" />
    </div>
  </div>
</template>

<style scoped></style>
