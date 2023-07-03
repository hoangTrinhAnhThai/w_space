<template>
  <span>
    <img v-if="user.avatar" :src="user.avatar" alt="" />
    <v-avatar v-else color="light-blue lighten-3" size="24">
      <span style="font-size: 0.625em;">
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
  height: 2.1875em;
  width: 2.1875em;
  border-radius: 50%;
  margin-right: 0.625em;
}
.name-assigned {
  margin-left: 5px;
}
</style>
