<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/app/stores/CartStore'
import { Icon } from '@/shared/icon'

const cartStore = useCartStore()

const emit = defineEmits<{
  (e: 'open-cart', cartIsOpen: boolean): void
}>()

const openCart = (): void => {
  cartStore.openCart()
  emit('open-cart', cartStore.cartIsOpen)
}

const calcCartPrice = computed((): number => {
  return cartStore.calcCartPrice
})

const calcPercent = computed((): number => {
  return cartStore.calcPercent
})
</script>

<template>
  <nav>
    <ul class="flex gap-8">
      <li
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
        @click="openCart"
      >
        <div class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <Icon type="cart" />
          <span
            :class="{
              'font-bold': cartStore.ordersLength > 0,
              'text-black': cartStore.ordersLength > 0,
              'text-[#5C5C5C]': cartStore.ordersLength === 0,
              'font-normal': cartStore.ordersLength === 0
            }"
            >{{
              cartStore.list.length
                ? (calcCartPrice + calcPercent).toLocaleString('ru-RU') + ' руб.'
                : 'Корзина'
            }}</span
          >
        </div>
      </li>
      <li>
        <router-link to="/favorites">
          <div class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
            <Icon type="favorites" />
            <span class="text-[#5C5C5C] font-normal">Закладки</span>
          </div>
        </router-link>
      </li>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <a href="#" class="flex gap-3">
          <Icon type="profile" />
          <span class="text-[#5C5C5C] font-normal">Профиль</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
