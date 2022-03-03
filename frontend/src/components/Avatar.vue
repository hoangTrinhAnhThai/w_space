<template>
  <span>
    <img v-if="user.avatar" :src="user.avatar" alt="" />
    <v-avatar v-else color="light-blue lighten-3" size="24">
      <span style="font-size: 10px">
        {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
      </span>
    </v-avatar>
    <span class="name-assigned">{{ user.firstName }} {{ user.lastName }}</span>
  </span>
</template>

<script>
export default {
  props: ['user'],
};
</script>

<style scoped>
img {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
