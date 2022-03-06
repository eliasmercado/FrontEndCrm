import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import esMessages from "./utils/es.json";
import { locale, loadMessages } from "devextreme/localization";

import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  created() {
    loadMessages(esMessages);
    locale(navigator.language);
  }
}).$mount("#app");
