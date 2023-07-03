import { defineStore } from "pinia";

export const useCarStore = defineStore("carStore", {
  state: () => ({
    carsData: [],
    loading: false,
    isError: false,
    openModal: false,
    editModal: false,
    mobileView: true,
    showNav: false,
    error: "",
    car: [],
    moreCarsData: [],
    url: useRuntimeConfig().VITE_CAR_API,
  }),
  getters: {
    getCarById: (state) => (id) => {
      state.car = [];
      const car = state.carsData.find((car) => car.id == id);
      if (!car) {
        state.isError = true;
        state.error = `Car with ID ${id} is not available!`;
      }
      state.car.push(car);
    },
    moreCars: (state) => (id) => {
      let carsFilter = state.carsData.filter((response) => response.id != id);
      state.moreCarsData = carsFilter.slice(0, 3);
    },
    isOpenModal: (state) => (val) => {
      state.openModal = val;
      window.scrollTo(0, 0);
    },
    closeModal: (state) => () => {
      state.openModal = false;
      state.editModal = false;
    },
    editButton: (state) => () => {
      state.openModal = true;
      state.editModal = true;
    },
  },
  actions: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    closeMobileMenu() {
      this.showNav = false;
    },
    async getData() {
      try {
        this.loading = true;
        const data = await $fetch(this.url);
        this.carsData = data.data;
        this.loading = false;
        this.isError = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.isError = true;
        this.error = "Car Data not found!";
      }
    },
    async updateCarData(editCarId, formData) {
      const data = await $fetch(`${this.url}/${editCarId}`, {
        headers: { "Content-type": "application/json" },
        method: "PUT",
        body: formData,
      });
      return data;
    },
    async deleteCarData(id) {
      const response = await $fetch(`${this.url}/${id}`, {
        method: "DELETE",
      });
      return response;
    },
    async addCarData(formData) {
      const data = await $fetch(this.url, {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: formData,
      });
      return data;
    },
  },
  persist: true,
});
