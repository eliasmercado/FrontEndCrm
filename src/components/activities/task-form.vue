<template>
  <div>
    <div id="form-container">
      <form @submit="handleSubmit">
        <dx-form id="form" :form-data="task">
          <dx-group-item :col-count="3">
            <dx-item data-field="titulo">
              <dx-label text="Título" />
              <dx-required-rule message="Título es requerido" />
            </dx-item>
            <dx-item data-field="descripcion">
              <dx-label text="Descripción" />
              <dx-required-rule message="Descripción es requerido" />
            </dx-item>
            <dx-item
              editor-type="dxSelectBox"
              data-field="idTipo"
              :editor-options="{
                searchEnabled: true,
                items: taskTypes,
                displayExpr: 'tipoTarea',
                valueExpr: 'idTipoTarea',
              }"
            >
              <dx-label text="Tipo de Tarea" />
              <dx-required-rule message="Tipo de Tarea es requerido" />
            </dx-item>
            <dx-item
              editor-type="dxSelectBox"
              data-field="idEstado"
              :editor-options="{
                searchEnabled: true,
                items: taskStatuses,
                displayExpr: 'estadoTarea',
                valueExpr: 'idEstadoTarea',
              }"
            >
              <dx-label text="Estado" />
              <dx-required-rule message="Estado es requerido" />
            </dx-item>
            <dx-item
              data-field="fechaInicio"
              editor-type="dxDateBox"
              :editor-options="{ min: new Date() }"
            >
              <dx-label text="Fecha de Inicio" />
              <dx-required-rule message="Fecha de Inicio es requerido" />
            </dx-item>
            <dx-item
              data-field="fechaCierre"
              editor-type="dxDateBox"
              :editor-options="{ min: new Date() }"
            >
              <dx-label text="Fecha de Cierre" />
              <dx-required-rule message="Fecha de Cierre es requerido" />
            </dx-item>

            <dx-item
              editor-type="dxSelectBox"
              data-field="idResponsable"
              :editor-options="{
                searchEnabled: true,
                items: ownerData,
                displayExpr: 'propietario',
                valueExpr: 'idPropietario',
              }"
            >
              <dx-label text="Responsable" />
              <dx-required-rule message="Responsable es requerido" />
            </dx-item>
            <dx-item
              editor-type="dxSelectBox"
              data-field="asociarCon"
              :editor-options="{
                showClearButton: true,
                searchEnabled: true,
                items: associateWithOptions,
                onValueChanged: changeAssociateWith,
              }"
            >
              <dx-label text="Asociar con" />
            </dx-item>
            <dx-item
              editor-type="dxSelectBox"
              data-field="idContactoAsociado"
              :visible="isContact"
              :editor-options="{
                searchEnabled: true,
                items: contacts,
                displayExpr: 'nombre',
                valueExpr: 'idContacto',
              }"
            >
              <dx-label text="Contacto Asociado" />
              <dx-required-rule message="Contacto Asociado es requerido" />
            </dx-item>
            <dx-item
              editor-type="dxSelectBox"
              data-field="idEmpresaAsociada"
              :visible="isCompany"
              :editor-options="{
                searchEnabled: true,
                items: companies,
                displayExpr: 'nombre',
                valueExpr: 'idEmpresa',
              }"
            >
              <dx-label text="Empresa Asociada" />
              <dx-required-rule message="Empresa Asociada es requerida" />
            </dx-item>
            <dx-item
              editor-type="dxSelectBox"
              data-field="idOportunidadAsociada"
              :visible="isOpportunity"
              :editor-options="{
                searchEnabled: true,
                items: oportunities,
                displayExpr: 'nombre',
                valueExpr: 'idOportunidad',
              }"
            >
              <dx-label text="Oportunidad Asociada" />
              <dx-required-rule message="Oportunidad Asociada es requerida" />
            </dx-item>
          </dx-group-item>
          <dx-button-item horizontal-alignment="left">
            <dx-button-options
              type="default"
              text="Guardar Tarea"
              :useSubmitBehavior="true"
            />
          </dx-button-item>
        </dx-form>
      </form>
    </div>
  </div>
</template>
<script>
import {
  DxForm,
  DxItem,
  DxGroupItem,
  DxLabel,
  DxRequiredRule,
  DxButtonItem,
  DxButtonOptions,
} from "devextreme-vue/form";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";
import { DxPopup, DxToolbarItem } from "devextreme-vue/popup";
import { DxScrollView } from "devextreme-vue/scroll-view";

export default {
  components: {
    DxForm,
    DxItem,
    DxGroupItem,
    DxLabel,
    DxRequiredRule,
    DxButtonItem,
    DxButtonOptions,
    DxPopup,
    DxScrollView,
    DxToolbarItem,
  },
  data() {
    return {
      ownerData: [],
      taskTypes: [],
      taskStatuses: [],
      associateWithOptions: ["Contacto", "Empresa", "Oportunidad"],
      isContact: false,
      isCompany: false,
      isOpportunity: false,
      contacts: [],
      companies: [],
      oportunities: [],
    };
  },
  methods: {
    async getOwnerData() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/propietario", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          this.ownerData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getTaskTypes() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/tarea/tipo", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          this.taskTypes = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getStatuses() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/tarea/estado", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          this.taskStatuses = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    changeAssociateWith() {
      if (this.task.asociarCon == "Contacto") {
        this.getContacts();
        this.isContact = true;
        this.isCompany = false;
        this.isOpportunity = false;
      } else if (this.task.asociarCon == "Empresa") {
        this.getCompanies();
        this.isContact = false;
        this.isCompany = true;
        this.isOpportunity = false;
      } else if (this.task.asociarCon == "Oportunidad") {
        this.getOpportunities();
        this.isContact = false;
        this.isCompany = false;
        this.isOpportunity = true;
      } else {
        this.isContact = false;
        this.isCompany = false;
        this.isOpportunity = false;
      }
    },

    async getContacts() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/tarea/contacto", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.contacts = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getCompanies() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/tarea/empresa", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.companies = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getOpportunities() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/tarea/oportunidad", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.oportunities = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    handleSubmit(e) {
      e.preventDefault();
      if (this.task.fechaInicio > this.task.fechaCierre) {
        notify(
          "La fecha de cierre no puede ser menor a la fecha de inicio",
          "error",
          2000
        );
      } else {
        this.$emit("insert", this.task);
      }
    },
  },

  async created() {
    this.changeAssociateWith();
    this.getOwnerData();
    let user = auth.getUser();
    this.task.idResponsable = user.data.idUsuario;
    this.getTaskTypes();
    this.getStatuses();
  },
  props: {
    task: Object,
  },
};
</script>
<style>
</style>
