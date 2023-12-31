<script setup lang="ts">
import {Navigation} from "@/features/header/navigation";
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

    <Navigation />
  </header>
</template>
