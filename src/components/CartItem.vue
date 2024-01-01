<script setup lang="ts">
import type { PropType } from 'vue'
import type { Product } from '@/types'
import { useCartStore } from '@/app/stores/CartStore'
import { Icon } from '@/shared/icon'

const props = defineProps({
  order: {
    type: Object as PropType<Product>,
    require: true
  }
})
console.log(props.order)
const cartStore = useCartStore()

const deleteOrder = () => {
  if (props.order) {
    cartStore.deleteProductFromCart(props.order)
  }
}
</script>

<template>
  <div class="border border-[#EAEAEA] rounded-2xl p-5 mt-10">
    <div class="flex items-center justify-between gap-10">
      <img :src="`images/${order?.imageUrl}`" alt="Sneakers" class="h-[70px] w-[70px]" />
      <div>
        <h3 class="max-w-[250px] text-left">{{ order?.title }}</h3>
        <span class="font-bold"> {{ order?.price.toLocaleString('ru-RU') }} руб.</span>
      </div>
      <div @click="deleteOrder">
        <Icon type="close" icon-style="cursor-pointer h-9 w-9" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
