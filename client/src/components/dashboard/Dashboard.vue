<template>
  <div class="dashboard va-row">
    <div class="va-row dashboard-info-widgets">
      <div class="flex md6 xl3 xs12">
        <vuestic-widget class="info-widget">
          <div class="info-widget-inner">
            <div class="stats">
              <div class="stats-title vuestic-timeline-item__title">Current Time</div>
              <div class="stats-number">
                {{ getMoment(SystemTime.current).format("Do MMM YYYY hh:mm a") }}
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
      <div class="flex md6 xl3 xs12">
        <vuestic-widget class="info-widget">
          <div class="info-widget-inner">
            <div class="stats">
              <div class="stats-title vuestic-timeline-item__title">Uptime</div>
              <div class="stats-number">
                {{ upTime(SystemTime.uptime) }}
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
      <div class="flex md6 xl3 xs12">
        <vuestic-widget class="info-widget">
          <div class="info-widget-inner">
            <div class="stats">
              <div class="stats-title vuestic-timeline-item__title">Timezone</div>
              <div class="stats-number">
                {{ SystemTime.timezoneName }} ({{ SystemTime.timezone }})
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>
    <div class="flex xl6 xs12">
      <vuestic-widget>
        <vuestic-tabs :names="[`CPU Usage (${numCores}) cores`,'Processes','RAM']" ref="tabs">
          <div slot="RAM">
            <div class="va-row">
              <div class="flex xs12">
                <div class="chart-container">
                  <vuestic-chart v-bind:data="RAMChartData" type="pie"></vuestic-chart>
                </div>
              </div>
            </div>
          </div>
          <div :slot="`CPU Usage (${numCores}) cores`">
            <div class="va-row">
              <div class="flex xs12">
                <div class="chart-container">
                  <vuestic-chart v-bind:data="CPUChartData" type="line"></vuestic-chart>
                </div>
              </div>
            </div>
          </div>
          <div slot="Processes">
            <div class="va-row">
              <div class="flex xs12">
                <div class="chart-container">
                  <vuestic-chart v-bind:data="ProcessesChartData" type="donut"></vuestic-chart>
                </div>
              </div>
            </div>
          </div>
        </vuestic-tabs>
      </vuestic-widget>
    </div>
    <div class="flex xl6 xs12">
      <vuestic-widget>
        <vuestic-tabs :names="['System Info','OS Info','BIOS','Baseboard']" ref="tabs2">
          <div slot="System Info">
            <div class="va-row">
              <div v-for="(SystemInfo,i) in SystemInfos" :key="i" class="flex md6 xs12">
                <div class="vuestic-timeline-item__title">
                  {{ SystemInfo.name }}
                </div>
                <div class="vuestic-timeline-item__description">
                  {{ SystemInfo.value }}
                </div>
              </div>
            </div>
          </div>
          <div slot="OS Info">
            <div class="va-row">
              <div v-for="(OSInfo,i) in OSInfos" :key="i" class="flex md6 xs12">
                <div class="vuestic-timeline-item__title">
                  {{ OSInfo.name }}
                </div>
                <div class="vuestic-timeline-item__description">
                  {{ OSInfo.value }}
                </div>
              </div>
            </div>
          </div>
          <div slot="BIOS">
            <div class="va-row">
              <div v-for="(BIOS,i) in BIOSs" :key="i" class="flex md6 xs12">
                <div class="vuestic-timeline-item__title">
                  {{ BIOS.name }}
                </div>
                <div class="vuestic-timeline-item__description">
                  {{ BIOS.value }}
                </div>
              </div>
            </div>
          </div>
          <div slot="Baseboard">
            <div class="va-row">
              <div v-for="(Baseboard,i) in Baseboards" :key="i" class="flex md6 xl3 xs12">
                <div class="vuestic-timeline-item__title">
                  {{ Baseboard.name }}
                </div>
                <div class="vuestic-timeline-item__description">
                  {{ Baseboard.value }}
                </div>
              </div>
            </div>
          </div>
        </vuestic-tabs>
      </vuestic-widget>
    </div>

    <div class="flex md12 xs12">
      <vuestic-widget headerText="Services">
        <div class="table-responsive">
          <table class="table table-striped table-sm color-icon-label-table">
            <thead>
              <tr>
                <td>state</td>
                <td>name</td>
                <td>start mode</td>
                <td>process cpu</td>
                <td>process memory</td>
                <td>pid</td>
              </tr>
            </thead>
            <tbody>
              <tr :class="service.running ? 'table-success' : 'table-danger'" v-for="(service,i) in Services" :key="i">
                <td>
                  <span class="badge badge-pill" :class="service.running ? 'badge-primary': 'badge-danger'">{{ service.running ? 'Running' : 'Stopped'}}</span>
                </td>
                <td>{{ service.name }}</td>
                <td>{{ service.startmode }}</td>
                <td>{{ service.pcpu }}</td>
                <td>{{ service.pmem }}</td>
                <td>{{ service.pids }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </vuestic-widget>
    </div>

    <dashboard-bottom-widgets class="flex xs12"></dashboard-bottom-widgets>

  </div>
</template>

<script>
import DashboardInfoWidgets from "./DashboardInfoWidgets";
import UsersMembersTab from "./users-and-members-tab/UsersMembersTab.vue";
import SetupProfileTab from "./setup-profile-tab/SetupProfileTab.vue";
import FeaturesTab from "./features-tab/FeaturesTab.vue";
import DataVisualisationTab from "./data-visualisation-tab/DataVisualisation.vue";
import DashboardBottomWidgets from "./DashboardBottomWidgets.vue";

import moment from "moment";
import store from "vuex-store";

let palette = store.getters.palette;
export default {
  name: "dashboard",
  components: {
    DataVisualisationTab,
    DashboardInfoWidgets,
    UsersMembersTab,
    SetupProfileTab,
    FeaturesTab,
    DashboardBottomWidgets
  },
  data() {
    return {
      SystemTime: {
        current: null,
        uptime: null,
        timezone: null,
        timezoneName: null
      },
      numCores: null,
      SystemInfos: [],
      OSInfos: [],
      BIOSs: [],
      Baseboards: [],
      RAMChartData: {
        labels: ["Free", "Used", "BuffCache"],
        keys: ["free", "used", "buffcache"],
        datasets: [
          {
            label: "RAM Usage",
            backgroundColor: [palette.primary, palette.danger, palette.info],
            data: [3000, 6000, 1500]
          }
        ]
      },
      CPUChartData: {
        datasets: [
          {
            label: "Average",
            key: "avgload",
            borderColor: palette.primary,
            data: []
          },
          {
            label: "Current",
            key: "currentload",
            borderColor: palette.danger,
            data: []
          },
          {
            label: "User",
            key: "currentload_user",
            borderColor: palette.info,
            data: []
          },
          {
            label: "System",
            key: "currentload_system",
            borderColor: palette.success,
            data: []
          },
          {
            label: "Idle",
            key: "currentload_idle",
            borderColor: palette.warning,
            data: []
          }
        ]
      },
      ProcessesChartData: {
        labels: ["Running", "Blocked", "Sleeping"],
        keys: ["running", "blocked", "sleeping"],
        datasets: [
          {
            label: "Processes",
            backgroundColor: [palette.primary, palette.danger, palette.info],
            data: [3000, 6000, 1500]
          }
        ]
      },
      Services: [
        {
          name: "Docker",
          running: false,
          startmode: "Manual",
          pids: "54243",
          pcpu: "34%",
          pmem: "12%"
        },
        {
          name: "Apache",
          running: true,
          startmode: "Manual",
          pids: "51423",
          pcpu: "34%",
          pmem: "12%"
        },
        {
          name: "MySQL",
          running: true,
          startmode: "Automatic",
          pids: "54323",
          pcpu: "3%",
          pmem: "27%"
        },
        {
          name: "Mongo",
          running: false,
          startmode: "Automatic",
          pids: "23242",
          pcpu: "54%",
          pmem: "23%"
        }
      ]
    };
  },
  mounted() {
    this.$socket.on("connect", () => {
      // TIP: you can avoid listening on `connect` and listen on events directly too!
      this.$socket.emit("getStats");

      console.log("Connected!");
    });
  },
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    customEmit: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
    sendStats: function(results) {
      var type = results[0];
      var data = results[1];
      switch (type) {
        case "TIME":
          this.SystemTime = data;
          break;
        case "CPUUSAGE":
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              if (this.CPUChartData.datasets.some(c => c.key == key)) {
                this.CPUChartData.datasets
                  .find(c => c.key == key)
                  .data.push(data[key]);
                this.$forceUpdate();
              }
              if (key == "cpus") {
                this.numCores = data[key].length;
              }
            }
          }
          break;
        case "PROCESSUSAGE":
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              if (this.ProcessesChartData.keys.some(k => k == key)) {
                this.ProcessesChartData.data[
                  this.ProcessesChartData.keys.indexOf(key)
                ] = data[key];
                this.$forceUpdate();
              }
            }
          }
          break;
        case "RAMUSAGE":
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              if (this.RAMChartData.keys.some(k => k == key)) {
                this.RAMChartData.data[this.RAMChartData.keys.indexOf(key)] =
                  data[key];
                this.$forceUpdate();
              }
            }
          }
          break;
        case "SYSTEMINFO":
          this.SystemInfos = [];
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              this.SystemInfos.push({
                name: key,
                value: data[key]
              });
            }
          }
          break;
        case "OSINFO":
          this.OSInfos = [];
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              this.OSInfos.push({
                name: key,
                value: data[key]
              });
            }
          }
          break;
        case "BIOS":
          this.BIOSs = [];
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              this.BIOSs.push({
                name: key,
                value: data[key]
              });
            }
          }
          break;
        case "BASEBOARD":
          this.Baseboards = [];
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              this.Baseboards.push({
                name: key,
                value: data[key]
              });
            }
          }
          break;
        case "SERVICES":
          this.Services = data;
          break;
      }
    }
  },
  methods: {
    upTime(time) {
      function pad(num) {
        return ("0" + num).slice(-2);
      }

      function hhmmss(secs) {
        var minutes = Math.floor(secs / 60);
        secs = secs % 60;
        var hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
        // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
      }

      return hhmmss(time);
    },
    getMoment(val) {
      return moment(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  padding: 0 2rem;
  height: 24rem;
}
</style>
