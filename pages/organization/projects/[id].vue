<template>
  <div class="min-h-screen bg-gray-50 p-3 md:p-8">
    <!-- Header -->
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
      <i class="pi pi-briefcase"></i> Project
    </h1>

    <!-- Notification -->
    <transition name="slide">
      <div
        v-if="projectStore.showNotifiProject"
        class="fixed top-[5rem] right-3 md:right-6 bg-slate-400/95 text-white text-base md:text-2xl px-6 md:px-12 py-4 md:py-10 rounded-lg border-2 border-blue-600 shadow-xl z-[9999]"
      >
        <span><i class="pi pi-bell"></i> {{ projectStore.NotifiMessageProject }}</span>
      </div>
    </transition>

    <!-- Project Create Form -->
    <div class="bg-white rounded-lg shadow p-4 md:p-6 mb-6 md:mb-8">
      <h2 class="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800">
        Create New Project
      </h2>
      <input
        v-model="projectStore.project.newProjectName"
        type="text"
        placeholder="Project name"
        class="border rounded px-3 py-2 w-full mb-3"
      />
      <textarea
        v-model="projectStore.project.newProjectDescription"
        placeholder="Project description"
        class="border rounded px-3 py-2 w-full mb-3"
      ></textarea>
      <button
        @click="projectCreate()"
        class="bg-blue-900 text-white px-4 md:px-6 py-2 rounded-lg shadow hover:bg-blue-800 transition text-sm md:text-base"
      >
        + Create Project
      </button>
    </div>

    <!-- Search -->
    <div class="w-80 mb-4 relative">
      <i
        class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      ></i>
      <input
        type="search"
        v-model="projectStore.searchQuery"
        placeholder="Search project..."
        class="w-full border p-2 pl-10 rounded outline-none"
      />
    </div>

    <Loader v-if="projectStore.isLoading" />

    <!-- Project Cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10"
    >
      <div
        v-for="project in projectStore.filteredProjects"
        :key="project._id"
        class="group bg-white border rounded-lg p-4 md:p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1"
      >
        <!-- Project Title -->
        <NuxtLink
          :to="`/organization/tasks/${project._id}`"
          class="block cursor-pointer"
        >
          <h2
            class="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-600"
          >
            <i class="pi pi-briefcase"></i> {{ project.name }}
          </h2>
          <p class="mt-2 text-gray-600 line-clamp-2 text-sm md:text-base">
            {{ project.description }}
          </p>
          <p class="mt-3 text-xs md:text-sm text-gray-400">
            <i class="pi pi-clock"></i>
            {{ new Date(project.createdAt).toLocaleDateString("en-US") }}
          </p>
          <p
            class="mt-1 text-base text-gray-500 flex items-center gap-2"
          >
            <img
              :src="`${config.public.apiUrl}/img/user/${project.createdBy?.photo}`"
              alt=""
              class="w-8 h-8 md:w-9 md:h-9 rounded-full"
            />
            {{ project.createdBy?.email }}
          </p>
        </NuxtLink>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
          <button
            @click="
              projectStore.openUpdate(
                project._id,
                project.name,
                project.description,
              )
            "
            class="px-3 md:px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition text-sm md:text-base"
          >
            Update
          </button>
          <button
            @click="projectStore.deleteProject(project._id, project.orgId)"
            class="px-3 md:px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm md:text-base"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Update Modal -->
    <div
      v-if="projectStore.showUpdate"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-4 md:p-6">
        <h2 class="text-lg md:text-xl font-bold mb-3 md:mb-4">
          Update Project
        </h2>
        <input
          v-model="projectStore.projectName"
          type="text"
          placeholder="Project Name"
          class="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <textarea
          v-model="projectStore.projectDes"
          placeholder="Project Description"
          class="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>
        <div class="flex justify-end gap-2 md:gap-3">
          <button
            @click="projectStore.cancelUpdate()"
            class="px-3 md:px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm md:text-base"
          >
            Cancel
          </button>
          <button
            @click="projectStore.updateProject()"
            class="px-3 md:px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 text-sm md:text-base"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useProjectStore } from "@/stores/project";
import { useDashboardStore } from "@/stores/dashboard";
const config = useRuntimeConfig()
const route = useRoute();
const orgId = route.params.id;
const projectStore = useProjectStore();
const dashboardStore = useDashboardStore();

async function projectCreate() {
  await projectStore.createProject(orgId);
}

onMounted(
  async () => await projectStore.projectList(orgId),
  await dashboardStore.getData(),
);
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
