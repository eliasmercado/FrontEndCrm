<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <dx-form :form-data="formData" :disabled="loading">
      <dx-item
        data-field="user"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: 'Usuario' }"
      >
        <dx-required-rule message="Usuario es requerido" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field="password"
        editor-type="dxTextBox"
        :editor-options="{
          stylingMode: 'filled',
          placeholder: 'Contraseña',
          mode: 'password',
        }"
      >
        <dx-required-rule message="Password es requerido" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field="rememberMe"
        editor-type="dxCheckBox"
        :editor-options="{
          text: 'Recordar usuario',
          elementAttr: { class: 'form-text' },
        }"
      >
        <dx-label :visible="false" />
      </dx-item>
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="signInTemplate"
          :use-submit-behavior="true"
        >
        </dx-button-options>
      </dx-button-item>
<!--       <dx-item>
        <template #default>
          <div class="link">
            <router-link to="/reset-password"
              >No recuerdo mi contraseña</router-link
            >
          </div>
        </template>
      </dx-item> -->
      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator
              v-if="loading"
              width="24px"
              height="24px"
              :visible="true"
            />
            <span v-if="!loading">Login</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</template>

<script>
import DxLoadIndicator from "devextreme-vue/load-indicator";
import DxForm, {
  DxItem,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
} from "devextreme-vue/form";
import notify from "devextreme/ui/notify";

import auth from "@/auth";

export default {
  data() {
    return {
      formData: {},
      loading: false,
    };
  },
  created() {
    //Verificamos si el usuario recordo su userName
    //si recordo agregamos el userName
    let userName = localStorage.getItem("userName");

    if (userName) {
      this.formData = {
        "user" : userName,
        "rememberMe" : true
      }
    }
  },
  methods: {
    onSubmit: async function () {
      const { user, password, rememberMe } = this.formData;
      this.loading = true;

      const result = await auth.logIn(user, password);
      if (!result.isOk) {
        this.loading = false;
        notify(result.message, "error", 2000);
      } else {
        this.$router.push(this.$route.query.redirect || "/home");
        auth.rememberUserName(rememberMe, user);
      }
    },
  },
  components: {
    DxLoadIndicator,
    DxForm,
    DxRequiredRule,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions,
  },
};
</script>

<style lang="scss">
@import "@/themes/generated/variables.base.scss";

.login-form {
  .link {
    text-align: center;
    font-size: 16px;
    font-style: normal;

    a {
      text-decoration: none;
    }
  }

  .form-text {
    margin: 10px 0;
    color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  }
}
</style>
