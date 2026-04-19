import { defineStore } from "pinia";

export const useDashboardStore = defineStore('user', {
   state: () => ({
      userData: { name: '', email: '', photo: '' },
      NotifiMessageDashbaord: '',
      showNotifiDashboard: false
   }),
   getters: {
      photoUrl: (state) => state.userData.photo ? `${config.public.apiUrl}/img/user/${state.userData.photo}` : null
   },
   actions: {
      setPhoto(file) {
         this.userData.photo = file
      },

      async getData() {
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/users/me`, {
               credentials: "include",
            });
            this.userData = res.data.User;

            const { $socket } = useNuxtApp();
            if ($socket?.connected && this.userData?._id) {
               $socket.emit("join", this.userData._id);
            }
         } catch (error) {
            console.log("Error:", error);
         }
      },
      async updateUserInfo() {
         const formData = new FormData()
         formData.append('name', this.userData.name)
         formData.append('email', this.userData.email)
         formData.append('photo', this.userData.photo)
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/users/updateMe`, {
               method: 'PATCH',
               credentials: 'include',
               body: formData
            })
            this.userData = res.data.updatedUser
         } catch (error) {
            console.log('Error:', error);
            this.showNotifiDashboard = true
            this.NotifiMessageDashbaord = 'Updated settings failed ❌'
            setTimeout(() => {
               this.showNotifiOrg = false
            }, 2500);
         }
      },
   }
})