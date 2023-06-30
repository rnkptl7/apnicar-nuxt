<template>
  <div>
    <div class="menubar">
      <button class="btn" @click="isOpenModal(true)">Add Car</button>
    </div>
    <GalleryCard></GalleryCard>
  </div>
</template>

<script setup>
import GalleryCard from "@/components/GalleryCard.vue";

import { useCarStore } from "../stores/CarStore";
import { useUserStore } from "~/stores/userStore";
import { storeToRefs } from "pinia";

const carStore = useCarStore();
const userStore = useUserStore();

const { isOpenModal } = storeToRefs(carStore);

useHead({
  title: "Apnicar",
});
</script>

<style lang="scss" scoped></style>
