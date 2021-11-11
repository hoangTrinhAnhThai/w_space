<template>
  <div class="logtime">
    <div class="container">
      <logtime-card />
    </div>
  </div>
</template>

<script>
import LogtimeCard from '../../components/LogtimeCard.vue';
export default {
  name: 'Logtime',
  components: {
    LogtimeCard,
  },
};
</script>

<style lang="scss" scoped>
.logtime {
  float: left;
  .container {
    margin-top: 50px;
  }
}
</style>
