<template>
  <div class="Space">
    <div class="search">
      <acceptSearch :selectNameArr="acceptSelectNameArr"></acceptSearch>
    </div>
    <div class="btn-mb20">
      <a-button @click="addDevice" type="primary">新增</a-button>
    </div>
    <a-card>
      <global-table
        :cardTable="cardTable"
        @ontable="handleTable"
        @onclick="handleSet"
      >
        <a-table-column title="操作" fixed="right" align="center" width="180px">
          <template slot-scope="scope">
            <a-button
              v-for="(item, index) in btns"
              @click="funcClick(item.action, scope)"
              class="ml5"
            >
              {{ item.name }}
            </a-button>
          </template>
        </a-table-column>
      </global-table>
    </a-card>
  </div>
</template>

<script>
import { deepClone } from "@/utils/utils";
import BasicDataMiXin from "@/pages/BasicData/BasicData.Mixin.js";
const formData = {
  car_id: "",
  device_id: "",
  parking_lot_id: ""
};
export default {
  name: "Water",
  mixins: [BasicDataMiXin],
  data() {
    return {
      visible: false,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, { name: "coordinated" }),
      formData: { ...formData },
      parking_lot_list: [
        { key: 1, value: "武侯区停车场" },
        { key: 2, value: "双流区停车场" },
        { key: 3, value: "金牛区停车场" }
      ],
      btns: {
        edit: {
          action: "editAction",
          name: "编辑"
        },
        delete: {
          action: "deleteAction",
          name: "删除"
        }
      },
      acceptSelectNameArr: [
        {
          type: "custom-inputSearch",
          placeholder: "请输入水域名称",
          keyName: "keyWords",
          name: "水域名称",
          hasReset: true
        }
      ],
      cardTable: {
        columns: [
          {
            label: "ID",
            dataIndex: "id",
            fixed: "left",
            width: 130
          },
          {
            label: "水域名称",
            dataIndex: "water_name",
            scopedSlots: { customRender: "splitText" }
          }
        ],
        tableData: [
          {
            key: 2,
            rowKey: 2,
            id: 2,
            water_name: "保利花园水域"
          }
        ]
      }
    };
  },
  methods: {
    handleTable() {},
    handleSet() {},
    addDevice() {
      this.$Dialog({
        content: () => import("@/components/Modal/input-map.vue"),
        contentProps: {
          input_name: "水域名称",
          input_pen: "勾画水域"
        },
        dialogProps: {
          width: "35%",
          title: "新增小区",
          okText: "保存",
          onConfirm: res => {
            console.log(res);
          },
          onCancel: () => {
            console.log("onCancel");
          }
        }
      });
    },
    editAction(data) {
      console.log(data);
      this.formData = deepClone(data);
    },
    deleteAction() {}
  }
  // watch: {
  //   acceptContent: {
  //     deep: true,
  //     handler(data) {
  //       console.log(data);
  //     }
  //   }
  // }
};
</script>

<style lang="less"></style>
