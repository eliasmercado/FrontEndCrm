<template>
  <div class="content-block">
    <h2>Usuarios</h2>

    <dx-data-grid
      class="dx-card wide-card"
      :data-source="usersData"
      :show-column-lines="false"
      :show-row-lines="true"
      :show-borders="true"
      :row-alternation-enabled="true"
      :repaint-changes-only="true"
      :column-hiding-enabled="true"
      :column-auto-width="true"
      @row-updating="getJsonForUpdate"
      @exporting="onExporting"
    >
      <dx-export :enabled="true" />
      <dx-search-panel :visible="true" :width="300"></dx-search-panel>
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />

      <!-- Columnas de la grilla -->
      <dx-column
        :calculate-cell-value="calculateCellValue"
        caption="Nombre Completo"
        :allow-sorting="false"
        :allowFiltering="false"
        :hiding-priority="5"
      />
      <dx-column data-field="idUsuario" :visible="false" />
      <dx-column data-field="nombres" :visible="false">
        <dx-required-rule />
      </dx-column>
      <dx-column data-field="apellidos" :visible="false">
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="email"
        caption="Email"
        :allowFiltering="false"
        :allow-sorting="false"
        :hiding-priority="3"
      >
        <dx-email-rule />
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="username"
        caption="Usuario"
        :allow-sorting="false"
        :allowFiltering="false"
        :hiding-priority="2"
      >
        <dx-async-rule
          :validation-callback="asyncValidation"
          message="El usuario ya existe"
        />
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="direccion"
        caption="Dirección"
        :allow-sorting="false"
        :allowFiltering="false"
        :hiding-priority="1"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="idPerfil"
        caption="Perfil"
        :allow-sorting="false"
        :allowFiltering="false"
        :hiding-priority="4"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="profileData"
          value-expr="idPerfil"
          display-expr="perfil"
        />
      </dx-column>

      <dx-toolbar>
        <dx-grid-item name="searchPanel" location="before" />
        <dx-grid-item name="addRowButton" show-text="always" />
        <dx-grid-item name="exportButton" location="after" />
      </dx-toolbar>
      <!-- Formulario de edicion -->
      <dx-editing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        refresh-mode="full"
        :use-icons="true"
        mode="popup"
      >
        <dx-texts add-row="Agregar Usuario" />
        <dx-popup :width="700" :height="550" />
        <dx-form>
          <dx-item
            :col-count="2"
            :col-span="2"
            item-type="group"
            caption="Datos del Usuario"
          >
            <dx-item data-field="nombres" />
            <dx-item data-field="apellidos" />
            <dx-item data-field="email" />
            <dx-item data-field="username" />
            <dx-item data-field="direccion" />
            <dx-item data-field="idPerfil" />
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
import DxDataGrid, {
  DxColumn,
  DxFilterRow,
  DxLookup,
  DxPager,
  DxPaging,
  DxEditing,
  DxToolbar,
  DxForm,
  DxPopup,
  DxRequiredRule,
  DxEmailRule,
  DxSearchPanel,
  DxPatternRule,
  DxTexts,
  DxExport,
  DxButton,
  DxItem as DxGridItem,
  DxAsyncRule,
} from "devextreme-vue/data-grid";
import notify from "devextreme/ui/notify";
import CustomStore from "devextreme/data/custom_store";
import { DxItem } from "devextreme-vue/form";
import { DxButton as BackButton } from "devextreme-vue/button";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import api from "@/scripts/api";
import auth from "@/auth";

const sendRequest = function (value) {
  let token = auth.getAuthorizationToken();
  let existUser = false;

  let data = {
    username: value,
  };

  api
    .post("/usuario/validar-username", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      existUser = response.data.data;
    })
    .catch((error) => {
      notify(error.response.data.error.message, "error", 2000);
    });

  //Si el usuario existe no le dejamos insertar
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(!existUser);
    }, 1000);
  });
};

export default {
  data() {
    return {
      usersData: new CustomStore({
        key: "idUsuario",
        load: () => this.sendRequest("/usuario"),
        insert: (values) => this.sendRequest("/usuario", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/usuario/${key}`, "PUT", values),
        remove: (key) => this.sendRequest(`/usuario/${key}`, "DELETE"),
      }),
      profileData: new CustomStore({
        key: "Value",
        loadMode: "raw",
        load: () => this.sendRequest("/usuario/perfil"),
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

    calculateCellValue(data) {
      return [data.nombres, data.apellidos].join(" ");
    },

    getJsonForUpdate(e) {
      //devextreme solo retorna el valor que se edito, pero para el back se necesita el json completo.
      //por eso reemplazamos el newData.
      e.newData = Object.assign({}, e.oldData, e.newData);
    },

    asyncValidation(params) {
      return sendRequest(params.value);
    },

    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Usuarios");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Usuarios.xlsx"
          );
        });
      });
      e.cancel = true;
    },
  },
  created() {},
  components: {
    DxDataGrid,
    DxColumn,
    DxFilterRow,
    DxLookup,
    DxPager,
    DxPaging,
    DxEditing,
    DxToolbar,
    DxItem,
    DxForm,
    DxPopup,
    DxRequiredRule,
    DxEmailRule,
    DxPatternRule,
    DxButton,
    DxSearchPanel,
    DxTexts,
    DxExport,
    BackButton,
    DxGridItem,
    DxAsyncRule,
  },
};
</script>
