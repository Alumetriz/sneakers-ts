<script setup lang="ts">
import { Header } from '@/widgets/header'
import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
import { FavoritesList } from '@/widgets/products/favoritesList'
import { useFavoritesStore } from '@/app/stores/FavoritesStore'
import { BackButton } from '@/shared/button/BackButton'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <Header />
  <main class="p-11">
    <div class="flex items-center gap-5">
      <router-link to="/">
        <ChevronLeftIcon
          class="h-9 p-2 text-[#C8C8C8] border border-gray-200 rounded-md cursor-pointer"
        ></ChevronLeftIcon>
      </router-link>
      <h1 class="font-bold text-3xl">Мои закладки</h1>
    </div>

    <favorites-list v-if="favoritesStore.list.length"></favorites-list>
    <div v-else class="flex flex-col gap-3 items-center justify-center h-full p-11">
      <img src="/images/emoji-1.png" alt="" class="h-16 w-16" />
      <h3 class="font-semibold text-2xl">Закладок нет :(</h3>
      <p class="text-lg text-[#9D9D9D] max-w-sm text-center">Вы ничего не добавляли в закладки</p>
      <router-link to="/">
        <BackButton
          button-style="relative bg-lime-500 hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300 text-white w-[250px] rounded-2xl p-5 mt-3"
        />
      </router-link>
    </div>
  </main>
</template>

<style scoped></style>
