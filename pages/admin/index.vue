<template>
  <div class="min-h-screen flex ">
    <!-- Sidebar -->
    <button
      @click="openSideBarAdmin()"
      class="block absolute top-20 left-4 xl:hidden"
    >
      <li class="pi pi-bars text-xl"></li>
    </button>
    <aside
      class="w-64 bg-gradient-to-b from-gray-50 to-gray-100 shadow-lg hidden xl:flex xl:flex-col"
    >
      <!-- Logo / Title -->
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-base font-bold text-gray-800 md:text-lg lg:text-xl">
          Admin Dashboard
        </h2>
      </div>

      <!-- Navigation -->
      <nav class="flex mt-4 ">
        <ul class="space-y-2">
          <li>
            <button
              @click="active = 'metrics'"
              :class="[
                'flex items-center w-full px-6 py-3 rounded-md transition',
                active === 'metrics'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
              ]"
            >
              <i class="pi pi-chart-bar"></i> <span class="ml-3">View Metrics</span>
            </button>
          </li>
          <li>
            <button
              @click="active = 'users'"
              :class="[
                'flex items-center w-full px-6 py-3 rounded-md transition',
                active === 'users'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
              ]"
            >
              <i class="pi pi-users"></i> <span class="ml-3">Manage Users</span>
            </button>
          </li>
          <li>
            <button
              @click="active = 'orgs'"
              :class="[
                'flex items-center w-full px-6 py-3 rounded-md transition',
                active === 'orgs'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
              ]"
            >
              <i class="pi pi-building"></i> <span class="ml-3">Manage Organizations</span>
            </button>
          </li>
          <li>
            <button
              @click="active = 'activity'"
              :class="[
                'flex items-center w-full px-6 py-3 rounded-md transition',
                active === 'activity'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
              ]"
            >
              <i class="pi pi-history"></i> <span class="ml-3">Activity</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- tablet, mobile -->
    <transition name="slide">
      <aside
        v-if="showSideBarAdmin"
        class="absolute w-64 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 shadow-lg flex flex-col z-50"
      >
        <!-- Logo / Title -->
        <div class="p-6 border-b border-gray-200 flex justify-between">
          <h2 class="text-base font-bold text-gray-800 md:text-lg lg:text-xl">
            Admin Dashboard
          </h2>
          <i @click="closeSideBarAdmin()" class="pi pi-times text-xl"></i>
        </div>

        <!-- Navigation -->
        <nav class="flex mt-4">
          <ul class="space-y-2">
            <li>
              <button
                @click="active = 'metrics'"
                :class="[
                  'flex items-center w-full px-6 py-3 rounded-md transition',
                  active === 'metrics'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
                ]"
              >
                <i class="pi pi-chart-bar"></i> <span class="ml-3">View Metrics</span>
              </button>
            </li>
            <li>
              <button
                @click="active = 'users'"
                :class="[
                  'flex items-center w-full px-6 py-3 rounded-md transition',
                  active === 'users'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
                ]"
              >
                <i class="pi pi-users"></i> <span class="ml-3">Manage Users</span>
              </button>
            </li>
            <li>
              <button
                @click="active = 'orgs'"
                :class="[
                  'flex items-center w-full px-6 py-3 rounded-md transition',
                  active === 'orgs'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
                ]"
              >
                <i class="pi pi-building"></i> <span class="ml-3">Manage Organizations</span>
              </button>
            </li>
            <li>
              <button
                @click="active = 'activity'"
                :class="[
                  'flex items-center w-full px-6 py-3 rounded-md transition',
                  active === 'activity'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
                ]"
              >
                <i class="pi pi-history"></i> <span class="ml-3">Activity</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </transition>

    <!-- Main Content -->
    <main class="flex-1 p-1 mt-10 xl:mt-0">
      <ViewMetrics v-if="active === 'metrics'" />
      <ManageUser v-else-if="active === 'users'" />
      <ManageOrg v-else-if="active === 'orgs'" />
      <ManageActivity v-else />
    </main>
  </div>
</template>
<script setup>
import { ref } from "vue";

const active = ref("metrics");
const showSideBarAdmin = ref(false);

function openSideBarAdmin() {
  showSideBarAdmin.value = true;
}
function closeSideBarAdmin() {
  showSideBarAdmin.value = false;
}
</script>
