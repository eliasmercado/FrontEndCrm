<template>
  <div id="kanban" class="d-flex justify-content-center">
    <div
      v-for="(list, listIndex) in lists"
      :key="stageList[listIndex]"
      class="list"
    >
      <div class="list-title dx-theme-text-color">
        {{ stageList[listIndex] }}
      </div>
      <dx-scroll-view class="scrollable-list" show-scrollbar="always">
        <dx-sortable
          :data="list"
          class="sortable-cards"
          group="tasksGroup"
          @drag-start="onTaskDragStart($event)"
          @reorder="onTaskDrop($event)"
          @add="onTaskDrop($event, stageList[listIndex])"
        >
          <div
            v-for="opportunity in list"
            :key="opportunity.idOportunidad"
            class="card dx-card dx-theme-text-color dx-theme-background-color"
          >
            <div :class="['card-priority', getPriorityClass(opportunity)]" />
            <div class="card-subject">{{ opportunity.nombre }}</div>
            <div class="card-assignee">
              {{ opportunity.propietario }}
            </div>
          </div>
        </dx-sortable>
      </dx-scroll-view>
    </div>
  </div>
</template>
<script>
import { DxScrollView } from "devextreme-vue/scroll-view";
import { DxSortable } from "devextreme-vue/sortable";
import api from "@/scripts/api";
import auth from "@/auth";
import notify from "devextreme/ui/notify";

export default {
  components: {
    DxScrollView,
    DxSortable,
  },
  data() {
    return {
      opportunityData: [],
      lists: [],
      stageData: [],
      stageList: [],
    };
  },
  async created() {
    await this.getStage();
    await this.getOpportunities();

    this.stageData.forEach((stage) => {
      if (stage.etapa != "Cancelada") {
        this.stageList.push(stage.etapa);
      }
    });

    this.stageList.forEach((stage) => {
      this.lists.push(
        this.opportunityData.filter(
          (opportunity) => opportunity.etapa === stage
        )
      );
    });
  },

  methods: {
    async getStage() {
      let token = auth.getAuthorizationToken();

      await api
        .get("/oportunidad/etapa", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.stageData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    async getOpportunities() {
      let token = auth.getAuthorizationToken();
      let opportunity = null;
      await api
        .get("/oportunidad", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.opportunityData = response.data.data;
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });

      return opportunity;
    },

    onListReorder(e) {
      const list = this.lists.splice(e.fromIndex, 1)[0];
      this.lists.splice(e.toIndex, 0, list);

      const status = this.stageList.splice(e.fromIndex, 1)[0];
      this.stageList.splice(e.toIndex, 0, status);
    },

    onTaskDragStart(e) {
      e.itemData = e.fromData[e.fromIndex];
    },

    onTaskDrop(e, stage) {
      let token = auth.getAuthorizationToken();
      let data = e.itemData;
      //si no es un cambio de estado no hacemos la llamada al Back.
      if (typeof stage === "undefined") return;
      
      api
        .put(
          "/oportunidad/actualizar-etapa/" +
            data.idOportunidad +
            "?etapa=" +
            stage,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          e.fromData.splice(e.fromIndex, 1);
          e.toData.splice(e.toIndex, 0, e.itemData);
          notify(response.data.data, "success", 2000);
        })
        .catch((error) => {
          notify(error.response.data.error.message, "error", 2000);
        });
    },

    getPriorityClass(opportunity) {
      return `priority-${opportunity.prioridad}`;
    },
  },
};
</script>
<style>
#kanban {
  white-space: nowrap;
}

.list {
  border-radius: 8px;
  margin: 5px;
  background-color: rgba(192, 192, 192, 0.4);
  display: inline-block;
  vertical-align: top;
  white-space: normal;
}

.list-title {
  font-size: 16px;
  padding: 10px;
  padding-left: 30px;
  margin-bottom: -10px;
  font-weight: bold;
  cursor: pointer;
}

.scrollable-list {
  height: 400px;
  width: 260px;
}

.sortable-cards {
  min-height: 380px;
}

.card {
  position: relative;
  background-color: white;
  box-sizing: border-box;
  width: 230px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
}

.card-subject {
  padding-bottom: 10px;
}

.card-assignee {
  opacity: 0.6;
}

.card-priority {
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 5px;
  width: 5px;
  border-radius: 2px;
  background: #86c285;
}

.priority-Baja {
  background: #86c285;
}

.priority-Media {
  background: #edc578;
}

.priority-Alta {
  background: #ef7d59;
}

.dx-sortable {
  display: block;
}
</style>
