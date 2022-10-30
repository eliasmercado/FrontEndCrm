<template>
  <div id="form-container">
    <dx-form id="form" :col-count="2" :form-data="taskInfo">
      <template #titleTemplate>
        <div>
          <div>Título</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.titulo"
          />
        </div>
      </template>
      <template #descriptionTemplate>
        <div>
          <div>Descripción</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.descripcion"
          />
        </div>
      </template>
      <template #typeTemplate>
        <div>
          <div>Tipo</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.tipo"
          />
        </div>
      </template>
      <template #statusTemplate>
        <div>
          <div>Estado</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.estado"
          />
        </div>
      </template>
      <template #startDateTemplate>
        <div>
          <div>Fecha de Inicio</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.fechaInicio"
          />
        </div>
      </template>
      <template #endDateTemplate>
        <div>
          <div>Fecha de Cierre</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.fechaCierre"
          />
        </div>
      </template>
      <template #ownerTemplate>
        <div>
          <div>Responsable</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.responsable"
          />
        </div>
      </template>
      <template #closeTaskTemplate>
        <dx-button
          text="Finalizar Tarea"
          type="default"
          @click="closeTask"
          styling-mode="outlined"
        />
      </template>
      <!-- Seccion para Contacto Asociado -->
      <template #contactNameTemplate>
        <div>
          <div>Nombre Completo</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.contactoAsociado.nombreCompleto"
          />
        </div>
      </template>
      <template #contactPhoneTemplate>
        <div>
          <div>Celular</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.contactoAsociado.celular"
          />
        </div>
      </template>
      <template #contactEmailTemplate>
        <div>
          <div>Email</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.contactoAsociado.email"
          />
        </div>
      </template>
      <template #contactViewTemplate>
        <dx-button
          text="Ver mas"
          icon="plus"
          type="default"
          @click="viewContact"
          styling-mode="outlined"
        />
      </template>
      <!-- Fin seccion para contacto asociado -->

      <!-- Seccion para empresa Asociado -->
      <template #companyNameTemplate>
        <div>
          <div>Nombre</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.empresaAsociada.nombre"
          />
        </div>
      </template>
      <template #companyCellPhoneTemplate>
        <div>
          <div>Celular</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.empresaAsociada.celular"
          />
        </div>
      </template>
      <template #companyPhoneTemplate>
        <div>
          <div>Teléfono</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.empresaAsociada.telefono"
          />
        </div>
      </template>
      <template #companyEmailTemplate>
        <div>
          <div>Email</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.empresaAsociada.email"
          />
        </div>
      </template>
      <template #companyViewTemplate>
        <dx-button
          text="Ver mas"
          icon="plus"
          type="default"
          @click="viewCompany"
          styling-mode="outlined"
        />
      </template>
      <!-- Fin seccion para empresa asociada -->

      <!-- Seccion para oportunidad Asociado -->
      <template #opportunityNameTemplate>
        <div>
          <div>Nombre</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.oportunidadAsociada.nombre"
          />
        </div>
      </template>
      <template #opportunityStageTemplate>
        <div>
          <div>Etapa</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.oportunidadAsociada.etapa"
          />
        </div>
      </template>
      <template #opportunityValueTemplate>
        <div>
          <div>Valor</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.oportunidadAsociada.valor"
          />
        </div>
      </template>
      <template #opportunityContactTemplate>
        <div>
          <div>Contacto</div>
          <dx-text-box
            :read-only="true"
            :hover-state-enabled="false"
            styling-mode="underlined"
            :value="taskInfo.oportunidadAsociada.contacto"
          />
        </div>
      </template>
      <template #opportunityViewTemplate>
        <dx-button
          text="Ver mas"
          icon="plus"
          type="default"
          @click="viewOpportunity"
          styling-mode="outlined"
        />
      </template>
      <!-- Fin seccion para oportunidad asociada -->
      <dx-group-item>
        <dx-group-item caption="Información de la Tarea" :col-count="1">
          <dx-simple-item template="titleTemplate" />
          <dx-simple-item template="descriptionTemplate" />
          <dx-simple-item template="typeTemplate" />
          <dx-simple-item template="statusTemplate" />
          <dx-simple-item template="startDateTemplate" />
          <dx-simple-item template="endDateTemplate" />
          <dx-simple-item template="ownerTemplate" />
          <dx-simple-item template="closeTaskTemplate" />
        </dx-group-item>
      </dx-group-item>
      <dx-group-item
        caption="Contacto Asociado"
        :col-count="1"
        v-if="taskInfo.asociarCon == 'Contacto'"
      >
        <dx-simple-item template="contactNameTemplate" />
        <dx-simple-item template="contactPhoneTemplate" />
        <dx-simple-item template="contactEmailTemplate" />
        <dx-simple-item template="contactViewTemplate" />
      </dx-group-item>
      <dx-group-item
        caption="Empresa Asociada"
        :col-count="1"
        v-if="taskInfo.asociarCon == 'Empresa'"
      >
        <dx-simple-item template="companyNameTemplate" />
        <dx-simple-item template="companyCellPhoneTemplate" />
        <dx-simple-item template="companyPhoneTemplate" />
        <dx-simple-item template="companyEmailTemplate" />
        <dx-simple-item template="companyViewTemplate" />
      </dx-group-item>
      <dx-group-item
        caption="Oportunidad Asociada"
        :col-count="1"
        v-if="taskInfo.asociarCon == 'Oportunidad'"
      >
        <dx-simple-item template="opportunityNameTemplate" />
        <dx-simple-item template="opportunityStageTemplate" />
        <dx-simple-item template="opportunityValueTemplate" />
        <dx-simple-item template="opportunityContactTemplate" />
        <dx-simple-item template="opportunityViewTemplate" />
      </dx-group-item>
    </dx-form>
  </div>
</template>

<script>
import { DxForm, DxSimpleItem, DxGroupItem } from "devextreme-vue/form";
import DxTextBox from "devextreme-vue/text-box";
import DxDateBox from "devextreme-vue/date-box";
import DxButton from "devextreme-vue/button";
import notify from "devextreme/ui/notify";
import api from "@/scripts/api";
import auth from "@/auth";

export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxTextBox,
    DxDateBox,
    DxButton,
  },
  data() {
    return {
      taskInfo: {},
    };
  },

  methods: {
    async getTaskInfo() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/tarea/info/" + this.taskId, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.taskInfo = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    viewOpportunity() {},

    viewContact() {},

    viewCompany() {},

    closeTask() {},
  },
  created() {
    this.getTaskInfo();
  },

  props: {
    taskId: Number,
  },
};
</script>

<style>
</style>