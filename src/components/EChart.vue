<template>
  <div class="echart">
    <v-chart class="my-chart" :options="option" />
  </div>
</template>
<script>
import ECharts from "vue-echarts/components/ECharts";
// 引入柱状图
import "echarts/lib/chart/bar";

// 引入提示框和标题、头部说明组件
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";

const colors = ["#5793f3", "#d14a61", "#675bba"];

const option = {
  color: colors,
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    },
    backgroundColor: "rgba(255,255,255,0.8)", //通过设置rgba调节背景颜色与透明度
    formatter(params) {
      var showHtm = "<div class='box'>";
      var time = params[0].axisValueLabel;
      showHtm +=
        "<div class='time-box'><div class='time'>" + time + "</div></div>";
      for (var i = 0; i < params.length; i++) {
        //x轴名称
        var name = params[i].seriesName;
        //值
        var value = params[i].value;
        showHtm +=
          "<div class='item' ><div class='item-box ' style='border-left: 3px solid " +
          colors[i] +
          ";color: " +
          colors[i] +
          ";'><div class='item-title'>" +
          name +
          "</div><div class='item-money'>" +
          value +
          "</div></div></div>";
      }
      showHtm += "</div>";
      return showHtm;
    }
  },
  grid: {
    right: "20%"
  },
  legend: {
    right: "330",
    data: ["停车时长", "应收金额", "停车量(次)"]
  },
  xAxis: [
    {
      type: "category",
      axisTick: {
        alignWithLabel: true
      },
      data: [
        "10-04",
        "10-07",
        "10-10",
        "10-13",
        "10-16",
        "10-19",
        "10-22",
        "10-25",
        "10-28"
      ]
    }
  ],
  yAxis: [
    {
      show: false
    },
    {
      show: false
    },
    {
      type: "value",
      min: 0,
      max: 1112,
      position: "left",
      axisLine: {
        lineStyle: {
          color: "#CCC"
        }
      },
      axisLabel: {
        formatter: "{value}"
      }
    }
  ],
  series: [
    {
      barGap: 0,
      name: "停车时长",
      type: "bar",
      data: [
        2.0,
        4.9,
        7.0,
        23.2,
        25.6,
        76.7,
        135.6,
        162.2,
        32.6,
        20.0,
        6.4,
        3.3
      ]
    },
    {
      barGap: 0,
      name: "应收金额",
      type: "bar",
      yAxisIndex: 1,
      data: [
        1122.6,
        5.9,
        9.0,
        26.4,
        28.7,
        70.7,
        175.6,
        182.2,
        48.7,
        18.8,
        6.0,
        2.3
      ]
    },
    {
      name: "停车量(次)",
      type: "line",
      yAxisIndex: 2,
      data: [
        223,
        12.2,
        213.3,
        4.5,
        6.3,
        10.2,
        1120.3,
        23.4,
        23.0,
        216.5,
        12.0,
        6.2
      ]
    }
  ]
};
export default {
  name: "Chart",
  components: {
    "v-chart": ECharts
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      option
    };
  }
};
</script>
<style lang="scss">
.echart {
  background-color: #ffffff;
  padding-top: 35px;
  .my-chart {
    width: 100%;
    height: 500px;
  }
  .box {
    z-index: 99;
    width: 160px;
    height: 258px;
    padding: 20px 0 20px 20px;
    box-shadow: 0 7px 29px 0 rgba(30, 143, 255, 0.2);
    border-radius: 4px;
  }
  .time-box {
    width: 100%;
    height: 30px;
  }
  .time {
    color: #565656;
    font-size: 15px;
    font-weight: bold;
    line-height: 10px;
    padding-left: 35px;
  }
  .item {
    height: 40px;
    margin-bottom: 30px;
    font-weight: 400;
    font-size: 15px;
  }
  .item-box {
    padding-left: 10px;
  }
  .item-title {
    width: 100%;
    height: 15px;
    margin-bottom: 10px;
  }
  .item-money {
    width: 100%;
    height: 18px;
  }
}
</style>
