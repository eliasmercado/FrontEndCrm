<template>
  <div class="content-block">
    <h2>Bienvenido, Elias Mercado!</h2>

    <!-- Primer Bloque -->
    <div class="row d-flex justify-content-center">
      <div class="card shadow-sm rounded" style="width: 18%; height: 10rem">
        <h3 class="text-center" style="color: #55a1e6">7</h3>
        <span class="text-center" style="opacity: 0.8">Tareas Abiertas</span>
        <hr class="hr hr-blurry" />
        <span class="text-center mb-15" style="opacity: 0.5"
          >Total Tareas: 100</span
        >
      </div>
      <div class="card shadow-sm rounded" style="width: 18%; height: 10rem">
        <h3 class="text-center" style="color: #ce4800">7</h3>
        <span class="text-center" style="opacity: 0.8">Nuevos Leads</span>
        <hr class="hr hr-blurry" />
        <span class="text-center mb-15" style="opacity: 0.5"
          >Total Tareas: 100</span
        >
      </div>
      <div class="card shadow-sm rounded" style="width: 18%; height: 10rem">
        <h3 class="text-center" style="color: #ff8f00">7</h3>
        <span class="text-center" style="opacity: 0.8">Nuevos Contactos</span>
        <hr class="hr hr-blurry" />
        <span class="text-center mb-15" style="opacity: 0.5"
          >Total Tareas: 100</span
        >
      </div>
      <div class="card shadow-sm rounded" style="width: 18%; height: 10rem">
        <h3 class="text-center" style="color: #615cff">7</h3>
        <span class="text-center" style="opacity: 0.8"
          >Oportunidades Abiertas</span
        >
        <hr class="hr hr-blurry" />
        <span class="text-center mb-15" style="opacity: 0.5"
          >Total Tareas: 100</span
        >
      </div>
      <div class="card shadow-sm rounded" style="width: 18%; height: 10rem">
        <h3 class="text-center" style="color: #85c124">7</h3>
        <span class="text-center" style="opacity: 0.8"
          >Oportunidades Ganadas</span
        >
        <hr class="hr hr-blurry" />
        <span class="text-center mb-15" style="opacity: 0.5"
          >Total Tareas: 100</span
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
            argument-field="day"
            type="bar"
            hover-mode="allArgumentPoints"
            selection-mode="allArgumentPoints"
          >
            <dx-label :visible="true">
              <dx-format :precision="0" type="fixedPoint" />
            </dx-label>
          </dx-common-series-settings>
          <dx-series
            argument-field="day"
            value-field="oranges"
            name="Mis ventas"
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
          <dx-pie-series argument-field="region">
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
      <dx-series type="bar" />
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
      salesForMonth: [
        {
          day: "Enero",
          oranges: 3,
        },
        {
          day: "Febrero",
          oranges: 2,
        },
        {
          day: "Marzo",
          oranges: 3,
        },
        {
          day: "Abril",
          oranges: 4,
        },
        {
          day: "Mayo",
          oranges: 6,
        },
        {
          day: "Junio",
          oranges: 11,
        },
        {
          day: "Julio",
          oranges: 4,
        },
        {
          day: "Agosto",
          oranges: 4,
        },
        {
          day: "Setiembre",
          oranges: 4,
        },
        {
          day: "Octubre",
          oranges: 4,
        },
        {
          day: "Noviembre",
          oranges: 4,
        },
        {
          day: "Diciembre",
          oranges: 4,
        },
      ],
      opportunitiesBySource: [
        {
          region: "CRM",
          val: 10,
        },
        {
          region: "Ecommerce",
          val: 12,
        },
        {
          region: "Landing Page",
          val: 15,
        },
        {
          region: "Sitio Web",
          val: 22,
        },
        {
          region: "Facebook",
          val: 55,
        },
        {
          region: "Instagram",
          val: 66,
        },
      ],
      opportunitiesByCategory: [],
      isFirstLevel: true,
      dsOpportunitiesByCategory: [],
    };
  },

  mounted() {
    this.opportunitiesByCategory = [
      { arg: "Asia", val: 3007613498, parentID: "" },
      { arg: "North America", val: 493603615, parentID: "" },
      { arg: "Europe", val: 438575293, parentID: "" },
      { arg: "Africa", val: 381331438, parentID: "" },
      { arg: "South America", val: 331126555, parentID: "" },
      { arg: "Nigeria", val: 181562056, parentID: "Africa" },
      { arg: "Egypt", val: 88487396, parentID: "Africa" },
      { arg: "Congo", val: 77433744, parentID: "Africa" },
      { arg: "Morocco", val: 33848242, parentID: "Africa" },
      { arg: "China", val: 1380083000, parentID: "Asia" },
      { arg: "India", val: 1306687000, parentID: "Asia" },
      { arg: "Pakistan", val: 193885498, parentID: "Asia" },
      { arg: "Japan", val: 126958000, parentID: "Asia" },
      { arg: "Russia", val: 146804372, parentID: "Europe" },
      { arg: "Germany", val: 82175684, parentID: "Europe" },
      { arg: "Turkey", val: 79463663, parentID: "Europe" },
      { arg: "France", val: 66736000, parentID: "Europe" },
      { arg: "United Kingdom", val: 63395574, parentID: "Europe" },
      { arg: "United States", val: 325310275, parentID: "North America" },
      { arg: "Mexico", val: 121005815, parentID: "North America" },
      { arg: "Canada", val: 36048521, parentID: "North America" },
      { arg: "Cuba", val: 11239004, parentID: "North America" },
      { arg: "Brazil", val: 205737996, parentID: "South America" },
      { arg: "Colombia", val: 48400388, parentID: "South America" },
      { arg: "Venezuela", val: 30761000, parentID: "South America" },
      { arg: "Peru", val: 28220764, parentID: "South America" },
      { arg: "Chile", val: 18006407, parentID: "South America" },
    ];

    this.dsOpportunitiesByCategory = this.filterData("");
  },
  methods: {
    customizeTooltip({ valueText, percent }) {
      return {
        text: `${valueText} - ${(percent * 100).toFixed(2)}%`,
      };
    },

    filterData(name) {
      return this.opportunitiesByCategory.filter(
        (item) => item.parentID === name
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
