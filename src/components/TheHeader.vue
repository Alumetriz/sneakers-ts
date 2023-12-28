<script setup lang="ts">
import { useCartStore } from '@/stores/CartStore'
import { computed, ref } from 'vue'

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
  <header class="flex justify-between items-center border-b border-[#EAEAEA] p-11">
    <router-link to="/">
      <div class="flex gap-3.5 items-center">
        <img src="/images/logo.png" alt="Logo" class="h-10 w-10" />
        <div>
          <h1 class="font-bold text-xl uppercase">Sneakers</h1>
          <p class="text-[#9D9D9D]">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <nav>
      <ul class="flex gap-8">
        <li
          class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
          @click="openCart"
        >
          <div class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
            <img src="/images/cart.svg" alt="Корзина" />
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
              <img src="/images/heart.svg" alt="Закладки" />
              <span class="text-[#5C5C5C] font-normal">Закладки</span>
            </div>
          </router-link>
        </li>
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <a href="#" class="flex gap-3">
            <img src="/images/profile.svg" alt="Профиль" />
            <span class="text-[#5C5C5C] font-normal">Профиль</span>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
