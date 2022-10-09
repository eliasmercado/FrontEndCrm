<template>
  <div class="content-block">
    <h2>Sucursales</h2>

    <dx-data-grid
      class="dx-card wide-card"
      :data-source="branchesData"
      :show-borders="true"
      :column-auto-width="true"
      :show-column-lines="false"
      :show-row-lines="true"
      :row-alternation-enabled="true"
      :repaint-changes-only="true"
      :column-hiding-enabled="true"
      @row-updating="getJsonForUpdate"
      @init-new-row="initNewRow"
      @edit-canceled="canceled"
      @saved="saved"
      @exporting="onExporting"
    >
      <dx-export :enabled="true" />
      <dx-search-panel :visible="true" :width="300"></dx-search-panel>
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />
      <dx-column data-field="idSucursal" :visible="false" />
      <dx-column
        :set-cell-value="setStateValue"
        data-field="idDepartamento"
        caption="Departamento"
        :visible="false"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="stateData"
          value-expr="idDepartamento"
          display-expr="departamento"
        />
      </dx-column>
      <dx-column data-field="idCiudad" caption="Ciudad" :visible="false">
        <dx-required-rule />
        <dx-lookup
          :data-source="getFilteredCities"
          value-expr="idCiudad"
          display-expr="ciudad"
        />
      </dx-column>

      <dx-column
        caption="Descripción"
        data-field="descripcion"
        :allow-sorting="false"
        :hiding-priority="4"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="departamento"
        caption="Departamento"
        :allow-sorting="false"
        :hiding-priority="3"
      >
      </dx-column>
      <dx-column
        data-field="ciudad"
        caption="Ciudad"
        :allow-sorting="false"
        :hiding-priority="2"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="direccion"
        caption="Dirección"
        :allow-sorting="false"
        :hiding-priority="1"
      >
        <dx-required-rule />
      </dx-column>
      <dx-toolbar>
        <dx-grid-item name="searchPanel" location="before" />
        <dx-grid-item name="addRowButton" show-text="always" />
        <dx-grid-item name="exportButton" location="after" />
      </dx-toolbar>

      <dx-editing
        :allow-deleting="true"
        :allow-updating="true"
        :allow-adding="true"
        refresh-mode="full"
        mode="popup"
      >
        <dx-texts add-row="Agregar Sucursal" />

        <dx-popup
          :show-title="true"
          :width="600"
          :height="500"
          :title="title"
        />
        <dx-form>
          <dx-item :col-count="2" :col-span="2" item-type="group">
            <dx-item data-field="descripcion" />
            <dx-item data-field="direccion" />
            <dx-item data-field="idDepartamento" />
            <dx-item data-field="idCiudad" />
          </dx-item>
        </dx-form>
      </dx-editing>

      <dx-column type="buttons">
        <dx-button name="edit" />
        <dx-button name="delete" />
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
  DxExport,
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
import notify from "devextreme/ui/notify";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import api from "@/scripts/api";
import auth from "@/auth";
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";

const stateData = new CustomStore({
  key: "Value",
  loadMode: "raw",
  load: () => sendRequest("/departamento"),
});
const cityData = new CustomStore({
  key: "Value",
  loadMode: "raw",
  load: () => sendRequest("/ciudad"),
});

function sendRequest(url) {
  let token = auth.getAuthorizationToken();

  return api
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      notify(error.response.data.error.message, "error", 2000);
    });
}

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
    DxExport,
  },

  data() {
    return {
      branchesData: new DataSource({
        key: "idSucursal",
        load: () => this.sendRequest("/sucursal"),
        insert: (values) => this.sendRequest("/sucursal", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/sucursal/${key}`, "PUT", values),
        remove: (key) => this.sendRequest(`/sucursal/${key}`, "DELETE"),
      }),
      title: "Editar Sucursal",
      stateData,
      cityData,
      setStateValue(rowData, value) {
        rowData.idCiudad = null;
        this.defaultSetCellValue(rowData, value);
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

    //Cambiamos los valores de configuracion para cuando sea un insert
    initNewRow(e) {
      this.title = "Registrar Sucursal";
    },

    //cuando sea guarda o cancela volvemos a los valores por default
    saved(e) {
      this.title = "Editar Sucursal";
    },

    canceled(e) {
      this.title = "Editar Sucursal";
    },

    getJsonForUpdate(e) {
      //devextreme solo retorna el valor que se edito, pero para el back se necesita el json completo.
      //por eso reemplazamos el newData.
      e.newData = Object.assign({}, e.oldData, e.newData);
    },

    getFilteredCities: (options) => ({
      store: cityData,
      filter: options.data
        ? ["idDepartamento", "=", options.data.idDepartamento]
        : null,
    }),

    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Sucursales");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Sucursales.xlsx"
          );
        });
      });
      e.cancel = true;
    },
  },
};
</script>