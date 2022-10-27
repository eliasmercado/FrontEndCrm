<template>
  <div class="content-block">
    <h2>Tareas</h2>
    <div class="row">
      <div class="col-md-6 text-left" v-if="viewScheduler">
        <div class="row rowCalendarInfo">
          <div id="squareOpen" />
          <div>Abierta</div>
        </div>
        <div class="row rowCalendarInfo">
          <div id="squareClose" />
          <div>Cerrada</div>
        </div>
      </div>
      <div
        :class="
          viewScheduler
            ? 'col-md-6 text-right'
            : 'offset-md-6 col-md-6 text-right'
        "
      >
        <dx-button
          v-if="btnScheduler"
          @click="viewTaskScheduler"
          icon="event"
          text="Calendario"
          styling-mode="text"
        />
        <dx-button
          v-if="btnGridBack"
          @click="viewTaskGrid"
          icon="back"
          text="Cambiar Vista"
          styling-mode="text"
        />
        <dx-button
          v-if="btnAdd"
          @click="viewTaskForm"
          icon="plus"
          text="Nueva Tarea"
          styling-mode="text"
        />
      </div>
    </div>

    <dx-button
      v-if="btnVolver"
      icon="back"
      text="Volver"
      @click="viewTaskGrid"
    />
    <br v-if="btnVolver" />
    <br v-if="btnVolver" />

    <task-grid
      v-show="viewGrid"
      ref="taskGrid"
      @before-edit="preparingEditTask"
    />
    <task-form v-if="viewForm" :task="task" @insert="insertTask" />

    <scheduler-task v-if="viewScheduler" />
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import taskGrid from "@/components/activities/task-grid.vue";
import taskForm from "@/components/activities/task-form.vue";
import schedulerTask from "@/components/activities/scheduler-task.vue";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";

export default {
  data() {
    return {
      btnVolver: false,
      btnAdd: true,
      viewGrid: true,
      viewForm: false,
      viewScheduler: false,
      btnScheduler: true,
      btnGridBack: false,
      task: {},
    };
  },

  methods: {
    viewTaskForm() {
      this.viewForm = true;
      this.viewGrid = false;
      this.btnVolver = true;
      this.btnAdd = false;
      this.btnGridBack = false;
      this.btnScheduler = false;
      this.viewScheduler = false;
    },

    viewTaskGrid() {
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.btnGridBack = false;
      this.task = {};
      this.viewGrid = true;
      this.btnScheduler = true;
      this.viewScheduler = false;
    },

    viewTaskScheduler() {
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.btnGridBack = true;
      this.task = {};
      this.viewGrid = false;
      this.btnScheduler = false;
      this.viewScheduler = true;
    },

    preparingEditTask(data) {
      this.task = data;
      this.viewTaskForm();
    },

    async insertTask(data) {
      console.log(data);
      //si el id no existe vamos a llamar a insertar
      if (typeof data.idTarea === "undefined") {
        this.insertNewTask(data);
      } else {
        this.editTask(data);
      }
    },

    async insertNewTask(data) {
      console.log("vamos a insertar");
      this.viewTaskGrid();
      this.$refs.taskGrid.reloadTaskGrid();
    },

    async editTask(data) {
      console.log("vamos a editar");
      this.viewTaskGrid();
      this.$refs.taskGrid.reloadTaskGrid();
    },
  },

  components: {
    "task-grid": taskGrid,
    "task-form": taskForm,
    "scheduler-task": schedulerTask,
    DxButton,
  },
};
</script>

<style scoped>
#squareOpen {
  background: #ff9747;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

#squareClose {
  background: #4bb543;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.rowCalendarInfo {
  margin-left: 0px;
}
</style>