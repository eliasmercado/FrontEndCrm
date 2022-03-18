<template>
  <div class="content-block">
    <h2>Categorías</h2>

    <dx-data-grid
      class="dx-card wide-card"
      :data-source="categoriesData"
      :show-column-lines="false"
      :show-row-lines="true"
      :show-borders="true"
      :row-alternation-enabled="true"
      :repaint-changes-only="true"
      :column-hiding-enabled="true"
      :column-auto-width="true"
      @row-updating="getJsonForUpdate"
    >
      <dx-search-panel :visible="true" :width="300"></dx-search-panel>
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />

      <!-- Columnas de la grilla -->
      <dx-column data-field="idCategoria" :visible="false" />
      <dx-column
        caption="Nombre"
        data-field="nombre"
        :allow-sorting="false"
        :hiding-priority="1"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="descripcion"
        caption="Descripción"
        :allow-sorting="false"
        :hiding-priority="2"
      >
      </dx-column>

      <dx-master-detail :enabled="true" template="subCategoriesTemplate" />

      <template #subCategoriesTemplate="{ data: categoryData }">
        <subcategory-form :parentCategory="categoryData.data" />
      </template>

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
        <dx-texts add-row="Agregar Categoría" /><dx-popup />
        <!--    <dx-form>
          <dx-item
            :col-count="3"
            :col-span="2"
            item-type="group"
            caption="Datos Básicos"
          >
            <dx-item data-field="nombre" />
            <dx-item data-field="ruc" />
            <dx-item data-field="celular" />
            <dx-item data-field="telefono" />
            <dx-item data-field="email" />
            <dx-item data-field="direccion" />
            <dx-item data-field="idDepartamento" />
            <dx-item data-field="idCiudad" />
          </dx-item>

          <dx-item
            :col-count="3"
            :col-span="2"
            item-type="group"
            caption="Datos del Representante"
          >
            <dx-item data-field="nombreRepresentante" />
            <dx-item data-field="celularRepresentante" />
          </dx-item>

          <dx-item
            :col-count="3"
            :col-span="2"
            item-type="group"
            caption="Datos del Contacto"
          >
            <dx-item data-field="idPropietario" />
          </dx-item>
        </dx-form> -->
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
  DxLookup,
  DxPager,
  DxPaging,
  DxEditing,
  DxToolbar,
  DxForm,
  DxPopup,
  DxRequiredRule,
  DxSearchPanel,
  DxTexts,
  DxButton,
  DxItem as DxGridItem,
  DxMasterDetail,
} from "devextreme-vue/data-grid";
import notify from "devextreme/ui/notify";
import CustomStore from "devextreme/data/custom_store";
import { DxItem } from "devextreme-vue/form";
import api from "@/scripts/api";
import auth from "@/auth";
import SubcategoryForm from "@/components/products/subcategory-form.vue"

export default {
  data() {
    return {
      categoriesData: new CustomStore({
        key: "idCategoria",
        load: () => this.sendRequest("/categoria"),
        insert: (values) => this.sendRequest("/categoria", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/categoria/${key}`, "PUT", values),
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
  },
  created() {},
  components: {
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxPager,
    DxPaging,
    DxEditing,
    DxToolbar,
    DxItem,
    DxForm,
    DxPopup,
    DxRequiredRule,
    DxButton,
    DxSearchPanel,
    DxTexts,
    DxGridItem,
    DxMasterDetail,
    SubcategoryForm
  },
};
</script>
