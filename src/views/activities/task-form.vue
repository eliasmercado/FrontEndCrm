<template>
  <div class="content-block">
    <h2>Tareas</h2>
    <div class="row">
      <div class="offset-md-6 col-md-6 text-right">
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
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import taskGrid from "@/components/activities/task-grid.vue";
import taskForm from "@/components/activities/task-form.vue";
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
      task: {},
    };
  },

  methods: {
    viewTaskForm() {
      this.viewForm = true;
      this.viewGrid = false;
      this.btnVolver = true;
      this.btnAdd = false;
    },

    viewTaskGrid() {
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.task = {};
      this.viewGrid = true;
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
    DxButton,
  },
};
</script>

<style>
</style>