<template>
  <b-modal
    ref="taskDetailModal"
    hide-footer
    :title="task.name"
    class="task-detail"
    size="lg md"
    scrollable
  >
    <v-form ref="form" lazy-validation>
      <v-row>
        <v-col class="block1" cols="8">
          <label style="margin-top: 0" for="">
            <v-icon>mdi-ballot-outline</v-icon> Title</label
          >
          <v-row>
            <v-text-field
              class="mx-2"
              :disabled="isEdit"
              v-model="task.name"
            ></v-text-field>
          </v-row>
          <label for=""
            ><v-icon>mdi-format-align-left</v-icon> Description</label
          >
          <v-row align="center">
            <v-textarea
              :disabled="isEdit"
              class="mx-2"
              v-model="task.description"
              rows="1"
            ></v-textarea>
          </v-row>
          <div v-if="checklists.length > 0">
            <label for="">
              <v-icon> mdi-checkbox-multiple-marked-outline</v-icon>
              Checklist
            </label>
            <v-row style="margin-top: 0px; margin-left: 15px">
              <v-list
                subheader
                flat
                v-for="(checklist, index) in checklists"
                :key="index"
              >
                <v-app-bar class="checklist-header">
                  <v-subheader>
                    <v-icon style="font-size: 15px; margin-right: 5px"
                      >mdi-format-list-checkbox
                    </v-icon>
                    {{ checklist.name }}</v-subheader
                  >
                  <v-spacer></v-spacer>
                  <i class='bx bx-edit-alt'></i>
                  <i
                    class="bx bx-trash"
                    @click="deleteChecklist(checklist._id)"
                  ></i>
                </v-app-bar>
                <v-list-item-group multiple class="checklist-sub">
                  <v-list-item
                    v-for="(item, index) in checklist.items"
                    :key="index"
                  >
                    <template>
                      <v-list-item-action>
                        <input type="checkbox" 
                          id="checkbox" 
                          @change="check(item)" v-model="item.isDone"
                        >
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title :class="{ active: item.isDone }">{{ item.name }} {{item.isDone}}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                  <v-btn
                    @click="showChecklistItem(index)"
                    v-if="!(isShowChecklistItem == `${index}`)"
                    style="
                      font-size: 10px !important;
                      height: 32px !important;
                      margin-left: 15px !important;
                    "
                    text
                    class="mx-2"
                    >Add item</v-btn
                  >
                  <div
                    class="add-item"
                    v-if="isShowChecklistItem == `${index}`"
                  >
                    <v-text-field
                      outlined
                      id="content-checklist"
                      :disabled="isEdit"
                      v-model="itemName"
                    ></v-text-field>
                    <v-btn
                      style="
                        font-size: 10px !important;
                        height: 32px !important;
                        margin-right: 10px;
                      "
                      text
                      @click="addChecklistItem(checklist._id)"
                      >Add</v-btn
                    >
                    <i
                      class="bx bx-x"
                      style="font-size: 20px; position: relative; top: 5px"
                      @click="isShowChecklistItem = null"
                    ></i>
                  </div>
                </v-list-item-group>
              </v-list>
            </v-row>
          </div>

          <label for=""
            ><v-icon>mdi-format-list-checkbox</v-icon> Activities</label
          >
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
                <v-icon @click="sendComment" color="blue darken-2">
                  mdi-message-text
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <template v-for="comment in comments">
              <v-list-item :key="comment._id">
                <v-list-item-avatar>
                  <img
                    class="image"
                    v-if="comment.createdBy.avatar"
                    :src="comment.createdBy.avatar"
                  />
                  <v-avatar color="green" v-else>
                    <span class="white--text text-h5"
                      >{{ comment.createdBy.firstName.charAt(0) }}
                      {{ comment.createdBy.lastName.charAt(0) }}</span
                    >
                  </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ comment.createdBy.firstName }}
                    {{ comment.createdBy.lastName }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-html="comment.content"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-row>
        </v-col>
        <v-col class="block2" cols="17">
          <v-row align="center">
            <v-select
              :disabled="isEdit"
              v-model="task.assigned"
              :items="listMember"
              chips
              label="Assigned"
              item-text="firstName"
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
          <v-row align="center" class="checklist">
            <v-btn
              class="checklist-btn"
              @click="isShowChecklist = true"
              style="position: relative; width: 90%; margin: 0 auto"
              text
              >Checklist</v-btn
            >
            <AddChecklist
              class="add-checklist"
              v-on:closeAddtaskForm="closeAddtaskForm"
              v-bind:idTask="task._id"
              v-show="isShowChecklist"
            />
          </v-row>
          <v-row align="center">
            <v-col cols="24">
              <label style="margin-bottom: 10px" for="">Due date</label>
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
            v-show="!isEdit"
          >
            Save
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </b-modal>
</template>

<script>
import DatePicker from "vue2-datepicker";
import { mapActions, mapGetters } from "vuex";
import AddChecklist from "./AddNewChecklist.vue";
export default {
  name: "task-detail",
  props: {
    task: {
      type: Object,
    },
  },
  data() {
    return {
      date: this.task.dueDate ? new Date(this.task.dueDate) : new Date(),
      priorities: ["high", "normal", "low"],
      comment: "",
      isShowChecklist: false,
      isShowChecklistItem: null,
      itemName: "",
    };
  },
  computed: {
    ...mapGetters({
      logtimes: "PROJECT/logtimes",
      currentProject: "PROJECT/currentProject",
      currentTask: "PROJECT/currentTask",
      validateText: "VALIDATION/validateText",
      comments: "TASK/comments",
      checklists: "TASK/checklist",
      userInfo: "AUTH/userInfo",
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
      let isEdit = true;
      if (this.userInfo._id == this.currentProject.createdBy._id) {
        isEdit = false;
      }
      return isEdit;
    },
  },
  methods: {
    ...mapActions({
      editTaskAction: "TASK/editTask",
      addCommentAction: "TASK/addComment",
      addChecklistItemAction: "TASK/addChecklistItem",
      deleteChecklistAction: "TASK/deleteChecklist",
      editChecklistItemAction: 'TASK/editChecklistItem'
    }),
    show() {
      this.$refs.taskDetailModal.show();
    },
    hide() {
      this.$refs.taskDetailModal.hide();
    },
    closeAddtaskForm() {
      this.isShowChecklist = false;
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
        if (!this.validateBeforeSubmit(this.comment)) {
          document.getElementById("content").focus();
          return;
        } else {
          this.addCommentAction({
            idTask: this.task._id,
            idProject: this.currentProject._id,
            comment: { content: this.comment },
          });
          this.comment = "";
        }
      }
    },
    sendComment() {
      if (!this.validateBeforeSubmit(this.comment)) {
        document.getElementById("content").focus();
        return;
      } else {
        this.addCommentAction({
          idTask: this.task._id,
          idProject: this.currentProject._id,
          comment: { content: this.comment },
        });
        this.comment = "";
      }
    },
    validateBeforeSubmit(text) {
      let passedValidate = true;
      const errors = this.validateText(text);
      if (errors) {
        passedValidate = false;
      }
      return passedValidate;
    },
    showChecklistItem(index) {
      this.isShowChecklistItem = index;
    },
    addChecklistItem(id) {
      if (!this.validateBeforeSubmit(this.itemName)) {
        document.getElementById("content-checklist").focus();
        return;
      } else {
        this.addChecklistItemAction({
          idChecklist: id,
          idTask: this.task._id,
          name: { name: this.itemName },
        });
        this.itemName = "";
      }

    },
    deleteChecklist(idChecklist) {
      this.deleteChecklistAction({
        idChecklist: idChecklist,
        idTask: this.task._id,
      });
    },
    // deleteChecklistItem(idChecklistItem) {
    //   this.deleteChecklistItemAction({
    //     idChecklistItem: idChecklist,
    //     idTask: this.task._id,
    //   });
    // },
    check(item) {
      this.editChecklistItemAction({idChecklistItem: item._id, idTask: this.task._id, isDone: {isDone: item.isDone } })
    }
  },
  watch: {
    isShowChecklistItem() {
      this.itemName = "";
    },
  },
  components: {
    DatePicker,
    AddChecklist,
  },
};
</script>
<style scoped>
.active {
  text-decoration: line-through;
}
.v-list .v-list-item:hover {
  background-color: rgb(255, 255, 255) !important;
  border-radius: 5px;
}

.v-list .v-list-item:hover,
.v-list .v-list-item:hover .mdi-chevron-down::before {
  color: rgb(21, 17, 30) !important;
}
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
.mx-input:disabled,
.mx-input.disabled {
  color: green !important;
  background-color: #f3f3f3;
}

.block1 label {
  margin-top: 50px;
  border-radius: 3px;
}

.block1 .row {
  margin-left: 10px;
}
.block2 .row {
  margin-bottom: 5px;
}

label {
  font-weight: 700;
}
.checklist {
  position: relative;
}
.add-checklist {
  z-index: 100;
  /* top: 40px; */
  left: 12px;
  position: absolute;
  width: 100%;
  margin: 0 auto;
  background-color: rgb(243, 243, 243) !important;
}
.add-item {
  margin-left: 20px;
}
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
  background-color: white !important;
  padding: 0 !important;
  margin: 0 !important;
}
.checklist-header i {
  cursor: pointer;
}
.checklist-header .bx-trash, .checklist-header  .bx-edit-alt {
  opacity: 0;
  margin: 0 5px;
}
.checklist-header:hover  .bx-trash, .checklist-header:hover .bx-edit-alt{
opacity: 1;
}
</style>
<style>
.checklist-sub .v-icon.v-icon {
  font-size: 15px !important;
}

.checklist .v-text-field--filled > .v-input__control > .v-input__slot,
.checklist .v-text-field--full-width > .v-input__control > .v-input__slot,
.checklist .v-text-field--outlined > .v-input__control > .v-input__slot {
  height: 30px !important;
  min-height: 30px !important;
}
.checklist-header .v-toolbar__content,
.v-toolbar__extension {
  padding: 0 !important;
  margin: 0 !important;
}


</style>
