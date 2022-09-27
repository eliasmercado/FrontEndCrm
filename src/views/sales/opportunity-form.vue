<template>
  <div class="content-block">
    <h2>Oportunidades</h2>
    <div class="row">
      <div class="offset-md-6 col-md-6 text-right">
        <dx-button
          v-if="btnAdd"
          icon="plus"
          text="Agregar Oportunidad"
          styling-mode="text"
          @click="viewOpportunityForm"
        />
      </div>
    </div>

    <dx-button
      v-if="btnVolver"
      icon="back"
      text="Volver"
      @click="viewOpportunityGrid"
    />
    <br v-if="btnVolver" />
    <br v-if="btnVolver" />

    <opportunity-grid
      v-show="viewGrid"
      ref="opportunityGrid"
      @before-edit="preparingEditOpportunity"
    />
    <opportunity-form
      v-if="viewForm"
      :opportunity="opportunity"
      @insert="insertOpportunity"
    />
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import opportunityGrid from "@/components/sales/opportunity-grid.vue";
import opportunityForm from "@/components/sales/opportunity-form.vue";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";

export default {
  data() {
    return {
      btnVolver: false,
      btnAdd: true,
      viewGrid: true,
      viewForm: false,
      opportunity: { detalles: [], valor: 0 },
    };
  },
  methods: {
    viewOpportunityForm() {
      this.viewForm = true;
      this.viewGrid = false;
      this.btnVolver = true;
      this.btnAdd = false;
    },

    viewOpportunityGrid() {
      this.viewForm = false;
      this.viewGrid = true;
      this.btnVolver = false;
      this.btnAdd = true;
      this.opportunity = { detalles: [], valor: 0 };
    },

    preparingEditOpportunity(data) {
      this.opportunity = data;
      this.viewOpportunityForm();
    },

    async insertOpportunity(data) {
      //si el id no existe vamos a llamar a insertar
      if (typeof data.idOportunidad === "undefined") {
        this.insertNewOpportunity(data);
      } else {
        console.log("actualizamos");
      }
    },

    async insertNewOpportunity(data) {
      let detailList = [];
      let detail = {};
      data.detalles.forEach((element) => {
        detail.idProducto = element.idProducto;
        detail.cantidad = element.cantidad;
        detailList.push(detail);
      });

      data.detalles = detailList;
      let token = auth.getAuthorizationToken();

      await api
        .post("/oportunidad", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
          this.$refs.opportunityGrid.opportunitiesData.reload();
        })
        .catch((error) => {
          console.error(error);
          notify(error.response.data.error.message, "error", 2000);
        });
      this.viewOpportunityGrid();
    },
  },

  components: {
    "opportunity-grid": opportunityGrid,
    "opportunity-form": opportunityForm,
    DxButton,
  },
};
</script>
