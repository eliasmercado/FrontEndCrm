<template>
  <div>
    <dx-scheduler
      time-zone="America/Asuncion"
      :data-source="tasks"
      :current-date="currentDate"
      :views="views"
      :height="750"
      current-view="month"
      :editing="editing"
      :on-appointment-dbl-click="dblClick"
      :on-appointment-form-opening="formOpening"
    >
      <dx-resource
        :data-source="taskStatuses"
        :use-color-as-default="true"
        field-expr="statusNumber"
        label="Priority"
      />
    </dx-scheduler>
  </div>
</template>
<script>
import { DxScheduler, DxResource } from "devextreme-vue/scheduler";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";

export default {
  components: {
    DxScheduler,
    DxResource,
  },
  data() {
    return {
      views: ["month"],
      taskStatuses: [
        {
          text: "Abierta",
          id: 1,
          color: "#ff9747",
        },
        {
          text: "Cerrada",
          id: 0,
          color: "#4bb543",
        },
      ],
      currentDate: new Date(),
      tasks: [],
      allowAdding: false,
      allowDeleting: false,
      allowUpdating: false,
      allowResizing: false,
      allowDragging: false,
    };
  },
  computed: {
    editing() {
      return {
        allowAdding: this.allowAdding,
        allowDeleting: this.allowDeleting,
        allowUpdating: this.allowUpdating,
        allowResizing: this.allowResizing,
        allowDragging: this.allowDragging,
      };
    },
  },
  methods: {
    async getTasks() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/tarea/calendario", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.tasks = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    dblClick(e) {
      e.cancel();
    },

    formOpening(e) {
      console.log(e);
      e.cancel = true;
    },
  },

  created() {
    this.getTasks();
  },
};
</script>
