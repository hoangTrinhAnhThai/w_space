<template>
  <div class="nav">
    <v-app-bar>
      <div class="logo">
        <router-link tag="li" to="/">
          <img src="../assets/Logo.png" alt="" />
          W-space</router-link
        >
      </div>

      <v-spacer></v-spacer>
      <!-- <v-btn icon text>
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
      <v-btn icon text>
        <v-icon>mdi-help-circle</v-icon>
      </v-btn> -->
      <v-menu offset-y transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon text v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <router-link tag="li" to="/profile"
              ><i class="bx bx-user-circle"></i>Profile</router-link
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title
              ><i class="bx bx-exit"></i>Logout</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.v-btn {
  border: none;
  color: rgb(105, 104, 104) !important;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover {
  background-color: rgb(211, 224, 234);
}
.v-list {
  padding: 0 !important;
  cursor: pointer;
}

li {
  list-style: none;
  cursor: pointer;
}
.v-nav {
  background-color: red !important;
}
img {
  width: 50px;
}
</style>
