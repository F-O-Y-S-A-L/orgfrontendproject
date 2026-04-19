<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
      <h2 class="text-2xl font-bold text-gray-800">Email Verification</h2>
      <p class="mt-4 text-gray-600">{{ authStore.status }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore()
const route = useRoute();

onMounted(async () => {
  await authStore.verifyEmail(route.params.token)
});
</script>
