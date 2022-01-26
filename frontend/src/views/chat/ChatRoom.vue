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
        <div v-else class="content" v-for="(chat, index) in chats" :key="index">
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
              <img
                class="image img"
                v-if="
                  chat.createdBy.avatar
                "
                :src="chat.createdBy.avatar"
                alt=""
              />
              <v-avatar v-else size="45" color="green" class="img">
                <span class="white--text"
                  >{{ chat.createdBy.firstName.charAt(0)
                  }}{{ chat.createdBy.lastName.charAt(0) }}</span
                >
              </v-avatar>
            </div>
          </div>
          <div class="left-chat-card" v-else>
            <div class="content-chat">
              <img
                class="image img"
                v-if="chat.createdBy.avatar"
                :src="chat.createdBy.avatar"
                alt=""
              />
              <v-avatar v-else size="45" color="red" class="img">
                <span class="white--text"
                  >{{ chat.createdBy.firstName.charAt(0)
                  }}{{ chat.createdBy.lastName.charAt(0) }}</span
                >
              </v-avatar>
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
        <v-file-input
          hide-input
          small-chips
          v-model="files"
          class="file-input"
          style="width: 10%"
        ></v-file-input>
        <div class="content-message" style="width: 90%">
          <div class="list-file">
            <v-chip
              v-if="files.name"
              pill
              class="ma-2"
              close
              @click:close="removeFile()"
              >{{ files.name }}</v-chip
            >
          </div>
          <v-text-field
            dense
            placeholder="Write message..."
            id="content"
            v-model="message"
            v-on:keyup="sendMessage"
          >
            <v-icon
              @click="toogleDialogEmoji"
              slot="append"
              style="
                background-color: rgb(255, 200, 61);
                border-radius: 50%;
                padding: -2px;
              "
              color="rgb(255,200,61)"
            >
              mdi-emoticon-excited-outline
            </v-icon>
          </v-text-field>
        </div>
        <!-- <img :src="convert(file)" alt="" /> -->

        <VEmojiPicker
          v-show="showDialog"
          :style="{ width: '440px', height: '200' }"
          labelSearch="Search"
          lang="pt-BR"
          @select="onSelectEmoji"
          class="emoji"
        />
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
    <v-navigation-drawer
      permanent
      bottom
      right
      v-show="showGroup"
      style="width: 350px"
    >
      <h4 style="padding: 15px 15px 3px">Members</h4>
      <v-divider></v-divider>

      <v-list nav dense>
        <template v-if="currentRoom.createdBy">
          <v-list-item>
            <img
              class="image"
              v-if="currentRoom.createdBy.avatar"
              :src="currentRoom.createdBy.avatar"
            />
            <v-avatar v-else color="green">
              <span class="text-h6"
                >{{ currentRoom.createdBy.firstName.charAt(0)
                }}{{ currentRoom.createdBy.lastName.charAt(0) }}</span
              >
            </v-avatar>
            <v-list-item-content style="margin-left: 15px">
              <v-list-item-title
                >{{ currentRoom.createdBy.firstName }}
                {{ currentRoom.createdBy.lastName }}</v-list-item-title
              >
              <v-list-item-subtitle
                v-html="currentRoom.createdBy.email"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-for="member in currentRoom.members">
          <v-list-item :key="member._id">
            <img class="image" v-if="member.avatar" :src="member.avatar" />
            <v-avatar v-else color="green">
              <span class="text-h6"
                >{{ member.firstName.charAt(0)
                }}{{ member.lastName.charAt(0) }}</span
              >
            </v-avatar>
            <v-list-item-content style="margin-left: 15px">
              <v-list-item-title
                >{{ member.firstName }} {{ member.lastName }}</v-list-item-title
              >
              <v-list-item-subtitle
                v-html="member.email"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ChatCard from '../../components/ChatCard.vue';
import { VEmojiPicker } from 'v-emoji-picker';
export default {
  name: 'ChatRoom',
  data() {
    return {
      message: '',
      showGroup: false,
      showDialog: false,
      files: {},
    };
  },
  computed: {
    ...mapGetters({
      chats: 'CHAT/chats',
      userInfo: 'AUTH/userInfo',
      validateText: 'VALIDATION/validateText',
      currentRoom: 'CHAT/currentRoom',
    }),
  },
  methods: {
    ...mapActions({
      getAllChatByIdRoom: 'CHAT/getAllChatByIdRoom',
      sendMessageAction: 'CHAT/sendMessage',
      addCurrentRoom: 'CHAT/addCurrentRoom',
      removeUnreadNotification: 'NOTIFICATION/removeUnreadNotification',
      uploadFile: 'CHAT/uploadFile',
    }),
    sendMessage(e) {
      if (e.keyCode === 13) {
        if (!this.validateBeforeSubmit() && !this.files.name) {
          document.getElementById('content').focus();
          return;
        } else {
          if (this.files.name) {
            const formData = new FormData();
            formData.append('file', this.files);
            this.uploadFile({
              idRoom: this.$route.params.id,
              file: formData,
            });
            this.removeFile();
          }
          if (this.validateBeforeSubmit()) {
            this.sendMessageAction({
              idRoom: this.$route.params.id,
              chat: { room: this.$route.params.id, message: this.message },
            });
            this.message = '';
            document.getElementById('content').focus();
          }
        }
      }
    },
    sendMessageByClick() {
      if (!this.validateBeforeSubmit() && !this.files.name) {
        document.getElementById('content').focus();
        return;
      } else {
        if (this.files.name) {
          const formData = new FormData();
          formData.append('file', this.files);
          this.uploadFile({
            idRoom: this.$route.params.id,
            file: formData,
          });
          this.removeFile();
        }
        if (this.validateBeforeSubmit()) {
          this.sendMessageAction({
            idRoom: this.$route.params.id,
            chat: { room: this.$route.params.id, message: this.message },
          });
          this.message = '';
          document.getElementById('content').focus();
        }
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
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
    },
    onSelectEmoji(emoji) {
      this.message += emoji.data;
    },
    removeFile() {
      this.files = {};
    },
  },
  created() {
    this.getAllChatByIdRoom(this.$route.params.id);
    this.addCurrentRoom(this.$route.params.id);
  },
  components: {
    ChatCard,
    VEmojiPicker,
  },
  watch: {
    message() {
      this.removeNotification();
      this.showDialog = false;
    },
    files() {
      console.log(this.files);
    },
  },
};
</script>
<style scoped>
h4 {
  font-weight: 500;
}
.v-list .v-list-item:hover {
  background-color: rgb(247, 248, 251);
  border-radius: 5px;
}
.v-list .v-list-item:hover,
.v-list .v-list-item:hover .mdi-chevron-down::before {
  color: rgb(21, 17, 30) !important;
}
.bar1 {
  box-shadow: none !important;
  background-color: rgb(247, 248, 251) !important;
  border-bottom: 1px solid rgb(126, 68, 68);
  padding: 0px 20px;
  font-weight: 900;
}
.v-icon {
  color: rgb(68, 64, 64) !important;
}
.chat-room {
  border-radius: 5px;
  height: calc(100vh - 65px);
  display: flex;
}
.container-chat {
  width: 100%;
}
.write-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 5px 30px 20px;
  position: relative;
}
.theme--light.v-input {
  width: 100%;
  border-radius: none !important;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 45px !important;
}
.btn-container {
  align-self: flex-end;
}
.list-file {
  height: 40px !important;
}
.v-application .ma-2 {
  margin: 0 !important;
}
.file-input {
  padding: 0;
  position: absolute;
  align-self: flex-end;
}

.content-message {
  width: 90%;
  margin: 0 auto;
  align-self: flex-end;
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
.image {
  height: 45px !important;
  width: 45px !important;
  border-radius: 50%;
}
.emoji {
  position: absolute;
  right: 105px;
  bottom: 60px;
}
</style>
<style lang="scss" scoped>
@import '../../assets/style.scss';

.chat-room {
  position: relative;
  min-width: 500px;
  overflow-wrap: anywhere;
  width: 100%;
  .container-chat {
    min-width: 500px;
    position: relative;
  }
  .layout-chat {
    overflow-y: scroll;
    height: calc(100vh - 230px);
    padding: 30px;
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
