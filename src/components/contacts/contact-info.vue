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
              :value="contactInfo.idTipoDocumento"
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
              :value="contactInfo.idEstadoCivil"
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
              :value="contactInfo.idDepartamento"
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
              :value="contactInfo.idCiudad"
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
              :value="contactInfo.idActividadEconomica"
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
        :width="300"
        :height="280"
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
        <p>Modo Beta</p>
      </dx-popup>

      <dx-popup
        v-model="popupEmailVisible"
        :visible="popupEmailVisible"
        :drag-enabled="false"
        :show-close-button="false"
        :show-title="false"
        :width="300"
        :height="280"
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
        <p>Modo Beta</p>
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
} from "devextreme-vue/form";
import { DxPopup, DxPosition, DxToolbarItem } from "devextreme-vue/popup";
import DxTextBox from "devextreme-vue/text-box";
import DxDateBox from "devextreme-vue/date-box";
import DxButton from "devextreme-vue/button";

export default {
  data() {
    return {
      popupCallVisible: false,
      popupEmailVisible: false,
      positionOf: "",
      closeCallButtonOptions: {
        text: "Cancelar",
        onClick: () => {
          this.popupCallVisible = false;
        },
      },
      sendCallButtonOptions: {
        text: "Registrar",
        onClick: () => {
          this.popupCallVisible = false;
          console.log("Registrar");
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
          this.popupEmailVisible = false;
          console.log("Enviar Correo");
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
  },
  props: {
    contactInfo: Object,
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
  },
};
</script>

<style>
</style>
