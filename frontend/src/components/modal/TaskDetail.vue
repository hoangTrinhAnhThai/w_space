<template>
  <b-modal
    ref="taskDetailModal"
    hide-footer
    :title="task.name"
    class="task-detail"
    size="lg md"
  >
    <div class="container">
      <div class="left-container">
        <div class="description">
          <label for="">Description</label>
          <textarea
            v-model="task.description"
            placeholder="Add a more detailed description ..."
          ></textarea>
        </div>
        <div class="activity">
          <label for="">Activity</label>
          <div class="comment">
            <div class="write-content">
              <div class="avt">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
              </div>
              <textarea placeholder="Write a comment ..."></textarea>
            </div>
            <div class="content">
              <ul>
                <li>
                  <div class="avt">
                    <img
                      src="data:image/jpeg;base64,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"
                      alt=""
                    />
                  </div>
                  <div class="content">
                    <div class="name">Hoang Trinh Anh Thai</div>
                    <div class="comment-content">
                      Lorem ipsis ducimus mollitia repudiandae architecto fugiat
                      earum
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="assign" tabindex="1">
          <label for="">Assigned</label>
          <!-- <div class="select">
            <ul>
              <li v-for="(member, index) in listMember" :key="index">
                <label class="label-for-check" :for="member.email"
                  >{{ member.email }}
                </label>
                <input
                  class="check-with-label checkbox"
                  v-model="memberSelected"
                  :value="member.email"
                  :id="member.email"
                  type="checkbox"
                />
                <span class="icon"><i class="bx bx-user-check"></i></span>
              </li>
            </ul>
          </div> -->
          <select class="assign-select" v-model="memberSelected">
            <!-- <option selected value="" disabled>Select assign task</option> -->
            <option v-for="(user, index) in listMember" :key="index">
              {{ user.email }}
            </option>
          </select>
        </div>
        <div class="priority">
          <label for="">Priority</label>
          <select v-model="task.priority">
            <option
              style="font-size: 12px; font-weight: bolder"
              value=""
              disabled
              selected
            >
              Select the priority
            </option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div class="due-date">
          <label for="">Due date</label>
          <DatePicker v-model="date" :clearable="false" class="datepicker" />
        </div>
        <div class="report-time">
          <label for="">Logtime</label>
          <ul class="logtime">
            <li v-for="(logtime, index) in logtimes" :key="index">
              <span v-if="logtime.stopTime">
                <i class="bx bx-time"></i>
                {{ new Date(logtime.startTime).getHours() }}h{{
                  new Date(logtime.startTime).getMinutes()
                }}m{{ new Date(logtime.startTime).getSeconds() }} -{{
                  new Date(logtime.stopTime).getHours()
                }}h{{ new Date(logtime.stopTime).getMinutes() }}m{{
                  new Date(logtime.stopTime).getSeconds()
                }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="button">
      <button class="save" @click="changeTaskDetail">Save</button>
      <button class="cancel">Cancel</button>
    </div>
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
      assignedList: [],
      memberSelected: [],
      date: new Date(this.task.dueDate),
    };
  },
  computed: {
    ...mapGetters({
      logtimes: 'TASKS/logtimes',
      currentProject: 'TASKS/currentProject',
    }),
    due() {
      if (this.task.dueDate) {
        return new Date(this.task.dueDate);
      } else {
        return new Date();
      }
    },
    listMember() {
      let list = [];
      list.push(this.currentProject.createdBy);
      if (this.currentProject.members.length > 0) {
        for (let member of this.currentProject.members) {
          list.push(member);
        }
      }
      console.log(list);
      return list;
    },
  },
  methods: {
    ...mapActions({
      editTaskAction: 'TASKS/editTask',
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
  },
  components: {
    DatePicker,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/style.scss';
.container {
  display: flex;
  textarea {
    padding: 15px;
    outline: none;
    width: 84%;
    border: 1px solid rgb(204, 204, 204);
    height: 106px;
  }
  .left-container {
    width: 70%;
    .description,
    .activity {
      margin: 0px 0 10px;
    }
    .description {
      display: flex;
      flex-direction: column;
      textarea {
        margin-left: 11%;
      }
    }
    .activity {
      .comment {
        .write-content {
          display: flex;
          textarea {
          }
        }
        .content {
          ul {
            margin: 10px 0;
            padding: 0;
            li {
              display: flex;
              width: 95%;
              .avt {
                margin-top: 7px;
              }
              .content {
                .name {
                  font-weight: bolder;
                }
                .comment-content {
                  background-color: rgb(243, 241, 241);
                  padding: 10px;
                  border-radius: 5px;
                  border: 1px solid $border-color;
                }
              }
            }
          }
        }
      }
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
  .right-container {
    div {
      margin-bottom: 15px;
    }
    select {
      width: 100%;
      height: 35px;
      border: 1px solid rgb(204, 204, 204);
      border-radius: 3px;
      outline: none;
    }
    .datepicker {
      height: 35px;
      width: 100%;
    }
    ul.logtime {
      padding: 0;
      background-color: rgb(230, 224, 224);
      padding: 15px;
      border-radius: 3px;
      li {
      }
    }
    .assign {
      ul {
        list-style: none;
        padding: 0;
        li {
          display: flex;
          cursor: pointer;
          .checkbox {
            border: none;
            margin-top: 7px;
            margin-left: 5px;
            display: none;
          }
          .label-for-check + .check-with-label:checked {
            font-weight: bold;
          }
          .icon {
            display: none;
            font-size: 20px;
            margin-left: 5px;
            margin-top: -3px;
            color: $color;
          }
          .check-with-label:checked + span {
            display: block;
          }
        }
      }
    }
    .assign:focus {
      .assign-select {
        display: block;
      }
    }
  }
}

.button {
  float: right;
  button {
    border: 1px solid rgb(204, 204, 204);
    border-radius: 3px;
    padding: 5px;
    width: 70px;
    margin: 10px 0 10px 10px;
  }
  .save {
    background-color: $color;
    color: white;
  }
}
</style>
