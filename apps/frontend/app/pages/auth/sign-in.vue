<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <AuthPage>
    <template #title>
      Welcome
    </template>

    <template #description>
      Sign In or Sign Up
      <br>
      Enter your phone number
    </template>
    <template #content>
      <PhoneContainer />
    </template>
    <template #guest>
      <UButton
        color="neutral"
        variant="outline"
        class="text-primary text-sm flex items-center justify-center bg-[#f2f2e2]"
        icon="i-lucide-arrow-right"
        :trailing="true"
        @click="router.push('/sign-in/guest')"
      >
        Just popping in for a sec!
      </UButton>
    </template>
  </AuthPage>
</template>
