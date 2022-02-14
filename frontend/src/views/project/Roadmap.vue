<template>
  <div class="roadmap-container"  v-bind:style="{ backgroundImage: currentProject.background ?  `url('${currentProject.background.url}')` : ''}">
    <div class="roadmap">
      <v-row v-if="currentProject">
        <v-row style="margin: 20px 0px">
          <v-app-bar class="bar1">
            <v-toolbar-title
              ><i class="bx bxl-trello"></i>
              {{ currentProject.name }}</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn
              color="blue-grey darken-4"
              icon
              @click.stop="showGroup = !showGroup"
            >
              <v-icon> mdi-home-floor-g</v-icon>
            </v-btn>
          </v-app-bar>
        </v-row>
        <v-col class="status" v-for="(data, index) in dataTask" :key="index">
          <v-row>
            <v-col style="text-align: center">
              <span
                class="name-status"
                :style="{ color: colors[index], 'font-weight': '900' }"
              >
                {{ data.status.name }} {{ data.tasks.length }}
              </span>
            </v-col>
          </v-row>
          <v-row v-if="currentProject.createdBy._id == userInfo._id">
            <div class="addTask" style="margin: 5px" v-if="index == 0">
              <v-btn
                class="add-btn"
                text
                @click="isShowAddTask = false"
                v-show="isShowAddTask"
              >
                + Add issue ....
              </v-btn>

              <div class="addform" v-show="!isShowAddTask">
                <add-task-form
                  v-on:closeAddtaskForm="closeAddtaskForm"
                ></add-task-form>
              </div>
            </div>
          </v-row>
          <v-row class="task">
            <Container
              class="container-card"
              group-name="trello"
              drag-class="ticket-ghost"
              drop-class="ticket-ghost-drop"
              @drag-start="handleDragStart(index, $event)"
              @drop="handleDrop(index, $event)"
              :get-child-payload="getChildPayload"
              :drop-placeholder="{
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true,
              }"
            >
              <Draggable
                style="margin: 5px"
                v-for="(card, index) in data.tasks"
                :key="index"
              >
                <Card
                  v-bind:card="card"
                  v-bind:project="currentProject"
                  class="card"
                ></Card>
              </Draggable>
            </Container>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-navigation-drawer
      bottom
      right
      style="width: 350px"
      v-model="showGroup"
      absolute
    >
      <v-app-bar class="bar-mini">
        <v-toolbar-title>Background</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="blue-grey darken-4" icon @click.stop="showGroup = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <div class="content">
        <div class="content-sub" v-for="(img, index) in backgrounds" :key="index" @click="setBackground(img._id)">
          <span class="bg-title">{{img.title}}</span>
          <img :src="img.url" alt="" />
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Card from "../../components/ProjectCard.vue";
import AddTaskForm from "../../components/AddTaskForm.vue";
import { Container, Draggable } from "vue-smooth-dnd";
import { mapActions, mapGetters } from "vuex";
import colors from "../../utils/data";
export default {
  name: "Roadmap",
  data() {
    return {
      draggingCard: {
        lane: "",
        index: -1,
        cardData: {},
      },
      isShowAddTask: true,
      colors: colors.colors,
      showGroup: false,
      drawer: true,
      mini: true,
    };
  },
  computed: {
    ...mapGetters({
      currentProject: "PROJECT/currentProject",
      dataTask: "TASK/tasksArray",
      userInfo: "AUTH/userInfo",
      backgrounds: "PROJECT/backgrounds",
    }),
  },
  methods: {
    ...mapActions({
      removeCard: "TASK/removeCard",
      setBackgroundAction: "PROJECT/setBackground"
    }),
    handleDragStart(lane, dragResult) {
      const { payload, isSource } = dragResult;
      if (isSource) {
        this.draggingCard = {
          lane,
          index: payload.index,
          cardData: {
            ...this.dataTask[lane].tasks[payload.index],
          },
        };
      }
    },
    handleDrop(lane, dropResult) {
      const { removedIndex, addedIndex } = dropResult;
      if (lane === this.draggingCard.lane && removedIndex === addedIndex) {
        return;
      }
      if (removedIndex !== null) {
        localStorage.setItem(
          "idTask",
          this.dataTask[lane].tasks[removedIndex]._id
        );
        this.dataTask[lane].tasks.splice(removedIndex, 1);
      }
      if (addedIndex !== null) {
        let card = { id: "", statusId: "", moved: { before: "", after: "" } };
        card.statusId = this.dataTask[lane].status._id;
        if (this.dataTask[lane].tasks[addedIndex - 1]) {
          card.moved.before = this.dataTask[lane].tasks[addedIndex - 1]._id;
        } else {
          card.moved.before = null;
        }
        if (this.dataTask[lane].tasks[addedIndex]) {
          card.moved.after = this.dataTask[lane].tasks[addedIndex]._id;
        } else {
          card.moved.after = null;
        }

        setTimeout(() => {
          card.id = localStorage.getItem("idTask");
          card.idProject = this.currentProject._id;
          this.removeCard(card);
        }, 200);
        this.dataTask[lane].tasks.splice(
          addedIndex,
          0,
          this.draggingCard.cardData
        );
      }
    },
    getChildPayload(index) {
      return {
        index,
      };
    },
    closeAddtaskForm() {
      this.isShowAddTask = true;
    },
    setBackground(bg) {
      this.setBackgroundAction({idProject: this.currentProject._id,idBg: bg })
      this.showGroup = false
    }
  },
  components: {
    Card,
    Container,
    Draggable,
    AddTaskForm,
  },
};
</script>

<style scoped>
.roadmap-container {
  width: 100%;
  min-width: 1000px;
  height: calc(100vh - 65px);
  white-space: nowrap;
  overflow-y: scroll !important;
  background-size: cover;
  display: flex;
}

.bar1 {
  box-shadow: none !important;
  background-color: rgb(247, 248, 251) !important;
  /* border-bottom: 1px solid rgb(126, 68, 68); */
  padding: 0px 20px;
  font-weight: 900;
  background-color: rgba(224, 221, 221, 0.7) !important;
}
.bar-mini {
  box-shadow: none !important;
  background-color: #fff !important;
  border-bottom: 1px solid rgb(216, 202, 202) !important;
  padding: 0px 20px;
  font-weight: 900;
}
.roadmap {
  width: 90%;
  margin: 20px auto;
}

.name-status {
  margin-right: 5px;
  padding: 2px 3px;
  border-radius: 5px;
  font-weight: 700;
  font-size: 18px;
}
.smooth-dnd-draggable-wrapper {
  overflow: inherit !important;
}

.addTask .v-btn {
  width: 96%;
  padding: 5px;
  border: none;
  font-size: 10px;
}
.add-btn:hover {
  background-color: rgb(21, 17, 30);
  color: white !important;
}
img {
  width: 150px;
  height: 100px;
  border-radius: 10px;
  margin: 5px;
}

.content {
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin: 10px auto;
}
</style>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.status {
  margin: 10px;
  background-color: rgba(224, 221, 221, 0.7);
  height: 100%;
  padding: 20px 10px 50px;
  border-radius: 5px;
}
.task {
  height: calc(100vh - 380px);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden !important;
}
.content-sub {
  position: relative;
}
.bg-title {
  position: absolute;
  bottom: 5px;
  left: 5px;
  color: white;
  font-weight: bolder;
  width: 94%;
  background-color: rgba(102, 95, 95, 0.7);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding-left: 5px;
  opacity: 0;
  padding-top: 5px;
}
.content-sub:hover .bg-title {
  opacity: 1;
}
.content-sub:hover img {
  // opacity: 0.8;
}

</style>
