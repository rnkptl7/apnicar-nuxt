<template>
  <div id="navigation-mobile">
    <ul>
      <div v-if="isLoggedIn">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <button class="btn" @click="logoutBtn">Logout</button>
      </div>
      <div v-else>
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/register">Register</router-link>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const { isLoggedIn } = storeToRefs(userStore);

function logoutBtn() {
  userStore.logout();
  navigateTo("/login");
}
</script>

<style lang="scss" scoped>
#navigation-mobile {
  padding: 20px 0 0 0;

  ul {
    list-style: none;
    width: 200px;
    padding-left: 6rem;

    li {
      margin: 1rem 1rem;
      a {
        color: #fff;
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 20px;
        cursor: pointer;
        text-decoration: none;
      }

      &:hover {
        color: #111;
      }
    }
  }
}

@media (max-width: 520px) {
  #navigation-mobile {
    ul {
      padding-left: 1.3rem;
    }
  }
}
</style>
