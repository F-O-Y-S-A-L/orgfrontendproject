<template>
  <div class="h-screen bg-gray-100 flex items-center justify-center">
    <transition name="slide">
      <div
        v-if="authStore.showNotifiAuth"
        class="fixed top-[5rem] right-3 md:right-6 bg-slate-400/95 text-white text-sm px-6 py-5 md:text-2xl md:px-12 md:py-10 rounded-lg border-2 border-blue-600 shadow-xl z-[9999]"
      >
        <span
          ><i class="pi pi-bell text-lg"></i>
          {{ authStore.NotifiMessageAuth }}</span
        >
      </div>
    </transition>

    <div
      class="bg-white shadow-lg rounded-lg w-full mx-2 max-w-md p-4 space-y-3 md:space-y-7 md:p-8"
    >
      <h2 class="text-2xl font-bold text-gray-800">Sign Up</h2>
      <div class="space-y-4">
        <input
          v-model="authStore.form.name"
          type="text"
          placeholder="Name"
          class="w-full border outline-none rounded-lg p-3 focus:ring focus:ring-blue-300"
        />
        <input
          v-model="authStore.form.email"
          type="email"
          placeholder="Email"
          class="w-full border outline-none rounded-lg p-3 focus:ring focus:ring-blue-300"
        />
        <div class="relative w-full">
          <input
            v-model="authStore.form.password"
            :type="authStore.showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="w-full outline-none border rounded-lg p-3 focus:ring focus:ring-blue-300"
          />
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
          @click="authStore.signup(authStore.form)"
          class="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </div>
      <!-- Forgot Password Link -->
      <p class="mt-4 text-sm text-gray-600">
        <NuxtLink to="/forgotPassword" class="text-red-600 hover:underline">
          Forgot Password?
        </NuxtLink>
      </p>

      <p class="mt-4 text-sm text-gray-600">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-blue-600 hover:underline"
          >Log In</NuxtLink
        >
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
