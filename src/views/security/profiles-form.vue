<template>
  <div class="content-block">
    <h2>Perfiles</h2>

    <dx-data-grid
      class="dx-card wide-card"
      :data-source="usersData"
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
      <dx-column data-field="idPerfil" :visible="false" />
      <dx-column data-field="perfil" :allow-sorting="false">
        <dx-required-rule />
      </dx-column>

      <dx-toolbar>
        <dx-grid-item name="searchPanel" location="before" />
        <dx-grid-item name="addRowButton" show-text="always" />
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
        <dx-texts add-row="Agregar Perfil" />
        <dx-popup :width="500" :height="300" />
        <dx-form>
          <dx-item
            :col-count="1"
            :col-span="2"
            item-type="group"
            caption="Dato del Perfil"
          >
            <dx-item data-field="perfil" />
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
  DxEmailRule,
  DxSearchPanel,
  DxPatternRule,
  DxTexts,
  DxButton,
  DxItem as DxGridItem,
} from "devextreme-vue/data-grid";
import notify from "devextreme/ui/notify";
import CustomStore from "devextreme/data/custom_store";
import { DxItem } from "devextreme-vue/form";
import { DxButton as BackButton } from "devextreme-vue/button";
import api from "@/scripts/api";
import auth from "@/auth";

export default {
  data() {
    return {
      usersData: new CustomStore({
        key: "idPerfil",
        load: () => this.sendRequest("/usuario/perfil"),
        insert: (values) => this.sendRequest("/usuario/perfil", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/usuario/perfil/${key}`, "PUT", values),
        remove: (key) => this.sendRequest(`/usuario/perfil/${key}`, "DELETE"),
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
    DxEmailRule,
    DxPatternRule,
    DxButton,
    DxSearchPanel,
    DxTexts,
    BackButton,
    DxGridItem,
  },
};
</script>
