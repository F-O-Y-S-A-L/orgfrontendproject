<template>
  <div class="min-h-screen bg-gray-100 flex flex-col md:flex-row">
    <!-- Notification -->
    <transition name="slide">
      <div
        v-if="dashboardStore.showNotifiDashboard"
        class="fixed top-[5rem] right-3 md:right-6 bg-slate-400/95 text-white text-base md:text-2xl px-6 md:px-12 py-4 md:py-10 rounded-lg border-2 border-blue-600 shadow-xl z-[9999]"
      >
        <span
          ><i class="pi pi-bell"></i>
          {{ dashboardStore.NotifiMessageDashbaord }}</span
        >
      </div>
    </transition>

    <!-- Sidebar -->
    <div
      class="bg-white shadow-lg p-4 md:p-6 hidden md:w-48 md:flex md:flex-col md:justify-between lg:w-60"
    >
      <div>
        <h2 class="text-lg md:text-xl font-bold text-blue-900 mb-6 md:mb-10">
          Dashboard
        </h2>
        <nav class="flex flex-col space-y-5 md:space-y-10">
          <NuxtLink
            to="/dashboard/setting"
            class="block text-gray-700 text-base md:text-2xl hover:text-blue-600"
            ><i class="pi pi-cog"></i> Settings</NuxtLink
          >
          <NuxtLink
            to="/dashboard/organizations"
            class="block text-gray-700 text-base md:text-xl hover:text-blue-600"
            ><i class="pi pi-building"></i> My Organization</NuxtLink
          >
          <NuxtLink
            to="/dashboard/projects"
            class="block text-gray-700 text-base md:text-xl hover:text-blue-600"
            ><i class="pi pi-briefcase"></i> My Projects</NuxtLink
          >
        </nav>
      </div>
    </div>

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col">
      <!-- Top Navbar -->
      <div
        class="hidden bg-white shadow px-4 md:px-6 py-3 md:py-4 md:flex md:justify-between md:items-center"
      >
        <div class="flex items-center space-x-4">
          <h1 class="text-xl font-bold text-blue-900">Welcome</h1>
        </div>
        <div class="flex items-center space-x-4">
          <img
            :src="dashboardStore.photoUrl"
            alt="User Avatar"
            class="w-10 h-10 md:w-12 md:h-12 rounded-full border cursor-pointer"
          />
        </div>
      </div>

      <!-- Main Content -->
      <main class="p-4 md:p-8 space-y-6 md:space-y-8">
        <!-- Profile Image Update -->
        <div class="bg-white shadow rounded-lg p-4 md:p-6 w-full">
          <div
            class="flex flex-col justify-between items-center space-y-6 md:flex-row md:items-start md:space-y-0 md:space-x-6"
          >
            <div class="flex-1">
              <h2
                class="text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6"
              >
                Update Profile Image
              </h2>
              <div
                class="flex flex-col items-center space-y-4 md:space-x-6 md:flex-row md:space-y-0"
              >
                <div class="relative">
                  <img
                    :src="dashboardStore.photoUrl"
                    alt="Preview"
                    class="w-20 h-20 lg:w-24 lg:h-24 rounded-full border"
                  />
                  <label
                    for="file-upload"
                    class="cursor-pointer absolute bottom-0 -right-3 w-10 h-10 flex justify-center items-center bg-gray-400 text-white rounded-full"
                  >
                    <i class="pi pi-camera text-xl md:text-2xl"></i>
                  </label>
                </div>
                <div>
                  <div class="mb-4">
                    <input
                      id="file-upload"
                      type="file"
                      class="hidden"
                      @change="onFileChange"
                    />
                  </div>
                  <button
                    @click="dashboardStore.updateUserInfo()"
                    type="button"
                    class="cursor-pointer bg-slate-400 text-white px-3 py-2 rounded-lg shadow hover:bg-slate-500 transition font-semibold text-sm md:text-xs lg:text-base"
                  >
                    <i class="pi pi-upload"></i> Upload Image
                  </button>
                </div>
              </div>
            </div>
            <div class="flex flex-col text-center md:text-left">
              <h1 class="text-2xl text-blue-900 lg:text-4xl font-bold">
                Hello, {{ dashboardStore.userData.name.toUpperCase() }}! 👋
              </h1>
              <p
                v-if="dashboardStore.userData.role === 'superadmin'"
                class="text-slate-600 mt-2 text-sm lg:text-lg font-semibold"
              >
                Welcome mighty Superadmin — <br />
                you have full access and control over the system!
              </p>
              <p
                v-else
                class="text-blue-600 mt-2 text-sm lg:text-lg font-semibold"
              >
                Welcome back, valued user — <br />
                explore your dashboard and stay productive!
              </p>
            </div>
          </div>
        </div>

        <!-- Profile Update -->
        <div class="bg-white shadow rounded-lg p-4 md:p-6 w-full">
          <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
            <i class="pi pi-user text-xl"></i> Profile Information
          </h2>
          <form class="space-y-4 md:space-y-6">
            <div>
              <label class="block text-gray-600 mb-2 font-medium"
                >Full Name</label
              >
              <input
                v-model="dashboardStore.userData.name"
                type="text"
                class="w-full border rounded-lg px-3 md:px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-gray-600 mb-2 font-medium"
                >Email Address</label
              >
              <input
                v-model="dashboardStore.userData.email"
                type="email"
                class="w-full border rounded-lg px-3 md:px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <button
              @click="dashboardStore.updateUserInfo()"
              type="button"
              class="bg-gray-400 text-white px-4 md:px-6 py-2 rounded-lg shadow hover:bg-gray-500 transition w-full font-semibold text-sm md:text-base"
            >
              <i class="pi pi-save"></i> Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
const dashboardStore = useDashboardStore();

onMounted(() => dashboardStore.getData());

function onFileChange(event) {
  dashboardStore.setPhoto(event.target.files[0]);
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
