<template>
  <div>
    <dx-data-grid
      :data-source="products"
      key-expr="idProducto"
      :show-column-lines="false"
      :show-row-lines="true"
      :show-borders="true"
      :row-alternation-enabled="true"
      :repaint-changes-only="true"
      :column-hiding-enabled="true"
      :column-auto-width="true"
    >
      <dx-editing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        mode="row"
      />

      <dx-column data-field="producto"><dx-required-rule /></dx-column>
      <dx-column
        :width="100"
        :allow-sorting="false"
        data-field="cantidad"
        data-type="number"
      >
        <dx-required-rule />
      </dx-column>
    </dx-data-grid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxRequiredRule,
} from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxRequiredRule,
    DxButton,
  },
  data() {
    return {};
  },
  methods: {},

  props: {
    products: Array,
  },
};
</script>
<style scoped>
</style>
