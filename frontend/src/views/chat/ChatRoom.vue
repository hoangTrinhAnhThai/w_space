<template>
  <div class="chat-room">
    <v-row>
      <v-col cols="11"
        ><h1>#{{ currentRoom.name }}</h1></v-col
      >
    </v-row>
    <hr />
    <div class="layout-chat" v-chat-scroll>
      <div class="notChat" v-if="chats.length <= 0">
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/chat-2282632-1904876.png"
          alt=""
        />
        <div class="group"></div>
      </div>
      <div class="content" v-for="(chat, index) in chats" :key="index">
        <div class="right-chat-card" v-if="chat.createdBy._id == userInfo._id">
          <div class="content-chat">
            <div style="margin-bottom: -7px">
              <chat-card
                class="right"
                v-bind:chat="chat"
                v-bind:color="'rgb(211, 224, 234)'"
                v-bind:distance="'50px'"
              />
            </div>
            <v-avatar size="45" color="green" class="img">
              <span class="white--text">{{ chat.createdBy.avatar }}</span>
            </v-avatar>
          </div>
        </div>
        <div class="left-chat-card" v-else>
          <div class="content-chat">
            <div class="img">
              <v-avatar size="45" color="red">
                <span class="white--text">{{ chat.createdBy.avatar }}</span>
              </v-avatar>
            </div>
            <div style="margin-bottom: -3px">
              <chat-card
                class="left"
                v-bind:chat="chat"
                v-bind:distance="'-50px'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="write-content">
      <v-text-field
        placeholder="Write message..."
        outlined
        dense
        id="content"
        v-model="message"
        v-on:keyup="sendMessage"
      ></v-text-field>
      <div class="btn-container">
        <v-btn
          class="save-btn"
          @click="sendMessageByClick"
          text
          style="height: 100%"
        >
          <i class="bx bx-send"></i>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChatCard from "../../components/ChatCard.vue";
export default {
  name: "ChatRoom",
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapGetters({
      chats: "CHAT/chats",
      userInfo: "AUTH/userInfo",
      validateText: "VALIDATION/validateText",
      currentRoom: "CHAT/currentRoom",
      currentProject: "TASKS/currentProject",
    }),
  },
  methods: {
    ...mapActions({
      getAllChatByIdRoom: "CHAT/getAllChatByIdRoom",
      sendMessageAction: "CHAT/sendMessage",
      addCurrentRoom: "CHAT/addCurrentRoom",

    }),
    sendMessage(e) {
      if (e.keyCode === 13) {
        if (!this.validateBeforeSubmit()) {
          document.getElementById("content").focus();
          return;
        } else {
          this.sendMessageAction({
            idRoom: this.$route.params.id,
            chat: { room: this.$route.params.id, message: this.message },
          });
          this.message = "";
          document.getElementById("content").focus();
        }
      }
    },
    sendMessageByClick() {
      if (!this.validateBeforeSubmit()) {
        document.getElementById("content").focus();
        return;
      } else {
        this.sendMessageAction({
          idRoom: this.$route.params.id,
          chat: { room: this.$route.params.id, message: this.message },
        });
        this.message = "";
        document.getElementById("content").focus();
      }
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateText(this.message);
      if (errors) {
        passedValidate = false;
      }
      return passedValidate;
    },
  },
  created() {
    console.log(this.$route.params.id);
    this.getAllChatByIdRoom(this.$route.params.id);
    this.addCurrentRoom(this.$route.params.id);
  },
  components: {
    ChatCard,
  },
};
</script>
<style scoped>
.chat-room {
  border: 1px solid rgb(238, 231, 231);
  border-radius: 3px;
  margin-bottom: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: calc(100vh - 70px);
}

.write-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 5px 30px;
}

.theme--light.v-input {
  width: 85%;
  border-radius: none !important;
  margin-right: 10px;
}

.v-btn:not(.v-btn--round).v-size--default {
  top: -10px;
  border: none;
  height: 100%;
}

i:hover {
  color: rgb(144, 142, 218);
}
h1 {
  margin: 0px 10px;
}
i {
  font-size: 20px;
}
.notChat {
  text-align: center;
}
.left {
  background-color: red;
}
</style>
<style lang="scss" scoped>
@import "../../assets/style.scss";

.chat-room {
  position: relative;
  min-width: 500px;
  overflow-wrap: anywhere;
  .container-chat {
    min-width: 500px;
    position: relative;
  }
  .layout-chat {
    overflow-y: scroll;
    padding-bottom: 20px;
    height: calc(100vh - 210px);
    padding: 30px;
    margin-bottom: 10px;
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
          .right {
            // box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            // padding: 10px 25px;
            // border-top-left-radius: 50px;
            // border-bottom-left-radius: 50px;
            // border-top-right-radius: 50px;
            // margin: 10px 0;
            // position: relative;
            // right: 50px;
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
          .left {
            background-color: $color2;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            padding: 10px 25px;
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
            border-top-left-radius: 50px;
            margin: 10px 0;
            position: relative;
            left: 50px;
          }
        }
      }
    }
  }
  ::placeholder {
    color: rgb(196, 191, 191);
  }
}
</style>
