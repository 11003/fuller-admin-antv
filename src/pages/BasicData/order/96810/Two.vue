<template>
  <div class="Space">
    <div class="search">
      <acceptSearch
        :selectNameArr="acceptSelectNameArr"
        v-model="acceptContent"
      ></acceptSearch>
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
  name: "Two",
  mixins: [BasicDataMiXin],
  data() {
    return {
      visible: false,
      acceptContent: {}, //选择内容
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
          keyName: "from_append",
          name: "举报来源和事发区域"
        },
        {
          type: "custom-Select",
          placeholder: "请选择重要程度",
          keyName: "importance",
          name: "重要程度",
          inline: true,
          selectChildren: [
            { value: 1, label: "全部" },
            { value: 2, label: "是" },
            { value: 3, label: "否" }
          ]
        },
        {
          type: "custom-Select",
          placeholder: "请选择是否过期",
          keyName: "over_time",
          name: "是否过期",
          inline: true,
          selectChildren: [
            { value: 1, label: "全部" },
            { value: 2, label: "已过期" },
            { value: 3, label: "未过期" }
          ]
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
            label: "举报来源",
            dataIndex: "device_id",
            scopedSlots: { customRender: "splitText" }
          },
          {
            label: "事发区域",
            dataIndex: "from_parking_name"
          },
          {
            label: "严重程度",
            dataIndex: "car_id"
          },
          {
            label: "会否报审",
            dataIndex: "status"
          },
          {
            label: "是否回复",
            dataIndex: "is_reply"
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
            status: "良好",
            is_reply: "是"
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
          import("@/components/Modal/BasicData/two-add-work-order"),
        dialogProps: {
          width: "35%",
          title: "新增96180工单",
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
  },
  watch: {
    acceptContent: {
      deep: true,
      handler(data) {
        console.log(data);
      }
    }
  }
};
</script>

<style lang="less"></style>
