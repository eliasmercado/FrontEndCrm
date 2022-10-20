<template>
  <div class="content-block">
    <h2>Tareas</h2>
    <div class="row">
      <div class="offset-md-6 col-md-6 text-right">
        <button-vue
          icon="plus"
          text="Nueva Tarea"
          styling-mode="text"
        />
      </div>
    </div>

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
      <dx-column data-field="idMarca" :visible="false" />
      <dx-column
        caption="Titulo"
        data-field="titulo"
        :allow-sorting="false"
        :hiding-priority="5"
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
        <dx-button icon="edit" hint="Editar" :on-click="null" />
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
  DxItem as DxGridItem,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";
import DataSource from "devextreme/data/data_source";
import { DxButton as ButtonVue } from "devextreme-vue/button";

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
    DxGridItem,
    DxSearchPanel,
    ButtonVue,
  },

  data() {
    return {
      tasksData: new DataSource({
        key: "idTarea",
        load: () => this.sendRequest("/marca"),
        insert: (values) => this.sendRequest("/marca", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/marca/${key}`, "PUT", values),
      }),
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

      if (method === "POST") {
        return api
          .post(url, data, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            notify(response.data.data, "success", 2000);
            return response.data.data;
          })
          .catch((error) => {
            notify(error.response.data.error.message, "error", 2000);
          });
      }

      if (method === "PUT") {
        return api
          .put(url, data, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            this.$emit("reloadParent");
            notify(response.data.data, "success", 2000);
            return response.data.data;
          })
          .catch((error) => {
            notify(error.response.data.error.message, "error", 2000);
          });
      }

      if (method === "DELETE") {
        return api
          .delete(url, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            notify(response.data.data, "success", 2000);
            return response.data.data;
          })
          .catch((error) => {
            notify(error.response.data.error.message, "error", 2000);
          });
      }
    },
  },
};
</script>