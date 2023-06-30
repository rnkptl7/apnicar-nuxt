<template>
  <div>
    <img src="/images/error_icon.png" alt="" />
    <p>{{ error }}</p>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCarStore } from "../stores/CarStore";

const carStore = useCarStore();

const { error } = storeToRefs(carStore);
</script>

<style lang="scss"></style>
