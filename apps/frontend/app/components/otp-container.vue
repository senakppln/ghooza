<script setup lang="ts">
import type { Form, FormError } from '@nuxt/ui'
import type { SendTempPass } from 'schemas'
import { sendTempPassSchema } from 'schemas'

const loading = ref(false)
const valid = ref(false)
const formRef = ref<Form<SendTempPass>>()
const state = reactive({
  otp: [],
})

async function validate(): Promise<FormError[]> {
  if (loading.value) {
    return []
  }

  const result = await sendTempPassSchema.safeParseAsync(state)

  valid.value = result.success

  return []
}

async function onSubmit() {
  if (loading.value) {
    return
  }

  formRef.value?.clear()
  loading.value = true

  try {
    await navigateTo('next')
  }
  catch (error: unknown) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

watch(() => state.otp, validate, { immediate: true })
</script>

<template>
  <UContainer>
    <UForm
      ref="formRef"
      method="post"
      :state="state"
    >
      <div class="flex flex-col gap-4 ">
        <div>
          <UPinInput
            v-model="state.otp"
            :length="6"
            name="otp"
            size="xl"
            required
            inputmode="numeric"
            otp
            variant="outline"
            :ui="{
              root: 'flex flex-row gap-4',
            }"
          />
        </div>
        <div class="ml-auto">
          <UButton
            type="submit"
            color="primary"
            class="mt-4 w-30 flex items-center justify-center"
            :loading="loading"
            @click="onSubmit"
          >
            Verify
          </UButton>
        </div>
      </div>
    </UForm>
  </UContainer>
</template>
