<template>
  <v-main>
    <v-row class="roadmap">
      <v-row style="margin: 20px 0px">
        <h1>
          <i class="bx bxl-trello"></i>
          {{ currentProject.name }}
        </h1>
      </v-row>
      <v-col class="status" v-for="(data, index) in dataTask" :key="index">
        <v-row>
          <v-col style="text-align: center">
            <span
              class="name-status"
              :style="{ color: colors[index], 'font-weight': '800' }"
            >
              {{ data.status.name }} {{ data.tasks.length }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <div class="addTask" style="margin: 5px" v-if="index == 0">
            <v-btn text @click="isShowAddTask = false" v-show="isShowAddTask">
              + Add issue ....
            </v-btn>

            <div class="addform" v-show="!isShowAddTask">
              <add-task-form
                v-on:closeAddtaskForm="closeAddtaskForm"
              ></add-task-form>
            </div>
          </div>
        </v-row>
        <v-row>
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
  </v-main>
</template>

<script>
import Card from '../../components/ProjectCard.vue';
import AddTaskForm from '../../components/AddTaskForm.vue';
import { Container, Draggable } from 'vue-smooth-dnd';
import { mapActions, mapGetters } from 'vuex';
import colors from '../../utils/data';
export default {
  name: 'Roadmap',
  data() {
    return {
      draggingCard: {
        lane: '',
        index: -1,
        cardData: {},
      },
      isShowAddTask: true,
      colors: colors.colors,
    };
  },
  computed: {
    ...mapGetters({
      dataTask: 'TASKS/taskOfProject',
      currentProject: 'TASKS/currentProject',
    }),
  },
  methods: {
    ...mapActions({
      removeCard: 'TASKS/removeCard',
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
          'idTask',
          this.dataTask[lane].tasks[removedIndex]._id,
        );
        this.dataTask[lane].tasks.splice(removedIndex, 1);
      }
      if (addedIndex !== null) {
        let card = { id: '', statusId: '', moved: { before: '', after: '' } };
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
          card.id = localStorage.getItem('idTask');
          card.idProject = this.currentProject._id;
          this.removeCard(card);
        }, 200);
        this.dataTask[lane].tasks.splice(
          addedIndex,
          0,
          this.draggingCard.cardData,
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

<style scoped>
.v-main {
  width: 100%;
  min-width: 1000px;
  height: 92vh;
  white-space: nowrap;
  overflow: scroll !important;
}

.roadmap {
  width: 90%;
  margin: 20px auto;
}

.name-status {
  margin-right: 5px;
  padding: 2px 3px;
  border-radius: 5px;
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
</style>

<style lang="scss" scoped>
@import '../../assets/style.scss';
.status {
  margin: 10px;
  background-color: $color2;
  height: 100%;
  padding: 20px 10px 50px;
  border-radius: 5px;
}

.status:hover {
  background-color: rgb(211, 224, 210);
}
</style>
