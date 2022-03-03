<template>
  <v-card>
    <v-text-field
      class="mx-4"
      v-model.trim="checklistName"
      label="Name"
      v-on:keyup="addtaskFormByKey"
      rows="1"
      id="content"
    ></v-text-field>
    <span class="errors" v-if="errorMessage"> {{ errorMessage }} <br /> </span>
    <v-card-actions>
      <v-btn color="blue-grey lighten-2" text @click="closeAddtaskForm">
        Cancel
      </v-btn>
      <v-btn class="save-btn" text @click="addtaskForm"> Add </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'AddNewChecklist',
  props: {
    idTask: String,
  },
  data() {
    return {
      loading: false,
      checklistName: '',
    };
  },
  computed: {
    ...mapGetters({
      currentProject: 'PROJECT/currentProject',
      validateText: 'VALIDATION/validateText',
      errorMessage: 'ERROR/errorMessage',
    }),
  },
  methods: {
    ...mapActions({
      addChecklistAction: 'TASK/addChecklist',
    }),
    addtaskForm() {
      if (!this.validateBeforeSubmit()) {
        document.getElementById('content').focus();
        return;
      } else {
        this.addChecklistAction({
          name: { name: this.checklistName },
          idTask: this.idTask,
          idProject: this.currentProject._id,
        });
        this.$emit('closeAddtaskForm');
        this.checklistName = '';
      }
    },
    addtaskFormByKey(e) {
      console.log(e);
      if (e.keyCode === 13) {
        if (!this.validateBeforeSubmit()) {
          document.getElementById('content').focus();
          return;
        } else {
          this.addChecklistAction({
            name: { name: this.checklistName },
            idTask: this.idTask,
            idProject: this.currentProject._id,
          });
          this.$emit('closeAddtaskForm');
          this.checklistName = '';
        }
      }
    },
    closeAddtaskForm() {
      this.$emit('closeAddtaskForm');
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateText(this.checklistName);
      if (errors) {
        passedValidate = false;
      }
      return passedValidate;
    },
  },
  watch: {
    checklistName() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.v-card {
  width: 96%;
  padding: 10px 0;
}
.v-btn {
  font-size: 10px !important;
  margin-left: 15px;
}
</style>
