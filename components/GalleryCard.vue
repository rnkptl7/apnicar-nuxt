<template>
  <div v-show="loading" class="loader">
    <Loading />
  </div>
  <div v-if="carsData.length == 0 && !isError">
    <div class="empty-trash">
      <img src="/images/NoDataFound.png" alt="Empty Trash" />
      <h1>Car Data is not available!</h1>
      <p>Add Your Favourite Car</p>
    </div>
  </div>
  <div v-if="!loading">
    <div v-show="isError" class="errorDiv">
      <Error />
    </div>
    <TransitionGroup
      tag="div"
      appear
      name="card"
      v-show="!isError"
      class="card-container"
    >
      <div
        class="card"
        v-for="(car, index) in carsData"
        :key="car.id"
        :data-index="index"
      >
        <div class="card-image">
          <img :src="car.image" alt="" />
        </div>
        <div class="card-details">
          <p class="text-title">{{ car.name }}</p>
          <p class="text-body">{{ trunCateDetails(car.details) }}</p>
          <div class="cardBtn">
            <div>
              <router-link
                v-if="car.price"
                class="card-button"
                :to="`/details/${car.id}`"
                >Info</router-link
              >
              <button disabled v-else class="card-button">
                Available Soon
              </button>
            </div>
            <div class="editDeleteBtn">
              <img
                class="editImage"
                src="/images/edit.png"
                alt="edit button"
                @click="editItem(car)"
              />
              <img
                src="/images/delete.png"
                alt="delete button"
                @click="deleteItem(car.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <Teleport to="body">
      <transition name="modal">
        <CarForm v-if="openModal">
          <template v-slot:heading class="heading">
            <h1 class="heading" v-if="!editModal">Add Car</h1>
            <h1 class="heading" v-else>Edit Car</h1>
          </template>
          <template v-slot:fields class="fields">
            <div class="inputDiv">
              <label>Name:</label>
              <vee-field
                name="name"
                type="text"
                v-model="form.name"
                placeholder="Name"
              />
              <ErrorMessage name="name" class="error" />
            </div>
            <div class="inputDiv">
              <label>Details:</label>
              <vee-field
                as="textarea"
                name="details"
                v-model="form.details"
                type="text"
                placeholder="Car Details"
              ></vee-field>
              <ErrorMessage name="details" class="error" />
            </div>
            <div class="inputDiv">
              <label>Image:</label>
              <vee-field
                name="url"
                v-model="form.image"
                type="text"
                placeholder="Enter Image Url"
              />
              <ErrorMessage name="url" class="error" />
            </div>
            <div class="inputDiv">
              <label>Price:</label>
              <vee-field
                name="price"
                v-model="form.price"
                type="number"
                placeholder="Enter Price"
              />
              <ErrorMessage name="price" class="error" />
            </div>
          </template>
          <template v-slot:buttons class="buttons">
            <button
              v-if="editModal"
              type="submit"
              @click="updateData"
              class="btn"
            >
              Update
            </button>
            <button
              v-else
              type="submit"
              class="btn"
              @click.prevent="submitForm"
            >
              Submit
            </button>
            <button class="btn" type="reset" @click="closeModalForm">
              Cancel
            </button>
          </template>
        </CarForm>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import gsap from "gsap";

import CarForm from "./CarForm.vue";
import Loading from "./Loading.vue";
import Error from "./Error.vue";
import { useCarStore } from "../stores/CarStore";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

const carStore = useCarStore();

const emits = defineEmits(["edit-item"]);

const { carsData, loading, isError, error, openModal, editModal } =
  storeToRefs(carStore);

const form = reactive({
  name: "",
  details: "",
  image: "",
  price: "",
});

let editCarId = reactive({});

await carStore.getData();

const trunCateDetails = (details) => {
  return details?.slice(0, 70) + (details?.length > 70 ? "..." : "");
};

const editItem = (value) => {
  carStore.editButton();
  window.scrollTo(0, 0);

  editCarId = value.id;

  form.name = value.name;
  form.details = value.details;
  form.price = value.price;
  form.image = value.image;
};

const closeModalForm = () => {
  carStore.closeModal();

  form.name = "";
  form.details = "";
  form.image = "";
  form.price = "";
  editCarId = "";
};

const deleteItem = async (id) => {
  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          carStore
            .deleteCarData(id)
            .then((res) => {
              console.log(res);
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your data has been deleted.",
                "success"
              );
              carStore.getData();
            })
            .catch((error) => {
              loading.value = false;
              isError.value = true;
              error.value =
                error.value.response.status +
                " " +
                error.value.response.statusText;
            });
        }
      });
  } catch (error) {
    loading.value = false;
    isError.value = true;
    error.value =
      error.value.response.status + " " + error.value.response.statusText;
  }
};

const updateData = async () => {
  if (
    form.name === "" ||
    form.details === "" ||
    form.image === "" ||
    form.price === ""
  ) {
    alert("Please fill the form");
  } else {
    try {
      loading.value = true;
      const response = await carStore.updateCarData(editCarId, form);

      if (response) {
        carStore.getData();
        closeModalForm();
        loading.value = false;
      }
    } catch (error) {
      loading.value = false;
      isError.value = true;
      error.value = "Record not found!";
    }
  }
};

const submitForm = async () => {
  if (
    form.name === "" ||
    form.details === "" ||
    form.image === "" ||
    form.price === ""
  ) {
    alert("Please fill the form");
  } else {
    try {
      loading.value = true;
      const response = await carStore.addCarData(form);
      console.log(response);

      loading.value = false;

      if (response) {
        Swal.fire({
          title: "Created Data",
          html: `<div class="alertData">
              <p><b>Car Name</b>: ${form.name}</p><p class="alertDetail"><b>Details</b>: ${form.details}</p>
          <p><b>Price</b>: ₹${form.price}</p>
          <p><b>Image Url</b>: ${form.image}</p>
          </div>`,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          confirmButtonColor: "#082032",
        });
        closeModalForm();
        carStore.getData();
      }
    } catch (error) {
      loading.value = false;
      isError.value = true;
      error.value = "Data not added Successfully!";
    }
  }
};
</script>

<style scoped>
.card-leave-active {
  transition: all 0.8s ease;
  animation: move 0.8s ease-out;
}

.card-leave-to {
  opacity: 0;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease-in;
}

@keyframes move {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
    transform: translateY(30px);
  }
  100% {
    opacity: 0;
    transform: translateY(50px);
  }
}
</style>
