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
  name: "Community",
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
          placeholder: "请输入小区名称",
          keyName: "keyWords",
          name: "小区名称",
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
            label: "小区名称",
            dataIndex: "com_id",
            scopedSlots: { customRender: "splitText" }
          },
          {
            label: "所属社区",
            dataIndex: "from_parking_name"
          },
          {
            label: "户数",
            dataIndex: "car_id"
          },
          {
            label: "管理单位名称",
            dataIndex: "status"
          }
        ],
        tableData: [
          {
            key: 2,
            rowKey: 2,
            id: 2,
            com_id: "保利花园二期",
            from_parking_name: "武侯区停车场",
            parking_lot_id: 1,
            car_id: 1,
            status: "良好"
          }
        ]
      }
    };
  },
  methods: {
    funcClick(func_name, data) {
      eval("this." + func_name + "(data)");
    },
    handleTable() {},
    handleSet() {},
    addDevice() {
      this.$Dialog({
        content: () => import("@/components/Modal/BasicData/add_community"),
        dialogProps: {
          width: "35%",
          title: "新增小区",
          okText: "保存",
          onConfirm: res => {
            console.log(res);
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
