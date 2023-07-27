// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [`~/assets/styles/main.scss`, '~/assets/normalize.css'],
  
  modules: [
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: [
      'defineStore',
    ],
  },
  devtools: { enabled: true },
      routeRules: {
        '/': { redirect: '/inbox' },
        '': { redirect: '/inbox' },
    },
})
