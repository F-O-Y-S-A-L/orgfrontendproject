import { organizationStore } from '@/stores/organization'
import { useNotificationStore } from '@/stores/notification'
import { useProjectStore } from '@/stores/project'
import { useTaskStore } from '@/stores/task'
import { useCommentStore } from '@/stores/comment'
import { useDashboardStore } from '@/stores/dashboard'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
   const socket = nuxtApp.$socket;
   const orgStore = organizationStore()
   const projectStore = useProjectStore()
   const notifiStore = useNotificationStore()
   const taskStore = useTaskStore()
   const comStore = useCommentStore()
   const dashboardStore = useDashboardStore()
   const authStore = useAuthStore()

   socket.on('OrgCreated', (data) => {
      orgStore.NotifiMessageOrg = data.message;
      orgStore.showNotifiOrg = true
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         orgStore.showNotifiOrg = false
      }, 2000);
   })
   socket.on('OrgUpdate', (data) => {
      orgStore.NotifiMessageOrg = data.message;
      orgStore.showNotifiOrg = true
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         orgStore.showNotifiOrg = false
      }, 2000);
   })
   socket.on('OrgDelete', (data) => {
      orgStore.NotifiMessageOrg = data.message;
      orgStore.showNotifiOrg = true
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         orgStore.showNotifiOrg = false
      }, 2000);
   })
   socket.on('ProjectCreated', (data) => {
      projectStore.NotifiMessageProject = data.message
      projectStore.showNotifiProject = true
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         projectStore.showNotifiProject = false
      }, 2000);
   })
   socket.on('ProjectUpdated', (data) => {
      projectStore.NotifiMessageProject = data.message
      projectStore.showNotifiProject = true
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         projectStore.showNotifiProject = false
      }, 2000);
   })
   socket.on('ProjectDelete', (data) => {
      projectStore.NotifiMessageProject = data.message
      projectStore.showNotifiProject = true
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         projectStore.showNotifiProject = false
      }, 2000);
   })
   socket.on('TaskCreated', (data) => {
      taskStore.showNotifiTask = true
      taskStore.NotifiMessageTask = data.message
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         taskStore.showNotifiTask = false
      }, 2000)
   })
   socket.on('TaskUpdated', (data) => {
      taskStore.showNotifiTask = true
      taskStore.NotifiMessageTask = data.message
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         taskStore.showNotifiTask = false
      }, 2000)
   })
   socket.on('TaskDelete', (data) => {
      taskStore.showNotifiTask = true
      taskStore.NotifiMessageTask = data.message
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         taskStore.showNotifiTask = false
      }, 2000)
   })
   socket.on('ComCreated', (data) => {
      comStore.showNotifiCom = true
      comStore.NotifiMessageCom = data.message
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         comStore.showNotifiCom = false
      }, 2000)
   })
   socket.on('ComUpdated', (data) => {
      comStore.showNotifiCom = true
      comStore.NotifiMessageCom = data.message
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         comStore.showNotifiCom = false
      }, 2000)
   })
   socket.on('ComDelete', (data) => {
      comStore.showNotifiCom = true
      comStore.NotifiMessageCom = data.message
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         comStore.showNotifiCom = false
      }, 2000)
   })
   socket.on('UpdateMe', (data) => {
      dashboardStore.showNotifiDashboard = true
      dashboardStore.NotifiMessageDashbaord = data.message
      setTimeout(() => {
         dashboardStore.showNotifiDashboard = false
      }, 2000)
   })
   socket.on('SignupUser', (data) => {
      authStore.showNotifiAuth = true
      authStore.NotifiMessageAuth = data.message
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         authStore.showNotifiAuth = false
      }, 2000)
   })
   socket.on('LoginUser', (data) => {
      authStore.showNotifiAuth = true
      authStore.NotifiMessageAuth = data.message
      notifiStore.userOnlyNotification(data.notification)
      setTimeout(() => {
         authStore.showNotifiAuth = false
      }, 2000)
   })
   socket.on('LogoutUser', (data) => {
      authStore.showNotifiAuth = true
      authStore.NotifiMessageAuth = data.message
      setTimeout(() => {
         authStore.showNotifiAuth = false
      }, 2000)
   })
   socket.on("NotificationCount", (count) => {
      notifiStore.setUnreadCount(count);
   });
})  