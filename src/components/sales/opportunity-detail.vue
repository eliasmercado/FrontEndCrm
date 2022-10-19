<template>
  <div>
    <dx-data-grid
      :data-source="opportunityDetail"
      key-expr="idDetalleOportunidad"
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
      <dx-column data-field="idProducto" caption="Producto">
        <dx-required-rule />
        <dx-lookup
          :data-source="products"
          value-expr="idProducto"
          display-expr="descripcion"
        />
      </dx-column>

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
  DxLookup,
} from "devextreme-vue/data-grid";
import DxButton from "devextreme-vue/button";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxRequiredRule,
    DxButton,
    DxLookup,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  props: {
    opportunityDetail: Array,
    products: Array,
  },
};
</script>
<style scoped>
</style>
