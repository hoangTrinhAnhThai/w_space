<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <span v-on="on" v-bind="attrs" @click="downloadFile(chat.message)"
        ><p v-bind:style="{ backgroundColor: color, right: distance }">
          <span >
            <v-icon v-if="chat.isFile" style="top: -4px"
              >mdi-file-document-outline</v-icon
            >
          </span>
          <span>{{ message }}</span>
        </p></span
      >
    </template>
    <span>{{ month }} {{ date }}, {{ year }} {{ hour }}:{{ minute }}</span>
  </v-tooltip>
</template>

<script>
import { mapActions } from "vuex";
import helper from "../utils/data";
export default {
  name: "ChatCard",
  props: {
    chat: {
      type: Object,
    },
    color: {
      type: String,
    },
    distance: {
      type: String,
    },
  },
  computed: {
    date() {
      return new Date(this.chat.createdAt).getDate();
    },
    year() {
      return new Date(this.chat.createdAt).getFullYear();
    },
    month() {
      return helper.shortMonth[new Date(this.chat.createdAt).getMonth()];
    },
    hour() {
      return new Date(this.chat.createdAt).getHours();
    },
    minute() {
      return new Date(this.chat.createdAt).getMinutes();
    },
    message() {
      if (this.chat.isFile) {
        let arr = this.chat.message.split("-");
        arr.pop();
        return arr.join("-");
      } else {
        return this.chat.message;
      }
    },
  },
  methods: {
    ...mapActions({
      downloadFileAction: "CHAT/downloadFile",
    }),
    downloadFile(nameFile) {
      if(nameFile) {
      this.downloadFileAction(nameFile);
      } else return 
    },
  },
};
</script>

<style>
p {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px 25px;
  position: relative;
  border-radius: 5px;
  cursor: pointer;
}
.tooltip {
  position: relative;
}
</style>
