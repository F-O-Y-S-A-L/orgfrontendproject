import { defineStore } from "pinia";

export const useUserStore = defineStore('User', {
   state: () => ({
      allUsers: [],
      userData: [],
      organization: [],
      userCounts: 0,
      showUpdateOrg: false,
      showDeleteOrg: false,
      currentOrgId: '',
      sendEmail: '',
      sendRole: '',
      searchQuery: '',
      currentUserId: '',
      showUserCard: false,
      showUserDelete: false,
      success: '',
      error: ''
   }),
   getters: {
      filteredUsers: (state) => {
         if (!state.searchQuery) {
            return state.allUsers
         }
         return state.allUsers.filter(user => user?.name.toLowerCase().includes(state.searchQuery?.toLowerCase()))
      },
      filteredOrganizations: (state) => {
         if (!state.searchQuery) {
            return state.organization
         }
         return state.organization.filter(org => org.name?.toLowerCase().includes(state.searchQuery?.toLowerCase()))
      }
   },
   actions: {
      async getAllUsers() {
         try {
            const res = await $fetch(`${process.env.API_URI}/api/admin`, {
               credentials: 'include'
            })
            this.allUsers = res.data.user.allUser
            this.userCounts = res.data.user.userCount
         } catch (error) {
            console.log('Error:', error);
         }
      },
      async allOrgCard() {
         this.isLoading = true
         try {
            const res = await $fetch(`${process.env.API_URI}/api/org`, {
               credentials: "include",
            });
            this.organization = res.data.org.allOrg || [];
         } catch (error) {
            console.error("Error loading organizations:", error);
         } finally {
            this.isLoading = false
         }
      },
      openUpdateCard(orgId) {
         this.showUpdateOrg = true
         this.currentOrgId = orgId
      },
      cancelUpdateCard() {
         this.showUpdateOrg = false
      },
      async updateOrg() {
         try {
            await $fetch(`${process.env.API_URI}/api/org/${this.currentOrgId}/invite`, {
               method: 'POST',
               credentials: 'include',
               body: { email: this.sendEmail, role: this.sendRole }
            })
            this.showUpdateOrg = false
            alert('Send invite successfully ✅')
         } catch (error) {
            console.log('Error:', error);
            alert('Send invite failed ❌')
            this.showUpdateOrg = false
         }
      },
      openDeleteCardOrg(orgId) {
         this.currentOrgId = orgId
         this.showDeleteOrg = true
      },
      async deleteOrg() {
         try {
            await $fetch(`${process.env.API_URI}/api/admin/org/${this.currentOrgId}`, {
               method: 'DELETE',
               credentials: 'include',
            })
            this.organization = this.organization.filter(org => org._id !== this.currentOrgId)
            this.success = 'Organization delete successfully'
            setTimeout(() => {
               this.showDeleteOrg = false
               this.success = ''
            }, 2000);
         } catch (error) {
            console.log('Error:', error);
            this.error = 'Organization delete failed'
            setTimeout(() => {
               this.error = ''
               this.showDeleteOrg = false
            }, 2000);
         }
      },
      openUserCard(id) {
         this.showUserDelete = true
         this.currentUserId = id
      },
      async deleteUser() {
         try {
            await $fetch(`${process.env.API_URI}/api/admin/user/${this.currentUserId}`, {
               method: 'DELETE',
               credentials: 'include',
            })
            this.allUsers = this.allUsers.filter(user => user._id !== this.currentUserId)
            this.success = 'User Delete successfully'
            setTimeout(() => {
               this.showUserDelete = false
               this.success = ''
            }, 2000);
         } catch (error) {
            console.log('Error:', error);
            this.error = 'User delete failed '
            setTimeout(() => {
               this.showUserDelete = false
               this.error = ''
            }, 2000);
         }
      },
      viewUser(userId) {
         this.showUserCard = true
         this.userInfo(userId)
      },
      async userInfo(userId) {
         try {
            const res = await $fetch(`${process.env.API_URI}/api/admin/${userId}`, {
               credentials: "include",
            });
            this.userData = res.data?.User;
         } catch (error) {
            console.log("Error:", error);
         }
      },
      viewOrg(orgId) {
         this.orgDetails(orgId)
         this.showOrgDetils = true
      },
      cancelOrg() {
         this.showOrgDetils = false
      },
      async orgDetails(orgIds) {
         const res = await $fetch(`${process.env.API_URI}/api/org/${orgIds}`, {
            credentials: 'include'
         })
         this.selectedOrg = res.data.OrgUser
      },
      async userOrg() {
         try {
            const res = await $fetch('${process.env.API_URI}/api/org/getUserOrg', {
               method: 'get',
               credentials: 'include'
            })
            this.organization = res.data.orgs
            this.orgCount = res.data.OrgCount
         } catch (error) {
            console.log('Error:', error)
         }
      },
      async sendInvite() {
         this.isLoading = true
         try {
            const res = await $fetch(`${process.env.API_URI}/api/org/${this.currentOrgId}/invite`, {
               method: "POST",
               body: { email: this.inviteEmail, role: this.inviteRole },
               credentials: "include",
            },
            );
            this.inviteEmail = "";
            this.inviteRole = "Member";
            setTimeout(() => {
               this.showUpdate = false
               this.success = ''
            }, 2000);
         } catch (error) {
            console.log("Error:", error);
            this.showNotifiOrg = true
            this.showUpdate = false
            this.NotifiMessageOrg = "Invitation send failed ❌"
            setTimeout(() => {
               this.showUpdate = false
               this.error = ''
            }, 2000);
         } finally {
            this.isLoading = false
         }
      },
   }
})