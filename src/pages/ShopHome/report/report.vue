<template>
  <div class="report">
    <div class="search">
      <acceptSearch
        :select-name-arr="acceptSelectNameArr"
        v-model="acceptModel"
      ></acceptSearch>
    </div>
    <EChart />
  </div>
</template>

<script>
import acceptSearch from "@/components/Search";
import EChart from "@/components/EChart";

export default {
  name: "Report",
  components: {
    acceptSearch,
    EChart
  },
  data() {
    return {
      acceptModel: [],
      acceptSelectNameArr: [
        {
          type: "custom-Select",
          placeholder: "请选择停车场",
          keyName: "CarListName",
          name: "停车场"
        },
        {
          type: "custom-timeFilter",
          placeholder: "时间筛选",
          keyName: "time",
          name: "时间筛选"
        }
      ]
    };
  },
  watch: {
    acceptModel: {
      deep: true,
      handler(data) {
        console.log(data);
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped></style>
