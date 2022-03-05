<template>
  <div class="content-block">
    <h2>Contactos</h2>

    <dx-data-grid
      class="dx-card wide-card"
      :data-source="contactsData"
      :show-column-lines="false"
      :show-row-lines="true"
      :show-borders="true"
      :row-alternation-enabled="true"
      :repaint-changes-only="true"
      @row-updating="getJsonForUpdate"
    >
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />
      <dx-editing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        refresh-mode="full"
        mode="popup"
      >
        <dx-popup />
        <dx-form>
          <dx-item
            :col-count="3"
            :col-span="2"
            item-type="group"
            caption="Datos Básicos"
          >
            <dx-item data-field="nombres" />
            <dx-item data-field="apellidos" />
            <dx-item data-field="celular" />
            <dx-item data-field="email" />
            <dx-item data-field="fechaNacimiento" />
            <dx-item data-field="idEstadoCivil" />
            <dx-item data-field="idTipoDocumento" />
            <dx-item data-field="documento" />
            <dx-item data-field="direccion" />
            <dx-item data-field="idCiudad" />
            <dx-item data-field="idDepartamento" />
          </dx-item>

          <dx-item
            :col-count="3"
            :col-span="2"
            item-type="group"
            caption="Datos Laborales"
          >
            <dx-item data-field="idActividadEconomica" />
            <dx-item data-field="nombreEmpresa" />
            <dx-item data-field="direccionLaboral" />
            <dx-item data-field="telefonoLaboral" />
            <dx-item data-field="correoLaboral" />
          </dx-item>

          <dx-item
            :col-count="3"
            :col-span="2"
            item-type="group"
            caption="Datos del Contacto"
          >
            <dx-item data-field="idPropietario" />
          </dx-item>
        </dx-form>
      </dx-editing>

      <dx-column
        :calculate-cell-value="calculateCellValue"
        caption="Nombre Completo"
        :width="250"
        :hiding-priority="8"
        :allow-sorting="false"
      />
      <dx-column data-field="idContacto" :visible="false" />
      <dx-column data-field="nombres" :visible="false" />
      <dx-column data-field="apellidos" :visible="false" />
      <dx-column
        data-field="celular"
        caption="Celular"
        :width="120"
        :allow-sorting="false"
        :allowFiltering="false"
      />

      <dx-column
        data-field="email"
        caption="Email"
        :width="250"
        :allowFiltering="false"
        :allow-sorting="false"
      />
      <dx-column
        data-field="fechaNacimiento"
        data-type="date"
        :visible="false"
      />
      <dx-column data-field="idEstadoCivil" :visible="false" />
      <dx-column
        data-field="idTipoDocumento"
        caption="Tipo Documento"
        :allow-sorting="false"
        :width="150"
      >
      </dx-column>
      <!--    <dx-column
        data-field="idTipoDocumento"
        caption="Tipo Documento"
        :allow-sorting="false"
        :width="150"
      >
        <dx-lookup
          :data-source="documentsTypes"
          value-expr="idTipoDocumento"
          display-expr="tipoDocumento"
        />
      </dx-column> -->

      <dx-column
        data-field="documento"
        caption="Documento"
        :width="150"
        :allow-sorting="false"
      />
      <dx-column data-field="direccion" :visible="false" />
      <dx-column data-field="idCiudad" :visible="false" />
      <dx-column data-field="idDepartamento" :visible="false" />
      <dx-column data-field="idActividadEconomica" :visible="false" />
      <dx-column data-field="nombreEmpresa" :visible="false" />
      <dx-column data-field="direccionLaboral" :visible="false" />
      <dx-column data-field="telefonoLaboral" :visible="false" />
      <dx-column data-field="correoLaboral" :visible="false" />
      <dx-column
        data-field="idPropietario"
        caption="Propietario"
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
  DxToolbar,
  DxForm,
  DxPopup,
} from "devextreme-vue/data-grid";

import api from "@/scripts/api";
import notify from "devextreme/ui/notify";
import auth from "@/auth";
import CustomStore from "devextreme/data/custom_store";
import { DxItem } from "devextreme-vue/form";

export default {
  data() {
    return {
      contactsData: new CustomStore({
        key: "idContacto",
        load: () => this.sendRequest("/contacto"),
        insert: (values) => this.sendRequest("/contacto", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/contacto/${key}`, "PUT", values),
        /*remove: (key) => this.sendRequest(`${URL}/DeleteOrder1`, 'DELETE', {
          key,
        }), */
      }),
      documentsTypes: [{}],
      editedItem: {}
    };
  },
  methods: {
    sendRequest(url, method = "GET", data = {}) {
      let token = auth.getAutorizationToken();

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
            return response.data.data;
          })
          .catch((error) => {
            notify(error.response.data.error.message, "error", 2000);
          });
      }
    },

    calculateCellValue(data) {
      return [data.nombres, data.apellidos].join(" ");
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
  },
};
</script>
