<template>
  <v-main>
    <navigation />
    <div class="login">
      <div class="container">
        <h4>Sign in to W-space</h4>
        <form v-on:submit.prevent="login" method="post">
          <div class="form-group">
            <input
              class="form-control"
              type="text"
              v-model="loginInput.email"
              placeholder="Email"
            />
            <div class="errors">
              <p v-show="showErrors.emptyEmail" class="errors">
                Email is required
              </p>
              <p v-show="showErrors.invalidEmail" class="errors">
                Email is invalid
              </p>
            </div>
          </div>
          <div class="form-group">
            <input
              class="form-control"
              v-model="loginInput.password"
              type="password"
              placeholder="Password"
            />
            <div class="errors">
              <p v-show="showErrors.emptyPassword" class="errors">
                Password is required
              </p>
              <p v-show="showErrors.passwordMinLength" class="errors">
                Password must have at least 6 letters
              </p>
              <p v-show="showErrors.passwordMaxLength" class="errors">
                Password must have at most 255 letters
              </p>
              <p v-show="errorMessage" class="errors">{{ errorMessage }}</p>
            </div>
          </div>

          <div class="signin">
            <button type="submit" :disabled="disabledLogin">Sign in</button>
          </div>
          <div class="forgot-password">
            <router-link to="/forgot-password">Forgot password?</router-link>
          </div>
          <span style="font-size: 13px">or</span>
          <div class="signup">
            <span style="font-size: 14px">Don't have a account? </span>
            <span><router-link to="/signup">Signup</router-link></span>
          </div>
        </form>
      </div>
    </div>
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
import Navigation from '../../components/Navigation.vue';
export default {
  data() {
    return {
      loginInput: {
        email: '',
        password: '',
      },
      showErrors: {},
      disabledLogin: false,
    };
  },
  computed: {
    ...mapGetters({
      validateLogin: 'VALIDATION/validateLogin',
      errorMessage: 'ERROR/errorMessage',
    }),
  },
  methods: {
    ...mapActions({
      clearErrorMessage: 'ERROR/clearErrorMessage',
      loginAction: 'AUTH/login',
    }),
    login() {
      if (!this.validateBeforeSubmit()) {
        this.disabledLogin = true;
        return;
      } else {
        this.loginAction(this.loginInput);
      }
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateLogin(this.loginInput);
      if (errors) {
        Vue.set(
          this.showErrors,
          'emptyEmail',
          this.showErrors && !!errors && errors.emptyEmail,
        );
        Vue.set(
          this.showErrors,
          'invalidEmail',
          this.showErrors && !!errors && errors.invalidEmail,
        );
        Vue.set(
          this.showErrors,
          'emptyPassword',
          this.showErrors && !!errors && errors.emptyPassword,
        );
        Vue.set(
          this.showErrors,
          'passwordMinLength',
          this.showErrors && !!errors && errors.passwordMinLength,
        );
        Vue.set(
          this.showErrors,
          'passwordMaxLength',
          this.showErrors && !!errors.passwordMaxLength,
        );

        passedValidate = false;
      }
      return passedValidate;
    },
  },
  watch: {
    'loginInput.email'() {
      Vue.set(this.showErrors, 'emptyEmail', null);
      Vue.set(this.showErrors, 'invalidEmail', null);
      this.disabledLogin = false;
      this.clearErrorMessage();
    },
    'loginInput.password'() {
      Vue.set(this.showErrors, 'emptyPassword', false);
      Vue.set(this.showErrors, 'passwordMinLength', false);
      Vue.set(this.showErrors, 'passwordMaxLength', false);
      this.clearErrorMessage();
      this.disabledLogin = false;
    },
  },
  created() {
    this.clearErrorMessage();
  },
  components: {
    Navigation,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/style.scss';
.login {
  text-align: center;
  height: 100vh;
  background-image: linear-gradient(
      rgba(29, 28, 28, 0.6),
      rgba(36, 35, 35, 0.6)
    ),
    url('https://shrm.pace.edu.vn/CMSFileManager/files/10/10f300de-0edc-449d-9959-0b4535664720.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
    width: $login_width;
    min-height: $login_width;
    padding: 30px;
    background-color: #fff;
    border: 1px solid rgb(224, 210, 210);
    h4 {
      text-transform: uppercase;
      margin-bottom: 20px;
      text-align: center;
    }
    form {
      width: 100%;
      input {
        padding: 12px;
        width: 100%;
        border: 1px solid rgb(170, 167, 167);
        border-radius: 50px;
        background-color: none;
      }
      button {
        background-color: $color;
        border: 1px solid $color;
        width: 100%;
        padding: 5px;
        border-radius: 50px;
        color: white;
        margin-top: 30px;
      }
      a {
        text-decoration: none;
        color: $color;
        font-size: 12px;
        font-weight: bolder;
      }
      span {
        margin: 0;
        padding: 0;
      }
    }
  }
}
button,
input {
  height: $inputHeight;
  margin: 10px 0 2px;
}
.errors {
  text-align: start;
  margin-left: 5px;
  font-size: 100%;
}
</style>
