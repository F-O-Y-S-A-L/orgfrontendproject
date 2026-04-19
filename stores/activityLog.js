import { defineStore } from "pinia"
const config = useRuntimeConfig()

export const useActivityLogStore = defineStore('ActivityLog', {
   state: () => ({
      activityLog: [],
      activityLogCount: 0,
      isLoading: false
   }),
   actions: {
      async allActivityLog() {
         this.isLoading = true;
         try {
            const res = await $fetch(`${config.public.apiUrl}/api/activitylog`, {
               credentials: "include",
            });
            this.activityLog = (res.data.getActivity || []).sort(
               (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
            this.activityLogCount = res.data.logCount;
         } catch (error) {
            console.log("Error:", error);
         } finally {
            this.isLoading = false
         }
      },

      async deleteLog(id) {
         try {
            await $fetch(`${config.public.apiUrl}/api/activitylog/${id}`, {
               method: "delete",
               credentials: "include",
            });
            this.activityLog = this.activityLog.filter(
               (activity) => activity._id !== id,
            );
            this.activityLogCount = this.activityLog.length;
         } catch (error) {
            console.log("Error:", error);
         }
      }

   }
})