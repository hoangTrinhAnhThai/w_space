<template>
  <div v-if="timeInMiliseconds">
    {{timeReport }}
  </div>
</template>

<script>
export default {
  props: [
    'timeInMiliseconds'
  ],
  computed: {
    timeReport() {
      let totalSecond = 0;
      let hour = 0;
      let minute = 0;
      let second = 0;
      if (this.timeInMiliseconds) {
        totalSecond = this.timeInMiliseconds / 1000 / 60 / 60;
        hour = Math.floor(totalSecond);
        minute = Math.floor((totalSecond - hour) * 60);
        second = Math.floor(((totalSecond - hour) * 60 - minute) * 60);
      }
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minute < 10) {
        minute = `0${minute}`;
      }
      if (second < 10) {
        second = `0${second}`;
      }
      return `${hour}h${minute}m${second}s`;
    },
  },
};
</script>

<style>
</style>