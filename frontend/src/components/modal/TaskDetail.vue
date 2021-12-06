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
          <v-text-field v-model="task.name"></v-text-field>
        </v-row>
        <v-row align="center">
          <v-textarea
            class="mx-2"
            v-model="task.description"
            label="Description"
            rows="4"
          ></v-textarea>
        </v-row>
        <v-row class="comment">
          <v-col class="comment-text" cols="11">
            <v-textarea
              class="mx-2"
              label="Comment"
              rows="1"
            ></v-textarea>
          </v-col>
          <v-col cols="1" class="comment-btn">
            <v-btn class="cmt-btn" text style="border: none">
              <v-icon color="blue darken-2"> mdi-message-text </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <template v-for="item in items">
            <v-list-item :key="item.title">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-row>
      </v-col>
      <v-col class="block" cols="17">
        <v-row align="center">
          <v-select
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
    <v-row class="btn-row" >
      <v-col>
        <v-btn color="green darken-1" text width="80" @click="hide" style="margin-left: 15px">
          Close
        </v-btn>
        <v-btn class="save-btn" color="blue darken-1" text width="80" @click="changeTaskDetail">
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
      items: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
      ],
      data: this.task
    };
  },
  computed: {
    ...mapGetters({
      logtimes: "TASKS/logtimes",
      currentProject: "TASKS/currentProject",
      currentTask: 'TASKS/currentTask'
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
  },
  methods: {
    ...mapActions({
      editTaskAction: "TASKS/editTask",
    }),
    show() {
      this.$refs.taskDetailModal.show();
    },
    hide() {
      // this.resetForm()
      this.$refs.taskDetailModal.hide();
    },
    changeTaskDetail() {
      this.task.dueDate = this.date;
      console.log(this.task);

      this.editTaskAction({
        idTask: this.task._id,
        idProject: this.currentProject._id,
        task: this.task,
      });
      this.hide();
    },
    // resetForm() {
    //   this.$emit('resetForm')
    //     this.task = this.currentTask
    //   }
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
</style>
