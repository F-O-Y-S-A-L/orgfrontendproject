export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: [
     'primeicons/primeicons.css',
    '~/assets/css/tailwind.css',
  ],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      socketUrl: process.env.SOCKET_URL
    }
  }
  
});
