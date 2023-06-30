<template>
  <div class="notFound">
    <NuxtImg src="/images/not.png" alt="Page Not Found" />

    <h1>Page Not Found!</h1>
    <button class="btn" @click="handleBtn">Go To Home</button>
  </div>
</template>

<script setup>
const handleBtn = () => {
  clearError({
    redirect: "/",
  });
};

useHead({
  title: "404 Page Not Found",
});
</script>
<style lang="scss" scoped>
.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;

  h1,
  h2 {
    color: #cccc;
    margin-bottom: 1rem;
  }
  h1 {
    font-size: 3rem;
  }
}

@media (max-width: 650px) {
  img {
    width: 100%;
  }
  .notFound h1 {
    font-size: 2rem;
  }
}
</style>
