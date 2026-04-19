<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">
        <i class="pi pi-building"></i> Organization
      </h1>
    </div>

    <!-- Notification -->
    <transition name="slide">
      <div
        v-if="orgStore.showNotifiOrg"
        class="fixed top-[5rem] right-3 md:right-6 bg-slate-400/95 text-white text-base md:text-2xl px-6 md:px-12 py-4 md:py-10 rounded-lg border-2 border-blue-600 shadow-xl z-[9999]"
      >
        <span
          ><li class="pi pi-bell"></li>
          {{ orgStore.NotifiMessageOrg }}</span
        >
      </div>
    </transition>

    <!-- Organization Info -->
    <div class="bg-white shadow rounded-lg px-4 py-12 mb-8 w-full">
      <h2 class="text-2xl font-semibold text-gray-800">My Organization</h2>
      <p class="text-gray-600 mt-2 text-lg">
        A collaborative space where team members manage Organization and track
        progress.
      </p>
      <div class="flex space-x-6 mt-4">
        <span class="text-gray-700"
          ><i class="pi pi-file text-xl"></i> Organization:
          {{ orgStore.orgCount }}</span
        >
      </div>
    </div>

    <!-- Organization Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="org in orgStore.organization"
        :key="org._id"
        class="bg-white rounded-2xl border shadow-md hover:shadow-xl transition transform hover:scale-[1.02] flex flex-col justify-between"
      >
        <!-- Header -->
        <div class="p-6 border-b">
          <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            <i class="pi pi-building text-indigo-600"></i> {{ org.name }}
          </h3>
          <p class="text-sm text-gray-500 mt-1">
            Created: {{ new Date(org.createdAt).toLocaleDateString("en-US") }}
          </p>
        </div>

        <!-- Owner Info -->
        <div class="flex items-center gap-3 px-6 py-4">
          <img
            :src="`${process.env.API_URI}/img/user/${org.ownerId?.photo}`"
            class="w-12 h-12 rounded-full border-2 border-indigo-500"
          />
          <div>
            <p class="text-xs text-gray-500">Owner</p>
            <p class="text-base font-medium text-gray-800">
              {{ org.ownerId?.name }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2 px-6 py-4 border-t">
          <button
            @click="orgStore.openInvite(org._id)"
            class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm"
          >
            <i class="pi pi-users"></i> Invite
          </button>
          <NuxtLink
            :to="`/organization/projects/${org._id}`"
            class="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700 transition text-center text-sm"
          >
            <i class="pi pi-file"></i> Manage
          </NuxtLink>
          <button
            @click="orgStore.openUpdate(org._id, org.name)"
            class="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg shadow hover:bg-yellow-600 transition text-sm"
          >
            <i class="pi pi-pencil"></i> Update
          </button>
          <button
            @click="orgStore.deleteOrg(org._id)"
            class="flex-1 bg-red-100 text-red-600 px-3 py-2 rounded-lg shadow hover:bg-red-200 transition text-sm"
          >
            <i class="pi pi-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Invite Modal -->
    <div
      v-if="orgStore.showInvite"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow p-4 md:p-6 w-full max-w-md">
        <h2 class="text-lg md:text-xl font-semibold mb-3 md:mb-4">
          Invite Member
        </h2>
        <input
          v-model="orgStore.inviteEmail"
          type="email"
          placeholder="Member email"
          class="border rounded-lg p-2 md:p-3 w-full mb-3"
        />
        <select
          v-model="orgStore.inviteRole"
          class="border rounded-lg p-2 md:p-3 w-full mb-3"
        >
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <div class="flex justify-end gap-2 md:gap-3">
          <button
            @click="orgStore.cancelInvite()"
            class="px-3 md:px-4 py-2 rounded bg-gray-200"
          >
            Cancel
          </button>
          <button
            @click="orgStore.sendInvite"
            class="px-3 md:px-4 py-2 rounded bg-blue-900 text-white"
          >
            Send Invite
          </button>
        </div>
      </div>
    </div>

    <!-- Update Modal -->
    <div
      v-if="orgStore.showUpdate"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow p-4 md:p-6 w-full max-w-md">
        <h2 class="text-lg md:text-xl font-semibold mb-3 md:mb-4">
          Update Organization
        </h2>
        <input
          v-model="orgStore.updateOrgName"
          type="text"
          placeholder="Organization name"
          class="border rounded-lg p-2 md:p-3 w-full mb-3"
        />
        <div class="flex justify-end gap-2 md:gap-3">
          <button
            @click="orgStore.cancelUpdate()"
            class="px-3 md:px-4 py-2 rounded bg-gray-200"
          >
            Cancel
          </button>
          <button
            @click="orgStore.updateOrg()"
            class="px-3 md:px-4 py-2 rounded bg-blue-900 text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { organizationStore } from "@/stores/organization";
import { useNotificationStore } from "@/stores/notification";
const notifiStore = useNotificationStore();
const orgStore = organizationStore();
onMounted(async () => {
  await orgStore.userOrg();
});
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
