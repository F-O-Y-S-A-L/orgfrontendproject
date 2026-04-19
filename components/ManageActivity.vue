<template>
  <div>
    <Loader v-if="activityStore.isLoading" />

    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 my-3 mx-3"
    >
      <h2 class="text-lg sm:text-xl font-semibold">Activity Logs</h2>
      <div class="flex flex-col">
        <button
          @click="activityStore.allActivityLog()"
          class="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Refresh
        </button>
        <p>ActivityLog Count: {{ activityStore.activityLogCount }}</p>
      </div>
    </div>

    <!-- Desktop Table -->
    <div
      class="hidden lg:block bg-white rounded-lg shadow m-4 max-h-[44rem] xl:max-h-[50rem] overflow-y-auto overflow-x-auto"
    >
      <table class="w-full border-collapse text-sm md:text-base min-w-[600px]">
        <thead class="sticky top-0">
          <tr class="bg-gray-100 text-left">
            <th class="p-3 border">User</th>
            <th class="p-3 border">Action</th>
            <th class="p-3 border">Target Type</th>
            <th class="p-3 border">Target ID</th>
            <th class="p-3 border">Organization</th>
            <th class="p-3 border">Time</th>
            <th class="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in activityStore.activityLog" :key="log.id" class="hover:bg-gray-50">
            <td class="p-3 border">
              <i class="pi pi-user"></i> {{ log.userId?.email }}
            </td>
            <td class="p-3 border">{{ log.action }}</td>
            <td class="p-3 border">{{ log.targetType }}</td>
            <td class="p-3 border">{{ log.targetId }}</td>
            <td class="p-3 border">
              <i class="pi pi-building"></i> {{ log.orgId }}
            </td>
            <td class="p-3 border text-gray-500">
              <i class="pi pi-clock"></i>
              {{ new Date(log.createdAt).toLocaleString("en-US") }}
            </td>
            <td class="p-3 border">
              <button
                @click="activityStore.deleteLog(log._id)"
                class="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="lg:hidden space-y-3">
      <div
        v-for="log in activityStore.activityLog"
        :key="log.id"
        class="bg-white rounded-lg shadow p-3 border"
      >
        <p class="text-sm">
          <i class="pi pi-user"></i>
          <span class="font-medium">{{ log.userId?.email }}</span>
        </p>
        <p class="text-sm">
          Action: <span class="font-medium">{{ log.action }}</span>
        </p>
        <p class="text-sm">
          Target Type: <span class="font-medium">{{ log.targetType }}</span>
        </p>
        <p class="text-sm">
          Target ID: <span class="font-medium">{{ log.targetId }}</span>
        </p>
        <p class="text-sm">
          <i class="pi pi-building"></i> Org:
          <span class="font-medium">{{ log.orgId }}</span>
        </p>
        <p class="text-xs text-gray-500">
          <i class="pi pi-clock"></i>
          {{ new Date(log.createdAt).toLocaleString("en-US") }}
        </p>

        <!-- Delete Button -->
        <div class="mt-2 flex justify-end">
          <button
            @click="deleteLog(log._id)"
            class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
import { useActivityLogStore } from "@/stores/activityLog";
const dashboardStore = useDashboardStore();
const activityStore = useActivityLogStore();
onMounted(async () => await activityStore.allActivityLog(), await dashboardStore.getData());
</script>
