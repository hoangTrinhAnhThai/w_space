<template>
  <div class="chat-room">
    <div class="container-chat">
      <div class="header">Ten chat room</div>
      <hr />
      <div class="content">
        <left-chat-card />
        <right-chat-card />
        <left-chat-card />
        <left-chat-card />
      </div>
      <div class="write-content">
        <chat-card />
      </div>
    </div>
  </div>
</template>

<script>
import LeftChatCard from '../../components/LeftChatCard.vue';
import RightChatCard from '../../components/RightChatCard.vue';
import ChatCard from '../../components/ChatCard.vue';

export default {
  name: 'ChatRoom',
  components: {
    LeftChatCard,
    RightChatCard,
    ChatCard,
  },
};
</script>

<style lang="scss" scoped>
.chat-room {
  width: 100vw;
  position: relative;
  min-height: 92vh;
  .content {
    height: 81.5vh;
  }
  .write-content {
  }
}
</style>
