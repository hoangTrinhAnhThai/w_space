<template>
  <div class="chat-room">
    <div class="container-chat">
      <div class="header">Ten chat room</div>
      <hr />
      <!-- <div class="content" v-chat-scroll>
        <ul>
          <li v-for="(chat, index) in chats" :key="index">
            {{ chat.message }}
          </li>
        </ul>
      </div> -->
      <div class="layout-chat" v-chat-scroll>
        <div class="content" v-for="(chat, index) in chats" :key="index">
          <div class="left-chat-card" v-if="index % 3 == 0">
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
          <div class="right-chat-card" v-else>
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
        </div>
      </div>
      <div class="write-content">
        <chat-card />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import VueChatScroll from "vue-chat-scroll";
import Vue from "vue";
Vue.use(VueChatScroll);
import ChatCard from "../../components/ChatCard.vue";

export default {
  name: "ChatRoom",
  components: {
    ChatCard,
  },
  computed: {
    ...mapGetters({
      chats: "CHAT/chats",
    }),
  },
  methods: {
    ...mapActions({
      getAllChatByIdRoom: "CHAT/getAllChatByIdRoom",
    }),
  },
  created() {
    this.getAllChatByIdRoom("61a3c3c63a93c1454bdc6ae4");
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.chat-room {
  position: relative;
  // min-height: 92vh;
  .container-chat {
    width: 90%;
    min-width: 850px;
  }
  .layout-chat {
    overflow: scroll;
    overflow-y: scroll;
    height: 67vh;
    .content {
      // height: 60vh;
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
            color: rgb(207, 180, 180);
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
}
</style>
