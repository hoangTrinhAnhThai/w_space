<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Cards',
};
</script>

<style lang="scss" scoped>
.card {
  background-color: rgb(255, 255, 255);
  margin: 15px;
  padding: 8px;
  border: 1px solid rgb(214, 212, 212);
  border-radius: 5px;
  line-height: 25px;
  cursor: pointer;
}
</style>
