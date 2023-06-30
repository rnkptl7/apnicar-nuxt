<template>
  <div class="modal">
    <vee-form class="form" :validation-schema="schema">
      <div class="heading">
        <slot name="heading"></slot>
      </div>
      <div class="fields">
        <slot name="fields"></slot>
      </div>
      <div class="buttons block">
        <slot name="buttons"></slot>
      </div>
      <slot></slot>
    </vee-form>
  </div>
</template>

<script setup>
const schema = {
  name: "required|min:3|max:100",
  details: "required|min:30|max:120",
  url: "required|url",
  price: "required|min_value:50000",
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0%;
  left: 0%;
  background-color: rgba($color: #000000, $alpha: 0.3);
  width: 100%;
  height: 100%;
  min-height: 100vh;
  z-index: 10;

  form {
    color: #fff;
    position: absolute;
    padding: 20px;
    background: #334756;
    border-radius: 10px;
    width: 450px;
    top: 26rem;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  @media (max-width: 502px) {
    form {
      width: 80%;
    }
  }
}
</style>
