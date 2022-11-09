<template>
  <div>
    <div id="form-container">
      <dx-form id="form" :col-count="2" :form-data="contactInfo">
        <template #nameTemplate>
          <div>
            <div>Nombre</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.nombres + ' ' + contactInfo.apellidos"
            />
          </div>
        </template>
        <template #birthDateTemplate>
          <div>
            <div>Fecha de Nacimiento</div>
            <dx-date-box
              styling-mode="underlined"
              :read-only="true"
              type="date"
              :value="contactInfo.fechaNacimiento"
            />
          </div>
        </template>
        <template #documentTypeTemplate>
          <div>
            <div>Tipo de Documento</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="getDocumentType(contactInfo.idTipoDocumento)"
            />
          </div>
        </template>
        <template #documentTemplate>
          <div>
            <div>Documento</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.documento"
            />
          </div>
        </template>
        <template #civilStatusTemplate>
          <div>
            <div>Estado Civil</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="getCivilStatusName(contactInfo.idEstadoCivil)"
            />
          </div>
        </template>
        <template #stateTemplate>
          <div>
            <div>Departamento</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="getStateName(contactInfo.idDepartamento)"
            />
          </div>
        </template>
        <template #cityTemplate>
          <div>
            <div>Ciudad</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="getCityName(contactInfo.idCiudad)"
            />
          </div>
        </template>
        <template #addressTemplate>
          <div>
            <div>Dirección</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.direccion"
            />
          </div>
        </template>
        <template #economicActivityTemplate>
          <div>
            <div>Acitividad Económica</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="getEconomicActivityName(contactInfo.idActividadEconomica)"
            />
          </div>
        </template>
        <template #companyNameTemplate>
          <div>
            <div>Acitividad Económica</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.nombreEmpresa"
            />
          </div>
        </template>
        <template #companyAddressTemplate>
          <div>
            <div>Dirección Laboral</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.direccionLaboral"
            />
          </div>
        </template>
        <template #companyPhoneTemplate>
          <div>
            <div>Teléfono laboral</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.telefonoLaboral"
            />
          </div>
        </template>
        <template #companyEmailTemplate>
          <div>
            <div>Correo Laboral</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.correoLaboral"
            />
          </div>
        </template>
        <template #phoneTemplate>
          <div class="row">
            <dx-text-box
              style="width: 300px"
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.celular"
            />
            <dx-button id="buttonCall" icon="tel" @click="showCallInfo" />
          </div>
        </template>
        <template #emailTemplate>
          <div class="row">
            <dx-text-box
              style="width: 300px"
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.email"
            />
            <dx-button id="buttonEmail" icon="email" @click="showEmailInfo" />
          </div>
        </template>
        <template #communicationsTemplate>
          <dx-data-grid
            :show-borders="true"
            :data-source="contactInfo.comunicaciones"
          >
            <dx-paging :page-size="10" />

            <dx-column
              caption="Tipo"
              data-field="tipo"
              :allow-sorting="false"
              :allow-header-filtering="false"
            />
            <dx-column
              data-field="motivo"
              caption="Motivo"
              :allow-sorting="false"
              :allow-header-filtering="false"
            />
            <dx-column
              data-field="fecha"
              caption="Fecha"
              :allow-sorting="false"
              :allow-header-filtering="false"
            />
          </dx-data-grid>
        </template>
        <dx-group-item>
          <dx-group-item caption="Datos Básicos" :col-count="3">
            <dx-simple-item template="nameTemplate" />
            <dx-simple-item template="birthDateTemplate" />
            <dx-simple-item template="documentTypeTemplate" />
            <dx-simple-item template="documentTemplate" />
            <dx-simple-item template="civilStatusTemplate" />
          </dx-group-item>
          <dx-group-item caption="Dirección de la casa" :col-count="3">
            <dx-simple-item template="stateTemplate" />
            <dx-simple-item template="cityTemplate" />
            <dx-simple-item template="addressTemplate" />
          </dx-group-item>
          <dx-group-item caption="Datos Laborales" :col-count="3">
            <dx-simple-item template="economicActivityTemplate" />
            <dx-simple-item template="companyNameTemplate" />
            <dx-simple-item template="companyAddressTemplate" />
            <dx-simple-item template="companyPhoneTemplate" />
            <dx-simple-item template="companyEmailTemplate" />
          </dx-group-item>
          <dx-group-item caption="Información de Contactos">
            <dx-tabbed-item>
              <dx-tab-panel-options :defer-rendering="false" />
              <dx-tab title="Celular">
                <dx-simple-item template="phoneTemplate" />
              </dx-tab>
              <dx-tab title="Email">
                <dx-simple-item template="emailTemplate" />
              </dx-tab>
            </dx-tabbed-item>
          </dx-group-item>
        </dx-group-item>
        <dx-group-item caption="Últimos contactos realizados">
          <dx-simple-item template="communicationsTemplate" />
        </dx-group-item>
      </dx-form>

      <dx-popup
        v-model="popupCallVisible"
        :visible="popupCallVisible"
        :drag-enabled="false"
        :show-close-button="false"
        :show-title="false"
        :width="400"
        :height="460"
        container=".dx-viewport"
        title="Information"
      >
        <dx-position
          v-model="popupCallVisible"
          at="right"
          my="bottom"
          of="#buttonCall"
        />
        <dx-toolbar-item
          widget="dxButton"
          toolbar="bottom"
          location="after"
          :options="sendCallButtonOptions"
        />
        <dx-toolbar-item
          widget="dxButton"
          toolbar="bottom"
          location="after"
          :options="closeCallButtonOptions"
        />
        <dx-text-box
          :read-only="true"
          v-model="callData.phoneNumber"
          label-mode="static"
          styling-mode="underlined"
          label="Celular"
        />
        <br />
        <dx-date-box
          v-model="callData.callDate"
          type="datetime"
          label-mode="static"
          styling-mode="underlined"
          label="Fecha de llamada"
        />
        <br />
        <dx-text-box
          v-model="callData.callReason"
          label-mode="static"
          styling-mode="underlined"
          label="Motivo de llamada"
        />
        <br />
        <dx-text-area
          v-model="callData.observations"
          label-mode="static"
          styling-mode="underlined"
          label="Observaciones"
          :height="200"
          :max-length="200"
        />
      </dx-popup>

      <dx-popup
        v-model="popupEmailVisible"
        :visible="popupEmailVisible"
        :drag-enabled="false"
        :show-close-button="false"
        :show-title="false"
        container=".dx-viewport"
        title="Information"
      >
        <dx-position v-model="popupEmailVisible" at="center" my="center" />
        <dx-toolbar-item
          widget="dxButton"
          toolbar="bottom"
          location="after"
          :options="sendEmailButtonOptions"
        />
        <dx-toolbar-item
          widget="dxButton"
          toolbar="bottom"
          location="after"
          :options="closeEmailButtonOptions"
        />
        <dx-text-box
          v-model="emailData.to"
          label-mode="static"
          styling-mode="underlined"
          label="Para"
          :read-only="true"
        />
        <br />
        <dx-text-box
          v-model="emailData.subject"
          label-mode="static"
          styling-mode="underlined"
          label="Asunto"
        />
        <br />
        <dx-html-editor
          v-model="emailData.emailContent"
          value-type="HTML"
          :height="400"
        >
          <dx-toolbar>
            <dx-item name="undo" />
            <dx-item name="redo" />
            <dx-item name="separator" />
            <dx-item :accepted-values="sizeValues" name="size" />
            <dx-item :accepted-values="fontValues" name="font" />
            <dx-item name="separator" />
            <dx-item name="bold" />
            <dx-item name="italic" />
            <dx-item name="strike" />
            <dx-item name="underline" />
            <dx-item name="separator" />
            <dx-item name="link" />
            <dx-item name="separator" />
            <dx-item name="alignLeft" />
            <dx-item name="alignCenter" />
            <dx-item name="alignRight" />
            <dx-item name="alignJustify" />
            <dx-item name="separator" />
            <dx-item name="orderedList" />
            <dx-item name="bulletList" />
            <dx-item name="separator" />
          </dx-toolbar>
        </dx-html-editor>
      </dx-popup>
    </div>
  </div>
</template>
<script>
import {
  DxForm,
  DxSimpleItem,
  DxGroupItem,
  DxTabbedItem,
  DxTabPanelOptions,
  DxTab,
  DxLabel,
} from "devextreme-vue/form";
import { DxDataGrid, DxColumn, DxPaging } from "devextreme-vue/data-grid";
import { DxHtmlEditor, DxToolbar, DxItem } from "devextreme-vue/html-editor";
import { DxPopup, DxPosition, DxToolbarItem } from "devextreme-vue/popup";
import DxTextBox from "devextreme-vue/text-box";
import DxDateBox from "devextreme-vue/date-box";
import DxButton from "devextreme-vue/button";
import DxTagBox from "devextreme-vue/tag-box";
import DxTextArea from "devextreme-vue/text-area";
import notify from "devextreme/ui/notify";
import auth from "@/auth";
import api from "@/scripts/api";

export default {
  data() {
    return {
      headerValues: [false, 1, 2, 3, 4, 5],
      sizeValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"],
      fontValues: [
        "Arial",
        "Courier New",
        "Georgia",
        "Impact",
        "Lucida Console",
        "Tahoma",
        "Times New Roman",
        "Verdana",
      ],
      popupCallVisible: false,
      popupEmailVisible: false,
      positionOf: "",
      emailData: {
        to: this.contactInfo.email,
        subject: "",
        emailContent: "",
      },
      callData: {
        phoneNumber: this.contactInfo.celular,
        callDate: new Date(),
        callReason: null,
        observations: null,
      },
      closeCallButtonOptions: {
        text: "Cancelar",
        onClick: () => {
          this.popupCallVisible = false;
        },
      },
      sendCallButtonOptions: {
        useSubmitBehavior: true,
        text: "Registrar",
        onClick: () => {
          var data = {
            idContacto: this.contactInfo.idContacto,
            motivoComunicacion: !this.callData.callReason
              ? "Sin Motivo"
              : this.callData.callReason,
            observacion: this.callData.observations,
            idUsuario: auth.getUser().data.idUsuario,
            referencia: this.callData.phoneNumber,
            fechaComunicacion: this.convertUTCDateToLocalDate(
              this.callData.callDate
            ),
          };

          this.sendRequest("/comunicacion/llamada", data);

          //Volvemos a un valor por default
          this.callData = {
            phoneNumber: this.contactInfo.celular,
            callDate: new Date(),
            callReason: null,
            observations: null,
          };
          this.popupCallVisible = false;
        },
      },
      closeEmailButtonOptions: {
        text: "Cancelar",
        onClick: () => {
          this.popupEmailVisible = false;
        },
      },
      sendEmailButtonOptions: {
        text: "Enviar Correo",
        onClick: () => {
          var data = {
            idContacto: this.contactInfo.idContacto,
            motivoComunicacion: this.emailData.subject,
            referencia: this.emailData.to,
            contenidoEmail: this.emailData.emailContent,
            idUsuario: auth.getUser().data.idUsuario,
          };

          this.sendRequest("/comunicacion/correo", data);

          //volvemos al valor por default
          this.emailData = {
            to: this.contactInfo.email,
            subject: "",
            emailContent: "",
          };
          this.popupEmailVisible = false;
        },
      },
    };
  },
  methods: {
    async sendRequest(url, data = {}) {
      let token = auth.getAuthorizationToken();
      let result;

      await api
        .post(url, data, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify("Error inesperado al realizar la acción.", "error", 2000);
        });

      return result;
    },

    showCallInfo() {
      this.popupCallVisible = true;
    },

    showEmailInfo() {
      this.popupEmailVisible = true;
    },

    getDocumentType(documentTypeId) {
      //creamos una clave id para usar un solo metodo comun para todos
      this.documentsType.forEach((element) => {
        element.id = element.idTipoDocumento;
      });
      var item = this.searchItemById(this.documentsType, documentTypeId);

      return item.tipoDocumento;
    },

    getStateName(stateId) {
      //creamos una clave id para usar un solo metodo comun para todos
      this.states.forEach((element) => {
        element.id = element.idDepartamento;
      });
      var item = this.searchItemById(this.states, stateId);

      return item.departamento;
    },

    getCityName(cityId) {
      //creamos una clave id para usar un solo metodo comun para todos
      this.cities.forEach((element) => {
        element.id = element.idCiudad;
      });
      var item = this.searchItemById(this.cities, cityId);

      return item.ciudad;
    },

    getCivilStatusName(civilStatusId) {
      //creamos una clave id para usar un solo metodo comun para todos
      this.civilStatus.forEach((element) => {
        element.id = element.idEstadoCivil;
      });
      var item = this.searchItemById(this.civilStatus, civilStatusId);

      return item.estadoCivil;
    },

    getEconomicActivityName(economicActivityId) {
      //creamos una clave id para usar un solo metodo comun para todos
      this.economicActivity.forEach((element) => {
        element.id = element.idActividadEconomica;
      });
      var item = this.searchItemById(this.economicActivity, economicActivityId);

      return item.actividadEconomica;
    },

    searchItemById(items, id) {
      return items.find(function (item) {
        return item.id === id;
      });
    },

    convertUTCDateToLocalDate(date) {
      var newDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60 * 1000
      );

      var offset = date.getTimezoneOffset() / 60;
      var hours = date.getHours();

      newDate.setHours(hours - offset);

      return newDate;
    },
  },

  props: {
    contactInfo: Object,
    cities: Array,
    states: Array,
    documentsType: Array,
    civilStatus: Array,
    economicActivity: Array,
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxTabbedItem,
    DxTabPanelOptions,
    DxTab,
    DxTextBox,
    DxDateBox,
    DxButton,
    DxPopup,
    DxPosition,
    DxToolbarItem,
    DxLabel,
    DxTagBox,
    DxTextArea,
    DxHtmlEditor,
    DxToolbar,
    DxItem,
    DxDataGrid,
    DxColumn,DxPaging
  },
};
</script>

<style>
.dx-htmleditor-content img {
  vertical-align: middle;
  padding-right: 10px;
}

.value-content {
  margin-top: 20px;
  overflow: auto;
  height: 110px;
  width: 100%;
  white-space: pre-wrap;
}
</style>
