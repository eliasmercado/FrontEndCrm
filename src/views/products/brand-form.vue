<template>
  <div class="content-block">
    <h2>Marcas</h2>

    <dx-data-grid
      class="dx-card wide-card"
      :data-source="brandsData"
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
    >
      <dx-search-panel :visible="true" :width="300"></dx-search-panel>
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />
      <dx-column data-field="idMarca" :visible="false" />
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

      <dx-toolbar>
        <dx-grid-item name="searchPanel" location="before" />
        <dx-grid-item name="addRowButton" show-text="always" />
        <dx-grid-item name="exportButton" location="after" />
      </dx-toolbar>

      <dx-editing
        :allow-updating="true"
        :allow-adding="true"
        refresh-mode="full"
        mode="popup"
      >
        <dx-texts add-row="Agregar Marca" />

        <dx-popup
          :show-title="true"
          :width="500"
          :height="400"
          :title="title"
        />
        <dx-form>
          <dx-item :col-count="1" :col-span="2" item-type="group">
            <dx-item data-field="nombre" />
            <dx-item data-field="descripcion" />
          </dx-item>
        </dx-form>
      </dx-editing>

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
  DxTexts,
  DxToolbar,
  DxItem as DxGridItem,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
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
    DxTexts,
    DxToolbar,
    DxGridItem,
    DxSearchPanel,
  },

  data() {
    return {
      brandsData: new DataSource({
        key: "idMarca",
        load: () => this.sendRequest("/marca"),
        insert: (values) => this.sendRequest("/marca", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/marca/${key}`, "PUT", values),
      }),
      title: "Editar Marca",
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

    //Cambiamos los valores de configuracion para cuando sea un insert
    initNewRow(e) {
      this.title = "Registrar Marca";
    },

    //cuando sea guarda o cancela volvemos a los valores por default
    saved(e) {
      this.title = "Editar Marca";
    },

    canceled(e) {
      this.title = "Editar Marca";
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
        idMarca: data.idMarca,
        nombre: data.nombre,
        descripcion: data.descripcion,
        estado: true,
      };

      await api
        .put(`/marca/${data.idMarca}`, newData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });

      this.brandsData.reload();
    },

    async updateStatusFalse(e) {
      let token = auth.getAuthorizationToken();
      let data = e.row.data;

      var newData = {
        idMarca: data.idMarca,
        nombre: data.nombre,
        descripcion: data.descripcion,
        estado: false,
      };

      await api
        .put(`/marca/${data.idMarca}`, newData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });

      this.brandsData.reload();
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
