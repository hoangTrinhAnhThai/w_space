<template>
  <div class="content">
    <task-detail :task="item" ref="taskDetailModal"></task-detail>
    {{ item.name }}
    <span class="open-button" id="open-task-table-cell">
      <v-btn depressed @click="openTask">
        <v-icon>mdi-arrow-top-right-bottom-left</v-icon> Open
      </v-btn>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TaskDetail from "../modal/TaskDetail.vue";

export default {
  props: {
    item: {
      type: Object,
    },
  },
  components: {
    TaskDetail,
  },
  methods: {
    ...mapActions({
      deleteTaskAction: "TASK/deleteTask",
      getLogtimes: "PROJECT/getLogtimes",
      addCurrentTask: "TASK/addCurrentTask",
      getCommentByIdTask: "TASK/getCommentByIdTask",
      getChecklistByIdTask: "TASK/getChecklistByIdTask",
    }),
    openTask() {
      this.getCommentByIdTask(this.item._id);
      this.addCurrentTask(this.item);
      this.getLogtimes(this.item._id);
      this.getChecklistByIdTask(this.item._id);
      this.$refs.taskDetailModal.show();
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  height: 100%;
  padding: 5px 0;
}

.open-button {
  position: absolute;  
  right: 0;
  bottom: 0;
}
.v-btn {
  font-size: 10px !important;
  padding: 0 !important;
}
.v-icon {
  font-size: 12px !important;
  top: -1px;
  margin-right: 3px;
}

.content .v-btn:not(.v-btn--round).v-size--default {
  height: 25px;
}
</style>