<template>
  <div class="bg-white rounded-lg shadow p-2 md:p-6">
    <!-- Header -->
    <div
      class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
    >
      <h2 class="text-xl font-semibold">Manage Users</h2>
      <input
        type="search"
        v-model="userStore.searchQuery"
        placeholder="Search user..."
        class="w-full md:w-72 border p-2 rounded"
      />
    </div>

    <!-- Desktop/Tablet Table -->
    <div class="hidden lg:block overflow-x-auto max-h-[40rem] xl:max-h-[46rem]">
      <table class="min-w-full border-collapse text-sm md:text-base">
        <thead class="sticky top-0">
          <tr class="bg-gray-100 text-left">
            <th class="p-3 border">Name</th>
            <th class="p-3 border">Email</th>
            <th class="p-3 border">Status</th>
            <th class="p-3 border">Organizations</th>
            <th class="p-3 border">Joined</th>
            <th class="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in userStore.filteredUsers"
            :key="user._id"
            class="hover:bg-gray-50"
          >
            <td class="p-3 border font-medium flex items-center gap-3">
              <img
                :src="`${config.public.apiUrl}/img/user/${user.photo}`"
                alt="User Photo"
                class="w-10 h-10 md:w-14 md:h-14 rounded-full"
              />
              {{ index + 1 }}: {{ user.name }}
            </td>
            <td class="p-3 border">{{ user.email }}</td>
            <td class="p-3 border">
              <span
                :class="user.isVerified ? 'text-green-600' : 'text-red-600'"
              >
                {{ user.isVerified ? "Active" : "Inactive" }}
              </span>
            </td>
            <td class="p-3 border">
              <ul class="max-h-32 overflow-y-auto">
                <li v-for="org in user.organizations" :key="org.orgId">
                  <button
                    @click="userStore.openUpdateCard(org.orgId)"
                    class="bg-blue-600 text-white py-2 px-2 rounded mb-1.5 w-60"
                  >
                    {{ org.orgId }}
                  </button>
                </li>
              </ul>
            </td>
            <td class="p-2 md:p-3 border">
              <ul class="max-h-32 overflow-y-auto">
                <li v-for="date in user.organizations" :key="date.id">
                  {{ new Date(user.createdAt).toLocaleDateString("en-US") }}
                </li>
              </ul>
            </td>
            <td class="p-3 border flex gap-2">
              <button
                @click="userStore.viewUser(user._id)"
                class="bg-blue-600 text-white px-2 py-1 rounded"
              >
                View
              </button>
              <button
                @click="userStore.openUserCard(user._id)"
                class="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Update Card -->
    <div
      v-if="userStore.showUpdateOrg"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Invite Member</h2>
        <input
          v-model="userStore.sendEmail"
          type="email"
          placeholder="Member email"
          class="border rounded-lg p-3 w-full mb-3"
        />
        <select
          v-model="userStore.sendRole"
          class="border rounded-lg p-3 w-full mb-3"
        >
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
        <p>{{ userStore.currentOrgId }}</p>
        <button
          @click="userStore.deleteOrg()"
          class="px-4 py-2 rounded bg-red-600 text-white w-full mb-3"
        >
          Delete
        </button>
        <div class="flex flex-col md:flex-row justify-end gap-3">
          <button
            @click="userStore.cancelUpdateCard()"
            class="px-4 py-2 rounded bg-gray-200 w-full md:w-auto"
          >
            Cancel
          </button>
          <button
            @click="userStore.updateOrg()"
            class="px-4 py-2 rounded bg-blue-600 text-white w-full md:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- User Info Card -->
    <div
      v-if="userStore.showUserCard"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-md px-3 py-6 relative"
      >
        <!-- Close Button -->
        <button
          @click="userStore.showUserCard = false"
          class="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
        >
          <i class="pi pi-times"></i>
        </button>

        <!-- Card Content -->
        <h2 class="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
        <div class="flex flex-row justify-between gap-4">
          <div class="space-y-2 text-gray-700">
            <p class="font-bold text-sm sm:text-base md:text-lg">
              Name:
              <span class="font-semibold">{{ userStore.userData.name }}</span>
            </p>
            <p class="font-bold text-sm sm:text-base md:text-lg">
              Email:
              <span class="font-semibold">{{ userStore.userData.email }}</span>
            </p>
            <p class="font-bold text-sm sm:text-base md:text-lg">
              Role:
              <span class="font-semibold">{{ userStore.userData.role }}</span>
            </p>
            <p class="font-bold text-sm sm:text-base md:text-lg">
              Organizations:
              <span class="font-semibold">{{
                userStore.userData.organizations?.length
              }}</span>
            </p>
          </div>
          <img
            :src="`${config.public.apiUrl}/img/user/${userStore.userData.photo}`"
            class="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-lg"
            alt=""
          />
        </div>
      </div>
    </div>

    <!-- User deleted -->
    <div
      v-if="userStore.showUserDelete"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow p-6 w-64 text-center relative">
        <!-- Close Button -->
        <button
          @click="userStore.showUserDelete = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <i class="pi pi-times"></i>
        </button>

        <!-- Card Title -->
        <h3 class="text-lg font-semibold text-gray-700 mb-4">
          Are you sure you want to delete this user?
        </h3>

        <!-- Delete Button -->
        <button
          @click="userStore.deleteUser()"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <i class="pi pi-trash mr-2"></i> Delete
        </button>
        <p v-if="userStore.success" class="mt-4 text-green-600">{{ userStore.success}}</p>
        <p v-if="userStore.error" class="mt-4 text-red-600">{{ userStore.error}}</p>
      </div>
    </div>


    <!-- Mobile Card View -->
    <div class="lg:hidden gap-4 grid grid-cols-1 sm:grid-cols-2">
      <div
        v-for="(user, index) in userStore.filteredUsers"
        :key="user._id"
        class="border rounded-lg p-4 shadow-sm"
      >
        <div class="flex items-center gap-3 mb-3">
          <img
            :src="`${config.public.apiUrl}/img/user/${user.photo}`"
            alt="User Photo"
            class="w-12 h-12 rounded-full"
          />
          <div>
            <p class="font-semibold">{{ index + 1 }}: {{ user.name }}</p>
            <p class="text-sm text-gray-600">{{ user.email }}</p>
          </div>
        </div>
        <p class="mb-2">
          Status:
          <span :class="user.isVerified ? 'text-green-600' : 'text-red-600'">
            {{ user.isVerified ? "Active" : "Inactive" }}
          </span>
        </p>
        <p class="mb-2">
          Joined: {{ new Date(user.createdAt).toLocaleDateString("en-US") }}
        </p>
        <div class="flex flex-wrap gap-2 mb-2">
          <ul class="max-h-32 overflow-y-auto">
            <li v-for="org in user.organizations" :key="org.orgId">
              <button
                @click="userStore.openUpdateCard(org.orgId)"
                class="bg-blue-600 text-white py-2 px-2 rounded mb-1.5 w-60"
              >
                {{ org.orgId }}
              </button>
            </li>
          </ul>
        </div>
        <div class="flex gap-2">
          <button
            @click="userStore.viewUser(user._id)"
            class="bg-blue-600 text-white px-3 py-1 rounded w-full"
          >
            View
          </button>
          <button
            @click="userStore.openUserCard(user._id)"
            class="bg-red-600 text-white px-3 py-1 rounded w-full"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useDashboardStore } from "@/stores/dashboard";
const userStore = useUserStore();
const dashboardStore = useDashboardStore();

onMounted(async () => {
  await userStore.getAllUsers();
  await dashboardStore.getData();
});
</script>
