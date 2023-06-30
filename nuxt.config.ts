// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    '@pinia-plugin-persistedstate/nuxt',
  ],
  build: {
    transpile: ['gsap'],
  },
  css: ["@/assets/scss/main.scss", 'vue-toast-notification/dist/theme-default.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: "/assets/favicon.ico" }]
    }
  },
  runtimeConfig: {
    VITE_USER_API:"https://testapi.io/api/dartya",
    VITE_CAR_API:"https://testapi.io/api/dartya/resource/cardata"
  }
})
