<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">System Metrics</h2>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      <!-- Total Users -->
      <div class="bg-gray-50 p-4 rounded shadow text-center">
        <h3 class="text-sm text-gray-500"><i class="pi pi-users"></i> Total Users</h3>
        <p class="text-2xl font-bold text-gray-800">
          {{ userStore.userCounts }}
        </p>
      </div>

      <!-- Total Organizations -->
      <div class="bg-gray-50 p-4 rounded shadow text-center">
        <h3 class="text-sm text-gray-500"><i class="pi pi-building"></i> Total Organizations</h3>
        <p class="text-2xl font-bold text-gray-800">{{ orgStore.orgCount }}</p>
      </div>

      <!-- CPU Usage -->
      <div class="bg-gray-50 p-4 rounded shadow text-center">
        <h3 class="text-sm text-gray-500"><i class="pi pi-server"></i> CPU Usage</h3>
        <p class="text-2xl font-bold text-gray-800">{{}}%</p>
      </div>

      <!-- Memory Usage -->
      <div class="bg-gray-50 p-4 rounded shadow text-center">
        <h3 class="text-sm text-gray-500"><i class="pi pi-box"></i> Memory Usage</h3>
        <p class="text-2xl font-bold text-gray-800">{{}}%</p>
      </div>

      <!-- Active Projects -->
      <div class="bg-gray-50 p-4 rounded shadow text-center">
        <h3 class="text-sm text-gray-500"><i class="pi pi-briefcase"></i> Active Projects</h3>
        <p class="text-2xl font-bold text-gray-800">
          {{ projectStore.projectCounts }}
        </p>
      </div>

      <!-- Error Logs -->
      <div class="bg-gray-50 p-4 rounded shadow text-center">
        <h3 class="text-sm text-gray-500"><i class="pi pi-history"></i> Activity Log</h3>
        <p class="text-2xl font-bold text-red-600">
          {{ activityStore.activityLogCount }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { organizationStore } from "@/stores/organization";
import { useProjectStore } from "@/stores/project";
import { useActivityLogStore } from "@/stores/activityLog";
import { onMounted } from "vue";

const userStore = useUserStore();
const activityStore = useActivityLogStore();
const orgStore = organizationStore();
const projectStore = useProjectStore();

onMounted(async () => {
  await userStore.getAllUsers();
  await orgStore.allOrgCard();
  await projectStore.Allproject();
  await activityStore.allActivityLog();
});
</script>
