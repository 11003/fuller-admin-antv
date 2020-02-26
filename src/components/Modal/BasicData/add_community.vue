<template>
  <div class="one-add-work-order">
    <a-form>
      <a-row style="padding-top: 20px;">
        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="小区名称">
            <a-input
              placeholder="小区名称"
              v-model="formData.com_name"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="小区地址">
            <a-input placeholder="小区地址" v-model="formData.com_address">
              <a-tooltip slot="suffix" title="选择地图">
                <a-icon
                  type="environment"
                  style="cursor: pointer"
                  @click="showMap"
                />
              </a-tooltip>
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="所属社区">
            <a-input placeholder="所属社区" v-model="formData.belong_to_com" />
          </a-form-item>
        </a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="交付时间">
            <a-input
              maxlength="11"
              placeholder="交付时间"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="建筑面积">
            <a-input
              maxlength="11"
              placeholder="建筑面积"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="建筑类型">
            <a-input
              placeholder="建筑类型"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="幢数">
            <a-input
              placeholder="幢数"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="电梯数">
            <a-input
              placeholder="电梯数"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="户数">
            <a-input
              placeholder="户数"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="是否住宅">
            <a-select v-model="formData.is_home">
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item></a-col
        >
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="管理形式">
            <a-input
              placeholder="管理形式"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item v-bind="formItemLayout24" label="物管全称">
            <a-input placeholder="物管全称" v-model="formData.belong_to_com" />
          </a-form-item>
        </a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="项目经理">
            <a-input
              placeholder="项目经理"
              v-model="formData.order_id"
              style="width: 100%"
            /> </a-form-item
        ></a-col>
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="联系方式">
            <a-input
              placeholder="联系方式"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="是否填报网格化">
            <a-select
              v-model="formData.is_network"
              placeholder="是否填报网格化"
              @change="handleChangeNetWork"
            >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select></a-form-item
          ></a-col
        >
        <a-col :span="10">
          <a-form-item v-bind="formItemLayout" label="是否出新">
            <a-input
              placeholder="是否出新"
              v-model="formData.rece_time"
              style="width: 100%"
            /> </a-form-item
        ></a-col>

        <a-col :span="24" class="obj-type">
          <a-form-item v-bind="formItemLayout2" label="可否封闭">
            <a-select v-model="formData.is_close">
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
const formData = {
  com_name: "", //小区名称
  com_address: "", //小区地址
  w_lat: "", //经度
  j_lng: "", //纬度
  belong_to_com: "", //所属社区
  is_home: "1", //是否住宅
  is_network: "1", //是否填报网格化
  is_close: "1" //是否封闭
};
import Vue from "vue";
import { customDialog } from "@/plugins/custom-dialog";
Vue.use(customDialog);
export default {
  name: "AddCommunity",
  data() {
    return {
      formData,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        }
      },
      formItemLayout2: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        }
      },
      formItemLayout24: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        }
      }
    };
  },
  methods: {
    handleChangeNetWork(value) {
      this.formData.is_network = value;
    },
    onChangePleaseTime(value, dateString) {
      this.formData.please_time = dateString;
    },
    onChangePleaseEventHappenTime(value, dateString) {
      this.formData.please_event_happen_time = dateString;
    },
    showMap() {
      this.$Dialog({
        content: () => import("@/components/Modal/map-normal.vue"),
        option: {
          width: "60%",
          title: "地图",
          okText: "确定",
          onConfirm: res => {
            this.formData.com_address = res.address;
            let location = res.location.split(",");
            this.formData.j_lng = location[0];
            this.formData.w_lat = location[1];
          },
          contentProps: {
            location1: this.formData.location,
            address1: this.formData.com_address
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
