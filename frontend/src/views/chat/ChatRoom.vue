<template>
  <div class="chat-room">
    <div class="container-chat">
      <!-- <div class="header">Ten chat room</div> -->
      <!-- <hr /> -->
      <div class="layout-chat" v-chat-scroll>
        <div class="content" v-for="(chat, index) in chats" :key="index">
          <div class="right-chat-card" v-if="chat.createdBy == userInfo._id">
            <div class="content-chat right">
              <p>{{ chat.message }}</p>
              <div class="img">
                <img
                  src="https://i2.wp.com/scr.vn/wp-content/uploads/2020/07/avt-cute.jpg?resize=575%2C575&ssl=1"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="left-chat-card" v-else>
            <div class="content-chat left">
              <div class="img">
                <img
                  src="https://i.pinimg.com/736x/21/2d/12/212d12e421963f8a66f95aece1182069.jpg"
                  alt=""
                />
              </div>
              <p>{{ chat.message }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="write-content">
        <div class="chat-card">
          <div class="container-card">
            <input
              id="content"
              v-model="message"
              type="text"
              placeholder="..."
            />
            <i class="bx bx-paper-plane" @click="sendMessage"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ChatRoom',
  data() {
    return {
      message: '',
    };
  },
  computed: {
    ...mapGetters({
      chats: 'CHAT/chats',
      userInfo: 'AUTH/userInfo',
    }),
  },
  methods: {
    ...mapActions({
      getAllChatByIdRoom: 'CHAT/getAllChatByIdRoom',
      sendMessageAction: 'CHAT/sendMessage',
    }),
    sendMessage() {
      this.sendMessageAction({
        idRoom: this.$route.params.id,
        chat: { room: this.$route.params.id, message: this.message },
      });
      this.message = '';
      document.getElementById('content').focus();
    },
  },
  created() {
    this.getAllChatByIdRoom(this.$route.params.id);
  },
};
</script>
<style scoped>
.v-main {
  width: 100%;
  min-width: 1000px;
  min-height: 92vh;
  height: 92vh;
  white-space: nowrap;
  overflow: scroll !important;
}
</style>
<style lang="scss" scoped>
@import '../../assets/style.scss';

.chat-room {
  position: relative;
  min-width: 500px;
  .container-chat {
    min-width: 500px;
    position: relative;
  }
  .layout-chat {
    overflow-y: scroll;
    height: 76.9vh;

    .content {
      overflow: auto;
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
            background-color: $color2;
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
            color: rgb(255, 255, 255);
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
    }
  }
  .write-content {
    width: 100%;
    // position: absolute;
    // bottom: 0;
  }
  .chat-card {
    .container-card {
      width: 100%;
      background-color: rgb(39, 102, 120);
      padding: 10px;
      display: flex;
      flex-wrap: nowrap;
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
}
</style>
