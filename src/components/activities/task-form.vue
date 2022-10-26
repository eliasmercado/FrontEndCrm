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
            <dx-item data-field="fechaInicio" editor-type="dxDateBox">
              <dx-label text="Fecha de Inicio" />
              <dx-required-rule message="Fecha de Inicio es requerido" />
            </dx-item>
            <dx-item data-field="fechaCierre" editor-type="dxDateBox">
              <dx-label text="Fecha de Cierre" />
              <dx-required-rule message="Fecha de Cierre es requerido" />
            </dx-item>
          </dx-group-item>
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
          <dx-button-item horizontal-alignment="left">
            <dx-button-options
              type="default"
              text="Guardar Oportunidad"
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

    handleSubmit(e) {
      e.preventDefault();
      this.$emit("insert", this.task);
    },
  },

  async created() {
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
