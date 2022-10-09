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
              <dx-item data-field="valor" editor-type="dxNumberBox">
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
                <dx-item
                  editor-type="dxSelectBox"
                  data-field="idContactoAsociado"
                  :visible="isLead == false"
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
                  data-field="idContactoAsociado"
                  :visible="isLead == true"
                  :editor-options="{
                    searchEnabled: true,
                    items: leads,
                    displayExpr: 'nombre',
                    valueExpr: 'idContacto',
                  }"
                >
                  <dx-label text="Lead Asociado" />
                  <dx-required-rule message="Lead Asociado es requerido" />
                </dx-item>
<!--                 <dx-button-item
                  css-class="btnAddLead"
                  :visible="isLead == true"
                >
                  <dx-button-options text="Agregar Lead" />
                </dx-button-item> -->
              </dx-group-item>
              <!-- Para mostrar el listado de productos que se cargar en el popup -->
              <dx-item template="details"></dx-item>

              <dx-button-item
                horizontal-alignment="left"
                :button-options="btnAddProductOptions"
              >
              </dx-button-item>
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

          <template #details>
            <div
              class="productDetail"
              v-if="opportunity.detalles.length == '0'"
            >
              {{ infoProducts }}
            </div>
            <div v-else>
              <pre class="productDetail">{{ infoProducts }}</pre>
            </div>
          </template>
        </dx-form>
      </form>

      <dx-popup
        :width="550"
        :visible="showOpportunityDetail"
        :show-title="false"
        :hide-on-outside-click="false"
      >
        <template #content>
          <dx-scroll-view width="100%" height="100%">
            <opportunity-detail
              :opportunityDetail="opportunity.detalles"
              :products="products"
            ></opportunity-detail>
          </dx-scroll-view>
        </template>
        <dx-toolbar-item
          widget="dxButton"
          toolbar="bottom"
          location="after"
          :options="closePopupOptions"
        />
      </dx-popup>
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
import opportunityDetail from "@/components/sales/opportunity-detail.vue";
import { DxPopup, DxToolbarItem } from "devextreme-vue/popup";
import { DxScrollView } from "devextreme-vue/scroll-view";

export default {
  components: {
    "opportunity-detail": opportunityDetail,
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
      isLead: null,
      showOpportunityDetail: false,
      ownerData: [],
      stageData: [],
      priorityData: [],
      clientType: ["Existente", "Lead"],
      source: [],
      branches: [],
      products: [],
      contacts: [],
      leads: [],
      details: [],
      infoProducts: "",
      btnAddProductOptions: {
        text: "Editar Productos",
        type: "default",
        stylingMode: "outlined",
        onClick: this.addProducts,
      },
      closePopupOptions: {
        text: "Cerrar",
        onClick: () => {
          this.getOpportunityValue();
          this.showOpportunityDetail = false;
        },
      },
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

    async getSources() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/oportunidad/fuente", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.source = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getBranches() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/oportunidad/sucursal", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.branches = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getContacts() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/oportunidad/contacto", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.contacts = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getLeads() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/oportunidad/contacto?esLead=true", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.leads = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getProducts() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/producto", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          this.products = response.data.data;
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
      this.$emit("insert", this.opportunity, this.details);
    },

    addProducts() {
      this.showOpportunityDetail = true;
    },

    getInfoProducts() {
      let productStr = "";
      try {
        if (this.opportunity.detalles.length == "0") {
          return "No hay productos seleccionados.";
        } else {
          this.opportunity.detalles.forEach((detail) => {
            let productName = this.products.find(
              (p) => p.idProducto == detail.idProducto
            );
            productStr += `${productName.descripcion} - Cantidad: ${detail.cantidad}`;
            productStr += "\n";
          });
        }
        return productStr;
      } catch {}
    },

    getOpportunityValue() {
      let value = 0;
      try {
        if (this.opportunity.detalles.length == "0") {
          value = 0;
        } else {
          this.opportunity.detalles.forEach((detail) => {
            let productName = this.products.find(
              (p) => p.idProducto == detail.idProducto
            );
            value += parseInt(productName.precio * detail.cantidad);
          });
        }
        this.opportunity.valor = value;
        this.infoProducts = this.getInfoProducts();
        this.details = this.opportunity.detalles;
      } catch {}
    },
  },
  async created() {
    this.getOwnerData();
    let user = auth.getUser();
    this.opportunity.idPropietario = user.data.idUsuario;
    this.getStage();
    this.getPriorities();
    this.getBranches();
    this.getSources();
    this.getContacts();
    this.getLeads();
    await this.getProducts();
    this.getOpportunityValue();
    this.changeClientType();
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

.productDetail {
  font-size: 13px;
}
</style>
