<template>
  <v-main>
    <v-container>
      <v-label>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4481/4481062.png"
          alt=""
        />
      </v-label>
      <v-item-group mandatory>
        <v-row>
          <h2>Chat room</h2>
          <v-col v-for="(room, index) in rooms" :key="index" cols="3" md="4">
            <v-item>
              <v-card
                class="d-flex align-center"
                height="100"
                width="400px"
                @click="handleClickRoom(room._id)"
              >
                <v-card-title>{{ room.name }}</v-card-title>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ProjectPage',
  computed: {
    ...mapGetters({
      rooms: 'CHAT/rooms',
    }),
  },
  methods: {
    ...mapActions({
      removeUnreadNotification: 'NOTIFICATION/removeUnreadNotification',
    }),
    handleClickRoom(idRoom) {
      this.$router.push(`/chatroom/${idRoom}`);
      this.removeUnreadNotification(idRoom);
    },
  },
};
</script>

<style scoped>
.v-main {
  text-align: center;
  height: 100vh;
  width: 100%;
}
.container {
  width: 80%;
  text-align: start;
  margin: 50px auto;
}
img {
  width: 200px;
  margin-bottom: 50px;
}

.label {
  margin-bottom: 50px;
}
</style>
