<template>
  <v-tooltip
    bottom
  >
    <template v-slot:activator="{ on, attrs  }">
      <span v-on="on" v-bind="attrs"
        ><p v-bind:style="{ backgroundColor: color, right: distance }">
          {{ chat.message }}
        </p></span
      >
    </template>
    <span>{{ month }} {{ date }}, {{ year }} {{ hour }}:{{ minute }}</span>
  </v-tooltip>
</template>

<script>
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
  },
};
</script>

<style>
p {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 10px 25px;
  position: relative;
  border-radius: 5px;
}
.tooltip {
  position: relative;
}
</style>