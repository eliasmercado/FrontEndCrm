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
      :opportunity="opportunityData"
      @insert="insertOpportunity"
    />
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import opportunityGrid from "@/components/sales/opportunity-grid.vue";
import opportunityForm from "@/components/sales/opportunity-form.vue";
import notify from "devextreme/ui/notify";

export default {
  data() {
    return {
      btnVolver: false,
      btnAdd: true,
      viewGrid: false,
      viewForm: true,
      opportunityData: { detalles: [] },
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
      this.opportunityData = {};
    },

    preparingEditOpportunity(data) {
      this.opportunityData = data;
      this.viewOpportunityForm();
    },

    insertOpportunity() {
      notify("Insertado", "success", 2000);
      this.viewOpportunityGrid();
      this.$refs.opportunityGrid.opportunitiesData.reload();
    },
  },

  components: {
    "opportunity-grid": opportunityGrid,
    "opportunity-form": opportunityForm,
    DxButton,
  },
};
</script>
