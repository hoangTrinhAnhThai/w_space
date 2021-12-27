<template>
  <v-main>
    <div class="profile">
      <v-row>
        <v-col cols="3" class="avatar">
          <v-row center>
            <img v-if="avatar" :src="avatar" />
            <img v-else-if="userInfo.avatar" :src="userInfo.avatar" alt="" />
            <v-avatar v-else color="red">
              <span class="white--text text-h5"
                >{{ userInfo.firstName.charAt(0)
                }}{{ userInfo.lastName.charAt(0) }}</span
              >
            </v-avatar>
          </v-row>
          <v-row>
            <i class="bx bx-camera" v-on:click="handleClickInputFile"></i>
            <br />
            <input
              type="file"
              accept="image/*"
              @change="onFileChange"
              ref="fileInputAvt"
              style="display: none"
            />
          </v-row>
          <v-row v-if="avatar">
            <v-btn class="save-btn" @click="saveAvt"> Save </v-btn>
          </v-row>
        </v-col>
        <v-col cols="9">
          <v-row>
            <h1>ACCOUNT SETTING</h1>
            <v-row>
              <v-col cols="3">
                <label for="email">Email</label>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  disabled
                  outlined
                  dense
                  v-model="userInfo.email"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <label for="firstName">First name</label>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  outlined
                  dense
                  v-model="userInfo.firstName"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <label for="lastName">Last name</label>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  outlined
                  dense
                  v-model="userInfo.lastName"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <v-btn class="save-btn" @click="changeInf">
                  Save changes
                </v-btn>
              </v-col>
            </v-row>
          </v-row>

          <v-row>
            <h1>CHANGES PASSWORD</h1>
            <v-row class="password">
              <v-col cols="3">
                <v-row>
                  <label for="current">Current Password</label>
                </v-row>
                <v-row>
                  <v-text-field
                    outlined
                    dense
                    v-model="password.oldPassword"
                    type="password"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <p v-show="showErrors.emptyPassword" class="errors">
                    Old password is required
                  </p>
                  <p v-show="showErrors.oldPasswordMinLength" class="errors">
                    Old password must have at least 6 letters
                  </p>
                  <p v-show="showErrors.oldPasswordMaxLength" class="errors">
                    Old password must have at most 255 letters
                  </p>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-row>
                  <label for="current">New Password</label>
                </v-row>
                <v-row>
                  <v-text-field
                    outlined
                    dense
                    v-model="password.newPassword"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <p v-show="showErrors.emptyNewPassword" class="errors">
                    New password is required
                  </p>
                  <p v-show="showErrors.newPasswordMinLength" class="errors">
                    New password must have at least 6 letters
                  </p>
                  <p v-show="showErrors.newPasswordMaxLength" class="errors">
                    New password must have at most 255 letters
                  </p>
                  <p v-show="showErrors.cofirmationNotMatch" class="errors">
                    The Confirm Password confirmation dose not match
                  </p>
                  <p
                    v-show="showErrors.oldPassWordBeSameNewPassword"
                    class="errors"
                  >
                    Your new password cannot be the same as your current
                    password
                  </p>
                </v-row>
              </v-col>
              <v-col cols="3">
                <v-row>
                  <label for="current">Current Password</label>
                </v-row>
                <v-row>
                  <v-text-field
                    outlined
                    dense
                    v-model="password.confirmPassword"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <p v-show="showErrors.emptyConfirmPassword" class="errors">
                    Confirm password is required
                  </p>
                  <p
                    v-show="showErrors.confirmPasswordMinLength"
                    class="errors"
                  >
                    Confirm password must have at least 6 letters
                  </p>
                  <p
                    v-show="showErrors.confirmPasswordMaxLength"
                    class="errors"
                  >
                    Confirm password must have at most 255 letters
                  </p>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <v-btn class="save-btn" @click="changePassword">
                  SAVE CHANGES
                </v-btn>
              </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-main>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import Vue from 'vue';
export default {
  name: 'user-account',
  data() {
    return {
      password: {
        oldPassword: null,
        confirmPassword: null,
        newPassword: null,
      },
      isloaded: false,
      avatar: '',
      disabledChangeInfo: false,
      showErrors: {},
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'USER/userInfo',
      userInfoAuth: 'AUTH/userInfo',
      validationInformation: 'VALIDATION/validationInformation',
      validationPassword: 'VALIDATION/validationPassword',
    }),
  },
  methods: {
    ...mapActions({
      changeAvatarAction: 'USER/changeAvatar',
      editUser: 'USER/editUser',
      updatePassword: 'USER/updatePassword',
      addIsLoading: 'ERROR/addIsLoading',
      getUser: 'USER/getUser',
    }),
    changeInf() {
      if (!this.validatedChangeInfoBeforeSubmit()) {
        this.disabledChangeInfo = true;
        return;
      } else {
        this.editUser({
          id: this.userInfo._id,
          user: {
            lastName: this.userInfo.lastName,
            firstName: this.userInfo.firstName,
          },
        });
      }
    },
    changePassword() {
      if (!this.validatedPasswordBeforeSubmit()) {
        this.disabledChangeInfo = true;
        return;
      } else {
        this.updatePassword(this.password);
      }
    },
    handleClickInputFile() {
      this.$refs.fileInputAvt.click();
    },
    onFileChange(e) {
      this.isDisableButton = true;
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('upload_preset', 'wfcqkljk');
      this.addIsLoading(true);
      axios
        .post(
          'https://api.cloudinary.com/v1_1/dj5xafymg/image/upload',
          formData,
        )
        .then((response) => {
          this.avatar = response.data.url;
          this.isDisableButton = false;
          this.addIsLoading(false);
        })
        .catch(() => {
          this.addIsLoading(false);
        });
    },
    saveAvt() {
      this.editUser({ id: this.userInfo._id, user: { avatar: this.avatar } });
    },
    validatedChangeInfoBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validationInformation(this.userInfo);
      if (errors) {
        Vue.set(
          this.showErrors,
          'emptyLastName',
          this.showErrors && !!errors && errors.emptyLastName,
        );
        Vue.set(
          this.showErrors,
          'emptyFirstName',
          this.showErrors && !!errors && errors.emptyFirstName,
        );
        passedValidate = false;
      }
      return passedValidate;
    },
    validatedPasswordBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validationPassword(this.password);
      if (errors) {
        Vue.set(
          this.showErrors,
          'emptyPassword',
          this.showErrors && !!errors && errors.emptyPassword,
        );
        Vue.set(
          this.showErrors,
          'oldPasswordMinLength',
          this.showErrors && !!errors && errors.oldPasswordMinLength,
        );
        Vue.set(
          this.showErrors,
          'oldPasswordMaxLength',
          this.showErrors && !!errors && errors.oldPasswordMaxLength,
        );
        Vue.set(
          this.showErrors,
          'emptyNewPassword',
          this.showErrors && !!errors && errors.emptyNewPassword,
        );
        Vue.set(
          this.showErrors,
          'newPasswordMinLength',
          this.showErrors && !!errors && errors.newPasswordMinLength,
        );
        Vue.set(
          this.showErrors,
          'newPasswordMaxLength',
          this.showErrors && !!errors && errors.newPasswordMaxLength,
        );
        Vue.set(
          this.showErrors,
          'emptyConfirmPassword',
          this.showErrors && !!errors && errors.emptyConfirmPassword,
        );
        Vue.set(
          this.showErrors,
          'confirmPasswordMinLength',
          this.showErrors && !!errors && errors.confirmPasswordMinLength,
        );
        Vue.set(
          this.showErrors,
          'confirmPasswordMaxLength',
          this.showErrors && !!errors && errors.confirmPasswordMaxLength,
        );
        Vue.set(
          this.showErrors,
          'oldPassWordBeSameNewPassword',
          this.showErrors && !!errors && errors.oldPassWordBeSameNewPassword,
        );
        Vue.set(
          this.showErrors,
          'cofirmationNotMatch',
          this.showErrors && !!errors && errors.cofirmationNotMatch,
        );
        passedValidate = false;
      }
      return passedValidate;
    },
  },
  watch: {
    'userInfo.userDetail'() {
      Vue.set(this.showErrors, 'emptyNameUserDetail', null);
      this.disabledChangeInfo = false;
    },
    'userInfo.userDetail.nameUserDetail'() {
      Vue.set(this.showErrors, 'emptyNameUserDetail', null);
      Vue.set(this.showErrors, 'nameUserDetailMaxLength', null);
      this.disabledChangeInfo = false;
    },
    'userInfo.userDetail.phoneNumber'() {
      Vue.set(this.showErrors, 'emptyBirth', null);
      this.disabledChangeInfo = false;
    },
    'userInfo.userDetail.birth'() {
      Vue.set(this.showErrors, 'emptyPhoneNumber', null);
      this.disabledChangeInfo = false;
    },
    'password.oldPassword'() {
      Vue.set(this.showErrors, 'emptyPassword', null);
      Vue.set(this.showErrors, 'oldPasswordMinLength', null);
      Vue.set(this.showErrors, 'oldPasswordMaxLength', null);
      Vue.set(this.showErrors, 'oldPassWordBeSameNewPassword', null);
      Vue.set(this.showErrors, 'cofirmationNotMatch', null);
      this.disabledPassword = false;
    },
    'password.newPassword'() {
      Vue.set(this.showErrors, 'emptyNewPassword', null);
      Vue.set(this.showErrors, 'newPasswordMinLength', null);
      Vue.set(this.showErrors, 'newPasswordMaxLength', null);
      Vue.set(this.showErrors, 'oldPassWordBeSameNewPassword', null);
      Vue.set(this.showErrors, 'cofirmationNotMatch', null);
      this.disabledPassword = false;
    },
    'password.confirmPassword'() {
      Vue.set(this.showErrors, 'emptyConfirmPassword', null);
      Vue.set(this.showErrors, 'confirmPasswordMinLength', null);
      Vue.set(this.showErrors, 'confirmPasswordMaxLength', null);
      Vue.set(this.showErrors, 'oldPassWordBeSameNewPassword', null);
      Vue.set(this.showErrors, 'cofirmationNotMatch', null);
      this.disabledPassword = false;
    },
  },
  created() {
    this.getUser(this.userInfoAuth._id);
  },
};
</script>
<style scoped>
.profile {
  width: 95%;
  margin: 20px auto;
  height: 100vh;
}

.avatar .row {
  margin: 0 auto;
}

.password .col {
  margin: 0 auto 0 0;
}

.password .v-text-field {
  width: 80%;
}

.password .row {
  margin: 5px 0;
}
.save-btn {
  margin-top: -15px;
}

h1 {
  margin-top: 20px;
}
label {
  font-size: 0.875em;
}
img,
.v-avatar {
  width: 220px !important;
  height: 200px !important;
  border-radius: 50%;
}

i {
  font-size: 30px;
  margin: 20px auto;
  width: 100%;
  padding-left: 90px;
}
.avatar .v-btn {
  width: 220px;
}
</style>
