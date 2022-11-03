<template>
  <div>
    <dx-data-grid
      class="dx-card wide-card"
      :data-source="tasksData"
      :show-borders="true"
      :column-auto-width="true"
      :show-column-lines="false"
      :show-row-lines="true"
      :row-alternation-enabled="true"
      :repaint-changes-only="true"
      :column-hiding-enabled="true"
    >
      <dx-search-panel :visible="true" :width="300"></dx-search-panel>
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />
      <dx-header-filter :visible="true" />

      <dx-column data-field="idMarca" :visible="false" />
      <dx-column
        caption="Titulo"
        data-field="titulo"
        :allow-sorting="false"
        :hiding-priority="6"
        :allow-header-filtering="false"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="tipo"
        caption="Tipo"
        :allow-sorting="false"
        :hiding-priority="1"
      >
      </dx-column>
      <dx-column
        data-field="estado"
        caption="Estado"
        :allow-sorting="false"
        :hiding-priority="2"
      >
      </dx-column>
      <dx-column
        data-field="fechaInicio"
        caption="Fecha de Inicio"
        data-type="date"
        :allow-sorting="false"
        :hiding-priority="3"
      >
      </dx-column>
      <dx-column
        data-field="fechaCierre"
        caption="Fecha de Cierre"
        data-type="date"
        :allow-sorting="false"
        :hiding-priority="4"
      >
      </dx-column>
      <dx-column
        data-field="responsable"
        caption="Responsable"
        :allow-sorting="false"
        :hiding-priority="5"
      >
      </dx-column>

      <dx-toolbar>
        <dx-grid-item name="searchPanel" location="before" />
      </dx-toolbar>

      <dx-column type="buttons">
        <dx-button
          icon="info"
          hint="Ver información"
          :on-click="showTaskInfo"
        />
        <dx-button icon="edit" hint="Editar" :on-click="showTaskForm" />
        <dx-button icon="trash" hint="Eliminar" :on-click="showPopupDeleteConfirm" />
      </dx-column>
    </dx-data-grid>

    <dx-popup
      :visible="showDeleteConfirm"
      :drag-enabled="false"
      :hide-on-outside-click="false"
      :show-close-button="false"
      :show-title="false"
      :width="350"
      :height="110"
    >
      <dx-position at="center" my="center" />
      <dx-toolbar-item
        widget="dxButton"
        toolbar="bottom"
        location="center"
        :options="deleteButtonOptions"
      />
      <dx-toolbar-item
        widget="dxButton"
        toolbar="bottom"
        location="center"
        :options="noDeleteButtonOptions"
      />
      <p>
        ¿Está seguro que desea eliminar este registro?
      </p>
    </dx-popup>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxRequiredRule,
  DxPager,
  DxPaging,
  DxEditing,
  DxButton,
  DxLookup,
  DxForm,
  DxTexts,
  DxToolbar,
  DxSearchPanel,
  DxItem as DxGridItem,
  DxHeaderFilter,
} from "devextreme-vue/data-grid";
import { DxPopup, DxPosition, DxToolbarItem } from "devextreme-vue/popup";
import { DxItem } from "devextreme-vue/form";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";
import DataSource from "devextreme/data/data_source";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxRequiredRule,
    DxPager,
    DxPaging,
    DxEditing,
    DxButton,
    DxLookup,
    DxItem,
    DxForm,
    DxPopup,
    DxTexts,
    DxToolbar,
    DxSearchPanel,
    DxGridItem,
    DxHeaderFilter,
    DxPosition,
    DxToolbarItem,
  },

  data() {
    return {
      tasksData: new DataSource({
        key: "idTarea",
        load: () => this.sendRequest("/tarea"),
      }),
      taskInfo: {},
      taskIdToDelete: null,
      showDeleteConfirm: false,
      deleteButtonOptions: {
        text: "Sí",
        onClick: () => {
          this.deleteTask();
        },
      },
      noDeleteButtonOptions: {
        text: "No",
        onClick: () => {
          this.showDeleteConfirm = false;
        },
      },
    };
  },

  methods: {
    sendRequest(url, method = "GET", data = {}) {
      let token = auth.getAuthorizationToken();

      if (method === "GET") {
        return api
          .get(url, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            return response.data.data;
          })
          .catch((error) => {
            notify(error.response.data.error.message, "error", 2000);
          });
      }
    },

    showTaskInfo(e) {
      let taskId = e.row.data.idTarea;
      this.$emit("view-info", taskId);
    },

    reloadTaskGrid() {
      this.tasksData.reload();
    },

    async getTask(taskId) {
      let token = auth.getAuthorizationToken();
      let task = null;
      await api
        .get("/tarea/" + taskId, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          task = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });

      return task;
    },

    async showTaskForm(e) {
      let task = await this.getTask(e.row.data.idTarea);
      let user = auth.getUser();
      //Solo el usuario responsable puede editar su tarea.
      if (task.idResponsable != user.data.idUsuario) {
        notify("Sólo el responsable puede editar la tarea", "error", 2000);
      } else {
        this.$emit("before-edit", task);
      }
    },

    showPopupDeleteConfirm(e) {
      this.taskIdToDelete = e.row.data.idTarea;
      this.showDeleteConfirm = true;
    },

    async deleteTask() {
      let token = auth.getAuthorizationToken();

      await api
        .delete("/tarea/" + this.taskIdToDelete, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
      this.showDeleteConfirm = false;
      this.tasksData.reload();
    },
  },
};
</script>