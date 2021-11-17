<template>
  <div class="card">
    <div class="sign">
      <i class="bx bx-dots-vertical-rounded"></i>
    </div>
    <div class="function">
        <ul>
          <li><i class="bx bx-edit-alt"></i></li>
          <li><i class="bx bx-trash"></i></li>
        </ul>
      </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Cards",
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
  position: relative;
z-index: 0;
  .sign {
    position: absolute;
    right: 10px;
    color: grey;
    z-index: 1;
  }
  .function {
    position: absolute;
    top: 15px;
    width: 200px;
    right: -190px;
    z-index: 2;
    background-color: rgb(235, 8, 8);
    height: 100%;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
      }
    }
  }
}
</style>
