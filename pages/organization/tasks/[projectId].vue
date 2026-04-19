<template>
  <div class="min-h-screen bg-gray-50 p-3">
    <h1 class="text-3xl font-bold text-gray-800 mb-5">Tasks for Project</h1>

    <!-- Notificaiton -->
    <transition name="slide">
      <div
        v-if="taskStore.showNotifiTask || commentStore.showNotifiCom"
        class="fixed top-[5rem] right-3 md:right-6 bg-slate-400/95 text-white text-sm px-6 py-5 md:text-2xl md:px-12 md:py-10 rounded-lg border-2 border-blue-600 shadow-xl z-[9999]"
      >
        <span
          ><i class="pi pi-bell"></i>
          {{
            taskStore.NotifiMessageTask || commentStore.NotifiMessageCom
          }}</span
        >
      </div>
    </transition>

    <!-- Task Create Form -->
    <div class="bg-white rounded-lg shadow p-3 mb-8">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Create New Task</h2>

      <!-- Task Title -->
      <input
        v-model="taskStore.taskForm.newTaskTitle"
        type="text"
        placeholder="Task title"
        class="border rounded px-3 py-2 w-full mb-3"
      />

      <!-- Task Description -->
      <textarea
        v-model="taskStore.taskForm.newTaskDescription"
        placeholder="Task description"
        class="border rounded px-3 py-2 w-full mb-3"
      ></textarea>

      <!-- Task Status -->
      <select
        v-model="taskStore.taskForm.newTaskStatus"
        class="border rounded px-3 py-2 w-full mb-3"
      >
        <option value="Todo">Todo</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Done">Done</option>
      </select>

      <!-- Task Due Date -->
      <input
        v-model="taskStore.taskForm.newTaskDueDate"
        type="date"
        class="border rounded px-3 py-2 w-full mb-3"
      />

      <!-- Create Button -->
      <button
        @click="taskStore.createTask(projectId)"
        class="bg-slate-700 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        + Add Task
      </button>
    </div>
    <Loader v-if="taskStore.isLoading" />
    <!-- Task Board -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <!-- Todo Column -->
      <div class="bg-white rounded-lg shadow-md p-3">
        <h3
          class="text-md font-bold mb-4 text-gray-700 flex items-center gap-2"
        >
          <span class="w-2 h-2 bg-yellow-400 rounded-full"></span>
          Todo
        </h3>
        <!-- Scrollable list -->
        <div class="max-h-96 overflow-y-auto pr-2">
          <div
            v-for="task in taskStore.newTasks.filter(
              (t) => t.status === 'Todo',
            )"
            :key="task.id"
            @click="selectedTask = task"
            class="group cursor-pointer border rounded-md p-3 mb-3 bg-gray-50 hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div class="flex justify-between items-center mb-1">
              <h4
                class="text-gray-800 text-lg font-semibold group-hover:text-green-700"
              >
                {{ task.title }}
              </h4>
              <span
                class="text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium"
              >
                {{ task.status }}
              </span>
            </div>
            <p
              class="text-gray-800 text-sm font-semibold group-hover:text-green-700"
            >
              {{ task.description }}
            </p>
            <p class="text-xs text-gray-500 mb-1 flex items-center gap-2">
              <img
                :src="`${config.public.apiUrl}/img/user/${task.assignedTo.photo}`"
                class="w-8 h-8 rounded-full"
                alt=""
              />
              {{ task.assignedTo.email }}
            </p>
            <p class="text-[11px] text-gray-400">
              Due:
              {{
                new Date(task.dueDate).toLocaleDateString("en-US") || "Not set"
              }}
            </p>
            <div class="flex gap-2 mt-2">
              <button
                @click="
                  taskStore.openUpdate(
                    task._id,
                    task.title,
                    task.description,
                    task.status,
                    task.dueDate,
                  )
                "
                class="px-3 py-1 bg-blue-900 text-white text-xs rounded hover:bg-blue-800"
              >
                Update
              </button>
              <button
                @click="taskStore.deleteTask(task._id)"
                class="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                @click="commentStore.openComment(task._id)"
                class="px-3 py-1 bg-gray-200 text-xs rounded hover:bg-gray-300 flex items-center gap-1"
              >
                <span>
                  <i class="pi pi-comment"></i>
                  Comment
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- In-Progress Column -->
      <div class="bg-white rounded-lg shadow-md p-3">
        <h3
          class="text-md font-bold mb-4 text-gray-700 flex items-center gap-2"
        >
          <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
          In-Progress
        </h3>
        <div class="max-h-96 overflow-y-auto pr-2">
          <div
            v-for="task in taskStore.newTasks.filter(
              (t) => t.status === 'In-Progress',
            )"
            :key="task.id"
            @click="selectedTask = task"
            class="group cursor-pointer border rounded-md p-3 mb-3 bg-gray-50 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div class="flex justify-between items-center mb-1">
              <h4
                class="text-gray-800 text-sm font-semibold group-hover:text-blue-700"
              >
                {{ task.title }}
              </h4>
              <span
                class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium"
              >
                {{ task.status }}
              </span>
            </div>
            <p
              class="text-gray-800 text-sm font-semibold group-hover:text-green-700"
            >
              {{ task.description }}
            </p>
            <p class="text-xs text-gray-500 mb-1 flex items-center gap-2">
              <img
                :src="`${config.public.apiUrl}/img/user/${task.assignedTo.photo}`"
                class="w-8 h-8 rounded-full"
                alt=""
              />
              {{ task.assignedTo.email }}
            </p>
            <p class="text-[11px] text-gray-400">
              Due:
              {{
                new Date(task.dueDate).toLocaleDateString("en-US") || "Not set"
              }}
            </p>
            <div class="flex gap-2 mt-2">
              <button
                @click="
                  taskStore.openUpdate(
                    task._id,
                    task.title,
                    task.description,
                    task.status,
                    task.dueDate,
                  )
                "
                class="px-3 py-1 bg-blue-900 text-white text-xs rounded hover:bg-blue-800"
              >
                Update
              </button>
              <button
                @click="taskStore.deleteTask(task._id)"
                class="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                @click="commentStore.openComment(task._id)"
                class="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 flex items-center gap-1"
              >
                <span>
                  <i class="pi pi-comment"></i>
                  Comment
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Done Column -->
      <div class="bg-white rounded-lg shadow-md p-3">
        <h3
          class="text-md font-bold mb-4 text-gray-700 flex items-center gap-2"
        >
          <span class="w-2 h-2 bg-green-400 rounded-full"></span>
          Done
        </h3>
        <div class="max-h-96 overflow-y-auto pr-2">
          <div
            v-for="task in taskStore.newTasks.filter(
              (t) => t.status === 'Done',
            )"
            :key="task.id"
            @click="selectedTask = task"
            class="group cursor-pointer border rounded-md p-3 mb-3 bg-gray-50 hover:bg-green-100 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div class="flex justify-between items-center mb-1">
              <h4
                class="text-gray-800 text-sm font-semibold group-hover:text-green-700"
              >
                {{ task.title }}
              </h4>
              <span
                class="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium"
              >
                {{ task.status }}
              </span>
            </div>
            <p
              class="text-gray-800 text-sm font-semibold group-hover:text-green-700"
            >
              {{ task.description }}
            </p>
            <p class="text-xs text-gray-500 mb-1 flex items-center gap-2">
              <img
                :src="`${config.public.apiUrl}/img/user/${task.assignedTo.photo}`"
                class="w-8 h-8 rounded-full"
                alt=""
              />
              {{ task.assignedTo.email }}
            </p>
            <p class="text-[11px] text-gray-400">
              Due:
              {{
                new Date(task.dueDate).toLocaleDateString("en-US") || "Not set"
              }}
            </p>
            <div class="flex gap-2 mt-2">
              <button
                @click="
                  taskStore.openUpdate(
                    task._id,
                    task.title,
                    task.description,
                    task.status,
                    task.dueDate,
                  )
                "
                class="px-3 py-1 bg-blue-900 text-white text-xs rounded hover:bg-blue-800"
              >
                Update
              </button>
              <button
                @click="taskStore.deleteTask(task._id)"
                class="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                @click="commentStore.openComment(task._id)"
                class="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 flex items-center gap-1"
              >
                <span>
                  <i class="pi pi-comment"></i>
                  Comment
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Modal -->
    <div
      v-if="taskStore.showUpdate"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 class="text-lg font-bold mb-4">Update Task</h2>
        <input
          v-model="taskStore.taskUpdates.title"
          type="text"
          placeholder="Task Title"
          class="w-full border rounded px-3 py-2 mb-3"
        />
        <textarea
          v-model="taskStore.taskUpdates.description"
          placeholder="Task Description"
          class="w-full border rounded px-3 py-2 mb-3"
        ></textarea>
        <select
          v-model="taskStore.taskUpdates.status"
          class="w-full border rounded px-3 py-2 mb-3"
        >
          <option value="Todo">Todo</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          v-model="taskStore.taskUpdates.dueDate"
          type="date"
          class="w-full border rounded px-3 py-2 mb-3"
        />
        <div class="flex justify-end gap-2">
          <button
            @click="taskStore.cancelUpdate"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            @click="taskStore.saveUpdate()"
            class="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="commentStore.showComment"
      class="fixed inset-0 border rounded-md p-3 bg-white shadow flex flex-col md:mt-4 md:ml-[2rem] md:w-[30em] md:h-[38rem]"
    >
      <div
        class="flex justify-between items-start bg-white shadow-md rounded-lg p-4 mb-4"
      >
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-1">
            {{ commentStore.selectedTask.title || "Task Details" }}
          </h2>
          <p class="text-gray-500 mb-2">
            Assigned to:
            <span class="font-medium text-gray-700">
              {{ commentStore.selectedTask.assignedTo?.email || "Unassigned" }}
            </span>
          </p>
          <p class="font-semibold text-lg text-blue-600">Comments</p>
        </div>

        <button
          @click="commentStore.closeTask()"
          class="text-xl text-gray-500 hover:text-red-600 transition"
        >
          <i class="pi pi-times"></i>
        </button>
      </div>

      <!-- no comment yet -->
      <div
        v-if="commentStore.allComment.length === 0"
        class="grid justify-center items-center h-screen"
      >
        <div class="text-center">
          <p class="font-semibold text-2xl">No comments yet</p>
          <p class="font-thin text-lg">Start the conversation</p>
        </div>
      </div>
      <!-- Scrollable comment list -->
      <ul class="overflow-y-auto flex-1 mt-4">
        <li
          v-for="com in commentStore.allComment"
          :key="com._id"
          class="relative bg-white rounded-md shadow-md p-2 mb-4 border hover:shadow-lg"
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <span
                class="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <img
                  :src="`${config.public.apiUrl}/img/user/${com.userId.photo}`"
                  alt=""
                  class="w-8 h-8 rounded-full"
                />
                {{ com.userId.name }}
              </span>
            </div>
            <button
              @click="commentStore.openUpDel(com._id)"
              class="text-2xl font-bold"
            >
              ...
            </button>

            <!-- Action Buttons -->
            <div
              v-if="commentStore.upComId === com._id"
              class="absolute right-20 top-0 w-40 h-32 rounded-lg bg-slate-100 shadow-2xl flex flex-col justify-center items-center gap-2"
            >
              <button
                @click="commentStore.openUpdateCom(com._id, com.message)"
                class="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                @click="commentStore.deleteComment(com._id)"
                class="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>

          <!-- Comment Text -->
          <p class="text-gray-800 text-sm leading-relaxed">
            {{ com.message }}
          </p>

          <!-- Time -->
          <span class="text-xs text-gray-400">
            <i class="pi pi-clock"></i>
            {{ new Date(com.createdAt).toLocaleDateString("en-US") }}
          </span>
        </li>
      </ul>

      <div class="flex justify-end mt-2 space-x-2">
        <textarea
          v-model="commentStore.newComment"
          placeholder="Write your comment..."
          class="w-full border rounded p-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        >
        </textarea>
        <button
          @click="commentStore.addComment()"
          class="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
        >
          Submit
        </button>
      </div>

      <!-- update and delete comment -->
      <div
        v-if="commentStore.showUpdate"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 class="text-lg font-bold mb-4">Update Comment</h2>
          <textarea
            v-model="commentStore.updateMessage"
            placeholder="Edit your comment"
            class="w-full border rounded px-3 py-2 mb-3"
          ></textarea>
          <div class="flex justify-end gap-2">
            <button
              @click="commentStore.cancelUpdateCom"
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              @click="commentStore.updateComment()"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
import { useCommentStore } from "@/stores/comment";
import { useDashboardStore } from "@/stores/dashboard";
const config = useRuntimeConfig()
const route = useRoute();
const dashboardStore = useDashboardStore();
const projectId = route.params.projectId;
const taskStore = useTaskStore();
const commentStore = useCommentStore();

onMounted(async () => {
  await taskStore.taskList(projectId);
  await dashboardStore.getData();
  await commentStore.commentList();
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
