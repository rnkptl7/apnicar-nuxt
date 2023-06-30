import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    isLoggedIn: useSessionStorage("isLoggedIn", false).value,
    userApi: useRuntimeConfig().VITE_USER_API,
  }),
  actions: {
    loginUser(formData) {
      return useFetch(`${this.userApi}//login`, {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: formData,
      });
    },
    addUser(formData) {
      return useFetch(`${this.userApi}/resource/users`, {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: formData,
      });
    },
    getUsers() {
      return useFetch(`${this.userApi}/resource/users`);
    },
    logout() {
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("token");
      this.isLoggedIn = false;
    },
  },
});
