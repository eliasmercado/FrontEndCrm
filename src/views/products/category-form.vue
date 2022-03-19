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
      @init-new-row="initNewRow"
      @edit-canceled="canceled"
      @saved="saved"
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
      <dx-column
        data-field="idCategoriaPadre"
        :visible="false"
        caption="Categoría Padre"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="categoriesData._items.filter((x) => x.estado)"
          value-expr="idCategoria"
          display-expr="nombre"
        />
      </dx-column>
      <dx-column
        type="buttons"
        data-field="estado"
        caption="Estado"
        :allow-sorting="false"
        :hiding-priority="3"
      >
        <dx-button
          icon="isnotblank"
          :visible="isStatusTrueIconVisible"
          :on-click="updateStatusFalse"
        />
        <dx-button
          icon="isblank"
          :visible="isStatusFalseIconVisible"
          :on-click="updateStatusTrue"
        />
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
        mode="popup"
      >
        <dx-texts add-row="Agregar Categoría" />
        <dx-popup
          :show-title="true"
          :width="500"
          :height="600"
          :title="title"
        />
        <dx-form>
          <dx-item :col-count="1" :col-span="2" item-type="group">
            <dx-item
              css-class="d-flex justify-content-center"
              template="categoryOptionTemplate"
            />
            <dx-item
              data-field="idCategoriaPadre"
              v-if="categoryOptionSelected == 2"
            />
            <dx-item data-field="nombre" />
            <dx-item data-field="descripcion" />
          </dx-item>
        </dx-form>
      </dx-editing>

      <template #categoryOptionTemplate>
        <dx-radio-group
          :items="categoryOptions"
          value-expr="id"
          display-expr="text"
          :value="categoryOptionSelected"
          :disabled="isEditing"
          layout="horizontal"
          @valueChanged="changeCategoryOption"
        />
      </template>

      <dx-column type="buttons">
        <dx-button name="edit" />
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
import DxRadioGroup from "devextreme-vue/radio-group";
import notify from "devextreme/ui/notify";
import { DxItem } from "devextreme-vue/form";
import api from "@/scripts/api";
import auth from "@/auth";
import SubcategoryForm from "@/components/products/subcategory-form.vue";
import DataSource from "devextreme/data/data_source";

export default {
  data() {
    return {
      categoriesData: new DataSource({
        key: "idCategoria",
        load: () => this.sendRequest("/categoria"),
        insert: (values) => this.sendRequest("/categoria", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/categoria/${key}`, "PUT", values),
      }),

      categoryOptions: [
        { id: 1, text: "Categoría" },
        { id: 2, text: "SubCategoría" },
      ],
      categoryOptionSelected: 1,
      isEditing: true,
      title: "Editar Categoría",
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

    getJsonForUpdate() {
      //devextreme solo retorna el valor que se edito, pero para el back se necesita el json completo.
      //por eso reemplazamos el newData.
      e.newData = Object.assign({}, e.oldData, e.newData);
    },

    //Cambiamos los valores de configuracion para cuando sea un insert
    initNewRow(e) {
      this.categoryOptionSelected = 1;
      this.isEditing = false;
      this.title = "Registrar Categoría";
    },

    //cuando sea guarda o cancela volvemos a los valores por default
    saved(e) {
      this.categoryOptionSelected = 1;
      this.isEditing = true;
      this.title = "Editar Categoría";
    },

    canceled(e) {
      this.categoryOptionSelected = 1;
      this.isEditing = true;
      this.title = "Editar Categoría";
    },

    getFilteredCities: (options) => ({
      store: cityData,
      filter: options.data
        ? ["idDepartamento", "=", options.data.idDepartamento]
        : null,
    }),

    changeCategoryOption(e) {
      this.categoryOptionSelected = e.value;
    },

    isStatusTrueIconVisible(e) {
      return e.row.data.estado;
    },

    isStatusFalseIconVisible(e) {
      return !e.row.data.estado;
    },

    async updateStatusTrue(e) {
      let token = auth.getAuthorizationToken();
      let data = e.row.data;

      var newData = {
        idCategoria: data.idCategoria,
        nombre: data.nombre,
        descripcion: data.descripcion,
        idCategoriaPadre: data.idCategoriaPadre,
        estado: true,
      };

      await api
        .put(`/categoria/${data.idCategoria}`, newData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });

      this.categoriesData.reload();
    },

    async updateStatusFalse(e) {
      let token = auth.getAuthorizationToken();
      let data = e.row.data;

      var newData = {
        idCategoria: data.idCategoria,
        nombre: data.nombre,
        descripcion: data.descripcion,
        idCategoriaPadre: data.idCategoriaPadre,
        estado: false,
      };

      await api
        .put(`/categoria/${data.idCategoria}`, newData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });

      this.categoriesData.reload();
    },
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
    SubcategoryForm,
    DxRadioGroup,
  },
};
</script>
