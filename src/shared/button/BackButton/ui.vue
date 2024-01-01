<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

interface Props {
  buttonStyle?: string
}

const props = defineProps<Props>()

const { buttonStyle } = props
</script>

<template>
  <button :class="buttonStyle">
    <span class="flex items-center justify-center gap-5 font-semibold text-xl">
      <ArrowLeftIcon class="w-6 h-6 transition arrow-icon-left" />
      Вернуться назад
    </span>
  </button>
</template>

<style scoped></style>
