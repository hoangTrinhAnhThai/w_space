<template>
  <div v-if="date">
    {{getTime }}
  </div>
</template>

<script>
import helper from "../../utils/data";
export default {
  props: {
    date: {
      type: String,
    },
  },
  computed: {
    getTime() {
      let year = new Date(this.date).getFullYear();
      let month = helper.month[new Date(this.date).getMonth()];
      let day = new Date(this.date).getDate();
      return `${day} ${month}, ${year}`;
    },
  },
};
</script>

<style>
</style>