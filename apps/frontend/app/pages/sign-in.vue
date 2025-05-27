<script setup lang="ts">
const router = useRouter()
interface Country {
  name: string
  code: string
  emoji: string
  dial_code: string
}
const { data: countries, status, execute } = await useFetch<Country[]>(
  '/api/countries.json',
  { immediate: false },
)

const selected = ref<Country | undefined>(undefined)

function onOpen() {
  if (!countries.value?.length) {
    execute()
  }
}
function onSubmit() {
  const form = document.querySelector('form')
  if (form) {
    const formData = new FormData(form)
    const phone = formData.get('phone')
    if (phone) {
      router.push(`/sign-up`)
    }
  }
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <div class="flex flex-col items-center justify-center gap-4 bg-pink-50 p-10 pt-25 pb-25 shadow-md rounded-3xl">
      <h1 class="text-3xl font-bold text-center text-neutral-900">
        Sign In
      </h1>
      <p class="text-center text-neutral-900">
        Sign in to your account
      </p>
      <div class="flex flex-col gap-4">
        <UContainer>
          <UForm action="/api/auth/sign-in" method="post">
            <div class="flex flex-col gap-4">
              <div class="flex flex-row gap-2">
                <div class="flex flex-row items-end">
                  <UInputMenu
                    v-model="selected"
                    :items="countries"
                    :loading="status === 'pending'"
                    label-key="name"
                    placeholder="Code"
                    class="w-24"
                    @update:open="onOpen"
                  >
                    <template #leading="{ modelValue, ui }">
                      <span v-if="modelValue" class="size-5 text-center">
                        {{ modelValue.emoji }}
                      </span>
                      <UIcon v-else name="i-lucide-earth" :class="ui.leadingIcon()" />
                    </template>
                    <template #item-leading="{ item }">
                      <span class="size-5">
                        {{ item.emoji }}
                      </span>
                      <span class="ml-1">+{{ item.dial_code }}</span>
                    </template>
                  </UInputMenu>
                </div>
                <div>
                  <UInput
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <div class="ml-auto">
                <UButton type="submit" color="neutral" @click="onSubmit">
                  Send Code
                </UButton>
              </div>
            </div>
          </UForm>
        </UContainer>
      </div>
    </div>
  </div>
</template>
