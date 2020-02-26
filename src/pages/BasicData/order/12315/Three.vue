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
import BasicDataMiXin from "@/pages/BasicData/BasicData.Mixin.js";
const formData = {
  car_id: "",
  device_id: "",
  parking_lot_id: ""
};
export default {
  name: "Three",
  mixins: [BasicDataMiXin],
  data() {
    return {
      visible: false,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      formData: { ...formData },
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
          placeholder: "请输入举报来源、事发区域",
          keyName: "keyWords",
          name: "举报来源或事发区域"
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
            label: "工单编号",
            dataIndex: "device_id",
            scopedSlots: { customRender: "splitText" }
          },
          {
            label: "受理时间",
            dataIndex: "from_parking_name"
          },
          {
            label: "重要程度",
            dataIndex: "car_id"
          },
          {
            label: "过期时间",
            dataIndex: "status"
          }
        ],
        tableData: [
          {
            key: 2,
            rowKey: 2,
            id: 2,
            device_id: "武侯区524XVAXV33C",
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
    handleTable() {},
    handleSet() {},
    addDevice() {
      this.$Dialog({
        content: () =>
          import("@/components/Modal/BasicData/three-add-work-order"),
        dialogProps: {
          width: "35%",
          title: "新增12315工单",
          okText: "保存",
          onConfirm: res => {
            console.log(res);
          }
        }
      });
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    editAction(data) {
      console.log(data);
    },
    deleteAction() {}
  }
};
</script>

<style lang="less"></style>
