<script setup lang="ts">
const router = useRouter()

function onSubmit() {
  router.push('./otp-verification')
}
</script>

<template>
  <UContainer class="px-0">
    <UForm method="post">
      <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-2">
          <div class="flex flex-row ">
            <UInput
              size="xl"
              placeholder="Name"
              variant="outline"
              class="border-b border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <UInput
              size="xl"
              placeholder="Surname"
              variant="outline"
              class="border-b border-gray-300 rounded-lg "
            />
          </div>
        </div>
        <div class="ml-auto">
          <UButton type="submit" color="primary" @click="onSubmit">
            Complete
          </UButton>
        </div>
      </div>
    </UForm>
  </UContainer>
</template>
