<template>
  <div>
    <dx-data-grid
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
        :hiding-priority="8"
      ></dx-column>
      <dx-column
        data-field="etapa"
        caption="Etapa"
        :hiding-priority="7"
      ></dx-column>
      <dx-column
        data-field="valor"
        :allow-sorting="false"
        :allow-header-filtering="false"
        alignment="left"
        caption="Valor"
        :hiding-priority="6"
      >
      </dx-column>
      <dx-column
        data-field="prioridad"
        caption="Prioridad"
        :hiding-priority="2"
      >
      </dx-column>
      <dx-column
        data-field="tipoCliente"
        caption="Tipo Cliente"
        :hiding-priority="4"
      >
      </dx-column>
      <dx-column
        data-field="contacto"
        :allow-sorting="false"
        :allow-header-filtering="false"
        caption="Contacto"
        :hiding-priority="5"
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
        data-field="propietario"
        :allow-sorting="false"
        :allow-header-filtering="false"
        caption="Propietario"
        :hiding-priority="1"
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

    reloadOpportunityGrid() {
      this.opportunitiesData.reload();
    },

    showOpportunityInfo(e) {
      let opportunityId = e.row.data.idOportunidad;
      this.$emit("view-info", opportunityId);
    },

    async getOpportunity(opportunityId) {
      let token = auth.getAuthorizationToken();
      let opportunity = null;
      await api
        .get("/oportunidad/" + opportunityId, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          opportunity = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });

      return opportunity;
    },

    async showOpportunityForm(e) {
      let opportunity = await this.getOpportunity(e.row.data.idOportunidad);
      this.$emit("before-edit", opportunity);
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
