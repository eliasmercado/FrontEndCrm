<template>
  <div class="content-block">
    <h2>Oportunidades</h2>
    <div class="row">
      <div class="col-md-6 text-left" v-if="viewBoard">
        <div class="row">
          <div id="squareLow" />
          <div>Baja</div>
        </div>
        <div class="row">
          <div id="squareMid" />
          <div>Media</div>
        </div>
        <div class="row">
          <div id="squareHigh" />
          <div>Alta</div>
        </div>
      </div>
      <div
        :class="
          viewBoard ? 'col-md-6 text-right' : 'offset-md-6 col-md-6 text-right'
        "
      >
        <dx-button
          v-if="btnBoard"
          @click="viewopportunityBoard"
          icon="fields"
          text="Tablero"
          styling-mode="text"
        />
        <dx-button
          v-if="btnGridBack"
          @click="viewOpportunityGridAndReload"
          icon="back"
          text="Cambiar Vista"
          styling-mode="text"
        />
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
    <opportunity-kanban v-if="viewBoard"></opportunity-kanban>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import opportunityGrid from "@/components/sales/opportunity-grid.vue";
import opportunityForm from "@/components/sales/opportunity-form.vue";
import opportunityKanban from "@/components/sales/opportunity-kanban.vue";
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
      viewBoard: false,
      btnBoard: true,
      btnGridBack: false,
    };
  },
  methods: {
    viewOpportunityForm() {
      this.viewForm = true;
      this.viewGrid = false;
      this.btnVolver = true;
      this.btnAdd = false;
      this.btnGridBack = false;
      this.btnBoard = false;
      this.viewBoard = false;
    },

    viewOpportunityGrid() {
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.opportunity = { detalles: [], valor: 0 };
      this.btnGridBack = false;
      this.viewGrid = true;
      this.btnBoard = true;
      this.viewBoard = false;
    },

    viewOpportunityGridAndReload() {
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.opportunity = { detalles: [], valor: 0 };
      this.btnGridBack = false;
      this.viewGrid = true;
      this.btnBoard = true;
      this.viewBoard = false;
      this.$refs.opportunityGrid.reloadOpportunityGrid();
    },

    viewopportunityBoard() {
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.btnGridBack = true;
      this.opportunity = { detalles: [], valor: 0 };
      this.viewGrid = false;
      this.btnBoard = false;
      this.viewBoard = true;
    },

    preparingEditOpportunity(data) {
      this.opportunity = data;
      this.viewOpportunityForm();
    },

    async insertOpportunity(data, details) {
      //si el id no existe vamos a llamar a insertar
      if (typeof data.idOportunidad === "undefined") {
        this.insertNewOpportunity(data, details);
      } else {
        this.editOpportunity(data, details);
      }
    },

    async insertNewOpportunity(data, details) {
      let detailList = [];

      detailList = details.map(function (elem) {
        let returnObjeto = {
          idProducto: elem.idProducto,
          cantidad: elem.cantidad,
        };
        return returnObjeto;
      });

      data.detalles = detailList;
      let token = auth.getAuthorizationToken();

      await api
        .post("/oportunidad", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
      this.viewOpportunityGrid();
      this.$refs.opportunityGrid.reloadOpportunityGrid();
    },

    async editOpportunity(data, details) {
      let detailList = [];

      detailList = details.map(function (elem) {
        let returnObjeto = {
          idDetalleOportunidad:
            typeof elem.idDetalleOportunidad == "string"
              ? 0
              : elem.idDetalleOportunidad,
          idProducto: elem.idProducto,
          cantidad: elem.cantidad,
        };
        return returnObjeto;
      });

      data.detalles = detailList;
      let token = auth.getAuthorizationToken();
      await api
        .put("/oportunidad/" + data.idOportunidad, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
      this.viewOpportunityGrid();
      this.$refs.opportunityGrid.reloadOpportunityGrid();
    },
  },

  components: {
    "opportunity-grid": opportunityGrid,
    "opportunity-form": opportunityForm,
    "opportunity-kanban": opportunityKanban,
    DxButton,
  },
};
</script>
<style scoped>
#squareLow {
  background: #86c285;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

#squareMid {
  background: #edc578;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

#squareHigh {
  background: #ef7d59;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>