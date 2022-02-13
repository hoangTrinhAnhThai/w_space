<template>
  <div v-if="dueDate">
    {{getTime }}
  </div>
</template>

<script>
import helper from "../../utils/data";
export default {
  props: {
    dueDate: {
      type: String,
    },
  },
  computed: {
    getTime() {
      let year = new Date(this.dueDate).getFullYear();
      let month = helper.month[new Date(this.dueDate).getMonth()];
      let day = new Date(this.dueDate).getDate();
      return `${day} ${month}, ${year}`;
    },
  },
};
</script>

<style>
</style>