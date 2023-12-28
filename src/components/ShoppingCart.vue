<script setup lang="ts">
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid'
import CartList from '@/components/CartList.vue'
import { useCartStore } from '@/stores/CartStore'

const cartStore = useCartStore()

const closeCart = () => {
  cartStore.closeCart()
}
</script>

<template>
  <div
    class="fixed top-0 left-0 z-10 h-screen w-full bg-black/50"
    v-if="cartStore.cartIsOpen"
    @click="closeCart"
  ></div>
  <div
    class="fixed bg-white z-20 right-0 top-0 h-screen transition w-full sm:w-[500px] p-5"
    v-if="cartStore.cartIsOpen"
  >
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-col gap-3 h-4/5">
        <div class="flex justify-between">
          <ArrowLeftIcon
            class="h-8 w-8 text-[#5C5C5C] transition hover:text-black hover:-translate-x-1 cursor-pointer"
            @click="closeCart"
          ></ArrowLeftIcon>
          <h2 class="font-bold text-2xl">Корзина</h2>
        </div>

        <cart-list v-if="cartStore.list.length"></cart-list>
<!--        <div v-else class="flex flex-col gap-3 items-center justify-center h-full">-->
<!--          <img-->
<!--            :src="-->
<!--              ordersIsBought-->
<!--                ? '../src/assets/img/order-success-icon.png'-->
<!--                : '../src/assets/img/package-icon.png'-->
<!--            "-->
<!--            alt=""-->
<!--            class="h-32 w-32"-->
<!--          />-->
<!--          <h3 class="font-semibold text-2xl">-->
<!--            &lt;!&ndash;            Корзина пустая&ndash;&gt;-->
<!--            {{ ordersIsBought ? 'Заказ оформлен!' : 'Корзина пустая' }}-->
<!--          </h3>-->
<!--          <p class="text-lg text-[#9D9D9D] max-w-sm text-center">-->
<!--            {{-->
<!--              ordersIsBought-->
<!--                ? 'Ваш заказ скоро будет передан курьерской доставке'-->
<!--                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'-->
<!--            }}-->
<!--          </p>-->
<!--          <button-->
<!--            class="relative bg-lime-500 hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 text-white w-3/4 rounded-2xl p-5 mt-3"-->
<!--            @click="emit('close-cart')"-->
<!--          >-->
<!--            <span class="flex items-center justify-center gap-5 font-semibold text-xl">-->
<!--              <ArrowLeftIcon class="w-6 h-6 transition arrow-icon-left" />-->
<!--              Вернуться назад-->
<!--            </span>-->
<!--          </button>-->
<!--        </div>-->
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex gap-2 items-center">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b> (calcCartPrice() + calcPercent()).toFixed(2) руб.</b>
        </div>
        <div class="flex gap-2 items-center">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b> calcPercent().toFixed(2) руб.</b>
        </div>
        <button
          class="relative bg-lime-500 hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 text-white w-full rounded-2xl p-5 mt-3"
        >
          <span class="flex items-center justify-center gap-5 font-semibold text-xl">
            Оформить заказ
            <ArrowRightIcon class="w-6 h-6 transition arrow-icon-right" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button:hover .arrow-icon-right {
  transform: translateX(4px);
}

button:hover .arrow-icon-left {
  transform: translateX(-4px);
}
</style>
