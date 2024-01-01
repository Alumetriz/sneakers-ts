<script setup lang="ts">
import { ShoppingCart } from '@/widgets/shoppingCart'
</script>

<template>
  <div class="w-4/5 mx-auto bg-white my-10 rounded-2xl">
    <shopping-cart></shopping-cart>
    <router-view></router-view>
  </div>
</template>