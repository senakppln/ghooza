<script setup lang="ts">
</script>

<template>
  <div class="flex h-screen w-screen flex-col items-center bg-[#f2f2e2]">
    <div class="h-1/6 w-full flex items-center justify-center ">
      <img src="public/ghooza.png" class="w-20 h-20" alt="Logo">
    </div>

    <div class="flex flex-col items-center gap-13 bg-white p-8  shadow-md border-t border-primary rounded-t-4xl h-5/6 w-full">
      <h1 class="text-3xl font-bold text-neutral-900 items-self-center text-center">
        <slot name="title">
          Auth Title
        </slot>
      </h1>

      <div class="flex flex-col gap-6 sm:w-3/4 lg:w-full">
        <p class="text-xl text-center text-neutral-900">
          <slot name="description">
            Auth description
          </slot>
        </p>
        <slot name="content" />

        <hr class="my-6 border-t border-gray-200 shadow-sm">

        <p class="text-sm text-center text-neutral-900">
          <slot name="footer" />
        </p>
        <slot name="link" />
        <slot name="guest" />
      </div>
    </div>
  </div>
</template>
