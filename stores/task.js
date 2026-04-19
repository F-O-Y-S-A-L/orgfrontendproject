import { defineStore } from "pinia";
const config = useRuntimeConfig()

export const useTaskStore = defineStore('task', {
   state: () => ({
      taskForm: { newTaskTitle: "", newTaskDescription: "", newTaskStatus: "", newTaskDueDate: "", },
      newTasks: [],
      showUpdate: false,
      taskUpdates: { title: '', description: '', status: 'Todo', dueDate: '' },
      currentTaskId: '',
      isLoading: false,
      showNotifiTask: false,
      NotifiMessageTask: ''
   }),
   actions: {
      async createTask(projectId) {
         this.isLoading = true
         try {
            if (!this.taskForm.newTaskTitle) {
               this.showNotifiTask = true
               this.NotifiMessageTask = "Tasks title is required 👨‍💻"
               setTimeout(() => {
                  this.showNotifiTask = false
               }, 3000);
               return;
            }
            const res = await $fetch(`${config.public.apiUrl}/api/task/${projectId}`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: {
                  title: this.taskForm.newTaskTitle,
                  description: this.taskForm.newTaskDescription,
                  status: this.taskForm.newTaskStatus || "Todo",
                  dueDate: this.taskForm.newTaskDueDate || null,
               },
               credentials: "include",
            });
            this.newTasks.push(res.data.newTask)

            this.taskForm.newTaskTitle = "",
               this.taskForm.newTaskDescription = "",
               this.taskForm.newTaskStatus = "",
               this.taskForm.newTaskDueDate = ""
         } catch (error) {
            console.log("Error:", error);
            this.NotifiMessageTask = 'Tasks Created Failed ❌'
            this.showNotifiTask = true
            setTimeout(() => {
               this.showNotifiTask = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      },
      async taskList(projectId) {
         this.isLoading = true
         try {
            const res = await $fetch(`${config.public.apiUrl}/api/task/${projectId}/task`, {
               credentials: "include",
            });
            this.newTasks = res.data.task || [];
         } catch (error) {
            console.log("Error:", error);
         } finally {
            this.isLoading = false
         }
      },
      async deleteTask(taskId) {
         this.isLoading = true
         try {
            const res = await $fetch(`${config.public.apiUrl}/api/task/${taskId}`, {
               method: 'DELETE',
               credentials: "include",
            })
            this.newTasks = this.newTasks.filter(task => task._id !== taskId)
         } catch (error) {
            if (error?.status === 403) {
               this.NotifiMessageTask = 'You do not have permission to delete this Task 🔐'
            } else {
               console.log("Error:", error);
               this.NotifiMessageTask = 'Task detele failed ❌'
            }
            this.showNotifiTask = true
            setTimeout(() => {
               this.showNotifiTask = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      },
      openUpdate(taskId, taskTitle, taskDes, taskStatus, taskDueDate) {
         this.showUpdate = true
         this.currentTaskId = taskId
         this.taskUpdates.title = taskTitle
         this.taskUpdates.description = taskDes
         this.taskUpdates.status = taskStatus
         this.taskUpdates.dueDate = taskDueDate
      },
      cancelUpdate() {
         this.showUpdate = false
         this.currentTaskId = ''
         this.taskUpdates.title = ''
         this.taskUpdates.description = ''
         this.taskUpdates.status = 'Todo'
         this.taskUpdates.dueDate = ''
      },
      async saveUpdate() {
         this.isLoading = true
         try {
            const res = await $fetch(`${config.public.apiUrl}/api/task/${this.currentTaskId}`, {
               method: 'PATCH',
               credentials: 'include',
               body: { title: this.taskUpdates.title, description: this.taskUpdates.description, status: this.taskUpdates.status, dueDate: this.taskUpdates.dueDate }
            })
            this.newTasks = this.newTasks.map(task => task._id === this.currentTaskId ? { ...task, title: this.taskUpdates.title, description: this.taskUpdates.description, status: this.taskUpdates.status, dueDate: this.taskUpdates.dueDate } : task)
            this.showUpdate = false
         } catch (error) {
            if (error?.status === 403) {
               this.NotifiMessageTask = 'You do not have permission to update this Task 🔐'
               this.showUpdate = false
            } else {
               console.log('Errro:', error);
               this.NotifiMessageTask = 'Task update Failed ❌'
               this.showUpdate = false
            }
            this.showNotifiTask = true
            setTimeout(() => {
               this.showNotifiTask = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      }
   }
})