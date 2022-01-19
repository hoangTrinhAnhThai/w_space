<template>
  <div class="nav" :class="{ change_color: scrollPosition > 50 }">
    <div class="logo">
      <router-link tag="li" to="/">
        <img src="../assets/Logo.png" alt="" />
        W-space</router-link
      >
    </div>
    <v-spacer></v-spacer>
    <v-menu v-if="userInfo" offset-y transition="slide-y-transition" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon text v-bind="attrs" v-on="on">
          <img
            class="avt"
            v-if="userInfo.avatar"
            :src="userInfo.avatar"
            alt=""
          />
          <v-avatar v-else color="red" class="avt">
            <span class="white--text"
              >{{ userInfo.firstName.charAt(0)
              }}{{ userInfo.lastName.charAt(0) }}</span
            >
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <router-link tag="li" to="/profile"
            ><i class="bx bx-user-circle"></i>Profile</router-link
          >
        </v-list-item>
        <v-list-item @click="logout">
          <i class="bx bx-exit"></i>Logout
        </v-list-item>
      </v-list>
    </v-menu>
    <div v-else>
      <v-btn text class="login-btn" @click="login"> Login </v-btn>
      <v-btn text class="save-btn" @click="signup"> Signup </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Navigation',
  data() {
    return {
      scrollPosition: false,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'USER/userInfo',
      userInfoAuth: 'AUTH/userInfo',
    }),
  },
  methods: {
    ...mapActions({
      logoutAction: 'AUTH/logout',
      getUser: 'USER/getUser',
    }),
    logout() {
      this.logoutAction();
    },
    login() {
      this.$router.push('/login');
    },
    signup() {
      this.$router.push('/signup');
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  created() {
    if (this.userInfoAuth) {
      this.getUser(this.userInfoAuth._id);
    }
    window.addEventListener('scroll', this.updateScroll);
  },
};
</script>
<style scoped>
.nav {
  background-color: none;
  color: white !important;
  position: fixed;
  width: 100%;
  padding: 7.5px 20px;
  z-index: 1;
}
.change_color {
  background-color: white !important;
  color: rgb(21, 17, 30) !important;
  border-bottom: 1px solid rgb(201, 197, 197);
}
.change_color .login-btn {
  color: rgb(21, 17, 30) !important;
}
.v-btn {
  border: none;
  height: 40px !important;
  margin-right: 10px;
  font-weight: normal;
  color: white !important;
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

img {
  width: 50px;
}
.avt {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.logo {
  color: #000;
  font-weight: 900;
  font-size: 20px;
  text-transform: uppercase;
}
</style>
