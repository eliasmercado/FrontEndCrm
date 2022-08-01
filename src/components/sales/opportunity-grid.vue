<template>
  <div>
    <dx-data-grid
      v-show="!viewOpportunityInfo"
      class="dx-card wide-card"
      :data-source="opportunitiesData"
      :show-column-lines="false"
      :show-row-lines="true"
      :show-borders="true"
      :row-alternation-enabled="true"
      :repaint-changes-only="true"
      :column-hiding-enabled="true"
      :column-auto-width="true"
      @init-new-row="initRow"
      @row-updating="getJsonForUpdate"
      @exporting="onExporting"
    >
      <dx-export :enabled="true" />
      <dx-search-panel :visible="true" :width="300"></dx-search-panel>
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />

      <!-- Columnas de la grilla -->
      <dx-column data-field="idOportunidad" :visible="false" />
      <dx-column data-field="nombre" caption="Nombre"></dx-column>
      <dx-column data-field="etapa" caption="Etapa"></dx-column>
      <dx-column data-field="valor" caption="Valor"> </dx-column>
      <dx-column data-field="prioridad" caption="Prioridad"> </dx-column>
      <dx-column
        data-field="tipoCliente"
        caption="Tipo Cliente"
        :set-cell-value="setClientTypeValue"
        :allow-sorting="false"
        :hiding-priority="5"
      >
        <dx-required-rule />
        <dx-lookup :data-source="clientType" />
      </dx-column>
      <dx-column data-field="contacto" caption="Contacto"> </dx-column>
      <dx-column
        data-field="detalles"
        :visible="false"
        edit-cell-template="detailsTemplate"
      >
      </dx-column>

      <template #detailsTemplate="{ data }">
        <div>
          {{ data.data.detalles }}
        </div>
      </template>

      <dx-column
        data-field="fechaCierre"
        caption="Fecha de Cierre"
        data-type="date"
      >
      </dx-column>
      <dx-column
        data-field="idPropietario"
        caption="Propietario"
        :allow-sorting="false"
        :hiding-priority="5"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="ownerData"
          value-expr="idPropietario"
          display-expr="propietario"
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
        <dx-texts add-row="Agregar Oportunidad" /><dx-popup />
        <dx-form>
          <dx-item
            :col-count="3"
            :col-span="2"
            item-type="group"
            caption="Datos Básicos"
          >
            <dx-item data-field="nombre" />
            <dx-item data-field="fechaCierre" />
            <dx-item data-field="etapa" />
            <dx-item data-field="valor" />
            <dx-item data-field="tipoCliente" />
            <dx-item data-field="prioridad" />
          </dx-item>

          <dx-item
            :col-count="3"
            :col-span="2"
            item-type="group"
            caption="Datos del Lead"
            v-if="existClient == false"
          >
            <dx-item
              data-field=""
              editor-type="dxButton"
              :editor-options="{
                text: 'Agregar Lead',
                onClick: changeClientType,
              }"
            />
          </dx-item>

          <dx-item
            :col-count="3"
            :col-span="2"
            item-type="group"
            caption="Detalle de la Oportunidad"
          >
            <dx-item data-field="contacto" v-if="existClient" />
            <dx-item data-field="detalles" />
          </dx-item>

          <dx-item
            :col-count="3"
            :col-span="2"
            item-type="group"
            caption="Datos de la Oportunidad"
          >
            <dx-item data-field="idPropietario" />
            <dx-item data-field="observacion" />
            <dx-item data-field="sucursal" />
          </dx-item>
        </dx-form>
      </dx-editing>

      <dx-column type="buttons">
        <dx-button
          icon="info"
          hint="Ver información"
          :on-click="showOpportunityInfo"
        />
        <dx-button name="edit" />
      </dx-column>
    </dx-data-grid>

    <back-button
      icon="back"
      v-if="viewOpportunityInfo"
      text="Volver"
      @click="viewOpportunityInfo = false"
    />
    <br />
    <br />
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
  DxSearchPanel,
  DxPatternRule,
  DxTexts,
  DxExport,
  DxButton,
  DxItem as DxGridItem,
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

export default {
  data() {
    return {
      opportunitiesData: new CustomStore({
        key: "idOportunidad",
        load: () => this.sendRequest("/contacto"),
        insert: (values) => this.sendRequest("/contacto", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/contacto/${key}`, "PUT", values),
        remove: (key) => this.sendRequest(`/contacto/${key}`, "DELETE"),
      }),
      ownerData: new CustomStore({
        key: "Value",
        loadMode: "raw",
        load: () => this.sendRequest("/propietario"),
      }),
      clientType: ["Existente", "Lead"],
      viewOpportunityInfo: false,
      opportunityInfo: {},
      existClient: null,
    };
  },
  methods: {
    sendRequest(url, method = "GET", data = {}) {
      let token = auth.getAuthorizationToken();
      if (url != "/propietario") {
        let tempData = [
          {
            idOportunidad: 1,
            nombre: "Oportunidad 1",
            etapa: "Lead",
            valor: 10,
            prioridad: "Alta",
            tipoCliente: "Existente",
            contacto: "Elias Mercado",
            fechaCierre: "10-08-2022",
            idPropietario: 1,
            detalles: ["0972250212", "009911555"],
          },
        ];

        return tempData;
      }
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

    changeClientType() {
      this.existClient = true;
    },

    setClientTypeValue(rowData, value) {
      //Si marca lead no existe el cliente
      if (value == "Lead") {
        this.existClient = false;
      } else {
        this.existClient = true;
      }
      rowData.tipoCliente = value;
    },

    getJsonForUpdate(e) {
      //devextreme solo retorna el valor que se edito, pero para el back se necesita el json completo.
      //por eso reemplazamos el newData.
      e.newData = Object.assign({}, e.oldData, e.newData);
    },

    initRow(e) {
      e.data.idPropietario = 1;
      this.existClient = null;
    },

    showOpportunityInfo(e) {
      this.opportunityInfo = e.row.data;
      this.viewOpportunityInfo = true;
    },

    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Oportunidades");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Oportunidades.xlsx"
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
    DxPatternRule,
    DxButton,
    DxSearchPanel,
    DxTexts,
    DxExport,
    BackButton,
    DxGridItem,
  },
};
</script>
