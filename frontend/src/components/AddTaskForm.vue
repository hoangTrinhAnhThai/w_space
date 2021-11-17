<template>
  <div class="add-task-form">
    <textarea
      type="text"
      placeholder="Enter a title ..."
      v-model.trim="newTask.name"
      wrap="soft"
      style="overflow: hidden; resize: none"
    >
    </textarea>
    <div class="errorMessage">
      {{ errorMessage }}
    </div>
    <div class="add">
      <button type="reset" @click="closeAddtaskForm">Cancel</button>
      <button type="submit" @click="addtaskForm">Add</button>
    </div>
  </div>
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
      },
      errorMessage: '',
    };
  },
  computed: {
    ...mapGetters({
      idProject: 'TASKS/idProject',
    }),
  },
  methods: {
    ...mapActions({
      addNewTaskAction: 'TASKS/addNewTask',
    }),
    addtaskForm() {
      this.addNewTaskAction({ task: this.newTask, idProject: this.idProject });
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
.add-task-form {
  margin: 15px;
  padding: 8px;
  border: 1px solid rgb(214, 212, 212);
  border-radius: 5px;
  line-height: 25px;
  cursor: pointer;
  min-height: 100px;
  textarea {
    width: 100%;
    border: none;
    outline: none;
  }
  button {
    border: 1px solid rgb(185, 184, 184);
    margin-right: 10px;
    background-color: #fff;
    padding: 3px 5px;
    font-size: 11px;
    border-radius: 5px;
    color: rgb(100, 99, 99);
  }
}
</style>
