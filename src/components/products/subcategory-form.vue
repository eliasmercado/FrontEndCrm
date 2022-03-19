<template>
  <div>
    <div class="master-detail-caption">{{ detailInfo }}</div>
    <dx-data-grid
      :data-source="subCategoriesData"
      :show-borders="true"
      :column-auto-width="true"
      :show-column-lines="false"
      :show-row-lines="true"
      :row-alternation-enabled="true"
      :repaint-changes-only="true"
      :column-hiding-enabled="true"
      @row-updating="getJsonForUpdate"
    >
      <dx-paging :page-size="5" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />
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
          :data-source="categoriesData"
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

      <dx-editing :allow-updating="true" refresh-mode="full" mode="popup">
        <dx-popup
          :show-title="true"
          :width="500"
          :height="600"
          title="Editar Categoría"
        />
        <dx-form>
          <dx-item :col-count="1" :col-span="2" item-type="group">
            <dx-item
              css-class="d-flex justify-content-center"
              template="categoryOptionTemplate"
            />
            <dx-item data-field="idCategoriaPadre" />
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
          :value="2"
          :disabled="true"
          layout="horizontal"
        />
      </template>

      <dx-column type="buttons">
        <dx-button name="edit" />
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
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
import DxRadioGroup from "devextreme-vue/radio-group";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";
import DataSource from "devextreme/data/data_source";

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
    DxRadioGroup,
  },
  props: {
    parentCategory: {
      type: Object,
    },
    categoriesData: {
      type: Array,
    },
  },
  data() {
    return {
      subCategoriesData: new DataSource({
        key: "idCategoria",
        load: () =>
          this.sendRequest(
            `/categoria/subCategoriaByPadre/${this.parentCategory.idCategoria}`
          ),
        update: (key, values) =>
          this.sendRequest(`/categoria/${key}`, "PUT", values),
      }),
      detailInfo: `Subcategorías de ${this.parentCategory.nombre}`,
      categoryOptions: [
        { id: 1, text: "Categoría" },
        { id: 2, text: "SubCategoría" },
      ],
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

    getJsonForUpdate(e) {
      //devextreme solo retorna el valor que se edito, pero para el back se necesita el json completo.
      //por eso reemplazamos el newData.
      e.newData = Object.assign({}, e.oldData, e.newData);
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

      this.subCategoriesData.reload();
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

      this.subCategoriesData.reload();
    },
  },
};
</script>
<style>
.master-detail-caption {
  padding: 0 0 5px 10px;
  font-size: 14px;
  font-weight: bold;
}
</style>
