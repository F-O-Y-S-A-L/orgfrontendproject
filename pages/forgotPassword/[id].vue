<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-3">
    <div class="bg-white shadow-lg rounded-lg p-3 w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        <i class="pi pi-lock"></i> Reset Your Password
      </h2>

      <!-- Notification -->
      <transition name="slide">
        <div
          v-if="forgotPass.showNotifiForgetPass"
          class="fixed top-[5rem] right-3 md:right-66 bg-slate-400/95 text-white text-base md:text-2xl px-6 md:px-12 py-4 md:py-10 rounded-lg border-2 border-blue-600 shadow-xl z-[9999]"
        >
          <span
            ><li class="pi pi-bell"></li>
            {{ forgotPass.NotifiMessageForgetPass }}</span
          >
        </div>
      </transition>

      <form class="space-y-4">
        <!-- New Password -->
        <div>
          <label class="block text-gray-600 mb-2 font-medium"
            >New Password</label
          >
          <div class="relative w-full">
            <input
              v-model="forgotPass.resetPass.passwordConfirm"
              :type="forgotPass.showPassword ? 'text' : 'password'"
              placeholder="Confirm new password"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="button"
              @click="forgotPass.togglePassword()"
              class="absolute right-3 top-3 text-gray-500 focus:outline-none"
            >
              <span v-if="forgotPass.showPassword"
                ><i class="pi pi-eye-slash"></i
              ></span>
              <span v-else><i class="pi pi-eye"></i></span>
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-gray-600 mb-2 font-medium"
            >Confirm Password</label
          >
          <div class="relative w-full">
            <input
              v-model="forgotPass.resetPass.password"
              :type="forgotPass.showPasswordConfirm ? 'text' : 'password'"
              placeholder="Confirm new password"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="button"
              @click="forgotPass.togglePasswordConfirm()"
              class="absolute right-3 top-3 text-gray-500 focus:outline-none"
            >
              <span v-if="forgotPass.showPasswordConfirm"
                ><i class="pi pi-eye-slash"></i
              ></span>
              <span v-else><i class="pi pi-eye"></i></span>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          @click="passwordForgot()"
          type="button"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full font-semibold"
        >
          <i class="pi pi-lock-open"></i> Finish Reset
        </button>
      </form>

      <p class="text-sm text-gray-500 mt-4 text-center">
        After resetting, you can log in with your new password.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { userForgotPass } from "@/stores/forgotPass";

const route = useRoute();
const token = route.params.id;

const forgotPass = userForgotPass();

async function passwordForgot() {
  await forgotPass.resetPassword(token);
}
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
