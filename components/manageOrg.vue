<template>
  <div class="bg-white rounded-lg shadow p-4 sm:p-6">
    <!-- Header -->
    <div
      class="mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
    >
      <h2 class="text-lg sm:text-xl font-semibold">All Organizations</h2>
      <input
        type="search"
        v-model="userStore.searchQuery"
        placeholder="Search organization..."
        class="w-full sm:w-72 border p-2 rounded"
      />
    </div>

    <!-- Organization List -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-xs sm:text-sm md:text-base">
        <thead class="sticky top-0">
          <tr class="bg-gray-100 text-left">
            <th class="p-2 sm:p-3 border">
              <i class="pi pi-building"></i> Org
            </th>
            <th class="p-2 sm:p-3 border">Owner</th>
            <th class="p-2 sm:p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="org in userStore.filteredOrganizations"
            :key="org._id"
            class="hover:bg-gray-50"
          >
            <td class="p-2 sm:p-3 border">{{ org.name }}</td>
            <td class="p-2 sm:p-3 border">
              <i class="pi pi-user"></i> {{ org.ownerId?.email }}
            </td>
            <td
              class="p-2 sm:p-3 border flex flex-col sm:flex-row flex-wrap gap-2"
            >
              <button
                @click="userStore.viewOrg(org._id)"
                class="bg-blue-600 text-white px-2 py-1 rounded text-xs sm:text-sm md:text-base"
              >
                View
              </button>
              <button
                @click="userStore.openUpdateCard(org._id, org.name)"
                class="bg-yellow-500 text-white px-2 py-1 rounded text-xs sm:text-sm md:text-base"
              >
                Edit
              </button>
              <button
                @click="userStore.openDeleteCardOrg(org._id)"
                class="bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm md:text-base"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- User deleted -->
    <div
      v-if="userStore.showDeleteOrg"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow p-6 w-64 text-center relative">
        <!-- Close Button -->
        <button
          @click="userStore.showDeleteOrg = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <i class="pi pi-times"></i>
        </button>

        <!-- Card Title -->
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          Are you sure you want to delete this Org?
        </h3>

        <!-- Delete Button -->
        <button
          @click="userStore.deleteOrg()"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <i class="pi pi-trash mr-2"></i> Delete
        </button>
        <p v-if="userStore.success" class="mt-4 text-green-600">
          {{ userStore.success }}
        </p>
        <p v-if="userStore.error" class="mt-4 text-red-600">
          {{ userStore.error }}
        </p>
      </div>
    </div>

    <!-- Organization Details Modal -->
    <div
      v-if="userStore.showOrgDetils"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-lg shadow p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg font-bold"
      >
        <h3 class="text-lg sm:text-xl font-semibold mb-4">
          Organization Details
        </h3>
        <div
          class="space-y-3 sm:space-y-5 mb-5 flex flex-row justify-between items-center"
        >
          <div class="space-y-1.5 text-xs sm:text-base md:text-lg">
            <p>
              Name:
              <span class="font-medium">{{
                userStore.selectedOrg.org.name
              }}</span>
            </p>
            <p>
              Admin:
              <span class="font-medium">{{
                userStore.selectedOrg.org.ownerId?.email
              }}</span>
            </p>
            <p>
              Members:
              <span class="font-medium">{{
                userStore.selectedOrg.orgCount
              }}</span>
            </p>
            <p>
              Role:
              <span class="font-medium">{{
                userStore.selectedOrg.org.ownerId?.role
              }}</span>
            </p>
            <p>
              Created:
              <span class="font-medium">
                {{
                  new Date(userStore.selectedOrg.org.createdAt).toLocaleString(
                    "en-US",
                  )
                }}
              </span>
            </p>
          </div>
          <img
            :src="`${process.env.API_URI}/img/user/${userStore.selectedOrg.org.ownerId.photo}`"
            class="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-xl object-cover"
            alt=""
          />
        </div>
        <button
          @click="userStore.cancelOrg()"
          class="px-4 py-2 rounded bg-gray-200 w-full sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Organization Update Modal -->
    <div
      v-if="userStore.showUpdateOrg"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div
        class="bg-white rounded-lg shadow p-4 sm:p-6 w-full max-w-sm sm:max-w-md"
      >
        <h2 class="text-lg sm:text-xl font-semibold mb-4">Invite Member</h2>
        <input
          v-model="userStore.updateOrgName"
          type="text"
          placeholder="Enter Organization name..."
          class="border rounded-lg p-3 w-full mb-3"
        />
        <button
          class="px-4 py-2 rounded bg-blue-600 text-white w-full sm:w-auto mb-2"
          @click="userStore.updateOrg()"
        >
          Name update
        </button>
        <input
          v-model="userStore.inviteEmail"
          type="email"
          placeholder="Member email"
          class="border rounded-lg p-3 w-full mb-3"
        />
        <select
          v-model="userStore.inviteRole"
          class="border rounded-lg p-3 w-full mb-3"
        >
          <option disabled value="">Select Role</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <p class="text-xs sm:text-sm md:text-base">
          {{ userStore.currentOrgId }}
        </p>
        <div class="flex flex-col sm:flex-row justify-end gap-3 mt-3">
          <button
            @click="userStore.cancelUpdateCard()"
            class="px-4 py-2 rounded bg-gray-200 w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            @click="userStore.sendInvite()"
            class="px-4 py-2 rounded bg-blue-600 text-white w-full sm:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
const userStore = useUserStore();

onMounted(async () => await userStore.allOrgCard(), await userStore.getAllUsers());
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
