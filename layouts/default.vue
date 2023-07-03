<template>
  <div>
    <ClientOnly>
      <Navbar />
      <template #fallback>
        <div class="navbar">
          <NuxtLink to="/">
            <div class="navbar-logo">
              <NuxtImg class="logo" src="/images/logo.png" alt="apnicar logo" />
              <p>apniCar</p>
            </div>
          </NuxtLink>
        </div>
      </template>
    </ClientOnly>
    <slot />
  </div>
</template>

<style scoped lang="scss">
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

  a {
    color: #fff;
    text-decoration: none;
  }
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
}
</style>
