<script setup lang="ts">
import { NuxtPage } from '#components'

useHead({
  bodyAttrs: {
    class: 'light',
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
