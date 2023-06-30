<template>
  <div class="navbar">
    <NuxtLink to="/">
      <div class="navbar-logo">
        <NuxtImg class="logo" src="/images/logo.png" alt="apnicar logo" />
        <p>apniCar</p>
      </div>
    </NuxtLink>
    <div class="navbar-right" v-show="!mobileView">
      <div v-if="isLoggedIn">
        <NuxtLink to="/">Home</NuxtLink>
        <button class="btn" @click="logoutBtn">Logout</button>
      </div>
      <div v-else>
        <NuxtLink to="/login">Login</NuxtLink>
        <NuxtLink to="/register">Register</NuxtLink>
      </div>
    </div>
    <div v-show="mobileView">
      <img
        v-show="!showNav"
        class="hamburgerMenu"
        src="/images/hamburger-menu.png"
        alt="hamburger-menu"
        @click="showNav = !showNav"
      />
      <img
        v-show="showNav"
        class="hamburgerMenu"
        src="/images/close.png"
        alt="close-menu"
        @click="showNav = !showNav"
      />
    </div>
  </div>
  <div v-show="mobileView" class="navigation-menu" :class="{ open: showNav }">
    <NavigationMobile />
  </div>
</template>

<script setup>
import { useCarStore } from "../stores/CarStore";
import { useUserStore } from "../stores/userStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const carStore = useCarStore();
const router = useRouter();

const { mobileView, showNav } = storeToRefs(carStore);
const { isLoggedIn } = storeToRefs(userStore);

function logoutBtn() {
  userStore.logout();
  router.push("/login");
}

carStore.handleView();
window.addEventListener("resize", carStore.handleView);
window.addEventListener("scroll", carStore.closeMobileMenu);
</script>

<style scoped lang="scss">
.navbar a {
  color: #fff;
  text-decoration: none;
}
.navigation-menu {
  position: absolute;
  transform: translatex(-30rem);
  z-index: 1;
  background: #334756;
  width: 50%;
  height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.open {
  transition: 800ms transform;
  transform: translateX(0);
}
.hamburgerMenu {
  width: 2rem;
  cursor: pointer;
}
.navbar {
  background: #334756;
  height: 80px;
  color: #fff;
  display: grid;
  place-items: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 270px;

  .navbar-logo {
    display: flex;
    align-items: center;
    .logo {
      width: 50px;
      border-radius: 30%;
    }

    p {
      font-size: 40px;
      font-weight: 900;
      font-style: italic;
      margin-left: 10px;
    }
  }

  .navbar-right {
    a {
      padding: 0.8rem;
      display: inline-block;
      text-decoration: none;
      color: #fff;
      font-size: 18px;
    }

    .router-link-exact-active {
      font-weight: 600;
    }
  }
}
@media (max-width: 1098px) {
  .navbar {
    padding: 0 100px;
  }
}

@media (max-width: 559px) {
  .navbar {
    padding: 0 10px;

    .navbar-logo p {
      font-size: 35px;
    }
  }
}
</style>
