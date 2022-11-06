<template>
  <div class="content-block">
    <h2>Resetar Contraseña</h2>

    <div id="form-container">
      <form @submit="handleSubmit">
        <dx-form id="form" :form-data="formData">
          <dx-item
            editor-type="dxSelectBox"
            data-field="idPropietario"
            :editor-options="{
              searchEnabled: true,
              items: usersData,
              displayExpr: 'propietario',
              valueExpr: 'idPropietario',
            }"
          >
            <dx-label text="Usuario" />
            <dx-required-rule message="Usuario es requerido" />
          </dx-item>
          <dx-button-item horizontal-alignment="left">
            <dx-button-options
              type="default"
              text="Resetear Contraseña"
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
      usersData: [],
      formData: {},
    };
  },

  methods: {
    async getUsers() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/propietario", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          this.usersData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    handleSubmit(e) {
      let token = auth.getAuthorizationToken();
      e.preventDefault();

      let data = {
        idUsuario: this.formData.idPropietario,
      };

      api
        .post("/usuario/resetear-password", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
          this.formData = {};
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },
  },

  created() {
    this.getUsers();
  },
};
</script>

<style>
</style>