// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
  ],
    runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000',
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})