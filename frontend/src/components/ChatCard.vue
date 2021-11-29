<template>
  <div class="chat-card">
    <div class="container-card">
      <input id="content" v-model="message" type="text" placeholder="..." />
      <i class="bx bx-paper-plane" @click="sendMessage"></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ChatCard",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    ...mapActions({
      sendMessageAction: "CHAT/sendMessage",
    }),
    sendMessage() {
      this.sendMessageAction({
        idRoom: "61a3c3c63a93c1454bdc6ae4",
        chat: { room: "61a3c3c63a93c1454bdc6ae4", message: this.message },
      });
      this.message = ''
      document.getElementById("content").focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style.scss";
.chat-card {
  .container-card {
    width: 100%;
    background-color: rgb(216, 210, 210);
    padding: 10px;
    #content {
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
