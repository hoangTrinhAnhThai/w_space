<template>
  <div class="chat-card">
    <div class="container">
      <input class="content" type="text" placeholder="..." />
      <i class="bx bx-paper-plane"></i>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";
.chat-card {
  .container {
    width: 100%;
    background-color: rgb(200, 200, 200);
    padding: 10px;
    .content {
      width: 95%;
      white-space: nowrap;
      background-color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      border: 1px solid $border-color;
      padding: 7px 15px;
      border-radius: 300px;
      outline: none;
    }
    i {
      font-size: 25px;
      margin-left: 10px;
      position: relative;
      top: 5px;
    }
  }
}
::placeholder {
  color: rgb(196, 191, 191);
}
</style>
