import { defineStore } from "pinia";


export const organizationStore = defineStore('organization', {
   state: () => ({
      orgName: "",
      updateOrgName: "",
      organization: [],
      orgCount: 0,
      inviteEmail: "",
      inviteRole: "",
      showInvite: false,
      showUpdate: false,
      currentOrgId: null,
      isLoading: false,
      showNotifiOrg: false,
      NotifiMessageOrg: '',
      showOrgDetils: false,
      selectedOrg: [],
      searchQuery: '',
   }),
   getters: {
      filteredOrganizations: (state) => {
         if(!state.searchQuery) {
            return state.organization
         }
         return state.organization.filter(org => org.name?.toLowerCase().includes(state.searchQuery?.toLowerCase()))
      }
   },
   actions: {
      async createOrganization() {
         this.isLoading = true
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/org`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: { name: this.orgName },
               credentials: "include",
            });
            this.organization.push(res.data.newOrg)
            this.orgName = "";
         } catch (error) {
            console.log("Error:", error);
            this.showNotifiOrg = true
            this.NotifiMessageOrg = "Organization Created Failed ❌"
            this.orgName = "";
            setTimeout(() => {
               this.showNotifiOrg = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      },
      async allOrgCard() {
         this.isLoading = true
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/org`, {
               credentials: "include",
            });
            this.organization = res.data.org.allOrg || [];
            this.orgCount = res.data.org.orgCount;
         } catch (error) {
            console.error("Error loading organizations:", error);
         } finally {
            this.isLoading = false
         }
      },
      openInvite(orgId) {
         this.showInvite = true;
         this.currentOrgId = orgId;
      },
      cancelInvite() {
         this.showInvite = false;
         this.inviteEmail = "";
         this.inviteRole = ""
      },
      openUpdate(orgId, orgName) {
         this.showUpdate = true;
         this.currentOrgId = orgId;
         this.updateOrgName = orgName
      },
      async sendInvite() {
         this.isLoading = true
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/org/${this.currentOrgId}/invite`, {
               method: "POST",
               body: { email: this.inviteEmail, role: this.inviteRole },
               credentials: "include",
            },
            );
            this.showInvite = false
            this.inviteEmail = "";
            this.inviteRole = "Member";
            this.showNotifiOrg = true
            this.NotifiMessageOrg = res.data.notification.message
            this.showUpdate = false
            setTimeout(() => {
               this.showNotifiOrg = false
            }, 3000);
         } catch (error) {
            console.log("Error:", error);
            this.showNotifiOrg = true
            this.showUpdate = false
            this.NotifiMessageOrg = "Invitation send failed ❌"
            this.showInvite = false
            setTimeout(() => {
               this.showNotifiOrg = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      },
      async deleteOrg(id) {
         this.isLoading = true
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/org/${id}`, {
               method: "DELETE",
               credentials: "include",
            });
            this.organization = this.organization.filter(org => org._id !== id)
         } catch (error) {
            if (error?.status === 403) {
               this.NotifiMessageOrg = "You do not have permission to delete this organizaion 🔐"
            } else {
               console.log("Error:", error);
               this.NotifiMessageOrg = "Failed to delete organization. Please try again. ❌"
            }
            this.showNotifiOrg = true
            setTimeout(() => {
               this.showNotifiOrg = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      },
      cancelUpdate() {
         this.showUpdate = false;
         this.updateOrgName = ""
      },
      async updateOrg() {
         this.isLoading = true
         try {
            const config = useRuntimeConfig()
            await $fetch(`${config.public.apiUrl}/api/org/${this.currentOrgId}`, {
               method: "PATCH",
               credentials: "include",
               body: { name: this.updateOrgName }
            });
            this.organization = this.organization.map(org =>
               org._id === this.currentOrgId ? { ...org, name: this.updateOrgName } : org)
            this.showUpdate = false;
            this.updateOrgName = ''
         } catch (error) {
            if (error?.status === 403) {
               this.NotifiMessageOrg = "You do not have permission to update this organization 🔐"
            } else {
               console.log("Error:", error);
               this.NotifiMessageOrg = "Failed to update organization. Please try again. ❌"
            }
            this.showNotifiOrg = true
            setTimeout(() => {
               this.showNotifiOrg = false
            }, 3000);
            this.showUpdate = false
         } finally {
            this.isLoading = false
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
         const config = useRuntimeConfig()
         const res = await $fetch(`${config.public.apiUrl}/api/org/${orgIds}`, {
            credentials: 'include'
         })
         this.selectedOrg = res.data.OrgUser
      },
      async userOrg() {
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/org/getUserOrg`, {
               method: 'get',
               credentials: 'include'
            })
            this.organization = res.data.orgs
            this.orgCount = res.data.OrgCount
         } catch (error) {
            console.log('Error:', error)
         }
      }
   }
})