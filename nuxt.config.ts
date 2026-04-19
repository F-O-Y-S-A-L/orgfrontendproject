export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: [
     'primeicons/primeicons.css',
    '~/assets/css/tailwind.css',
  ],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  
});
