<template>
  <div class="content-block">
    <h2>Productos</h2>

    <dx-data-grid
      class="dx-card wide-card"
      :data-source="productsData"
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
      <dx-column data-field="idProducto" :visible="false" />
      <dx-column data-field="idMoneda" caption="Moneda" :visible="false">
        <dx-required-rule />
        <dx-lookup
          :data-source="currenciesData._items"
          value-expr="idMoneda"
          display-expr="moneda"
        />
      </dx-column>
      <dx-column data-field="idMarca" caption="Marca" :visible="false">
        <dx-required-rule />
        <dx-lookup
          :data-source="brandsData._items"
          value-expr="idMarca"
          display-expr="nombre"
        />
      </dx-column>
      <dx-column
        :set-cell-value="setCategoryValue"
        data-field="idCategoriaPadre"
        caption="Categoría"
        :visible="false"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="categoriesData._items"
          value-expr="idCategoria"
          display-expr="nombre"
        />
      </dx-column>
      <dx-column
        data-field="idCategoria"
        caption="Subcategoría"
        :visible="false"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="getFilteredSubCategories"
          value-expr="idCategoria"
          display-expr="nombre"
      /></dx-column>
      <dx-column
        caption="Nombre"
        data-field="descripcion"
        :allow-sorting="false"
        :hiding-priority="1"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="marca"
        caption="Marca"
        :allow-sorting="false"
        :hiding-priority="2"
      >
      </dx-column>
      <dx-column
        data-field="precio"
        caption="Precio"
        :allow-sorting="false"
        :hiding-priority="3"
        alignment="left"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="moneda"
        caption="Moneda"
        :allow-sorting="false"
        :hiding-priority="4"
      >
      </dx-column>
      <dx-column
        data-field="categoria"
        caption="Categoría"
        :allow-sorting="false"
        :hiding-priority="5"
      >
      </dx-column>
      <dx-column
        data-field="subCategoria"
        caption="Subcategoría"
        :allow-sorting="false"
        :hiding-priority="6"
      >
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
        <dx-texts add-row="Agregar Producto" />

        <dx-popup
          :show-title="true"
          :width="600"
          :height="500"
          :title="title"
        />
        <dx-form>
          <dx-item :col-count="2" :col-span="2" item-type="group">
            <dx-item data-field="descripcion" />
            <dx-item data-field="idMarca" />
            <dx-item data-field="idMoneda" />
            <dx-item data-field="precio" />
            <dx-item data-field="idCategoriaPadre" />
            <dx-item data-field="idCategoria" />
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

const brandsData = new DataSource({
  key: "Value",
  loadMode: "raw",
  load: () => sendRequestWithStatus("/marca"),
});
const currenciesData = new DataSource({
  key: "Value",
  loadMode: "raw",
  load: () => sendRequest("/producto/moneda"),
});
const categoriesData = new DataSource({
  key: "Value",
  loadMode: "raw",
  load: () => sendRequestWithStatus("/categoria"),
});
const subCategoriesData = new DataSource({
  key: "Value",
  loadMode: "raw",
  load: () => sendRequestWithStatus("/categoria/subCategoria"),
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

function sendRequestWithStatus(url) {
  let token = auth.getAuthorizationToken();

  return api
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      return response.data.data.filter(x => x.estado);
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
      productsData: new DataSource({
        key: "idProducto",
        load: () => this.sendRequest("/producto"),
        insert: (values) => this.sendRequest("/producto", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/producto/${key}`, "PUT", values),
        remove: (key) => this.sendRequest(`/producto/${key}`, "DELETE"),
      }),
      title: "Editar Producto",
      brandsData,
      currenciesData,
      categoriesData,
      subCategoriesData,
      setCategoryValue(rowData, value) {
        rowData.idCategoria = null;
        this.defaultSetCellValue(rowData, value);
      },
    };
  },

  mounted() {
    this.brandsData.reload();
    this.currenciesData.reload();
    this.categoriesData.reload();
    this.subCategoriesData.reload();
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
      this.title = "Registrar Producto";
    },

    //cuando sea guarda o cancela volvemos a los valores por default
    saved(e) {
      this.title = "Editar Producto";
    },

    canceled(e) {
      this.title = "Editar Producto";
    },

    getJsonForUpdate(e) {
      //devextreme solo retorna el valor que se edito, pero para el back se necesita el json completo.
      //por eso reemplazamos el newData.
      e.newData = Object.assign({}, e.oldData, e.newData);
    },

    getFilteredSubCategories: (options) => ({
      store: subCategoriesData._store,
      filter: options.data
        ? ["idCategoriaPadre", "=", options.data.idCategoriaPadre]
        : null,
    }),

    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Productos");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "Productos.xlsx"
          );
        });
      });
      e.cancel = true;
    },
  },
};
</script>