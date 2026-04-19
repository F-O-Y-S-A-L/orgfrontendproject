import { defineStore } from "pinia";
import { navigateTo } from '#app'
const config = useRuntimeConfig()

export const userForgotPass = defineStore('forgotPass', {
   state: () => ({
      forgotEmail: '',
      success: '',
      error: '',
      resetPass: { password: '', passwordConfirm: '' },
      showNotifiForgetPass: false,
      NotifiMessageForgetPass: '',
      forgotPasswordPage: 'EnterEmail',
      showPassword: false,
      showPasswordConfirm: false
   }),
   actions: {
      togglePassword(){
         this.showPassword = !this.showPassword
      },
      togglePasswordConfirm() {
         this.showPasswordConfirm = !this.showPasswordConfirm
      },
      async forgotPassword() {
         try {
            const res = await $fetch(`${config.public.apiUrl}/api/users/forgotPassword`, {
               method: 'POST',
               credentials: 'include',
               body: { email: this.forgotEmail }
            })
            console.log(res)
            if (res.status === 'success') {
               this.forgotPasswordPage = 'SendEmail'
               this.showNotifiForgetPass = true
               this.NotifiMessageForgetPass = 'you email is correct'
            } else if (res.status === 404) {
               this.showNotifiForgetPass = true
               this.NotifiMessageForgetPass = 'Not found'
            }
            setTimeout(() => {
               this.showNotifiForgetPass = false
            }, 2000);
         } catch (error) {
            console.log('Error:', error);
            this.showNotifiForgetPass = true
            this.NotifiMessageForgetPass = 'Your email is Incorrect'
            setTimeout(() => {
               this.showNotifiForgetPass = false
            }, 2000);
         }
      },

      async resetPassword(token) {
         try {
            if (!this.resetPass.password || !this.resetPass.passwordConfirm) {
               this.showNotifiForgetPass = true
               this.NotifiMessageForgetPass = "⚠️ Password fields cannot be empty!"
               setTimeout(() => {
                  this.showNotifiForgetPass = false
               }, 2000);
               return;
            }
            const res = await $fetch(`${config.public.apiUrl}/api/users/resetPassword/${token}`, {
               method: 'PATCH',
               headers: { "Content-Type": "application/json" },
               credentials: 'include',
               body: JSON.stringify({ password: this.resetPass.password, passwordConfirm: this.resetPass.passwordConfirm })

            })
            if (res.status === 'success') {
               this.showNotifiForgetPass = true
               this.NotifiMessageForgetPass = "Password reset successful"
               setTimeout(() => {
                  this.showNotifiForgetPass = false
               }, 1000);
               setTimeout(() => {
                  navigateTo('/dashboard')
               }, 2500);
               this.resetPass.password = ''
               this.resetPass.passwordConfirm = ''
            }
         } catch (error) {
            console.log('Error:', error);
            this.showNotifiForgetPass = true
            this.NotifiMessageForgetPass = "Password reset failed. Please try again."
            setTimeout(() => {
               this.showNotifiForgetPass = false
            }, 2000);
         }
      }
   }
})