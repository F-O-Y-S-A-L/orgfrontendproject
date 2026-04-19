<template>
  <header class="bg-blue-900 text-white shadow">
    <div
      class="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center"
    >
      <div class="flex space-x-5">
        <!-- Navigation -->
        <button class="block md:hidden">
          <li @click="openNav()" class="pi pi-bars text-xl font-medium"></li>
        </button>
        <!-- Logo -->
        <NuxtLink
          v-if="!authStore.jwt"
          to="/"
          class="text-lg md:text-xl font-bold hover:text-gray-200"
        >
          MyApp
        </NuxtLink>
        <NuxtLink
          v-else
          to="/dashboard"
          class="text-lg md:text-xl font-bold hover:text-gray-200"
        >
          MyApp
        </NuxtLink>
      </div>

      <div v-if="authStore.jwt" class="flex items-center space-x-3 md:hidden">
        <NuxtLink
          to="/notifications"
          class="relative hover:text-gray-200 text-2xl"
          ><i class="pi pi-bell text-white"></i>
          <span
            v-if="notificationStore.unreadCounts > 0"
            class="absolute -top-1.5 -right-2 bg-red-600 text-white text-xs font-bold h-5 w-5 flex justify-center items-center rounded-full"
          >
            {{ notificationStore.unreadCounts }}
          </span>
        </NuxtLink>
        <img
          @click="openProfileNav()"
          class="block w-11 h-11 rounded-full md:hidden"
          :src="dashboardStore.photoUrl"
          alt="User Avatar"
        />
      </div>

      <!-- web -->
      <nav class="hidden md:flex space-x-4 md:space-x-6 items-center">
        <NuxtLink
          v-if="authStore.jwt"
          to="/notifications"
          class="relative hover:text-gray-200 text-2xl"
          ><i class="pi pi-bell text-white"></i>
          <span
            v-if="notificationStore.unreadCounts > 0"
            class="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-xs font-bold h-[22px] w-[22px] flex justify-center items-center rounded-full"
          >
            {{ notificationStore.unreadCounts }}
          </span>
        </NuxtLink>
        <NuxtLink
          v-if="authStore.jwt"
          to="/organization"
          class="hover:text-gray-200"
          >Organizations</NuxtLink
        >
        <NuxtLink
          v-if="authStore.jwt && dashboardStore.userData.role === 'superadmin'"
          to="/admin"
          class="hover:text-gray-200"
          > Admin</NuxtLink
        >
        <NuxtLink
          v-if="!authStore.isAuthenticated"
          to="/auth/login"
          class="bg-white text-blue-600 px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow hover:bg-gray-100 transition text-sm md:text-base"
        >
          Login
        </NuxtLink>
        <button
          v-else
          @click="authStore.logout()"
          class="bg-white text-blue-600 px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow hover:bg-gray-100 transition text-sm md:text-base"
        >
          Logout
        </button>
        <NuxtLink v-if="authStore.jwt" to="/dashboard">
          <img
            class="w-11 h-11 rounded-full"
            :src="dashboardStore.photoUrl"
            alt="User Avatar"
          />
        </NuxtLink>
      </nav>

      <!-- mobile nav -->
      <transition name="slide">
        <nav
          v-if="showNav"
          class="absolute w-80 h-screen top-0 left-0 md:hidden bg-slate-600 rounded-r-2xl z-50"
        >
          <div
            class="grid grid-cols-1 justify-center items-start pl-4 pt-3 space-y-5"
          >
            <div class="flex justify-between items-center">
              <a
                href="/"
                class="text-lg md:text-xl font-bold hover:text-gray-200"
              >
                MyApp
              </a>
              <li @click="closeNav()" class="pi pi-times pr-6 text-xl"></li>
            </div>
            <NuxtLink
              v-if="authStore.jwt"
              to="/organization"
              class="hover:text-gray-200 pb-5 border-b-2"
              >Organizations</NuxtLink
            >
            <br />
            <NuxtLink
              v-if="authStore.jwt"
              to="/dashboard/organizations"
              class="hover:text-gray-200"
              >My Organizations</NuxtLink
            >
            <NuxtLink
              v-if="authStore.jwt"
              to="/dashboard/projects"
              class="hover:text-gray-200"
              >My Projects</NuxtLink
            >
            <NuxtLink
              v-if="!authStore.isAuthenticated"
              to="/auth/login"
              class="bg-white text-blue-600 w-20 text-center md:px-4 py-1.5 md:py-2 rounded-lg shadow hover:bg-gray-100 transition text-sm md:text-base"
            >
              Login
            </NuxtLink>
            <button
              v-else
              @click="authStore.logout()"
              class="bg-white text-blue-600 w-20 md:px-4 py-1.5 md:py-2 rounded-lg shadow hover:bg-gray-100 transition text-sm md:text-base"
            >
              Logout
            </button>
          </div>
        </nav>
      </transition>
      <div
        v-if="showNav"
        class="fixed inset-0 bg-black bg-opacity-40 z-40"
      ></div>

      <!-- mobile dashboard sidebar -->
      <transition name="slides">
        <div
          v-if="showProfileNav"
          class="block absolute top-0 py-5 px-5 space-y-5 right-0 w-80 h-full rounded-l-2xl bg-slate-500 z-50 md:hidden"
        >
          <div class="flex items-center justify-between">
            <div class="flex space-x-1">
              <img
                :src="dashboardStore.photoUrl"
                alt="User Avatar"
                class="w-10 h-10 md:w-12 md:h-12 rounded-full border cursor-pointer"
              />
              <div class="grid grid-cols-1 text-sm font-medium">
                <span>{{ dashboardStore.userData.name }}</span>
                <span>{{ dashboardStore.userData.email }}</span>
              </div>
            </div>
            <li @click="closeProfileNav()" class="pi pi-times text-lg"></li>
          </div>
          <nav class="flex flex-col items-start space-y-5 text-lg pt-10">
            <NuxtLink to="/dashboard"
              ><i class="pi pi-user"></i> Profile</NuxtLink
            >
            <NuxtLink
              v-if="
                authStore.jwt && dashboardStore.userData.role === 'superadmin'
              "
              to="/admin"
              class="hover:text-gray-200"
              ><i class="pi pi-building-columns"></i> Admin</NuxtLink
            >
            <NuxtLink to="/dashboard/setting"
              ><i class="pi pi-cog"></i> Settings</NuxtLink
            >
          </nav>
        </div>
      </transition>
      <div
        v-if="showProfileNav"
        class="fixed inset-0 bg-black bg-opacity-40 z-40"
      ></div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useDashboardStore } from "@/stores/dashboard";
import { useNotificationStore } from "@/stores/notification";
import { onMounted, ref } from "vue";
const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
const notificationStore = useNotificationStore();

const token = authStore.jwt;

onMounted(async () => {
  if (token) {
    await dashboardStore.getData();
    await notificationStore.unreadNotifiCount();
  }
});

const showNav = ref(false);
const showProfileNav = ref(false);

function openNav() {
  showNav.value = true;
}
function closeNav() {
  showNav.value = false;
}

function openProfileNav() {
  showProfileNav.value = true;
}
function closeProfileNav() {
  showProfileNav.value = false;
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
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
  transform: translateX(-100%);
  opacity: 0;
}

.slides-enter-active,
.slides-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slides-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.slides-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slides-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slides-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
