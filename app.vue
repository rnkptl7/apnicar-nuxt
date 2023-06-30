<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from "./stores/userStore";
useUserStore().isLoggedIn = useSessionStorage("isLoggedIn", false).value;
</script>

<style>
.page-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.page-enter-active {
  transition: all 0.2s ease-out;
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.page-leave-active {
  transition: all 0.3s ease-in;
}
</style>
