<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <v-textarea
      class="mx-2"
      v-model.trim="newTask.name"
      label="Name"
      rows="1"
    ></v-textarea>
    <v-card-actions>
      <v-btn color="blue-grey lighten-3" text @click="closeAddtaskForm">
        Cancel
      </v-btn>
      <v-btn color="deep-purple lighten-2" text @click="addtaskForm">
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

<style lang="scss" scoped>
// .add-task-form {
//   margin: 15px;
//   padding: 8px;
//   border: 1px solid rgb(214, 212, 212);
//   border-radius: 5px;
//   line-height: 25px;
//   cursor: pointer;
//   min-height: 100px;
//   textarea {
//     width: 100%;
//     border: none;
//     outline: none;
//   }
//   button {
//     border: 1px solid rgb(185, 184, 184);
//     margin-right: 10px;
//     background-color: #fff;
//     padding: 3px 5px;
//     font-size: 11px;
//     border-radius: 5px;
//     color: rgb(100, 99, 99);
//   }
// }
</style>
