<template>
  <div class="content-block">
    <h2>Permisos</h2>
    <dx-select-box
      :data-source="profiles"
      display-expr="perfil"
      value-expr="idPerfil"
      placeholder="Selecciona un perfil"
      @value-changed="changeProfile"
    >
    </dx-select-box>
    <br />
    <dx-treeList
      v-if="viewList"
      :data-source="menus"
      :show-row-lines="false"
      :show-borders="false"
      :selected-row-keys="selectedRowKeys"
      :show-column-headers="false"
      key-expr="idMenu"
      parent-id-expr="idMenuPadre"
      @selection-changed="onSelectionChanged($event)"
    >
      <dx-selection mode="multiple" />
      <dx-column data-field="nombre" />
      <dx-column data-field="descripcion" />
    </dx-treeList>
  </div>
</template>

<script>
import { DxTreeList, DxSelection, DxColumn } from "devextreme-vue/tree-list";
import { DxSelectBox } from "devextreme-vue/select-box";
import api from "@/scripts/api";
import auth from "@/auth";

export default {
  components: {
    DxTreeList,
    DxSelection,
    DxColumn,
    DxSelectBox,
  },
  data() {
    return {
      menus,
      selectedRowKeys: [],
      profiles: [],
      isChanged: false,
      viewList: false,
      profileId: 0,
    };
  },
  mounted() {
    this.getProfiles();
  },

  methods: {
    getProfiles() {
      let token = auth.getAuthorizationToken();

      api
        .get("/usuario/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.profiles = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async changeProfile(e) {
      this.viewList = false;
      this.isChanged = true;
      this.profileId = e.value;
      await this.getPermissions(e.value);
      this.selectedRowKeys = [];
      this.viewList = true;
      this.loadList();
    },

    async getPermissions(profileId) {
      let token = auth.getAuthorizationToken();

      await api
        .get("/permiso/" + profileId, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.menus = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    loadList() {
      this.menus.forEach((element) => {
        if (this.isPermissionOk(element)) {
          this.selectedRowKeys.push(element.idMenu);
        }
      });
      this.isChanged = false;
    },

    isPermissionOk(value) {
      return value.tienePermiso;
    },

    onSelectionChanged(e) {
      if (!this.isChanged) {
        let data = {
          idPerfil: this.profileId,
        };
        if (e.currentDeselectedRowKeys.length > 0) {
          data.idMenu = e.currentDeselectedRowKeys[0];
          data.activarMenu = false;
        } else if (e.currentSelectedRowKeys > 0) {
          data.idMenu = e.currentSelectedRowKeys[0];
          data.activarMenu = true;
        }

        let token = auth.getAuthorizationToken();

        api
          .post("/permiso", data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {})
          .catch((error) => {
            notify(error.response.data.error.message, "error", 2000);
          });
      }
    },
  },
};
</script>

<style scoped>
#employees {
  max-height: 100%;
}

.options {
  padding: 20px;
  margin-top: 20px;
  background-color: rgba(191, 191, 191, 0.15);
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
}

.selected-data {
  margin-top: 20px;
}

.selected-data .caption {
  margin-right: 4px;
}

.option > span {
  width: 120px;
  display: inline-block;
}

.option > .dx-widget {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  max-width: 350px;
}
</style>
