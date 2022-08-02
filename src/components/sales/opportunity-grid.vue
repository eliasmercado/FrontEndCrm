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
        :allow-sorting="false"
        :hiding-priority="5"
      >
      </dx-column>
      <dx-column data-field="contacto" caption="Contacto"> </dx-column>
      <dx-column data-field="detalles" :visible="false"> </dx-column>
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

      <dx-column type="buttons">
        <dx-button
          icon="info"
          hint="Ver información"
          :on-click="showOpportunityInfo"
        />
        <dx-button icon="edit" hint="Editar" :on-click="showOpportunityForm" />
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
  DxSearchPanel,
  DxPatternRule,
  DxTexts,
  DxExport,
  DxButton,
  DxItem as DxGridItem,
} from "devextreme-vue/data-grid";
import notify from "devextreme/ui/notify";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
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
      opportunitiesData: new DataSource({
        key: "idOportunidad",
        load: () => this.sendRequest("/contacto"),
      }),
      ownerData: new CustomStore({
        key: "Value",
        loadMode: "raw",
        load: () => this.sendRequest("/propietario"),
      }),
      clientType: ["Existente", "Lead"],
      viewOpportunityInfo: false,
      opportunityInfo: {},
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
    },

    showOpportunityInfo(e) {
      this.opportunityInfo = e.row.data;
      this.viewOpportunityInfo = true;
    },

    showOpportunityForm(e) {
      this.$emit("before-edit", e.row.data);
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
