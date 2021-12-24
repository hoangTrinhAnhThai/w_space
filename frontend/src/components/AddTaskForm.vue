<template>
  <v-card>
    <v-text-field
      class="mx-4"
      v-model.trim="newTask.name"
      label="Name"
      v-on:keyup="addtaskFormByKey"
      rows="1"
      id="content"
    ></v-text-field>
    <v-card-actions>
      <v-btn color="blue-grey lighten-2" text @click="closeAddtaskForm">
        Cancel
      </v-btn>
      <v-btn
        class="save-btn"
        color="rgb(39, 102, 120)"
        text
        @click="addtaskForm"
      >
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'AddTaskForm',
  props: {
    statusId: Number,
  },
  data() {
    return {
      newTask: {
        name: '',
        priority: '',
        dueDate: '',
        member: [],
      },
      errorMessage: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      currentProject: 'TASKS/currentProject',
      validateText: 'VALIDATION/validateText',
    }),
  },
  methods: {
    ...mapActions({
      addNewTaskAction: 'TASKS/addNewTask',
    }),
    addtaskForm() {
      this.loading = true;
      if (!this.validateBeforeSubmit()) {
        document.getElementById('content').focus();
        return;
      } else {
        setTimeout(() => (this.loading = false), 2000);
        this.addNewTaskAction({
          task: this.newTask,
          idProject: this.currentProject._id,
        });
        this.$emit('closeAddtaskForm');
        this.newTask.name = '';
      }
    },
    addtaskFormByKey(e) {
      if (e.keyCode === 13) {
        if (!this.validateBeforeSubmit()) {
          document.getElementById('content').focus();
          return;
        } else {
          setTimeout(() => (this.loading = false), 2000);
          this.addNewTaskAction({
            task: this.newTask,
            idProject: this.currentProject._id,
          });
          this.$emit('closeAddtaskForm');
          this.newTask.name = '';
        }
      }
    },
    closeAddtaskForm() {
      this.$emit('closeAddtaskForm');
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateText(this.newTask.name);
      if (errors) {
        passedValidate = false;
      }
      return passedValidate;
    },
  },
  watch: {
    'newTask.name'() {
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
