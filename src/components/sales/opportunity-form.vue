<template>
  <div>
    <div id="form-container">
      <form @submit="handleSubmit">
        <dx-form id="form" :form-data="opportunity">
          <dx-group-item>
            <dx-group-item :col-count="3" caption="Datos Básicos">
              <dx-item data-field="nombre">
                <dx-label text="Nombre de la oportunidad" />
                <dx-required-rule message="Nombre es requerido" />
              </dx-item>
              <dx-item data-field="fechaCierre" editor-type="dxDateBox">
                <dx-label text="Fecha de Cierre" />
                <dx-required-rule message="Fecha de Cierre es requerido" />
              </dx-item>
              <dx-item
                editor-type="dxSelectBox"
                data-field="idEtapa"
                :editor-options="{
                  searchEnabled: true,
                  items: stageData,
                  displayExpr: 'etapa',
                  valueExpr: 'idEtapa',
                }"
              >
                <dx-label text="Etapa" />
                <dx-required-rule message="Etapa es requerido" />
              </dx-item>
              <dx-item data-field="valor">
                <dx-label text="Valor" />
                <dx-required-rule message="Valor es requerido" />
              </dx-item>
              <dx-item
                editor-type="dxSelectBox"
                data-field="tipoCliente"
                :editor-options="{
                  onValueChanged: changeClientType,
                  searchEnabled: true,
                  items: clientType,
                }"
              >
                <dx-label text="Tipo de Cliente" />
                <dx-required-rule message="Tipo de Cliente es requerido" />
              </dx-item>
              <dx-item
                editor-type="dxSelectBox"
                data-field="idPrioridad"
                :editor-options="{
                  searchEnabled: true,
                  items: priorityData,
                  displayExpr: 'prioridad',
                  valueExpr: 'idPrioridad',
                }"
              >
                <dx-label text="Prioridad" />
                <dx-required-rule message="Prioridad es requerido" />
              </dx-item>
              <dx-item
                editor-type="dxSelectBox"
                data-field="idFuente"
                :editor-options="{
                  searchEnabled: true,
                  items: source,
                  displayExpr: 'fuente',
                  valueExpr: 'idFuente',
                }"
              >
                <dx-label text="Fuente" />
                <dx-required-rule message="Fuente es requerido" />
              </dx-item>
              <dx-item
                editor-type="dxSelectBox"
                data-field="idSucursal"
                :editor-options="{
                  searchEnabled: true,
                  items: branches,
                  displayExpr: 'sucursal',
                  valueExpr: 'idSucursal',
                }"
              >
                <dx-label text="Sucursal" />
                <dx-required-rule message="Sucursal es requerido" />
              </dx-item>
            </dx-group-item>
            <dx-group-item>
              <dx-group-item
                :col-count="3"
                caption="Detalles de la Oportunidad"
              >
                <dx-item data-field="idContacto" :visible="isLead == false">
                  <dx-label text="Contacto Asociado" />
                  <dx-required-rule message="Contacto Asociado es requerido" />
                </dx-item>
                <dx-item data-field="idLead" :visible="isLead == true">
                  <dx-label text="Lead Asociado" />
                  <dx-required-rule message="Lead Asociado es requerido" />
                </dx-item>

                <dx-button-item
                  css-class="btnAddLead"
                  :visible="isLead == true"
                >
                  <dx-button-options text="Agregar Lead" />
                </dx-button-item>
              </dx-group-item>
            </dx-group-item>
            <dx-group-item>
              <dx-group-item :col-count="3" caption="Datos de la Oportunidad">
                <dx-item
                  editor-type="dxSelectBox"
                  data-field="idPropietario"
                  :editor-options="{
                    searchEnabled: true,
                    items: ownerData,
                    displayExpr: 'propietario',
                    valueExpr: 'idPropietario',
                  }"
                >
                  <dx-required-rule message="Propietario es requerido" />
                  <dx-label text="Propietario" />
                </dx-item>
                <dx-item data-field="observacion" />
              </dx-group-item>
            </dx-group-item>
          </dx-group-item>

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

export default {
  components: {
    DxForm,
    DxItem,
    DxGroupItem,
    DxLabel,
    DxRequiredRule,
    DxButtonItem,
    DxButtonOptions,
  },
  data() {
    return {
      ownerData: [],
      isLead: null,
      stageData: [],
      priorityData: [],
      clientType: ["Existente", "Lead"],
      source: [{ idFuente: 1, fuente: "CRM" }],
      branches: [{ idSucursal: 1, sucursal: "matriz" }],
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

    async getStage() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/oportunidad/etapa", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.stageData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getPriorities() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/prioridad", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          this.priorityData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    changeClientType() {
      if (this.opportunity.tipoCliente == "Existente") {
        this.isLead = false;
      } else if (this.opportunity.tipoCliente == "Lead") {
        this.isLead = true;
      } else {
        this.isLead = null;
      }
    },

    handleSubmit(e) {
      e.preventDefault();
      this.$emit("insert", this.opportunity);
    },
  },
  created() {
    this.getOwnerData();
    this.getStage();
    this.getPriorities();
    this.changeClientType();

    let user = auth.getUser();
    this.opportunity.idPropietario = user.data.idUsuario;
  },
  props: {
    opportunity: Object,
  },
};
</script>
<style>
.btnAddLead {
  margin-top: 50px;
  margin-right: 200px;
}
</style>
