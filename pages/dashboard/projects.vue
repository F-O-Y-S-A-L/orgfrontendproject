<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800"><i class="pi pi-briefcase"></i> Organization Projects</h1>
    </div>

    <!-- Organization Info -->
    <div class="bg-white shadow rounded-lg px-4 py-12 mb-8 w-full">
      <h2 class="text-2xl font-semibold text-gray-800">My Projects</h2>
      <p class="text-gray-600 mt-2">
        A collaborative space where team members manage projects and track
        progress.
      </p>
      <div class="flex space-x-6 mt-4">
        <span class="text-gray-700"><i class="pi pi-file"></i> Projects: {{projectStore.projectCounts}}</span>
      </div>
    </div>

    <!-- Project Cards -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10"
    >
      <div
        v-for="project in projectStore.projects"
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
            {{ project.name }}
          </h2>
          <p class="mt-2 text-gray-600 line-clamp-2 text-sm md:text-base">
            {{ project.description }}
          </p>
          <p class="mt-3 text-xs md:text-sm text-gray-400">
            <i class="pi pi-clock"></i>
            {{ new Date(project.createdAt).toLocaleDateString("en-US") }}
          </p>
          <p class="mt-1 text-base text-gray-500 flex items-center gap-2">
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

  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProjectStore } from "@/stores/project";
const config = useRuntimeConfig()
const projectStore = useProjectStore();

onMounted(async () => await projectStore.userByPorject());
</script>
