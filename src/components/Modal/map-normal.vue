<template>
  <div class="map-normal">
    <div class="input-item" style="width: 0; margin-left:0;">
      <a-row>
        <a-col span="24">
          <a-input
            id="pickerInput"
            placeholder="请输入关键字"
            type="text"
            style="width: 300px;margin: 10px 1em 1em 1em;cursor: pointer"
            v-model="address"
          >
            <a-icon type="search" slot="suffix" />
          </a-input>
        </a-col>
        <!--<a-col span="8">
          <div class="input-item-prepend">
            <span class="input-item-text" style="width:8rem;"
              >定位地址：{{ address }}</span
            >
          </div>
        </a-col>-->
      </a-row>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import { loadScriptAsync } from "@/utils/utils";
import { Loading } from "element-ui";
import http from "axios";
let AMap, AMapUI;
export default {
  name: "MapNormal",
  components: {},
  props: {
    location1: { default: "" },
    address1: { default: "" }
  },
  data() {
    return {
      address: "",
      location: ""
    };
  },
  created() {
    if (this.location1) {
      this.address = this.address1;
      this.location = this.location1;
    }
    this.loadMap();
  },
  mounted() {
    this.loading = Loading.service({
      target: "#container",
      fullscreen: true,
      lock: true
    });
  },
  methods: {
    initMap() {
      const $vm = this;
      let marker = null;
      let map = new AMap.Map("container", {
        zoom: 11
      });
      //如果有经纬度，则中心点为当前经纬度，否则为系统默认生成的
      let lngLat = this.location && this.location.split(",");
      if (lngLat.length > 0) {
        let center = lngLat
          .map(item => {
            return Number(item);
          })
          .sort();
        console.log(center);
        map.setCenter(center);
        addMarker(center[0], center[1]);
      }
      map.on("complete", function() {
        // 地图图块加载完成后触发
        loadScriptAsync({
          id: "aMap-ui",
          src: "https://webapi.amap.com/ui/1.0/main.js"
        }).then(() => {
          AMapUI = AMapUI || window.AMapUI;
          AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
            poiPickerReady(new PoiPicker({ input: "pickerInput" }));
          });
        });
        map.on("click", function(e) {
          let lng = e.lnglat.getLng();
          let lat = e.lnglat.getLat();
          let url = "https://restapi.amap.com/v3/geocode/regeo";
          let location = [lng, lat].join(",");
          let params = {
            key: "9859c0fa56d259bb3979a6ea69358607",
            location: location
          };
          addMarker(lng, lat);
          http.get(url, { params: params }).then(res => {
            console.log(res);
            let { formatted_address } = res.data.regeocode;
            if (!formatted_address || formatted_address.length === 0) {
              $vm.$message.error("该点位未查询到对应地址!");
            } else {
              $vm.address = Array.isArray(formatted_address)
                ? formatted_address[0]
                : formatted_address;
              $vm.location = location;
            }
          });
        });
        $vm.loading.close();
      });
      function poiPickerReady(poiPicker) {
        let marker = new AMap.Marker();
        let infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
        });
        //选取了某个POI
        poiPicker.on("poiPicked", function(poiResult) {
          let source = poiResult.source,
            poi = poiResult.item,
            info = {
              source: source,
              id: poi.id,
              name: poi.name,
              location: poi.location.toString(),
              address: poi.address
            };
          marker.setMap(map);
          infoWindow.setMap(map);
          marker.setPosition(poi.location);
          infoWindow.setPosition(poi.location);
          $vm.address = info.name;
          $vm.location = info.location;
          infoWindow.open(map, marker.getPosition());
        });
      }
      // 实例化点标记
      function addMarker(lng, lat) {
        marker = new AMap.Marker({
          position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "1"
        });
        map.clearMap();
        marker.setMap(map);
      }
    },
    confirm() {
      return { location: this.location, address: this.address };
    },
    loadMap() {
      loadScriptAsync({
        id: "map-script",
        src:
          "https://webapi.amap.com/maps?v=1.4.11&key=a3b3d16e95cfd8d858300d093f839c5f&plugin=Map3D,ElasticMarker,AMap.MouseTool"
      }).then(() => {
        AMap = AMap || window.AMap;
        this.initMap();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.map-normal {
  position: relative;
}
.input-item {
  width: 100%;
  margin: auto;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
}
#container {
  height: calc(100vh - 300px);
}
</style>
