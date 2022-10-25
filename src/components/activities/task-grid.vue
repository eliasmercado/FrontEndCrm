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
        :hiding-priority="5"
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
        data-field="fechaCierre"
        caption="Fecha de Cierre"
        data-type="date"
        :allow-sorting="false"
        :hiding-priority="3"
      >
      </dx-column>
      <dx-column
        data-field="responsable"
        caption="Responsable"
        :allow-sorting="false"
        :hiding-priority="4"
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
        <dx-button icon="trash" hint="Eliminar" :on-click="null" />
      </dx-column>
    </dx-data-grid>
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
  DxPopup,
  DxTexts,
  DxToolbar,
  DxSearchPanel,
  DxItem as DxGridItem,
  DxHeaderFilter,
} from "devextreme-vue/data-grid";
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
  },

  data() {
    return {
      tasksData: new DataSource({
        key: "idTarea",
        load: () => this.sendRequest("/tarea"),
      }),
      viewTaskInfo: false,
      taskInfo: {},
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
      this.viewTaskInfo = e.row.data;
      this.viewTaskInfo = true;
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
      this.$emit("before-edit", task);
    },
  },
};
</script>