<template>
  <div class="content-block">
    <h2>Posibles Contactos</h2>

    <dx-data-grid
      v-show="!viewContactInfo"
      class="dx-card wide-card"
      :data-source="contactsData"
      :show-column-lines="false"
      :show-row-lines="true"
      :show-borders="true"
      :row-alternation-enabled="true"
      :repaint-changes-only="true"
      :column-hiding-enabled="true"
      :column-auto-width="true"
      @init-new-row="initRow"
      @row-updating="getJsonForUpdate"
      @exporting="onExporting"
    >
      <dx-export :enabled="true" />
      <dx-search-panel :visible="true" :width="300"></dx-search-panel>
      <dx-paging :page-size="10" />
      <dx-pager :show-page-size-selector="true" :show-info="true" />

      <!-- Columnas de la grilla -->
      <dx-column
        :calculate-cell-value="calculateCellValue"
        caption="Nombre Completo"
        :allow-sorting="false"
        :hiding-priority="6"
      />
      <dx-column data-field="idContacto" :visible="false" />
      <dx-column data-field="nombres" :visible="false">
        <dx-required-rule />
      </dx-column>
      <dx-column data-field="apellidos" :visible="false">
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="celular"
        caption="Celular"
        :allow-sorting="false"
        :allowFiltering="false"
        :hiding-priority="4"
      >
        <dx-required-rule />
      </dx-column>

      <dx-column
        data-field="email"
        caption="Email"
        :allowFiltering="false"
        :allow-sorting="false"
        :hiding-priority="1"
      >
        <dx-email-rule />
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="fechaNacimiento"
        data-type="date"
        :visible="false"
        caption="Fecha de Nacimiento"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column
        data-field="idEstadoCivil"
        :visible="false"
        caption="Estado Civil"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="civilStatusData"
          value-expr="idEstadoCivil"
          display-expr="estadoCivil"
        />
      </dx-column>
      <dx-column
        data-field="idTipoDocumento"
        caption="Tipo de Documento"
        :allow-sorting="false"
        :hiding-priority="2"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="documentsData"
          value-expr="idTipoDocumento"
          display-expr="tipoDocumento"
        />
      </dx-column>

      <dx-column
        data-field="documento"
        caption="Documento"
        :allow-sorting="false"
        :hiding-priority="3"
      >
        <dx-required-rule />
      </dx-column>
      <dx-column data-field="direccion" :visible="false">
        <dx-required-rule />
      </dx-column>
      <dx-column data-field="idCiudad" :visible="false" caption="Ciudad">
        <dx-required-rule />
        <dx-lookup
          :data-source="getFilteredCities"
          value-expr="idCiudad"
          display-expr="ciudad"
        />
      </dx-column>
      <dx-column
        :set-cell-value="setStateValue"
        data-field="idDepartamento"
        :visible="false"
        caption="Departamento"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="stateData"
          value-expr="idDepartamento"
          display-expr="departamento"
        />
      </dx-column>
      <dx-column
        data-field="idActividadEconomica"
        :visible="false"
        caption="Actividad Económica"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="economicActivityData"
          value-expr="idActividadEconomica"
          display-expr="actividadEconomica"
        />
      </dx-column>
      <dx-column
        data-field="nombreEmpresa"
        :visible="false"
        caption="Nombre de la Empresa"
      />
      <dx-column data-field="direccionLaboral" :visible="false" />
      <dx-column data-field="telefonoLaboral" :visible="false" />
      <dx-column data-field="correoLaboral" :visible="false">
        <dx-email-rule />
      </dx-column>
      <dx-column
        data-field="idPropietario"
        caption="Propietario"
        :allow-sorting="false"
        :hiding-priority="5"
      >
        <dx-required-rule />
        <dx-lookup
          :data-source="ownerData"
          value-expr="idPropietario"
          display-expr="propietario"
        />
      </dx-column>

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
        <dx-texts add-row="Agregar Contacto" /><dx-popup />
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
            <dx-item data-field="idDepartamento" />
            <dx-item data-field="idCiudad" />
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

      <dx-column type="buttons">
        <dx-button
          icon="info"
          hint="Ver información"
          :on-click="showContactInfo"
        />
        <dx-button name="edit" />
        <dx-button name="delete" />
      </dx-column>
    </dx-data-grid>

    <back-button
      icon="back"
      v-if="viewContactInfo"
      text="Volver"
      @click="viewContactInfo = false"
    />
    <br />
    <br />
    <contact-info
      :contact-info="contactInfo"
      :cities="cityData.__rawData"
      :states="stateData.__rawData"
      :documentsType="documentsData.__rawData"
      :civilStatus="civilStatusData.__rawData"
      :economicActivity="economicActivityData.__rawData"
      v-if="viewContactInfo"
    />
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
  DxExport,
  DxButton,
  DxItem as DxGridItem,
} from "devextreme-vue/data-grid";
import notify from "devextreme/ui/notify";
import CustomStore from "devextreme/data/custom_store";
import { DxItem } from "devextreme-vue/form";
import { DxButton as BackButton } from "devextreme-vue/button";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import api from "@/scripts/api";
import auth from "@/auth";
import ContactInfo from "@/components/contacts/contact-info";

const stateData = new CustomStore({
  key: "Value",
  loadMode: "raw",
  load: () => sendRequest("/departamento"),
});
const cityData = new CustomStore({
  key: "Value",
  loadMode: "raw",
  load: () => sendRequest("/ciudad"),
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

export default {
  data() {
    return {
      contactsData: new CustomStore({
        key: "idContacto",
        load: () => this.sendRequest("/contacto?esLead=true"),
        insert: (values) => this.sendRequest("/contacto", "POST", values),
        update: (key, values) =>
          this.sendRequest(`/contacto/${key}`, "PUT", values),
        remove: (key) => this.sendRequest(`/contacto/${key}`, "DELETE"),
      }),
      documentsData: new CustomStore({
        key: "Value",
        loadMode: "raw",
        load: () => this.sendRequest("/contacto/tipoDocumento"),
      }),
      civilStatusData: new CustomStore({
        key: "Value",
        loadMode: "raw",
        load: () => this.sendRequest("/contacto/estadoCivil"),
      }),
      economicActivityData: new CustomStore({
        key: "Value",
        loadMode: "raw",
        load: () => this.sendRequest("/contacto/actividadEconomica"),
      }),
      ownerData: new CustomStore({
        key: "Value",
        loadMode: "raw",
        load: () => this.sendRequest("/propietario"),
      }),
      stateData,
      cityData,
      setStateValue(rowData, value) {
        rowData.idCiudad = null;
        this.defaultSetCellValue(rowData, value);
      },
      viewContactInfo: false,
      contactInfo: {},
    };
  },
  methods: {
    sendRequest(url, method = "GET", data = {}) {
      let token = auth.getAuthorizationToken();
      data.esLead = true;

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

    calculateCellValue(data) {
      return [data.nombres, data.apellidos].join(" ");
    },

    getJsonForUpdate(e) {
      //devextreme solo retorna el valor que se edito, pero para el back se necesita el json completo.
      //por eso reemplazamos el newData.
      e.newData = Object.assign({}, e.oldData, e.newData);
    },

    initRow(e) {
      let user = auth.getUser();
      e.data.idPropietario = user.data.idUsuario;
    },

    showContactInfo(e) {
      this.contactInfo = e.row.data;
      this.viewContactInfo = true;
    },

    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Posibles Contactos");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "LeadContactos.xlsx"
          );
        });
      });
      e.cancel = true;
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
    ContactInfo,
    DxButton,
    DxSearchPanel,
    DxTexts,
    DxExport,
    BackButton,
    DxGridItem,
  },
};
</script>
