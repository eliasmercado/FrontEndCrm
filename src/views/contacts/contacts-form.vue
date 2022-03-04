<template>
  <div class="content-block">
    <h2>Contactos</h2>

    <dx-data-grid
      class="dx-card wide-card"
      :data-source="dataSource"
      :show-column-lines="false"
      :show-row-lines="true"
      :show-borders="true"
      :row-alternation-enabled="true"
    >
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />
      <dx-load-panel enabled="true"/>
      <dx-editing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        mode="popup"
      />

      <dx-column
        :calculate-cell-value="calculateCellValue"
        caption="Nombre Completo"
        :width="250"
        :hiding-priority="8"
        :allow-sorting="false"
      />

      <dx-column
        data-field="idTipoDocumento"
        caption="Tipo Documento"
        :allow-sorting="false"
        :width="150"
        :hiding-priority="6"
      >
        <dx-lookup
          :data-source="documentsTypes"
          value-expr="idTipoDocumento"
          display-expr="tipoDocumento"
        />
      </dx-column>

      <dx-column
        data-field="documento"
        caption="Documento"
        :width="150"
        :hiding-priority="6"
        :allow-sorting="false"
      />

      <dx-column
        data-field="celular"
        caption="Celular"
        :width="120"
        :allow-sorting="false"
        :hiding-priority="7"
        :allowFiltering="false"
      />

      <dx-column
        data-field="email"
        caption="Email"
        :width="250"
        :hiding-priority="4"
        :allowFiltering="false"
        :allow-sorting="false"
      />

      <dx-column
        data-field="propietario"
        caption="Propietario"
        name="Priority"
        :hiding-priority="1"
        :allow-sorting="false"
      />
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
  DxItem,
  DxToolbar,
  DxLoadPanel
} from "devextreme-vue/data-grid";

import api from "@/scripts/api";
import notify from "devextreme/ui/notify";
import auth from '@/auth';

export default {
  data() {
    return {
      dataSource: [{}],
      documentsTypes: [{}],
    };
  },
  methods: {
    loadDataSource() {
      let token = auth.getAutorizationToken();
      api
        .get("/contacto", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          this.dataSource = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });

      this.documentsTypes = [
        {
          idTipoDocumento: 2,
          tipoDocumento: "Cedula",
        },
      ];
    },

    calculateCellValue(data) {
      return [data.nombres, data.apellidos].join(" ");
    },
  },
  created() {
    this.loadDataSource();
  },
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
    DxLoadPanel
  },
};
</script>
