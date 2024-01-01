<script setup lang="ts">
import CartItem from '@/features/cart/cartItem/ui.vue'
import {useCartStore} from '@/app/stores/CartStore'

const cartStore = useCartStore()

</script>

<template>
  <div
    class="overflow-y-auto scrollbar-w-10 scrollbar-track-bg-gray-300 scrollbar-thumb-gray-500 p-3"
    v-auto-animate
  >
    <cart-item
      v-for="order in cartStore.list"
      :key="order.id"
      :order="order"
    ></cart-item>
  </div>
</template>

<style scoped></style>
