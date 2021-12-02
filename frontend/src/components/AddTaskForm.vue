<template>
  <v-card :loading="loading" >
    <v-textarea
      class="mx-4"
      v-model.trim="newTask.name"
      label="Name"
      rows="1"
    ></v-textarea>
    <v-card-actions>
      <v-btn color="blue-grey lighten-3" text @click="closeAddtaskForm">
        Cancel
      </v-btn>
      <v-btn color="rgb(39, 102, 120)" text @click="addtaskForm">
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
    }),
  },
  methods: {
    ...mapActions({
      addNewTaskAction: 'TASKS/addNewTask',
    }),
    addtaskForm() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
      this.addNewTaskAction({
        task: this.newTask,
        idProject: this.currentProject._id,
      });
      this.$emit('closeAddtaskForm');
      this.newTask.name = '';
    },
    closeAddtaskForm() {
      this.$emit('closeAddtaskForm');
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
