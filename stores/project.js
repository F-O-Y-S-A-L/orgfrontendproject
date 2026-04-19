import { defineStore } from "pinia";

export const useProjectStore = defineStore('project', {
   state: () => ({
      project: { newProjectName: "", newProjectDescription: "" },
      projects: [],
      projectCounts: 0,
      showUpdate: false,
      currentProId: '',
      projectName: '',
      projectDes: '',
      isLoading: false,
      NotifiMessageProject: '',
      showNotifiProject: false,
      searchQuery: '',
   }),
   getters: {
      filteredProjects: (state) => {
         if(!state.searchQuery){
            return state.projects
         }
         return state.projects.filter(project =>  project?.name.toLowerCase().includes(state.searchQuery?.toLowerCase()))
      }
   },
   actions: {
      async createProject(orgId) {
         this.isLoading = true
         try {
            if (!this.project.newProjectName) {
               alert("Project name is required");
               return;
            }
            const config = useRuntimeConfig()
            let res = await $fetch(`${config.public.apiUrl}/api/project/${orgId}`, {
               method: "POST",
               body: {
                  name: this.project.newProjectName,
                  description: this.project.newProjectDescription,
               },
               credentials: "include",
            });
            this.project.newProjectName = "";
            this.project.newProjectDescription = "";
            this.projects.push(res.data.newProject);
         } catch (error) {
            this.NotifiMessageProject = 'Project created Failed ❌'
            console.log("Error:", error);
            this.project.newProjectName = "";
            this.project.newProjectDescription = "";
            this.showNotifiProject = true
            setTimeout(() => {
               this.showNotifiProject = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      },
      async projectList(orgId) {
         this.isLoading = true
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/project/${orgId}/project`, {
               credentials: 'include'
            })
            this.projects = res.data.projects || []
         } catch (error) {
            console.log('Error:', error);
         } finally {
            this.isLoading = false
         }
      },
      async deleteProject(id, orgId) {
         this.isLoading = true
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/project/${id}`, {
               method: 'DELETE',
               body: { orgId },
               credentials: 'include'
            })
            this.projects = this.projects.filter(p => p._id !== id)
         } catch (error) {
            if (error?.status === 403) {
               this.NotifiMessageProject = 'You do not have permission to delete this project 🔐'
            } else {
               console.log('Error:', error);
               this.NotifiMessageProject = 'Project delete failed ❌'
            }
            this.showNotifiProject = true
            setTimeout(() => {
               this.showNotifiProject = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      },
      openUpdate(projectId, proName, proDes) {
         this.showUpdate = true
         this.currentProId = projectId
         this.projectName = proName
         this.projectDes = proDes
      },
      cancelUpdate() {
         this.showUpdate = false
         this.projectName = ''
         this.projectDes = ''
      },
      async updateProject() {
         this.isLoading = true
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/project/${this.currentProId}`, {
               method: 'PATCH',
               credentials: 'include',
               body: { name: this.projectName, description: this.projectDes }
            })
            this.projects = this.projects.map(p =>
               p._id === this.currentProId ? { ...p, name: this.projectName, description: this.projectDes } : p)
            this.showUpdate = false
         } catch (error) {
            if (error?.status === 403) {
               this.NotifiMessageProject = 'You do not have permission to this update Project 🔐'
            } else {
               console.log('Error:', error);
               this.NotifiMessageProject = 'Project update failed ❌'
            }
            this.showNotifiProject = true
            setTimeout(() => {
               this.showNotifiProject = false
            }, 3000);
            this.showUpdate = false
         } finally {
            this.isLoading = false
         }
      },
      async Allproject() {
         this.isLoading = true
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/project`, {
               credentials: 'include'
            })
            this.projectCounts = res.data.projectCount
         } catch (error) {
            console.log('Error:', error);
         } finally {
            this.isLoading = false
         }
      },
      async userByPorject() {
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/project/userByProject`,{
               credentials: 'include'
            })
            this.projects = res.data.projects
            this.projectCounts = res.data.projectCount
         } catch (error) {
            console.log('Error:', error)
         }
      }
   }
})