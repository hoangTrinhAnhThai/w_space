<template>
  <div class="add-task-form">
    <form method="post">
      <textarea
        type="text"
        placeholder="Enter a title ..."
        v-model.trim="newTask.title"
        wrap="soft"
        style="overflow: hidden; resize: none"
      >
      </textarea>
      <div class="errorMessage">
        {{ errorMessage }}
      </div>
      <div class="add">
        <button type="reset">Cancel</button>
        <button type="submit">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddTaskForm',
  props: {
    statusId: Number,
  },
  data() {
    return {
      newTask: {
        title: '',
        description: '',
        statusId: null,
      },
      errorMessage: '',
    };
  },
  mounted() {
    this.newTask.statusId = this.statusId;
    this.$nextTick(() => {
      this.$el.setAttribute(
        'style',
        'height:' + this.$el.scrollHeight + 'px;overflow-y:hidden;',
      );
      this.$el.addEventListener('input', this.resizeTextarea);
    });
  },
  methods: {
    resizeTextarea(event) {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + 'px';
    },
  },
};
</script>

<style lang="scss" scoped>
.add-task-form {
  background-color: rgb(59, 177, 85);
  margin: 15px;
  padding: 8px;
  border: 1px solid rgb(214, 212, 212);
  border-radius: 5px;
  line-height: 25px;
  cursor: pointer;
  min-height: 100px;
  textarea {
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
