<script setup lang="ts">
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
</script>

<template>
  <UContainer class="px-0">
    <UForm
      method="post"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-2">
          <div class="flex flex-row items-end">
            <USelectMenu
              size="xl"
              :items="countries"
              placeholder="+909"
              :loading="status === 'pending'"
              :search-input="{ icon: 'i-lucide-search', size: 'xs' }"
              label-key="dial_code"
              :ui="{
                item: 'text-xs gap-0.5',
                trailingIcon: 'size-5 p-1 m-0',
                itemTrailingIcon: 'size-4 p-0 m-0',
              }"
              class="text-md border-b border-gray-300 rounded-lg h-full m-0"
              @update:open="onOpen"
            >
              <template #item-leading="{ item }">
                <span>{{ item.emoji }}</span>
              </template>
            </USelectMenu>
          </div>
          <div>
            <UInput
              name="phone"
              size="xl"
              placeholder="Phone number"
              inputmode="numeric"
              variant="outline"
              class="border-b border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div class="ml-auto">
          <UButton type="submit" color="primary">
            Send Code
          </UButton>
        </div>
      </div>
    </UForm>
  </UContainer>
</template>
