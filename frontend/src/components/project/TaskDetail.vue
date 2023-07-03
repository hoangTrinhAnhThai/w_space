<template>
  <b-modal
    ref="taskDetailModal"
    hide-footer
    hide-header
    :title="task.name"
    size="xl"
    scrollable
  >
    <v-form ref="form" lazy-validation class="task-detail">
      <v-row>
        <v-col class="block1" cols="7">
          <div class="title-task-detail">
            <v-text-field
              class="title"
              :disabled="isEdit"
              v-model="task.name"
            ></v-text-field>
          </div>
          <div class="function-task-detail">
            <v-btn @click="handleClickInputFile" text>
              <v-icon small>mdi-paperclip</v-icon> Attach
              <input
                type="file"
                @change="onFileChange"
                ref="fileInputAvt"
                style="display: none"
            /></v-btn>
            <v-btn text @click="isShowChecklist = true">
              <v-icon small>mdi-checkbox-multiple-marked-outline</v-icon> List
              to do
            </v-btn>
          </div>
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
          <div class="attach-file">
            <AttachFile :idTask="task._id" />
          </div>
          <div
            v-if="checklists.length > 0 || isShowChecklist"
            class="checklist"
          >
            <label for="">
              <v-icon> mdi-checkbox-multiple-marked-outline</v-icon>
              Checklist
            </label>
            <div class="add-checklist" v-show="isShowChecklist">
              <v-text-field
                outlined
                id="content-checklist"
                :disabled="isEdit"
                v-model="checklistName"
              ></v-text-field>
              <v-btn
                style="
                  font-size: 10px !important;
                  height: 32px !important;
                  margin-right: 10px;
                "
                text
                @click="addChecklist()"
                >Add list</v-btn
              >
              <i
                class="bx bx-x"
                style="font-size: 20px; position: relative; top: 5px"
                @click="closeChecklist"
              ></i>
            </div>
            <v-list
              subheader
              flat
              v-for="(checklist, index) in checklists"
              :key="index"
              class="list-checklist"
            >
              <v-app-bar class="checklist-header">
                <v-subheader>
                  <v-icon>mdi-format-list-checkbox </v-icon>
                  <v-text-field
                    class="title"
                    :disabled="isEdit"
                    v-model="checklist.name"
                  ></v-text-field>
                </v-subheader>
                <v-spacer></v-spacer>
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
                      <input
                        type="checkbox"
                        id="checkbox"
                        @change="check(item)"
                        v-model="item.isDone"
                      />
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title :class="{ active: item.isDone }">{{
                        item.name
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-list-item>
                <v-btn
                  @click="showChecklistItem(index)"
                  v-if="!(isShowChecklistItem == `${index}`)"
                  text
                  class="mx-2"
                  >Add item</v-btn
                >
                <div class="add-item" v-if="isShowChecklistItem == `${index}`">
                  <v-text-field
                    outlined
                    id="content-checklist-item"
                    :disabled="isEdit"
                    v-model="itemName"
                  ></v-text-field>
                  <v-btn text @click="addChecklistItem(checklist._id)"
                    >Add item</v-btn
                  >
                  <i
                    class="bx bx-x"
                    style="font-size: 20px; position: relative; top: 5px"
                    @click="isShowChecklistItem = null"
                  ></i>
                </div>
              </v-list-item-group>
            </v-list>
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
        <v-col class="block2">
          <v-row align="center">
            <div class="assigned">
              <v-select
                :disabled="isEdit"
                v-model="task.assigned"
                :items="listMember"
                chips
                item-value="_id"
                clearable
                small-chips
                label="Assigned"
                ><template v-slot:item="{ item }">
                  <Avatar :user="item" />
                </template>
                <template #selection="{ item }">
                  <v-chip label text-color="indigo darken-4" class="ma-2"
                    ><img v-if="item.avatar" :src="item.avatar" alt="" />
                    <v-avatar
                      v-on="on"
                      v-else
                      color="light-blue lighten-3"
                      size="24"
                    >
                      <span style="font-size: 10px">
                        {{ item.firstName.charAt(0)
                        }}{{ item.lastName.charAt(0) }}
                      </span>
                    </v-avatar>
                    <span class="name-assigned"
                      >{{ item.firstName }} {{ item.lastName }}</span
                    ></v-chip
                  >
                </template>
              </v-select>
            </div>
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
            <v-col cols="24">
              <label style="margin-bottom: 10px" for=""
                ><v-icon>mdi-calendar-check-outline</v-icon> Due date</label
              >
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
          <v-row>
            <v-col cols="24" v-if="logtimes.length > 0">
              <label for=""><v-icon> mdi-update</v-icon> Logtimes </label>

              <ReportLogtimeTable />
              <span class="export" @click="fetchData">
                <export-excel
                  :data="list"
                  :name="`Logtime for task '${task.name}'.xls`"
                >
                  <v-btn text>Export Logtime</v-btn>
                </export-excel>
              </span>
            </v-col>
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
import ReportLogtimeTable from "../table/ReportLogtimeTable.vue";
import Avatar from "../Avatar.vue";
import DatePicker from "vue2-datepicker";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import AttachFile from "../project/AttachFile.vue";
import data from "../../utils/data";

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
      checklistName: "",
      list: []
    };
  },
  computed: {
    ...mapGetters({
      currentProject: "PROJECT/currentProject",
      currentTask: "PROJECT/currentTask",
      validateText: "VALIDATION/validateText",
      comments: "TASK/comments",
      checklists: "TASK/checklist",
      userInfo: "AUTH/userInfo",
      logtimes: "LOGTIME/logtimeArrayByTask",
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
      addChecklistAction: "TASK/addChecklist",
      addChecklistItemAction: "TASK/addChecklistItem",
      deleteChecklistAction: "TASK/deleteChecklist",
      editChecklistItemAction: "TASK/editChecklistItem",
      getLogtimes: "LOGTIME/getAllLogtimeByTask",
      attachFile: "TASK/attachFile",
      attachImg: "TASK/attachImg",
      addIsLoading: "ERROR/addIsLoading",
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
    closeChecklist() {
      this.checklistName = "";
      this.isShowChecklist = false;
    },
    showChecklistItem(index) {
      this.isShowChecklistItem = index;
    },
    addChecklist() {
      if (!this.validateBeforeSubmit(this.checklistName)) {
        document.getElementById("content-checklist").focus();
        return;
      } else {
        this.addChecklistAction({
          name: { name: this.checklistName },
          idTask: this.task._id,
          idProject: this.currentProject._id,
        });
        this.$emit("closeAddtaskForm");
        this.checklistName = "";
        this.isShowChecklist = false;
      }
    },
    addChecklistByKey(e) {
      if (e.keyCode === 13) {
        if (!this.validateBeforeSubmit(this.checklistName)) {
          document.getElementById("content-checklist").focus();
          return;
        } else {
          this.addChecklistAction({
            name: { name: this.checklistName },
            idTask: this.task._id,
            idProject: this.currentProject._id,
          });
          this.$emit("closeAddtaskForm");
          this.checklistName = "";
          this.isShowChecklist = false;
        }
      }
    },
    addChecklistItem(id) {
      if (!this.validateBeforeSubmit(this.itemName)) {
        document.getElementById("content-checklist-item").focus();
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
      this.editChecklistItemAction({
        idChecklistItem: item._id,
        idTask: this.task._id,
        isDone: { isDone: item.isDone },
      });
    },
    async fetchData() {
      this.list = this.logtimes.map((logtime) => ({
        Id: logtime._id,
        Task_id: logtime.task ? logtime.task._id : "",
        Task_name: logtime.task ? logtime.task.name : "",
        CreatedBy_Email: logtime.createdBy.email,
        CreatedBy_Full_Name: `${logtime.createdBy.firstName} ${logtime.createdBy.lastName}`,
        CreatedAt: `${new Date(logtime.createdAt).getDate()} ${
          data.month[new Date(logtime.createdAt).getMonth()]
        },  ${new Date(logtime.createdAt).getFullYear()}`,
        StartTime: logtime.startTime
          ? `${new Date(logtime.startTime).getHours()}h${new Date(
              logtime.startTime
            ).getMinutes()} ${new Date(logtime.startTime).getDate()} ${
              data.month[new Date(logtime.startTime).getMonth()]
            },  ${new Date(logtime.startTime).getFullYear()}`
          : "",
        StopTime: logtime.stopTime
          ? `${new Date(logtime.stopTime).getHours()}h${new Date(
              logtime.stopTime
            ).getMinutes()} ${new Date(logtime.stopTime).getDate()} ${
              data.month[new Date(logtime.stopTime).getMonth()]
            },  ${new Date(logtime.stopTime).getFullYear()}`
          : "",
        TimeInMiliseconds: logtime.timeInMiliseconds
          ? logtime.timeInMiliseconds
          : "",
      }));
    },
    handleClickInputFile() {
      this.$refs.fileInputAvt.click();
    },
    onFileChange(e) {
      this.isDisableButton = true;
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      this.addIsLoading(true);
      if (e.target.files[0].type.includes("image")) {
        formData.append("upload_preset", "wfcqkljk");
        axios
          .post(
            "https://api.cloudinary.com/v1_1/dj5xafymg/image/upload",
            formData
          )
          .then((response) => {
            this.attachImg({
              idTask: this.task._id,
              file: {
                fileName: e.target.files[0].name,
                url: response.data.url,
                contentType: e.target.files[0].type,
              },
            });
            // this.avatar = response.data.url;
            // this.isDisableButton = false;
            this.addIsLoading(false);
          })
          .catch(() => {
            this.addIsLoading(false);
          });
      } else {
        this.attachFile({ file: formData, idTask: this.task._id });
      }
    },
  },
  watch: {
    isShowChecklistItem() {
      this.itemName = "";
    },
  },
  components: {
    DatePicker,
    ReportLogtimeTable,
    Avatar,
    AttachFile,
  },
};
</script>
<style lang="scss" scoped>
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

.v-sheet.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
  background-color: white !important;
  padding: 0 !important;
  margin: 0 !important;
}
.task-detail {
  .block1 {
    label {
      margin-top: 50px;
      border-radius: 3px;
      font-weight: 500;
      color: grey;
      .v-icon {
        font-size: 16px;
        margin-bottom: 5px;
      }
    }
    .row {
      margin-left: 10px;
    }
    .v-icon {
      font-size: 16px;
    }
    .function-task-detail {
      .v-btn {
        text-transform: none !important;
        margin-right: 10px;
      }
    }
    .checklist {
      .add-checklist {
        margin-top: 30px;
        margin-left: 30px;
      }
      .list-checklist {
        margin-left: 15px;
        .checklist-header {
          .bx-trash,
          .bx-edit-alt {
            opacity: 0;
            margin: 0 5px;
            cursor: pointer;
            margin-bottom: 10px;
          }
          .v-icon {
            font-size: 15px;
            margin-right: 5px;
            margin-bottom: 10px;
          }
        }
        .checklist-header:hover {
          .bx-trash,
          .bx-edit-alt {
            opacity: 1;
          }
        }
        .checklist-sub {
          margin-left: 20px;
          .v-list-item {
            min-height: 20px !important;
            height: 25px;
          }
          .add-item {
            margin: 10px 15px 0;
          }
          .v-btn {
            text-transform: none !important;
            font-size: 10px !important;
            height: 32px !important;
            margin-right: 5px;
          }
          .active {
            text-decoration: line-through;
          }
        }
      }
    }
  }
  .block2 {
    label {
      border-radius: 3px;
      font-weight: 500;
      color: grey;
      .v-icon {
        margin-bottom: 7px;
      }
    }
    .export {
      display: flex;
      flex-direction: row-reverse;
    }
    margin-top: 55px;
    .row {
      margin-bottom: 5px;
    }
    .assigned {
      .name-assigned {
        margin-left: 10px;
      }
    }
  }
}

img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.v-chip {
  background-color: white !important;
  width: 95%;
}
</style>
<style>
.title-task-detail .theme--light.v-input input,
.title-task-detail .theme--light.v-input textarea {
  font-weight: bolder;
  font-size: 22px !important;
}
.title-task-detail
  .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot:before {
  border-color: white !important;
}
.checklist-header
  .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot:before {
  border-color: white !important;
}
.checklist-sub .v-icon.v-icon {
  font-size: 15px !important;
}

.task-detail .v-text-field--filled > .v-input__control > .v-input__slot,
.task-detail .v-text-field--full-width > .v-input__control > .v-input__slot,
.task-detail .v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 20px !important;
  height: 30px !important;
}
.checklist-header .v-toolbar__content,
.v-toolbar__extension {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
