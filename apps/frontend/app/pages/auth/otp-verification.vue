<script setup lang="ts">
const countdown = ref(30)
let timerId: ReturnType<typeof setInterval>

const canResend = computed(() => countdown.value === 0)

function startTimer() {
  clearInterval(timerId)
  countdown.value = 30
  timerId = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    }
    else {
      clearInterval(timerId)
    }
  }, 1000)
}

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  clearInterval(timerId)
})

function resendCode() {
  if (!canResend.value)
    return
  startTimer()
}
</script>

<template>
  <AuthPage>
    <template #title>
      Verify Phone
      <br> Number
    </template>
    <template #description>
      Enter the code sent to your phone number
      to verify your account.
    </template>
    <template #content>
      <OtpContainer />
    </template>
    <template #link>
      <p class="text-sm text-center text-neutral-900">
        Didn't receive the code?
        <span
          v-if="!canResend"
          class="ml-1 text-gray-500"
        >
          Resend Code ({{ countdown }}s)
        </span>
        <NuxtLink
          v-else
          to="#"
          class="ml-1 text-primary hover:underline"
          @click.prevent="resendCode"
        >
          Resend Code
        </NuxtLink>
      </p>
    </template>
  </AuthPage>
</template>
