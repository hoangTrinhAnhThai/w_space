<template>
  <div class="right-chat-card">
    <div class="content-chat">
      <p>re, ratione quasi harum! Lorem i</p>
      <div class="img">
        <img
          src="https://i2.wp.com/scr.vn/wp-content/uploads/2020/07/avt-cute.jpg?resize=575%2C575&ssl=1"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
.right-chat-card {
  max-width: 70%;
  float: right;
  display: flex;
  position: relative;

  .content-chat {
    .img {
      width: 45px;
      height: 45px;
      position: absolute;
      bottom: 5px;
      right: 0;
      float: right;

      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
    p {
      background-color: rgb(197, 191, 191);
      padding: 10px 25px;
      border-top-left-radius: 300px;
      border-bottom-left-radius: 300px;
      border-top-right-radius: 300px;
      margin: 10px 0;
      position: relative;
      right: 45px;
      float: right;
    }
  }
}
</style>
