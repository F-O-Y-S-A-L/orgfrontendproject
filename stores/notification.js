import { defineStore } from "pinia";
const config = useRuntimeConfig()

export const useNotificationStore = defineStore('notification', {
   state: () => ({
      userNotifications: [],
      unreadCounts: 0
   }),
   actions: {
      setUnreadCount(count) {
         this.unreadCounts = count;
      },
      async userOnlyNotification() {
         try {
            const res = await $fetch(`${config.public.apiUrl}/api/notification/user`, {
               credentials: 'include',
            })
            this.userNotifications = (res.data.notification).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
         } catch (error) {
            console.log('Error:', error);
         }
      },
      async userNotifiDelete(notifiId) {
         try {
             await $fetch(`${config.public.apiUrl}/api/notification/${notifiId}`, {
               method: 'DELETE',
               credentials: 'include'
            })
            this.userNotifications = this.userNotifications.filter(notifi => notifi._id !== notifiId)
         } catch (error) {
            console.log('Error:', error);
         }
      },
      async unreadNotifiCount() {
         try {
            const res = await $fetch(`${config.public.apiUrl}/api/notification/unread-count`, {
               credentials: 'include',
            })
            this.unreadCounts = res.count
         } catch (error) {
            console.log('Error:', error);
         }
      },
      async markAsRead() {
         try {
            await $fetch(`${config.public.apiUrl}/api/notification/mark-as-read`, {
               credentials: 'include'
            })
         } catch (error) {
            console.log('Error:', error);
         }
      },

   }
})