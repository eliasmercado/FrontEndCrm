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
              :value="getStateName(contactInfo.idCiudad)"
            />
          </div>
        </template>
        <template #addressTemplate>
          <div>
            <div>Ciudad</div>
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
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.email"
            />
            <dx-button id="buttonEmail" icon="email" @click="showEmailInfo" />
          </div>
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
        <dx-group-item caption="Últimos contactos realizados"> </dx-group-item>
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
          :max-length="500"
        />
      </dx-popup>

      <dx-popup
        v-model="popupEmailVisible"
        :visible="popupEmailVisible"
        :drag-enabled="false"
        :show-close-button="false"
        :show-title="false"
        :width="400"
        :height="500"
        container=".dx-viewport"
        title="Information"
      >
        <dx-position
          v-model="popupEmailVisible"
          at="right"
          my="bottom"
          of="#buttonEmail"
        />
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
        <dx-tag-box
          label-mode="static"
          styling-mode="underlined"
          label="Para"
          v-model="emailData.to"
          :accept-custom-value="true"
        />
        <br />
        <dx-tag-box
          label-mode="static"
          styling-mode="underlined"
          label="CC"
          v-model="emailData.cc"
          :accept-custom-value="true"
        />
        <br />
        <dx-text-box
          v-model="emailData.subject"
          label-mode="static"
          styling-mode="underlined"
          label="Asunto"
        />
        <br />
        <dx-text-area
          v-model="emailData.message"
          label-mode="static"
          styling-mode="underlined"
          label="Mensaje"
          :height="200"
          :max-length="500"
        />
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
import { DxPopup, DxPosition, DxToolbarItem } from "devextreme-vue/popup";
import DxTextBox from "devextreme-vue/text-box";
import DxDateBox from "devextreme-vue/date-box";
import DxButton from "devextreme-vue/button";
import DxTagBox from "devextreme-vue/tag-box";
import DxTextArea from "devextreme-vue/text-area";
import notify from "devextreme/ui/notify";

export default {
  data() {
    return {
      popupCallVisible: false,
      popupEmailVisible: false,
      positionOf: "",
      emailData: {
        to: [this.contactInfo.email],
        cc: [],
        subject: null,
        message: null,
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
        text: "Registrar",
        onClick: () => {
          notify("La llamada se ha registrado correctamente.", "success", 2000);
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
          notify("El correo se ha enviado correctamente.", "success", 2000);
          this.popupEmailVisible = false;
        },
      },
    };
  },
  methods: {
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
  },
};
</script>

<style>
</style>
