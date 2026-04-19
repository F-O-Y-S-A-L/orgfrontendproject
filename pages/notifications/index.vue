<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-3 md:py-10">
    <h1 class="text-xl font-bold text-gray-800 mb-2 md:mb-6 md:text-3xl">Realtime Updates</h1>
    <p
      v-if="notificationStore.userNotifications.length === 0"
      class="text-xl font-medium"
    >
      No notification yet
    </p>

    <div class="md:w-full mx-2 max-w-2xl space-y-4">
      <div
        v-for="(notification, index) in notificationStore.userNotifications"
        :key="notification._id || index"
        class="bg-white rounded-xl shadow-md p-5 flex items-start gap-4 hover:shadow-lg transition border border-gray-200"
      >
        <!-- Left side icon -->
        <div class="flex-shrink-0">
          <div
            class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold"
          >
            {{ index + 1 }}
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1">
          <!-- Message -->
          <p class="text-gray-800 text-base font-medium mb-1">
            {{ notification.message }}
          </p>

          <!-- Action + Target -->
          <p class="text-sm text-gray-600 mb-2">
            Action:
            <span class="italic text-blue-600">{{ notification.action }}</span>
            <br />
          </p>

          <!-- User + Org -->
          <p class="text-sm text-gray-600 mb-2">
              <span class="font-medium"><i class="pi pi-user font-bold"></i> {{ notification.userId?.email }}</span>
            |
            <span class="font-medium"><i class="pi pi-building"></i> {{ notification.targetId }}</span>
          </p>

          <!-- Time -->
          <p class="text-xs text-gray-400">
            <i class="pi pi-clock"></i> {{ new Date(notification.createdAt).toLocaleString() }}
          </p>
        </div>
        <button
          @click="notificationStore.userNotifiDelete(notification._id)"
          class="hover:text-red-500 text-xl"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useNotificationStore } from "@/stores/notification";
import { useDashboardStore } from "@/stores/dashboard";
const notificationStore = useNotificationStore();
const dashboardStore = useDashboardStore();

onMounted(async () => {
  await notificationStore.userOnlyNotification();
  await dashboardStore.getData();
  await notificationStore.markAsRead();
});
</script>
