<template>
  <div class="left-chat-card">
    <div class="content-chat">
      <div class="img">
        <img
          src="https://i.pinimg.com/736x/21/2d/12/212d12e421963f8a66f95aece1182069.jpg"
          alt=""
        />
      </div>
      <p>re, quos, at vobus.</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../assets/style.scss';
.left-chat-card {
  width: 100%;
  float: left;
  display: flex;
  position: relative;

  .content-chat {
    max-width: 70%;
    .img {
      width: 45px;
      height: 45px;
      position: absolute;
      bottom: 10px;
      left: 0;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
    p {
      background-color: $color;
      color: white;
      padding: 10px 25px;
      border-top-right-radius: 300px;
      border-bottom-right-radius: 300px;
      border-top-left-radius: 300px;
      margin: 10px 0;
      position: relative;
      left: 43px;
    }
  }
}
</style>
