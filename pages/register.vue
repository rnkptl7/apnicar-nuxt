<template>
  <div class="container">
    <vee-form class="form" :validation-schema="schema" @submit="registerData">
      <div class="heading">
        <h1 class="heading">Register Here</h1>
      </div>
      <div class="fields">
        <div class="inputDiv">
          <label>Name:</label>
          <vee-field
            type="text"
            v-model="form.name"
            placeholder="Enter Your Name"
            name="name"
          />
          <ErrorMessage name="name" class="error" />
        </div>
        <div class="inputDiv">
          <label>Email:</label>
          <vee-field
            type="email"
            v-model="form.email"
            placeholder="Enter Your Email"
            name="email"
          />
          <ErrorMessage name="email" class="error" />
        </div>
        <div class="inputDiv">
          <label>Password:</label
          ><vee-field
            type="password"
            v-model="form.password"
            placeholder="Enter Your Password"
            name="password"
          />
          <ErrorMessage name="password" class="error" />
        </div>
        <div class="inputDiv">
          <label>Confirm Password:</label
          ><vee-field
            type="password"
            placeholder="Confirm Password"
            name="ConfirmPassword"
          />
          <ErrorMessage name="ConfirmPassword" class="error" />
        </div>
        <div class="inputDiv">
          <label>Role:</label
          ><vee-field as="select" v-model="form.role" name="role">
            <option value="" disabled>Select</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="customer">Customer</option>
          </vee-field>
          <ErrorMessage name="role" class="error" />
        </div>
        <div class="inputDiv">
          <label>Gender:</label>
          <div>
            <vee-field
              type="radio"
              v-model="form.gender"
              name="gender"
              value="male"
              id="male"
            />
            <label for="male">Male</label>
            <vee-field type="radio" name="gender" value="female" id="female" />
            <label for="female">Female</label>
            <vee-field type="radio" name="gender" value="other" id="other" />
            <label for="other">Other</label>
          </div>
          <ErrorMessage name="gender" class="error" />
        </div>
        <div class="inputDiv">
          <label>Date of Birth:</label
          ><vee-field
            type="date"
            name="dob"
            v-model="form.dob"
            @change="addAge"
          />
          <ErrorMessage name="dob" class="error" />
        </div>
        <em>(All fields are required unless specified optional)</em>
      </div>
      <div class="buttons block">
        <button type="submit" class="btn">Register</button>
        <button type="reset" class="btn">Cancel</button>
      </div>
    </vee-form>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore";
import { useCarStore } from "../stores/CarStore";
import { reactive } from "vue";
import "vue-toast-notification/dist/theme-bootstrap.css";

const { $toast } = useNuxtApp();
const userStore = useUserStore();
const carStore = useCarStore();
const router = useRouter();

const { loading } = storeToRefs(carStore);
const { addUser } = userStore;

useHead({
  title: "Apnicar | Register",
});

const schema = {
  name: "required|alpha_spaces",
  email: "required|email",
  password:
    "required|passwordmin:8|passwordmax:12|regex:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$",
  ConfirmPassword: "required|confirmed:@password",
  role: "required",
  gender: "required",
  dob: "required",
  age: "required",
};

const form = reactive({
  name: "",
  email: "",
  role: "",
  password: "",
  dob: "",
  age: null,
  gender: "",
});

const addAge = (e) => {
  let date = new Date(e.target.value);
  let month_diff = Date.now() - date.getTime();
  let age_dt = new Date(month_diff);
  let year = age_dt.getUTCFullYear();
  let age = Math.abs(year - 1970);

  form.age = age;
};

const registerData = async () => {
  try {
    loading.value = true;
    let { data } = await addUser(form);
    console.log(data);

    if (data.value) {
      $toast.success("Your Registration completed successfully", {
        position: "top-right",
        duration: 3000,
      });
      loading.value = false;
      router.push("/login");
    }
  } catch (error) {
    loading.value = false;
    alert("User Not Register Successfully!");
  }
};
</script>

<style lang="scss" scoped>
form {
  margin: 4rem;
}
</style>
