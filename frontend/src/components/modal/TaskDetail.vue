<template>
  <b-modal
    ref="taskDetailModal"
    hide-footer
    :title="task.name"
    
    class="task-detail"
    size="lg md"
  >
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col class="block" cols="8">
          <v-row>
            <v-text-field :disabled="isEdit" v-model="task.name"></v-text-field>
          </v-row>
          <v-row align="center">
            <v-textarea
            :disabled="isEdit"
              class="mx-2"
              v-model="task.description"
              label="Description"
              rows="2"
            ></v-textarea>
          </v-row>
          <v-row class="comment">
            <v-col class="comment-text" cols="11">
              <v-text-field
                class="mx-2"
                label="Comment"
                rows="1"
                v-on:keyup="sendCommentByKey"
                id="content"
                v-model="comment"
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="comment-btn">
              <v-btn class="cmt-btn" text style="border: none">
                <v-icon  @click="sendComment" color="blue darken-2">
                  mdi-message-text
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <template v-for="comment in comments">
              <v-list-item :key="comment._id">
                <v-list-item-avatar>
                  <v-avatar color="green">
                    <span class="white--text text-h5">{{
                      comment.createdBy.avatar
                    }}</span>
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="comment.createdBy.firstName"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="comment.content"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-row>
        </v-col>
        <v-col class="block" cols="17">
          <v-row align="center">
            <v-select
            :disabled="isEdit"
              v-model="task.assigned"
              :items="listMember"
              chips
              label="Assigned"
              item-text="email"
              item-value="_id"
              clearable
              small-chips
            ></v-select>
          </v-row>
          <v-row align="center">
            <v-select
            :disabled="isEdit"
              v-model="task.priority"
              chips
              label="Priority"
              clearable
              small-chips
              :items="priorities"
            >
            </v-select>
          </v-row>
          <v-row align="center">
            <v-spacer></v-spacer>
            <v-col cols="24">
              <v-row>
                <label for="">Due date</label>
              </v-row>
              <v-row>
                <DatePicker
                :disabled="isEdit"
                  v-model="date"
                  :clearable="false"
                  class="datepicker"
                />
              </v-row>
            </v-col>
            <div class="due-date"></div>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="btn-row">
        <v-col>
          <v-btn
            color="green darken-1"
            text
            width="80"
            @click="hide"
            style="margin-left: 15px"
          >
            Close
          </v-btn>
          <v-btn
            class="save-btn"
            color="blue darken-1"
            text
            width="80"
            @click="changeTaskDetail"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </b-modal>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'task-detail',
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      date: this.task.dueDate ? new Date(this.task.dueDate) : new Date(),
      priorities: ['high', 'normal', 'low'],
      comment: '',
    };
  },
  computed: {
    ...mapGetters({
      logtimes: 'TASKS/logtimes',
      currentProject: 'TASKS/currentProject',
      currentTask: 'TASKS/currentTask',
      validateText: 'VALIDATION/validateText',
      comments: 'TASKS/comments',
            userInfo: 'AUTH/userInfo',

    }),
    listMember() {
      let list = [];
      list.push(this.currentProject.createdBy);
      if (
        this.currentProject.members &&
        this.currentProject.members.length > 0
      ) {
        for (let member of this.currentProject.members) {
          list.push(member);
        }
      }
      return list;
    },
    isEdit() {
      let isEdit = true
      if(this.userInfo._id == this.currentProject.createdBy._id) {
        isEdit = false
      }
      return isEdit
    }
  },
  methods: {
    ...mapActions({
      editTaskAction: 'TASKS/editTask',
      addCommentAction: 'TASKS/addComment',
    }),
    show() {
      this.$refs.taskDetailModal.show();
    },
    hide() {
      this.$refs.taskDetailModal.hide();
    },
    changeTaskDetail() {
      this.task.dueDate = this.date;
      this.editTaskAction({
        idTask: this.task._id,
        idProject: this.currentProject._id,
        task: this.task,
      });
      this.hide();
    },
    sendCommentByKey(e) {
      if (e.keyCode === 13) {
        if (!this.validateBeforeSubmit()) {
          document.getElementById('content').focus();
          return;
        } else {
          this.addCommentAction({
            idTask: this.task._id,
            idProject: this.currentProject._id,
            comment: { content: this.comment },
          });
          this.comment = '';
        }
      }
    },
    sendComment() {
      if (!this.validateBeforeSubmit()) {
        document.getElementById('content').focus();
        return;
      } else {
        this.addCommentAction({
          idTask: this.task._id,
          idProject: this.currentProject._id,
          comment: { content: this.comment },
        });
        this.comment = '';
      }
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateText(this.comment);
      if (errors) {
        passedValidate = false;
      }
      return passedValidate;
    },
  },
  components: {
    DatePicker,
  },
};
</script>

<style scoped>
.datepicker {
  width: 100% !important;
}
.datepicker:disabled {
  background-color: red !important;
}

.v-list-item__content {
  margin-left: 20px !important;
}

.comment {
  position: relative;
}
.comment-btn {
  width: 100%;
  position: absolute;
  top: 9px;
  right: 30px;
}

.btn-row .v-btn {
  float: right;
}
.v-avatar {
  background-color: green !important;
}
.theme--light.v-input--is-disabled {
  color: rgb(206, 93, 93) !important;
}
.mx-input:disabled, .mx-input.disabled {
  color: green !important;
  background-color: #f3f3f3
}
</style>
