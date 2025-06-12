<script setup lang="ts">
const router = useRouter()

const { data: countries, status, execute } = await useLazyFetch<{
  name: string
  code: string
  emoji: string
  dial_code: string
}[]>('/api/countries.json', {
  immediate: false,
})

function onOpen() {
  if (!countries.value?.length) {
    execute()
  }
}

function onSubmit() {
  router.push('./sign-up')
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <div class="flex flex-col items-center justify-center gap-4 bg-pink-50 p-10 pt-20 pb-20 shadow-md rounded-3xl w-2/3 lg:w-1/4">
      <h1 class="text-3xl font-bold text-center text-neutral-900 ">
        Sign In
      </h1>
      <p class="text-center text-neutral-900">
        Sign in to your account
      </p>
      <div class="flex flex-col gap-4 sm:w-3/4 lg:w-full">
        <UContainer>
          <UForm action="/api/auth/sign-in" method="post">
            <div class="flex flex-col gap-4">
              <div class="flex flex-row gap-2">
                <div class="flex flex-row items-end">
                  <USelectMenu
                    :items="countries"
                    :loading="status === 'pending'"
                    :search-input="{ icon: 'i-lucide-search', size: 'xs' }"
                    label-key="dial_code"
                    class="max-w-4"
                    @update:open="onOpen"
                  >
                    <template #leading="{ modelValue, ui }">
                      <span v-if="modelValue" class="size-5 text-center">
                        {{ modelValue?.emoji }}
                      </span>
                      <UIcon
                        v-else
                        name="i-lucide-earth"
                        :class="ui.leadingIcon()"
                      />
                    </template>
                    <template #item-leading="{ item }">
                      <span>
                        {{ item.emoji }}
                      </span>
                      <span>+{{ item.dial_code }}</span>
                    </template>
                  </USelectMenu>
                </div>
                <div>
                  <UInput
                    placeholder="Phone number"
                    :ui="{
                      base: 'focus:border-red-500 focus:ring-red-500',
                    }"
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
