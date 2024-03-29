<template>
  <v-main>
    <navigation />
    <div class="register">
      <div class="container">
        <h5>Create an Account</h5>
        <form @submit.prevent="register">
          <div class="form-group email">
            <input
              v-model="registerInput.email"
              class="form-control"
              type="text"
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
              v-model="registerInput.firstName"
              class="form-control"
              type="text"
              placeholder="First name"
            />
            <div class="errors">
              <p v-show="showErrors.emptyFirstName" class="errors">
                FirstName is required
              </p>
            </div>
          </div>
          <div class="form-group">
            <input
              v-model="registerInput.lastName"
              class="form-control"
              type="text"
              placeholder="Last name"
            />
            <div class="errors">
              <p v-show="showErrors.emptyLastName" class="errors">
                LastName is required
              </p>
            </div>
          </div>
          <div class="form-group">
            <input
              v-model="registerInput.password"
              class="form-control"
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
            </div>
          </div>
          <div class="form-group">
            <input
              v-model="registerInput.confirmPassword"
              class="form-control"
              type="password"
              placeholder="Confirm password"
            />
            <div class="errors">
              <p v-show="showErrors.emptyConfirmPassword" class="errors">
                Confirm Password is required
              </p>
              <p v-show="showErrors.confirmPasswordMinLength" class="errors">
                Confirm Password must have at least 6 letters
              </p>
              <p v-show="showErrors.confirmPasswordMaxLength" class="errors">
                Confirm Password must have at most 255 letters
              </p>
              <p
                v-show="showErrors.confirmPasswordNotSamePassword"
                class="errors"
              >
                The Confirm Password confirmation dose not match
              </p>
            </div>
          </div>
          <div class="signup">
            <button :disabled="disabledRegister" type="submit">Continue</button>
          </div>
          <div class="signin">
            <span>Already have an account? </span>
            <span><router-link to="/login">Sign in</router-link></span>
          </div>
        </form>
      </div>
    </div>
  </v-main>
</template>

<script>
import Navigation from '../../components/Navigation.vue';

import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
export default {
  data() {
    return {
      registerInput: {
        password: '',
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: '',
      },
      disabledRegister: false,
      showErrors: {},
    };
  },
  computed: {
    ...mapGetters({
      validateRegister: 'VALIDATION/validateRegister',
      errorMessage: 'ERROR/errorMessage',
    }),
  },
  methods: {
    ...mapActions({
      clearErrorMessage: 'ERROR/clearErrorMessage',
      registerAction: 'AUTH/register',
    }),
    register() {
      if (!this.validateBeforeSubmit()) {
        this.disabledRegister = true;
        return;
      } else {
        this.registerAction(this.registerInput);
      }
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateRegister(this.registerInput);
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
          'emptyFirstName',
          this.showErrors && !!errors && errors.emptyFirstName,
        );
        Vue.set(
          this.showErrors,
          'emptyLastName',
          this.showErrors && !!errors && errors.emptyLastName,
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
        Vue.set(
          this.showErrors,
          'emptyConfirmPassword',
          this.showErrors && !!errors && errors.emptyConfirmPassword,
        );
        Vue.set(
          this.showErrors,
          'ConfirmPasswordMinLength',
          this.showErrors && !!errors && errors.confirmPasswordMinLength,
        );
        Vue.set(
          this.showErrors,
          'ConfirmPasswordMaxLength',
          this.showErrors && !!errors.confirmPasswordMaxLength,
        );
        Vue.set(
          this.showErrors,
          'confirmPasswordNotSamePassword',
          this.showErrors && !!errors.confirmPasswordNotSamePassword,
        );
        passedValidate = false;
      }
      return passedValidate;
    },
  },
  watch: {
    'registerInput.email'() {
      Vue.set(this.showErrors, 'emptyEmail', null);
      Vue.set(this.showErrors, 'invalidEmail', null);
      this.disabledRegister = false;
      this.clearErrorMessage();
    },
    'registerInput.password'() {
      Vue.set(this.showErrors, 'emptyPassword', null);
      Vue.set(this.showErrors, 'passwordMinLength', null);
      Vue.set(this.showErrors, 'passwordMaxLength', null);
      this.disabledRegister = false;
      this.clearErrorMessage();
    },
    'registerInput.confirmPassword'() {
      Vue.set(this.showErrors, 'emptyConfirmPassword', null);
      Vue.set(this.showErrors, 'confirmPasswordMinLength', null);
      Vue.set(this.showErrors, 'confirmPasswordMaxLength', null);
      Vue.set(this.showErrors, 'confirmPasswordNotSamePassword', null);
      this.disabledRegister = false;
      this.clearErrorMessage();
    },
    'registerInput.firstName'() {
      Vue.set(this.showErrors, 'emptyFirstName', null);
      this.disabledRegister = false;
      this.clearErrorMessage();
    },
    'registerInput.lastName'() {
      Vue.set(this.showErrors, 'emptyLastName', null);
      this.disabledRegister = false;
      this.clearErrorMessage();
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
.register {
  background-image: linear-gradient(
      rgba(29, 28, 28, 0.6),
      rgba(36, 35, 35, 0.6)
    ),
    url('https://shrm.pace.edu.vn/CMSFileManager/files/10/10f300de-0edc-449d-9959-0b4535664720.png');
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    margin: 80px 0 20px;
    width: $login_width;
    padding: 30px;
    background-color: #fff;
    border: 1px solid rgb(224, 210, 210);
    h5 {
      text-transform: uppercase;
      text-align: center;
    }
    form {
      width: 100%;
      .signin {
        display: flex;
        justify-content: center;
      }
      input {
        padding: 5px 15px;
        border: 1px solid rgb(170, 167, 167);
        border-radius: 50px;
        background-color: none;
        margin-top: 10px;
        margin-bottom: 0;
      }
      .birthSelect {
        border-radius: 50px;
        border: 1px solid rgb(170, 167, 167);
        padding: 2px;
        margin-top: 10px;
      }
      label {
        color: rgb(71, 67, 67);
        font-size: 13px;
      }
      button {
        background-color: $color;
        border: 1px solid $color;
        width: 100%;
        padding: 5px;
        border-radius: 50px;
        color: white;
      }
      a {
        text-decoration: none;
        color: $color;
        font-weight: bolder;
        font-size: 14px;
      }
      .term {
        display: flex;
        font-size: 12px;
        align-items: center;
        .radio {
          padding: 0;
          height: 15px;
          flex-basis: 15%;
        }
      }
      span {
        font-size: 12px;
      }
    }
  }
}
button,
input {
  height: $inputHeight;
  margin: 2px 0 10px;
}
::placeholder {
  font-size: 12px;
}
.errors {
  text-align: start;
  margin-left: 5px;
  font-size: 85%;
}
</style>
