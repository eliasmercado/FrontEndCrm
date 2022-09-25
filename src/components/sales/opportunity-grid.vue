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
      <dx-header-filter :visible="true" />
      <dx-export :enabled="true" />
      <dx-search-panel :visible="true" :width="300"></dx-search-panel>
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />

      <!-- Columnas de la grilla -->
      <dx-column data-field="idOportunidad" :visible="false" />
      <dx-column
        data-field="nombre"
        :allow-sorting="false"
        :allow-header-filtering="false"
        caption="Nombre"
      ></dx-column>
      <dx-column data-field="etapa" caption="Etapa"></dx-column>
      <dx-column
        data-field="valor"
        :allow-sorting="false"
        :allow-header-filtering="false"
        alignment="left"
        caption="Valor"
      >
      </dx-column>
      <dx-column data-field="prioridad" caption="Prioridad"> </dx-column>
      <dx-column
        data-field="tipoCliente"
        caption="Tipo Cliente"
        :hiding-priority="5"
      >
      </dx-column>
      <dx-column
        data-field="contacto"
        :allow-sorting="false"
        :allow-header-filtering="false"
        caption="Contacto"
      >
      </dx-column>
      <dx-column
        data-field="fechaCierre"
        caption="Fecha de Cierre"
        data-type="date"
        :allow-sorting="false"
      >
      </dx-column>
      <dx-column
        data-field="propietario"
        :allow-sorting="false"
        :allow-header-filtering="false"
        caption="Propietario"
      >
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
  DxHeaderFilter,
} from "devextreme-vue/data-grid";
import notify from "devextreme/ui/notify";
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
        load: () => this.sendRequest("/oportunidad"),
      }),
      viewOpportunityInfo: false,
      opportunityInfo: {},
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
    DxHeaderFilter,
  },
};
</script>
