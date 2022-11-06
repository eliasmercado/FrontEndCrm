<template>
  <div id="form-demo" class="content-block">
    <h2>Cambiar Contraseña</h2>

    <div class="widget-container">
      <form action="your-action" @submit="handleSubmit">
        <dx-form
          :form-data="customer"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="customerData"
        >
          <dx-group-item>
            <dx-simple-item
              :editor-options="passwordOptions"
              data-field="Password"
            >
              <dx-label text="Contraseña Actual" />
              <dx-required-rule message="Contraseña Actual es requerida" />
              <dx-async-rule
                :validation-callback="asyncValidation"
                message="La contraseña es incorrecta"
              />
            </dx-simple-item>
            <dx-simple-item
              :editor-options="passwordOptions"
              data-field="NewPassword"
            >
              <dx-label text="Contraseña Nueva" />
              <dx-required-rule message="Contraseña Nueva es requerida" />
            </dx-simple-item>
            <dx-simple-item
              :editor-options="passwordOptions"
              editor-type="dxTextBox"
            >
              <dx-label text="Confirmar Contraseña" />
              <dx-required-rule message="Confirmar Contraseña es requerida" />
              <dx-compare-rule
                :comparison-target="passwordComparison"
                message="Las contraseñas no coinciden"
              />
            </dx-simple-item>
          </dx-group-item>

          <dx-button-item
            :button-options="buttonOptions"
            horizontal-alignment="left"
          />
        </dx-form>
      </form>
    </div>
  </div>
</template>
<script>
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule,
  DxEmailRule,
  DxAsyncRule,
} from "devextreme-vue/form";
import DxAutocomplete from "devextreme-vue/autocomplete";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";

const sendRequest = function (value) {
  let token = auth.getAuthorizationToken();
  let user = auth.getUser();
  let validPass = false;

  let data = {
    idUsuario: user.data.idUsuario,
    password: value,
  };

  api
    .post("/usuario/validar-credencial", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      validPass = response.data.data;
    })
    .catch((error) => {
      notify(error.response.data.error.message, "error", 2000);
    });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(validPass);
    }, 1000);
  });
};

export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxEmailRule,
    DxStringLengthRule,
    DxForm,
    DxAutocomplete,
    DxAsyncRule,
    notify,
  },
  data() {
    return {
      customer: {},
      buttonOptions: {
        text: "Enviar",
        type: "default",
        useSubmitBehavior: true,
      },
      passwordOptions: {
        mode: "password",
      },
    };
  },
  methods: {
    passwordComparison() {
      return this.customer.NewPassword;
    },

    asyncValidation(params) {
      return sendRequest(params.value);
    },

    handleSubmit(e) {
      let token = auth.getAuthorizationToken();
      let user = auth.getUser();
      e.preventDefault();

      let data = {
        idUsuario: user.data.idUsuario,
        password: this.customer.NewPassword,
      };

      api
        .post("/usuario/cambiar-password", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
          auth.logOut();
          this.$router.push({
            path: "/login",
          });
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },
  },
};
</script>
<style scoped>
form {
  margin: 10px;
}
</style>
