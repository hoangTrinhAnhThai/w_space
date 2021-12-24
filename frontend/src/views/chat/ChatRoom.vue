<template>
  <div class="chat-room">
    <div class="container-chat">
      <v-app-bar class="bar1">
        <v-toolbar-title>#{{ currentRoom.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="deep-purple lighten-5"
          icon
          @click.stop="showGroup = !showGroup"
        >
          <v-icon>mdi-account-group-outline</v-icon>
        </v-btn>
      </v-app-bar>

      <div class="layout-chat" v-chat-scroll>
        <div class="notChat" v-if="chats.length <= 0">
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/chat-2282632-1904876.png"
            alt=""
          />
          <div class="group"></div>
        </div>
        <div class="content" v-for="(chat, index) in chats" :key="index">
          <div
            class="right-chat-card"
            v-if="chat.createdBy._id == userInfo._id"
          >
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
                  v-bind:color="'rgb(250,250,250)'"
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
    <v-navigation-drawer v-model="showGroup" absolute bottom right temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ChatCard from '../../components/ChatCard.vue';
export default {
  name: 'ChatRoom',
  data() {
    return {
      message: '',
      showGroup: false,
      recent: [
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Jason Oner',
        },
        {
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Carlson',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Cindy Baker',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Ali Connors',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      chats: 'CHAT/chats',
      userInfo: 'AUTH/userInfo',
      validateText: 'VALIDATION/validateText',
      currentRoom: 'CHAT/currentRoom',
      currentProject: 'TASKS/currentProject',
    }),
  },
  methods: {
    ...mapActions({
      getAllChatByIdRoom: 'CHAT/getAllChatByIdRoom',
      sendMessageAction: 'CHAT/sendMessage',
      addCurrentRoom: 'CHAT/addCurrentRoom',
      removeUnreadNotification: 'NOTIFICATION/removeUnreadNotification',
    }),
    sendMessage(e) {
      if (e.keyCode === 13) {
        if (!this.validateBeforeSubmit()) {
          document.getElementById('content').focus();
          return;
        } else {
          this.sendMessageAction({
            idRoom: this.$route.params.id,
            chat: { room: this.$route.params.id, message: this.message },
          });
          this.message = '';
          document.getElementById('content').focus();
        }
      }
    },
    sendMessageByClick() {
      if (!this.validateBeforeSubmit()) {
        document.getElementById('content').focus();
        return;
      } else {
        this.sendMessageAction({
          idRoom: this.$route.params.id,
          chat: { room: this.$route.params.id, message: this.message },
        });
        this.message = '';
        document.getElementById('content').focus();
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
    removeNotification() {
      this.removeUnreadNotification(this.currentRoom._id);
    },
  },
  created() {
    this.getAllChatByIdRoom(this.$route.params.id);
    this.addCurrentRoom(this.$route.params.id);
  },
  components: {
    ChatCard,
  },
  watch: {
    message() {
      this.removeNotification();
    },
  },
};
</script>
<style scoped>
.bar1 {
  box-shadow: none !important;
  background-color: rgb(237, 237, 237) !important;
  border-bottom: 1px solid rgb(126, 68, 68);
  box-shadow: inset 0px 7px 3px -3px rgb(0 0 0 / 20%) !important;
}
.v-icon {
  color: rgb(68, 64, 64) !important;
}
.chat-room {
  border-radius: 3px;
  margin-bottom: 15px;
  height: calc(100vh - 64px);
  display: flex;
}
.container-chat {
  width: 100%;
}
.write-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 5px 30px 30px;
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
@import '../../assets/style.scss';

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
