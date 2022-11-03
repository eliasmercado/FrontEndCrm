<template>
  <div>
    <dx-button
      v-if="btnVolverInfo"
      icon="back"
      text="Volver"
      @click="showTaskInfo"
    />
    <br v-if="btnVolverInfo" />
    <br v-if="btnVolverInfo" />

    <div id="form-container" v-if="viewTaskInfo">
      <dx-form id="form" :col-count="2" :form-data="taskInfo">
        <template #titleTemplate>
          <div>
            <div>Título</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.titulo"
            />
          </div>
        </template>
        <template #descriptionTemplate>
          <div>
            <div>Descripción</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.descripcion"
            />
          </div>
        </template>
        <template #typeTemplate>
          <div>
            <div>Tipo</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.tipo"
            />
          </div>
        </template>
        <template #statusTemplate>
          <div>
            <div>Estado</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.estado"
            />
          </div>
        </template>
        <template #startDateTemplate>
          <div>
            <div>Fecha de Inicio</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.fechaInicio"
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
              :value="taskInfo.fechaCierre"
            />
          </div>
        </template>
        <template #ownerTemplate>
          <div>
            <div>Responsable</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.responsable"
            />
          </div>
        </template>
        <template #closeTaskTemplate>
          <dx-button
            v-if="taskInfo.estado == 'Abierta'"
            text="Finalizar Tarea"
            type="default"
            @click="closeTask"
            styling-mode="outlined"
          />
        </template>
        <!-- Seccion para Contacto Asociado -->
        <template #contactNameTemplate>
          <div>
            <div>Nombre Completo</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.contactoAsociado.nombreCompleto"
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
              :value="taskInfo.contactoAsociado.celular"
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
              :value="taskInfo.contactoAsociado.email"
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
              :value="taskInfo.empresaAsociada.nombre"
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
              :value="taskInfo.empresaAsociada.celular"
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
              :value="taskInfo.empresaAsociada.telefono"
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
              :value="taskInfo.empresaAsociada.email"
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

        <!-- Seccion para oportunidad Asociado -->
        <template #opportunityNameTemplate>
          <div>
            <div>Nombre</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.oportunidadAsociada.nombre"
            />
          </div>
        </template>
        <template #opportunityStageTemplate>
          <div>
            <div>Etapa</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.oportunidadAsociada.etapa"
            />
          </div>
        </template>
        <template #opportunityValueTemplate>
          <div>
            <div>Valor</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.oportunidadAsociada.valor"
            />
          </div>
        </template>
        <template #opportunityContactTemplate>
          <div>
            <div>Contacto</div>
            <dx-text-box
              :read-only="true"
              :hover-state-enabled="false"
              styling-mode="underlined"
              :value="taskInfo.oportunidadAsociada.contacto"
            />
          </div>
        </template>
        <template #opportunityViewTemplate>
          <dx-button
            text="Ver mas"
            icon="plus"
            type="default"
            @click="showOpportunityInfo"
            styling-mode="outlined"
          />
        </template>
        <!-- Fin seccion para oportunidad asociada -->
        <dx-group-item>
          <dx-group-item caption="Información de la Tarea" :col-count="1">
            <dx-simple-item template="titleTemplate" />
            <dx-simple-item template="descriptionTemplate" />
            <dx-simple-item template="typeTemplate" />
            <dx-simple-item template="statusTemplate" />
            <dx-simple-item template="startDateTemplate" />
            <dx-simple-item template="endDateTemplate" />
            <dx-simple-item template="ownerTemplate" />
            <!--             <dx-simple-item template="closeTaskTemplate" />
 -->
          </dx-group-item>
        </dx-group-item>
        <dx-group-item
          caption="Contacto Asociado"
          :col-count="1"
          v-if="taskInfo.asociarCon == 'Contacto'"
        >
          <dx-simple-item template="contactNameTemplate" />
          <dx-simple-item template="contactPhoneTemplate" />
          <dx-simple-item template="contactEmailTemplate" />
          <dx-simple-item template="contactViewTemplate" />
        </dx-group-item>
        <dx-group-item
          caption="Empresa Asociada"
          :col-count="1"
          v-if="taskInfo.asociarCon == 'Empresa'"
        >
          <dx-simple-item template="companyNameTemplate" />
          <dx-simple-item template="companyCellPhoneTemplate" />
          <dx-simple-item template="companyPhoneTemplate" />
          <dx-simple-item template="companyEmailTemplate" />
          <dx-simple-item template="companyViewTemplate" />
        </dx-group-item>
        <dx-group-item
          caption="Oportunidad Asociada"
          :col-count="1"
          v-if="taskInfo.asociarCon == 'Oportunidad'"
        >
          <dx-simple-item template="opportunityNameTemplate" />
          <dx-simple-item template="opportunityStageTemplate" />
          <dx-simple-item template="opportunityValueTemplate" />
          <dx-simple-item template="opportunityContactTemplate" />
          <dx-simple-item template="opportunityViewTemplate" />
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

    <opportunity-info
      v-if="viewOpportunityInfo"
      :opportunityId="opportunityId"
    />
  </div>
</template>

<script>
import { DxForm, DxSimpleItem, DxGroupItem } from "devextreme-vue/form";
import DxTextBox from "devextreme-vue/text-box";
import DxDateBox from "devextreme-vue/date-box";
import DxButton from "devextreme-vue/button";
import ContactInfo from "@/components/contacts/contact-info";
import CompanyInfo from "@/components/contacts/company-info";
import OpportunityInfo from "@/components/sales/opportunity-info.vue";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";

export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxTextBox,
    DxDateBox,
    DxButton,
    ContactInfo,
    OpportunityInfo,
    CompanyInfo,
  },
  data() {
    return {
      taskInfo: {},
      cityData: [],
      stateData: [],
      documentsData: [],
      civilStatusData: [],
      economicActivityData: [],
      contactInfo: {},
      companyInfo: {},
      opportunityId: 0,
      viewTaskInfo: true,
      viewContactInfo: false,
      viewCompanyInfo: false,
      viewOpportunityInfo: false,
      btnVolverInfo: false,
    };
  },

  methods: {
    showTaskInfo() {
      this.btnVolverInfo = false;
      this.$emit("hidden-button-add", false);
      this.viewTaskInfo = true;
      this.viewContactInfo = false;
      this.viewCompanyInfo = false;
      this.viewOpportunityInfo = false;
    },

    async showContactInfo() {
      await this.viewContact();
      this.btnVolverInfo = true;
      this.$emit("hidden-button-add", true);
      this.viewTaskInfo = false;
      this.viewContactInfo = true;
      this.viewCompanyInfo = false;
      this.viewOpportunityInfo = false;
    },

    async showCompanyInfo() {
      await this.viewCompany();
      this.btnVolverInfo = true;
      this.$emit("hidden-button-add", true);
      this.viewTaskInfo = false;
      this.viewContactInfo = false;
      this.viewCompanyInfo = true;
      this.viewOpportunityInfo = false;
    },

    async showOpportunityInfo() {
      this.opportunityId = this.taskInfo.oportunidadAsociada.idOportunidad;
      this.btnVolverInfo = true;
      this.$emit("hidden-button-add", true);
      this.viewTaskInfo = false;
      this.viewContactInfo = false;
      this.viewCompanyInfo = false;
      this.viewOpportunityInfo = true;
    },

    async getTaskInfo() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/tarea/info/" + this.taskId, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.taskInfo = response.data.data;
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
        .get("/contacto/" + this.taskInfo.contactoAsociado.idContacto, {
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
        .get("/empresa/" + this.taskInfo.empresaAsociada.idEmpresa, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.companyInfo = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    closeTask() {
      let token = auth.getAuthorizationToken();

      api
        .put(
          "/tarea/cerrar-tarea/" + this.taskInfo.idTarea,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          this.taskInfo.estado = "Cerrada";
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },
  },
  created() {
    this.getTaskInfo();
  },

  props: {
    taskId: Number,
  },
};
</script>

<style>
</style>