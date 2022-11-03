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
      @click="changeCurrentComponent"
    />
    <br v-if="btnVolver" />
    <br v-if="btnVolver" />

    <opportunity-grid
      v-show="viewGrid"
      ref="opportunityGrid"
      @view-info="viewOpportunityInfo"
      @before-edit="preparingEditOpportunity"
    />
    <opportunity-form
      v-if="viewForm"
      :opportunity="opportunity"
      @insert="insertOpportunity"
    />
    <opportunity-kanban
      v-if="viewBoard"
      @view-info="viewOpportunityInfo"
    ></opportunity-kanban>

    <opportunity-info
      v-if="viewInfo"
      @hidden-button-add="updateViewBtnAdd"
      :opportunityId="opportunityInfoId"
    ></opportunity-info>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import opportunityGrid from "@/components/sales/opportunity-grid.vue";
import opportunityForm from "@/components/sales/opportunity-form.vue";
import opportunityKanban from "@/components/sales/opportunity-kanban.vue";
import opportunityInfo from "@/components/sales/opportunity-info.vue";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";

const OP_GRID = "opGrid";
const OP_FORM = "opForm";
const OP_BOARD = "opScheduler";
const OP_INFO = "opInfo";

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
      viewInfo: false,
      currentComponente: null,
      oldComponente: null,
      OP_GRID,
      OP_FORM,
      OP_BOARD,
      OP_INFO,
      opportunityInfoId: 0,
      viewInfo: false,
    };
  },
  methods: {
    changeCurrentComponent() {
      if (this.oldComponente == OP_FORM) this.viewOpportunityForm();
      else if (this.oldComponente == OP_GRID || this.oldComponente === null)
        this.viewOpportunityGrid();
      else if (this.oldComponente == OP_BOARD) this.viewopportunityBoard();
    },

    viewOpportunityForm() {
      this.oldComponente = this.currentComponente;
      this.currentComponente = OP_FORM;
      this.viewForm = true;
      this.viewGrid = false;
      this.btnVolver = true;
      this.btnAdd = false;
      this.btnGridBack = false;
      this.btnBoard = false;
      this.viewBoard = false;
      this.viewInfo = false;
    },

    viewOpportunityGrid() {
      this.oldComponente = this.currentComponente;
      this.currentComponente = OP_GRID;
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.opportunity = { detalles: [], valor: 0 };
      this.btnGridBack = false;
      this.viewGrid = true;
      this.btnBoard = true;
      this.viewBoard = false;
      this.viewInfo = false;
    },

    viewOpportunityGridAndReload() {
      this.oldComponente = this.currentComponente;
      this.currentComponente = OP_GRID;
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.opportunity = { detalles: [], valor: 0 };
      this.btnGridBack = false;
      this.viewGrid = true;
      this.btnBoard = true;
      this.viewBoard = false;
      this.viewInfo = false;
      this.$refs.opportunityGrid.reloadOpportunityGrid();
    },

    viewopportunityBoard() {
      this.oldComponente = this.currentComponente;
      this.currentComponente = OP_BOARD;
      this.viewForm = false;
      this.btnVolver = false;
      this.btnAdd = true;
      this.btnGridBack = true;
      this.opportunity = { detalles: [], valor: 0 };
      this.viewGrid = false;
      this.btnBoard = false;
      this.viewBoard = true;
      this.viewInfo = false;
    },

    viewOpportunityInfo(opportunityId) {
      this.opportunityInfoId = opportunityId;
      this.oldComponente = this.currentComponente;
      this.currentComponente = OP_INFO;
      this.viewForm = false;
      this.viewGrid = false;
      this.btnVolver = true;
      this.btnAdd = false;
      this.btnGridBack = false;
      this.btnBoard = false;
      this.viewBoard = false;
      this.viewInfo = true;
    },

    updateViewBtnAdd(isHidden) {
      this.btnVolver = !isHidden;
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
    "opportunity-info": opportunityInfo,
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