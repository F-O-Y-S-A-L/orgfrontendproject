<template>
  <div class="min-h-screen bg-gray-50 p-3 md:p-8">
    <!-- Header -->
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
      <i class="pi pi-building "></i> Organizations
    </h1>

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

    <!-- Create Organization Form -->
    <div class="bg-white rounded-lg shadow p-4 md:p-6 mb-6 md:mb-10">
      <h2 class="text-lg md:text-xl font-semibold mb-3 md:mb-4">
        Create New Organization
      </h2>
      <div class="flex flex-col md:flex-row gap-3 md:gap-4">
        <input
          v-model="orgStore.orgName"
          type="text"
          placeholder="Organization name"
          class="flex-1 border rounded-lg p-2 md:p-3 focus:ring focus:ring-blue-300"
        />
        <button
          @click="orgStore.createOrganization()"
          class="bg-blue-800 text-white px-4 md:px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Create
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="w-full mb-4 relative md:w-80">
      <i
        class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      ></i>
      <input
        type="search"
        v-model="orgStore.searchQuery"
        placeholder="Search organization..."
        class="w-full border p-2 pl-10 rounded outline-none"
      />
    </div>

    <Loader v-if="orgStore.isLoading" />

    <!-- Organization Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div
        v-for="org in orgStore.filteredOrganizations"
        :key="org._id"
        class="bg-white border rounded-lg p-4 md:p-6 shadow hover:shadow-md transition"
      >
        <h3 class="text-base md:text-lg font-semibold text-gray-800">
          <i class="pi pi-building"></i> {{ org.name }}
        </h3>
        <span class="flex gap-2 items-center mt-2">
          <img
            :src="`${process.env.API_URI}/img/user/${org.ownerId?.photo}`"
            class="w-8 h-8 md:w-9 md:h-9 rounded-full"
          />
          <p class="text-base text-gray-800">
            {{ org.ownerId?.email }}
          </p>
        </span>

        <!-- Buttons row -->
        <div class="mt-3 flex flex-col sm:flex-row gap-2 sm:justify-between">
          <button
            @click="orgStore.openInvite(org._id)"
            class="bg-gray-500 text-white px-3 md:px-4 py-2 rounded-lg shadow hover:bg-gray-700 text-sm md:text-base"
          >
            Invite Member
          </button>
          <button
            @click="orgStore.deleteOrg(org._id)"
            class="bg-slate-200 px-3 text-red-600 rounded-lg hover:text-red-600 font-medium text-base"
          >
            <i class="pi pi-trash text-lg"></i> Delete
          </button>
        </div>

        <!-- Manage & Update -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-3 mt-4">
          <NuxtLink
            :to="`/organization/projects/${org._id}`"
            class="bg-gray-100 px-3 md:px-4 py-2 rounded hover:bg-gray-200 text-center text-sm md:text-base"
          >
            Manage
          </NuxtLink>
          <button
            @click="orgStore.openUpdate(org._id, org.name)"
            class="mt-2 sm:mt-0 bg-blue-900 text-white px-3 md:px-4 py-2 rounded-lg shadow hover:bg-blue-800 text-sm md:text-base"
          >
            Update
          </button>
        </div>

        <p class="text-xs md:text-sm text-gray-800 mt-4">
          <i class="pi pi-clock"></i>
          {{ new Date(org.createdAt).toLocaleDateString("en-US") }}
        </p>
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
import { ref, onMounted } from "vue";
import { organizationStore } from "@/stores/organization";
import { useDashboardStore } from "@/stores/dashboard";
import { useNotificationStore } from "@/stores/notification";
const notifiStore = useNotificationStore();
const orgStore = organizationStore();
const dashboardStore = useDashboardStore();
onMounted(async () => {
  await orgStore.allOrgCard();
  await dashboardStore.getData();
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
