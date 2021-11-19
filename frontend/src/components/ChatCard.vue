<template>
  <div class="chat-card">
    <div class="container-card">
      <input class="content" type="text" placeholder="..." />
      <i class="bx bx-paper-plane"></i>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
.chat-card {
  .container-card {
    width: 100%;
    background-color: rgb(241, 237, 237);
    padding: 10px;
    .content {
      width: 97%;
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
    i:hover {
      color: rgb(138, 138, 138);
    }
  }
}
::placeholder {
  color: rgb(196, 191, 191);
}
</style>
