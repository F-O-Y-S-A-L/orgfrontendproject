<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-3">
    <div
      v-if="forgotPass.forgotPasswordPage === 'EnterEmail'"
      class="bg-white shadow rounded-lg p-3 w-full max-w-md"
    >
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        <i class="pi pi-key text-lg"></i> Forgot Password
      </h2>

      <form class="space-y-4">
        <div>
          <label class="block text-gray-600 mb-2 font-medium">
            Enter Your Email
          </label>
          <input
            v-model="forgotPass.forgotEmail"
            type="email"
            placeholder="example@email.com"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          @click="forgotPass.forgotPassword()"
          type="button"
          class="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition w-full font-semibold"
        >
          <i class="pi pi-envelope"></i> Send Reset Link
        </button>
      </form>

      <p class="text-sm text-gray-500 mt-4 text-center">
        We’ll send you a secure link to reset your password.
      </p>
    </div>

    <div
      v-if="forgotPass.forgotPasswordPage === 'SendEmail'"
      class="mx-3 bg-white shadow-lg rounded-lg p-3 max-w-md text-center md:p-8"
    >
      <!-- Notification -->
      <transition name="slide">
        <div
          v-if="forgotPass.showNotifiForgetPass"
          class="fixed top-[5rem] right-3 md:right-6 bg-slate-400/95 text-white text-base md:text-2xl px-6 md:px-12 py-4 md:py-10 rounded-lg border-2 border-blue-600 shadow-xl z-[9999]"
        >
          <span
            ><i class="pi pi-bell"></i>
            {{ forgotPass.NotifiMessageForgetPass }}</span
          >
        </div>
      </transition>

      <h2 class="text-lg md:text-2xl font-bold text-gray-800">
        Check Your Email
      </h2>
      <p class="mt-4 text-gray-600">
        We have sent a password reset link to your email. Please check your
        inbox and follow the instructions to reset your password.
      </p>
    </div>
  </div>
</template>

<script setup>
import { userForgotPass } from "@/stores/forgotPass";

const forgotPass = userForgotPass();
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
