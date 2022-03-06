<template>
  <div>
    <div id="form-container">
      <DxForm id="form" :col-count="2" :form-data="contactInfo">
        <template #nameTemplate>
          <div>
            <div>Nombre</div>
            <DxTextBox
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
            <DxDateBox
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
            <DxTextBox
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
            <DxTextBox
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
            <DxTextBox
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
            <DxTextBox
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
            <DxTextBox
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
            <DxTextBox
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
            <DxTextBox
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
            <DxTextBox
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
            <DxTextBox
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
            <DxTextBox
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
            <DxTextBox
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="contactInfo.correoLaboral"
            />
          </div>
        </template>
        <DxGroupItem>
          <DxGroupItem caption="Datos Básicos" :col-count="3">
            <DxSimpleItem template="nameTemplate" />
            <DxSimpleItem template="birthDateTemplate" />
            <DxSimpleItem template="documentTypeTemplate" />
            <DxSimpleItem template="documentTemplate" />
            <DxSimpleItem template="civilStatusTemplate" />
          </DxGroupItem>
          <DxGroupItem caption="Dirección de la casa" :col-count="3">
            <DxSimpleItem template="stateTemplate" />
            <DxSimpleItem template="cityTemplate" />
            <DxSimpleItem template="addressTemplate" />
          </DxGroupItem>
          <DxGroupItem caption="Datos Laborales" :col-count="3">
            <DxSimpleItem template="economicActivityTemplate" />
            <DxSimpleItem template="companyNameTemplate" />
            <DxSimpleItem template="companyAddressTemplate" />
            <DxSimpleItem template="companyPhoneTemplate" />
            <DxSimpleItem template="companyEmailTemplate" />
          </DxGroupItem>
          <DxGroupItem caption="Información de Contactos">
            <DxTabbedItem>
              <DxTabPanelOptions :defer-rendering="false" />
              <DxTab title="Phone">
                <DxSimpleItem data-field="Celular" />
              </DxTab>
              <DxTab title="Email">
                <DxSimpleItem data-field="Email" />
              </DxTab>
            </DxTabbedItem>
          </DxGroupItem>
        </DxGroupItem>
        <DxGroupItem caption="Últimos contactos realizados">
        </DxGroupItem>
      </DxForm>
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
import DxTextBox from "devextreme-vue/text-box";
import DxDateBox from "devextreme-vue/date-box";

export default {
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
    DxLabel,
    DxTextBox,
    DxDateBox,
  },
};
</script>

<style>
</style>