<template>
  <div class="road-map">
    <h1>Roadmap</h1>
    <div class="container-roadmap">
      <div class="open status" v-for="(data, index) in dataTask" :key="index">
        <div class="label">
          <span :style="{ 'background-color': colors[index] }">{{
            data.status.name
          }}</span>

          <span class="number">{{ data.tasks.length }}</span>
        </div>
        <div class="addTask" v-if="index == 0">
          <p @click="isShowAddTask = false" v-show="isShowAddTask">
            + Add issue ....
          </p>
          <div class="addform" v-show="!isShowAddTask">
            <add-task-form
              v-on:closeAddtaskForm="closeAddtaskForm"
            ></add-task-form>
          </div>
        </div>
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
          <Draggable v-for="(card, index) in data.tasks" :key="index">
            <Card
              v-bind:card="card"
              v-bind:project="currentProject"
              class="card"
            ></Card>
          </Draggable>
        </Container>
      </div>
    </div>
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
    };
  },
  computed: {
    ...mapGetters({
      dataTask: "TASKS/taskOfProject",
      currentProject: "TASKS/currentProject",
    }),
  },
  methods: {
    ...mapActions({
      removeCard: "TASKS/removeCard",
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
  },
  components: {
    Card,
    Container,
    Draggable,
    AddTaskForm,
  },
};
</script>

<style lang="scss" scoped>
.road-map {
  float: left;
  .container-roadmap {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 30px auto;
    .status {
      min-width: 18em;
      width: 18em;
      margin: 0 5px;
      border-radius: 5px;
      height: 100%;
      padding-bottom: 25px;
      .label {
        padding: 15px 15px 0;
        font-weight: bolder;
        margin-bottom: 20px;
        span {
          padding: 3px 7px;
          border-radius: 3px;
          margin-right: 10px;
        }
        .number {
          border: 1px solid rgb(240, 240, 218);
          padding: 3px 8px;
          border-radius: 30px;
          width: 30px;
          background-color: #fff;
        }
      }
      p {
        padding: 0 15px;
      }
      .content {
        background-color: rgb(255, 255, 255);

        margin: 15px;
        padding: 15px;
        border: 1px solid rgb(214, 212, 212);
        border-radius: 5px;
        line-height: 25px;
        .project-name {
          color: rgb(129, 194, 182);
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          .more {
            .icon {
              padding: 1px 10px 0;
              border-radius: 5px;
              border: 1px solid rgb(240, 238, 238);
            }
            i:focus .list {
              display: block;
            }
            .list {
              display: none;
              position: absolute;
              border-radius: 5px;
              // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              border: 1px solid rgb(241, 238, 238);
              ul {
                border-radius: 5px;
                list-style: none;
                margin: 10px 0;
                padding: 0;
                background-color: #fff;
                color: rgb(56, 56, 56);
                li {
                  padding: 2px 20px;
                }
                li:hover {
                  background-color: rgb(241, 240, 239);
                }
              }
            }
          }
        }
        .last-content {
          display: flex;
          .assign {
            margin-right: 15px;
            background-color: rgb(247, 231, 231);
            padding: 1px 7px;
            border-radius: 5px;
          }
        }
      }
      .container-card {
        // border: 1px solid grey;
        .card {
          span {
            font-weight: bolder;
          }
        }
      }
    }
    .addform {
      padding: 0px;
      border-radius: 5px;
      line-height: 25px;
    }
  }
}

// .placeholder {
//   background-color: rgb(236, 181, 181) !important;
//   border-radius: 5px;
//   transform: scaleY((0.85));
//   transform-origin: 0% 0%;
// }
.smooth-dnd-draggable-wrapper {
  overflow: inherit !important;
}
</style>
