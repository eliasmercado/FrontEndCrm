<template>
  <div>
    <dx-button
      v-if="btnVolverInfo"
      icon="back"
      text="Volver"
      @click="showOpportunityInfo"
    />
    <br v-if="btnVolverInfo" />
    <br v-if="btnVolverInfo" />

    <div id="form-container" v-if="viewOpportunityInfo">
      <dx-form id="form" :col-count="3" :form-data="opportunityInfo">
        <template #nameTemplate>
          <div>
            <div>Nombre</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.nombre"
            />
          </div>
        </template>
        <template #endDateTemplate>
          <div>
            <div>Fecha de Cierre</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.fechaCierre"
            />
          </div>
        </template>
        <template #stageTemplate>
          <div>
            <div>Etapa</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.etapa"
            />
          </div>
        </template>
        <template #valueTemplate>
          <div>
            <div>Valor</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.valor"
            />
          </div>
        </template>
        <template #clientTypeTemplate>
          <div>
            <div>Tipo de Cliente</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.tipoCliente"
            />
          </div>
        </template>
        <template #priorityTemplate>
          <div>
            <div>Prioridad</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.prioridad"
            />
          </div>
        </template>
        <template #sourceTemplate>
          <div>
            <div>Fuente</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.fuente"
            />
          </div>
        </template>
        <template #branchTemplate>
          <div>
            <div>Sucursal</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.sucursal"
            />
          </div>
        </template>
        <template #obsTemplate>
          <div>
            <div>Observacion</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.observacion"
            />
          </div>
        </template>
        <template #ownerTemplate>
          <div>
            <div>Propietario</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.propietario"
            />
          </div>
        </template>

        <!-- Seccion para Contacto Asociado -->
        <template #contactNameTemplate>
          <div>
            <div>Nombre Completo</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.contactoAsociado.nombreCompleto"
            />
          </div>
        </template>
        <template #contactPhoneTemplate>
          <div>
            <div>Celular</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.contactoAsociado.celular"
            />
          </div>
        </template>
        <template #contactEmailTemplate>
          <div>
            <div>Email</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.contactoAsociado.email"
            />
          </div>
        </template>
        <template #contactViewTemplate>
          <dx-button
            text="Ver mas"
            icon="plus"
            type="default"
            @click="showContactInfo"
            styling-mode="outlined"
          />
        </template>
        <!-- Fin seccion para contacto asociado -->

        <!-- Seccion para empresa Asociado -->
        <template #companyNameTemplate>
          <div>
            <div>Nombre</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.empresaAsociada.nombre"
            />
          </div>
        </template>
        <template #companyCellPhoneTemplate>
          <div>
            <div>Celular</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.empresaAsociada.celular"
            />
          </div>
        </template>
        <template #companyPhoneTemplate>
          <div>
            <div>Teléfono</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.empresaAsociada.telefono"
            />
          </div>
        </template>
        <template #companyEmailTemplate>
          <div>
            <div>Email</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="opportunityInfo.empresaAsociada.email"
            />
          </div>
        </template>
        <template #companyViewTemplate>
          <dx-button
            text="Ver mas"
            icon="plus"
            type="default"
            @click="showCompanyInfo"
            styling-mode="outlined"
          />
        </template>
        <!-- Fin seccion para empresa asociada -->

        <!-- Seccion para detalle de la oportunidad -->
        <template #detailTemplate>
          <dx-data-grid
            id="productDetail"
            :show-borders="true"
            :data-source="opportunityInfo.detalles"
          >
            <dx-column
              caption="Producto"
              data-field="producto"
              :allow-sorting="false"
              :allow-header-filtering="false"
            />
            <dx-column
              data-field="cantidad"
              caption="Cantidad"
              alignment="left"
              :allow-sorting="false"
              :allow-header-filtering="false"
            />
            <dx-column type="buttons">
              <dx-button
                icon="info"
                hint="Ver información"
                :on-click="showProductInfo"
              />
            </dx-column>
          </dx-data-grid>
        </template>
        <!--Fin de seccion para detalle de la oportunidad  -->
        <dx-group-item>
          <dx-group-item caption="Información de la Oportunidad" :col-count="1">
            <dx-simple-item template="nameTemplate" />
            <dx-simple-item template="endDateTemplate" />
            <dx-simple-item template="stageTemplate" />
            <dx-simple-item template="valueTemplate" />
            <dx-simple-item template="clientTypeTemplate" />
            <dx-simple-item template="priorityTemplate" />
            <dx-simple-item template="sourceTemplate" />
            <dx-simple-item template="branchTemplate" />
            <dx-simple-item template="obsTemplate" />
            <dx-simple-item template="ownerTemplate" />
          </dx-group-item>
        </dx-group-item>
        <dx-group-item
          caption="Contacto Asociado"
          :col-count="1"
          v-if="opportunityInfo.tipoContacto == 'Contacto'"
        >
          <dx-simple-item template="contactNameTemplate" />
          <dx-simple-item template="contactPhoneTemplate" />
          <dx-simple-item template="contactEmailTemplate" />
          <dx-simple-item template="contactViewTemplate" />
        </dx-group-item>
        <dx-group-item
          caption="Empresa Asociada"
          :col-count="1"
          v-if="opportunityInfo.tipoContacto == 'Empresa'"
        >
          <dx-simple-item template="companyNameTemplate" />
          <dx-simple-item template="companyCellPhoneTemplate" />
          <dx-simple-item template="companyPhoneTemplate" />
          <dx-simple-item template="companyEmailTemplate" />
          <dx-simple-item template="companyViewTemplate" />
        </dx-group-item>
        <dx-group-item caption="Detalles de la Oportunidad" :col-count="1">
          <dx-simple-item template="detailTemplate" />
        </dx-group-item>
      </dx-form>
    </div>

    <contact-info
      :contact-info="contactInfo"
      :cities="cityData"
      :states="stateData"
      :documentsType="documentsData"
      :civilStatus="civilStatusData"
      :economicActivity="economicActivityData"
      v-if="viewContactInfo"
    />

    <company-info
      :company-info="companyInfo"
      :cities="cityData"
      :states="stateData"
      v-if="viewCompanyInfo"
    />

    <dx-popup
      :visible="viewProductInfo"
      :drag-enabled="false"
      :show-close-button="true"
      :show-title="true"
      :width="400"
      :height="280"
      container=".dx-viewport"
      title="Información del Producto"
      :on-hiding="closeInfoProduct"
    >
      <dx-position at="bottom" my="center" :of="positionOf" />

      <p>
        Descripción: <span>{{ productInfo.descripcion }}</span>
      </p>
      <p>
        Precio: <span>{{ productInfo.precio }}</span>
      </p>
      <p>
        Categoría: <span>{{ productInfo.categoria }}</span>
      </p>
      <p>
        Subcategoría: <span>{{ productInfo.subcategoria }}</span>
      </p>
      <p>
        Marca: <span>{{ productInfo.marca }}</span>
      </p>
    </dx-popup>
  </div>
</template>

<script>
import { DxForm, DxSimpleItem, DxGroupItem } from "devextreme-vue/form";
import { DxDataGrid, DxColumn, DxButton } from "devextreme-vue/data-grid";
import { DxPopup, DxPosition } from "devextreme-vue/popup";
import DxTextBox from "devextreme-vue/text-box";
import DxDateBox from "devextreme-vue/date-box";
import ContactInfo from "@/components/contacts/contact-info";
import CompanyInfo from "@/components/contacts/company-info";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";

export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxTextBox,
    DxDataGrid,
    DxColumn,
    DxDateBox,
    DxButton,
    ContactInfo,
    CompanyInfo,
    DxPopup,
    DxPosition,
  },
  data() {
    return {
      opportunityInfo: {},
      cityData: [],
      stateData: [],
      documentsData: [],
      civilStatusData: [],
      economicActivityData: [],
      contactInfo: {},
      companyInfo: {},
      viewOpportunityInfo: true,
      viewContactInfo: false,
      viewCompanyInfo: false,
      btnVolverInfo: false,
      viewProductInfo: false,
      productInfo: {},
      positionOf: "",
    };
  },

  methods: {
    showOpportunityInfo() {
      this.btnVolverInfo = false;
      this.$emit("hidden-button-add", false);
      this.viewOpportunityInfo = true;
      this.viewContactInfo = false;
      this.viewCompanyInfo = false;
    },

    async showContactInfo() {
      await this.viewContact();
      this.btnVolverInfo = true;
      this.$emit("hidden-button-add", true);
      this.viewOpportunityInfo = false;
      this.viewContactInfo = true;
      this.viewCompanyInfo = false;
    },

    async showCompanyInfo() {
      await this.viewCompany();
      this.btnVolverInfo = true;
      this.$emit("hidden-button-add", true);
      this.viewOpportunityInfo = false;
      this.viewContactInfo = false;
      this.viewCompanyInfo = true;
    },

    async showProductInfo(e) {
      let productId = e.row.data.idProducto;

      let token = auth.getAuthorizationToken();

      await api
        .get("/producto/info/" + productId, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.productInfo = response.data.data;
          this.positionOf = "#productDetail";
          this.viewProductInfo = true;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    closeInfoProduct() {
      this.viewProductInfo = false;
    },

    async getOpportunityInfo() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/oportunidad/info/" + this.opportunityId, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.opportunityInfo = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async viewContact() {
      //traemos primero todos los datos necesarios para llamar al componente
      await this.getCities();
      await this.getStates();
      await this.getDocumentsType();
      await this.getCivilStatuses();
      await this.getEconomicsActivities();

      let token = auth.getAuthorizationToken();

      await api
        .get("/contacto/" + this.opportunityInfo.contactoAsociado.idContacto, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.contactInfo = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getCities() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/ciudad", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.cityData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getStates() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/departamento", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.stateData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getDocumentsType() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/contacto/tipoDocumento", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.documentsData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getCivilStatuses() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/contacto/estadoCivil", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.civilStatusData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getEconomicsActivities() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/contacto/actividadEconomica", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.economicActivityData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async viewCompany() {
      //traemos primero todos los datos necesarios para llamar al componente
      await this.getCities();
      await this.getStates();

      let token = auth.getAuthorizationToken();

      await api
        .get("/empresa/" + this.opportunityInfo.empresaAsociada.idEmpresa, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.companyInfo = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },
  },
  created() {
    this.getOpportunityInfo();
  },

  props: {
    opportunityId: Number,
  },
};
</script>

<style>
</style>