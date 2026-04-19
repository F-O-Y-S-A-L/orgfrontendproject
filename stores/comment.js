import { defineStore } from "pinia";

export const useCommentStore = defineStore('comment', {
   state: () => ({
      selectedTask: [],
      allComment: [],
      newComment: "",
      commentId: "",
      updateMessage: "",
      showUpdate: false,
      isLoading: false,
      showNotifiCom: false,
      NotifiMessageCom: '',
      showComment: null,
      upComId: null
   }),
   actions: {
      openComment(taskId) {
         this.showComment = this.showComment === taskId ? null : taskId
         this.commentList(taskId)
      },
      async addComment() {
         this.isLoading = true
         try {
            const res = await $fetch(`${process.env.API_URI}/api/comment/${this.showComment}`, {
               method: "POST",
               credentials: "include",
               body: { message: this.newComment },
            });
            this.newComment = "";
            this.allComment.unshift(res.data.newComment)
         } catch (error) {
            this.NotifiMessageCom = 'Comment Added Failed ❌'
            this.showNotifiCom = true
            setTimeout(() => {
               this.showNotifiCom = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      },
      async commentList(taskId) {
         this.isLoading = true
         try {
            if(!this.showComment) return
            const res = await $fetch(`${process.env.API_URI}/api/task/${taskId}`, {
               credentials: "include",
            });
            this.selectedTask = res.data.task
            const com = await $fetch(`${process.env.API_URI}/api/task/${taskId}/comments`, {
               credentials: "include",
            });
            this.allComment = (com.data.comments).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) )
         } catch (error) {
            console.log("Error:", error);
         } finally {
            this.isLoading = false
         }
      },
      openUpDel(comId) {
         this.upComId = this.upComId === comId ? null : comId
      },
      async deleteComment() {
         this.isLoading = true
         try {
            await $fetch(`${process.env.API_URI}/api/comment/${this.upComId}`, {
               method: 'DELETE',
               credentials: "include",
            });
            this.allComment = this.allComment.filter(com => com._id !== this.upComId)
         } catch (error) {
            if (error?.status === 403) {
               this.NotifiMessageCom = 'You do not have permission to delete this comment 🔐'
            } else {
               console.log("Error:", error);
               this.NotifiMessageCom = 'Comment delete failed ❌'
            }
            this.showNotifiCom = true
            setTimeout(() => {
               this.showNotifiCom = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      },
      openUpdateCom(comId, message) {
         this.commentId = comId
         this.updateMessage = message
         this.showUpdate = true
      },
      cancelUpdateCom() {
         this.commentId = ''
         this.updateMessage = ''
         this.showUpdate = false
      },
      async updateComment() {
         this.isLoading = true
         try {
            const res = await $fetch(`${process.env.API_URI}/api/comment/${this.commentId}`, {
               method: 'PATCH',
               credentials: "include",
               body: { message: this.updateMessage }
            });
            this.allComment = this.allComment.map(com => com._id === this.commentId ? { ...com, message: this.updateMessage } : com)
            this.showUpdate = false
            this.upComId = null
         } catch (error) {
            if (error?.status === 403) {
               this.NotifiMessageCom = 'You do not have permission to update this comment 🔐'
               this.showUpdate = false
            } else {
               console.log("Error:", error);
               this.NotifiMessageCom = 'Comment update failed ❌'
               this.showUpdate = false
            }
            this.showNotifiCom = true
            setTimeout(() => {
               this.showNotifiCom = false
            }, 3000);
         } finally {
            this.isLoading = false
         }
      },
      closeTask() {
         this.showComment = null
      }
   }
})