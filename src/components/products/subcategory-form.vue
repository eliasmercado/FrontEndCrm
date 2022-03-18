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

      <dx-editing
        :allow-updating="true"
        :allow-deleting="true"
        refresh-mode="full"
        :use-icons="true"
        mode="popup"
      >
      </dx-editing>
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
} from "devextreme-vue/data-grid";
import notify from "devextreme/ui/notify";
import CustomStore from "devextreme/data/custom_store";
import api from "@/scripts/api";
import auth from "@/auth";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxRequiredRule,
    DxPager,
    DxPaging,
    DxEditing,
  },
  props: {
    parentCategory: {
      type: Object,
    },
  },
  data() {
    return {
      subCategoriesData: new CustomStore({
        key: "idCategoria",
        load: () =>
          this.sendRequest(
            `/categoria/subCategoriaByPadre/${this.parentCategory.idCategoria}`
          ),
        update: (key, values) =>
          this.sendRequest(`/categoria/${key}`, "PUT", values),
      }),
      detailInfo: `Subcategorías de ${this.parentCategory.nombre}`,
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
