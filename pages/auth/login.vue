<template>
  <div class="h-screen bg-gray-100 flex items-center justify-center">
    <!-- Notificaiton -->
    <transition name="slide">
      <div
        v-if="authStore.showNotifiAuth"
        class="fixed top-[5rem] right-3 md:right-6 bg-slate-400/95 text-white text-sm px-6 py-5 md:text-2xl md:px-12 md:py-10 rounded-lg border-2 border-blue-600 shadow-xl z-[9999]"
      >
        <span
          ><i class="pi pi-bell"></i> {{ authStore.NotifiMessageAuth }}</span
        >
      </div>
    </transition>
    <div class="bg-white shadow-lg rounded-lg mx-2 w-full max-w-md p-4 md:p-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Log In</h2>
      <form class="space-y-4" @submit.prevent="authStore.login(authStore.form)">
        <input
          v-model="authStore.form.email"
          type="email"
          autocomplete="email"
          placeholder="Email"
          class="w-full border outline-none rounded-lg p-3 focus:ring focus:ring-blue-300"
        />
        <div class="relative w-full">
          <input
            v-model="authStore.form.password"
            :type="authStore.showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            placeholder="Password"
            class="w-full border outline-none rounded-lg p-3 focus:ring focus:ring-blue-300"
          />
          <!-- Eye Icon -->
          <button
            type="button"
            @click="authStore.togglePassword()"
            class="absolute right-3 top-3 text-gray-500 focus:outline-none"
          >
            <span v-if="authStore.showPassword"><i class="pi pi-eye-slash"></i></span>
            <span v-else><i class="pi pi-eye"></i></span>
          </button>
        </div>
        <!-- ✅ Success/Error Message -->
        <p v-if="authStore.success" class="mt-4 text-green-600">
          {{ authStore.success }}
        </p>
        <p v-if="authStore.error" class="mt-4 text-red-600">
          {{ authStore.error }}
        </p>
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Log In
        </button>
      </form>

      <!-- Forgot Password Link -->
      <p class="mt-4 text-sm text-gray-600">
        <NuxtLink to="/forgotPassword" class="text-red-600 hover:underline">
          Forgot Password?
        </NuxtLink>
      </p>

      <p class="mt-2 text-sm text-gray-600">
        Don’t have an account?
        <NuxtLink to="/auth/signup" class="text-blue-600 hover:underline">
          Sign Up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
