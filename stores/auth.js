import { defineStore } from "pinia"
import { navigateTo, useCookie } from '#app'

export const useAuthStore = defineStore('auth', {
   state: () => ({
      jwt: useCookie('jwt'),
      form: { email: '', password: '', name: '' },
      error: '',
      success: '',
      showNotifiAuth: false,
      NotifiMessageAuth: '',
      status: "Verifying...",
      showPassword: false
   }),

   getters: {
      isAuthenticated: (state) => {
         return !!state.jwt
      }
   },

   actions: {
      async login(form) {
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/users/login`, {
               method: 'POST',
               credentials: 'include',
               body: { email: form.email, password: form.password }
            })
            if (res.token) {
               this.jwt = res.token
            }

            setTimeout(() => {
               navigateTo('/dashboard')
            }, 2000)
            this.success = 'Login Successfully'
            this.error = ''
            form.email = ''
            form.password = ''
         } catch (error) {
            console.error('Error:', error)
            this.error = 'Login Failed. Try again!'
            this.success = ''
            this.NotifiMessageAuth = `Login Failed`
            this.showNotifiAuth = true
            setTimeout(() => {
               this.showNotifiAuth = false
            }, 2000)
         }
      },

      async logout() {
         try {
            const config = useRuntimeConfig()
            await $fetch(`${config.public.apiUrl}/api/users/logout`, {
               method: "POST",
               credentials: "include",
            })
            this.jwt = null
            navigateTo("/auth/login")
         } catch (error) {
            this.NotifiMessageOrg = 'Logout Failed ❌'
            this.showNotifiOrg = true
            setTimeout(() => {
               this.showNotifiOrg = false
            }, 2000);
         }
      },

      async signup() {
         try {
            const config = useRuntimeConfig()
            const baseUrl = config.public.apiUrl.replace(/\/$/, "")
            const res = await $fetch(`${baseUrl}/api/users/signup`, {
               method: "POST",
               body: this.form,
               credentials: 'include'
            });
            if (res.status === 'pending') {
               this.success = "Successfully Signed Up";
               this.error = "";
               this.form = { name: '', email: '', password: '' }
               setTimeout(() => {
                  navigateTo("/verifyemail/checkEmail");
               }, 2000);
            }
         } catch (error) {
            this.showNotifiOrg = true
            this.NotifiMessageOrg = 'Sign Up failed ❌'
            this.success = "";
            this.error = "Sign Up failed ❌";
            setTimeout(() => {
               this.showNotifiOrg = false
            }, 2500);
         }
      },

      togglePassword() {
         this.showPassword = !this.showPassword
      },

      async verifyEmail(token) {
         try {
            const config = useRuntimeConfig()
            const res = await $fetch(`${config.public.apiUrl}/api/users/verifyEmail/${token}`, {
               method: "GET",
               credentials: "include",
            })
            if (res.token) {
               this.jwt = res.token
            }
            this.status = "Email verified successfully!";
            setTimeout(() => {
               navigateTo("/dashboard");
            }, 1500);
         } catch (err) {
            console.error('Error:', err);
            this.status = "Verification failed!";
         }
      }
   }
})