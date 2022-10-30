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
      @click="changeCurrentComponent"
    />
    <br v-if="btnVolver" />
    <br v-if="btnVolver" />

    <task-grid
      v-show="viewGrid"
      ref="refTaskGrid"
      @before-edit="preparingEditTask"
      @view-info="viewTaskInfo"
    />
    <task-form v-if="viewForm" :task="task" @insert="insertTask" />

    <scheduler-task v-if="viewScheduler" @view-info="viewTaskInfo" />

    <task-info v-if="viewInfo" :taskId="taskInfoId"></task-info>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import taskGrid from "@/components/activities/task-grid.vue";
import taskForm from "@/components/activities/task-form.vue";
import schedulerTask from "@/components/activities/scheduler-task.vue";
import taskInfo from "@/components/activities/task-info.vue";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";

const TASK_GRID = "taskGrid";
const TASK_FORM = "taskForm";
const TASK_SCHEDULER = "taskScheduler";
const TASK_INFO = "taskInfo";

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
      viewInfo: false,
      currentComponente: null,
      oldComponente: null,
      TASK_GRID,
      TASK_FORM,
      TASK_SCHEDULER,
      TASK_INFO,
      taskInfoId: 0,
    };
  },

  methods: {
    changeCurrentComponent() {
      if (this.oldComponente == TASK_FORM) this.viewTaskForm();
      else if (this.oldComponente == TASK_GRID || this.oldComponente === null)
        this.viewTaskGrid();
      else if (this.oldComponente == TASK_SCHEDULER) this.viewTaskScheduler();
    },

    viewTaskForm() {
      this.oldComponente = this.currentComponente;
      this.currentComponente = TASK_FORM;
      this.viewForm = true;
      this.viewGrid = false;
      this.btnVolver = true;
      this.btnAdd = false;
      this.btnGridBack = false;
      this.btnScheduler = false;
      this.viewScheduler = false;
      this.viewInfo = false;
    },

    viewTaskGrid() {
      this.oldComponente = this.currentComponente;
      this.currentComponente = TASK_GRID;
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.btnGridBack = false;
      this.task = {};
      this.viewGrid = true;
      this.btnScheduler = true;
      this.viewScheduler = false;
      this.viewInfo = false;
    },

    viewTaskScheduler() {
      this.oldComponente = this.currentComponente;
      this.currentComponente = TASK_SCHEDULER;
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.btnGridBack = true;
      this.task = {};
      this.viewGrid = false;
      this.btnScheduler = false;
      this.viewScheduler = true;
      this.viewInfo = false;
    },

    viewTaskInfo(taskId) {
      this.taskInfoId = taskId;
      this.oldComponente = this.currentComponente;
      this.currentComponente = TASK_INFO;
      this.viewForm = false;
      this.viewGrid = false;
      this.btnVolver = true;
      this.btnAdd = false;
      this.btnGridBack = false;
      this.btnScheduler = false;
      this.viewScheduler = false;
      this.viewInfo = true;
    },

    preparingEditTask(data) {
      this.task = data;
      this.viewTaskForm();
    },

    async insertTask(data) {
      //si el id no existe vamos a llamar a insertar
      if (typeof data.idTarea === "undefined") {
        this.insertNewTask(data);
      } else {
        this.editTask(data);
      }
    },

    async insertNewTask(data) {
      let token = auth.getAuthorizationToken();

      await api
        .post("/tarea", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });

      this.viewTaskGrid();
      this.$refs.refTaskGrid.reloadTaskGrid();
    },

    async editTask(data) {
      let token = auth.getAuthorizationToken();
      await api
        .put("/tarea/" + data.idTarea, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
      this.viewTaskGrid();
      this.$refs.refTaskGrid.reloadTaskGrid();
    },
  },

  components: {
    "task-grid": taskGrid,
    "task-form": taskForm,
    "scheduler-task": schedulerTask,
    "task-info": taskInfo,
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