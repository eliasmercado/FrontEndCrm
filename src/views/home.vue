<template>
  <div class="content-block">
    <h2>Bienvenido, {{ userLogged }}!</h2>

    <!-- Primer Bloque -->
    <div class="row d-flex justify-content-center">
      <div class="card shadow-sm rounded" style="width: 18%; height: 10rem">
        <h3 class="text-center" style="color: #55a1e6">
          {{ quantities.tareas.cantidad }}
        </h3>
        <span class="text-center" style="opacity: 0.8">Tareas Abiertas</span>
        <hr class="hr hr-blurry" />
        <span class="text-center mb-15" style="opacity: 0.5"
          >Total: {{ quantities.tareas.total }}</span
        >
      </div>
      <div class="card shadow-sm rounded" style="width: 18%; height: 10rem">
        <h3 class="text-center" style="color: #ce4800">
          {{ quantities.leads.cantidad }}
        </h3>
        <span class="text-center" style="opacity: 0.8">Nuevos Leads</span>
        <hr class="hr hr-blurry" />
        <span class="text-center mb-15" style="opacity: 0.5"
          >Total: {{ quantities.leads.total }}</span
        >
      </div>
      <div class="card shadow-sm rounded" style="width: 18%; height: 10rem">
        <h3 class="text-center" style="color: #ff8f00">
          {{ quantities.contactos.cantidad }}
        </h3>
        <span class="text-center" style="opacity: 0.8">Nuevos Contactos</span>
        <hr class="hr hr-blurry" />
        <span class="text-center mb-15" style="opacity: 0.5"
          >Total: {{ quantities.contactos.cantidad }}</span
        >
      </div>
      <div class="card shadow-sm rounded" style="width: 18%; height: 10rem">
        <h3 class="text-center" style="color: #615cff">
          {{ quantities.oportunidadesAbiertas.cantidad }}
        </h3>
        <span class="text-center" style="opacity: 0.8"
          >Oportunidades Abiertas</span
        >
        <hr class="hr hr-blurry" />
        <span class="text-center mb-15" style="opacity: 0.5"
          >Total: {{ quantities.oportunidadesAbiertas.cantidad }}</span
        >
      </div>
      <div class="card shadow-sm rounded" style="width: 18%; height: 10rem">
        <h3 class="text-center" style="color: #85c124">
          {{ quantities.oportunidadesGanadas.cantidad }}
        </h3>
        <span class="text-center" style="opacity: 0.8"
          >Oportunidades Ganadas</span
        >
        <hr class="hr hr-blurry" />
        <span class="text-center mb-15" style="opacity: 0.5"
          >Total: {{ quantities.oportunidadesGanadas.cantidad }}</span
        >
      </div>
    </div>
    <!-- Fin Primer Bloque -->
    <br />
    <!-- Segundo Bloque -->
    <div class="row">
      <div class="col-7">
        <dx-chart
          class="card-text"
          id="chart"
          :data-source="salesForMonth"
          title="Ventas del año por mes"
        >
          <dx-common-series-settings
            argument-field="mes"
            type="bar"
            hover-mode="allArgumentPoints"
            selection-mode="allArgumentPoints"
          >
            <dx-label :visible="true">
              <dx-format :precision="0" type="fixedPoint" />
            </dx-label>
          </dx-common-series-settings>
          <dx-series
            argument-field="mes"
            value-field="cantidad"
            name="Ventas"
            type="bar"
            color="#ff8400"
          />
        </dx-chart>
      </div>

      <div class="col-5">
        <dx-pie-chart
          id="pie"
          :data-source="opportunitiesBySource"
          type="doughnut"
          title="Oportunidades por Fuente"
          palette="Soft Pastel"
        >
          <dx-pie-series argument-field="fuente" value-field="cantidad">
            <dx-pie-label :visible="true" format="fixedPoint">
              <dx-connector :visible="true" />
            </dx-pie-label>
          </dx-pie-series>
          <dx-pie-legend
            :margin="0"
            horizontal-alignment="right"
            vertical-alignment="top"
          />
          <dx-tooltip :enabled="true" :customize-tooltip="customizeTooltip">
            <dx-pie-format type="fixedPoint" />
          </dx-tooltip>
        </dx-pie-chart>
      </div>
    </div>
    <!-- Fin Segundo Bloque -->
    <br />

    <!-- Tercer Bloque -->
    <dx-chart
      id="chartCat"
      :customize-point="customizePoint"
      :class="isFirstLevel ? 'pointer-on-bars' : ''"
      :data-source="dsOpportunitiesByCategory"
      title="Ventas por Categoría"
      @point-click="onPointClick"
    >
      <dx-series type="bar" argument-field="categoria" value-field="cantidad" />
      <dx-value-axis :show-zero="false" />
      <dx-legend :visible="false" />
    </dx-chart>
    <dx-button
      :visible="!isFirstLevel"
      text="Back"
      icon="chevronleft"
      @click="onButtonClick"
    />

    <br />
    <br />
    <br />
    <br />
    <!-- Fin Tercer Bloque -->
  </div>
</template>

<script>
import {
  DxChart,
  DxSeries,
  DxCommonSeriesSettings,
  DxLabel,
  DxFormat,
  DxLegend,
  DxValueAxis,
} from "devextreme-vue/chart";
import DxPieChart, {
  DxLegend as DxPieLegend,
  DxSeries as DxPieSeries,
  DxTooltip,
  DxFormat as DxPieFormat,
  DxLabel as DxPieLabel,
  DxConnector,
} from "devextreme-vue/pie-chart";
import { DxButton } from "devextreme-vue/button";
import api from "@/scripts/api";
import auth from "@/auth";
import notify from "devextreme/ui/notify";

const colors = ["#6fa8dc", "#f43653"];

export default {
  components: {
    DxChart,
    DxSeries,
    DxCommonSeriesSettings,
    DxLabel,
    DxFormat,
    DxLegend,
    DxPieChart,
    DxLegend,
    DxSeries,
    DxTooltip,
    DxFormat,
    DxLabel,
    DxConnector,
    DxPieLegend,
    DxPieSeries,
    DxPieLabel,
    DxPieFormat,
    DxValueAxis,
    DxButton,
  },

  data() {
    return {
      salesForMonth: [],
      quantities: {
        tareas: {
          cantidad: 0,
          total: 0,
        },
        leads: {
          cantidad: 0,
          total: 0,
        },
        contactos: {
          cantidad: 0,
          total: 0,
        },
        oportunidadesAbiertas: {
          cantidad: 0,
          total: 0,
        },
        oportunidadesGanadas: {
          cantidad: 0,
          total: 0,
        },
      },
      opportunitiesBySource: [],
      opportunitiesByCategory: [],
      isFirstLevel: true,
      dsOpportunitiesByCategory: [],
      userLogged: "",
    };
  },

  async created() {
    let user = auth.getUser();
    this.userLogged = user.data.nombres + " " + user.data.apellidos;
    this.getQuantitiesData();
    this.getSalesForMonth();
    this.getFuentesForOpportunity();
    await this.getCategoriesForOpportunity();
    this.dsOpportunitiesByCategory = this.filterData("");
  },
  methods: {
    getQuantitiesData() {
      let token = auth.getAuthorizationToken();

      api
        .get("/dashboard/cantidad-total", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.quantities = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    getSalesForMonth() {
      let token = auth.getAuthorizationToken();

      api
        .get("/dashboard/ventas-mes", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.salesForMonth = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    getFuentesForOpportunity() {
      let token = auth.getAuthorizationToken();

      api
        .get("/dashboard/fuentes-oportunidad", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.opportunitiesBySource = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getCategoriesForOpportunity() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/dashboard/categorias-oportunidad", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.opportunitiesByCategory = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    customizeTooltip({ valueText, percent }) {
      return {
        text: `${valueText} - ${(percent * 100).toFixed(2)}%`,
      };
    },

    filterData(name) {
      return this.opportunitiesByCategory.filter(
        (item) => item.categoriaPadre === name
      );
    },

    customizePoint() {
      return {
        color: colors[Number(this.isFirstLevel)],
        hoverStyle: !this.isFirstLevel
          ? {
              hatching: "none",
            }
          : {},
      };
    },
    onPointClick({ target }) {
      if (this.isFirstLevel) {
        this.isFirstLevel = false;
        this.dsOpportunitiesByCategory = this.filterData(
          target.originalArgument
        );
      }
    },
    onButtonClick() {
      if (!this.isFirstLevel) {
        this.isFirstLevel = true;
        this.dsOpportunitiesByCategory = this.filterData("");
      }
    },
  },
};
</script>


<style lang="scss">
#chart {
  height: 440px;
}

#chartCat {
  width: 100%;
}

#chartCat.pointer-on-bars .dxc-series rect {
  cursor: pointer;
}
</style>
