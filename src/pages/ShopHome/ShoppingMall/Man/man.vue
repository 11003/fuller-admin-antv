<template>
  <div class="Man">
    <div class="search">
      <acceptSearch
        :select-name-arr="acceptSelectNameArr"
        v-model="acceptContent"
      ></acceptSearch>
    </div>
    <div class="btn-mb20">
      <a-button @click="addShopMall" type="primary">新增</a-button>
      <a-button @click="setStopMethod" type="primary">弹窗一</a-button>
      <a-button @click="setMonthMethod" type="primary">弹窗二</a-button>
    </div>
    <a-card>
      <global-table
        :card-table="cardTable"
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
import ShopHomeMixin from "../../ShopHome.Mixin";
export default {
  name: "Man",
  mixins: [ShopHomeMixin],
  data() {
    return {
      filter: {
        offset: 0,
        __page_size: 0
      },
      acceptContent: {},
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
      },
      ModalTitle: "",
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
          placeholder: "请输入商品名称",
          keyName: "keyWords",
          name: "商品名称",
          hasReset: true
        },
        {
          type: "custom-selectTime",
          name: "定位时间"
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
            label: "名称",
            dataIndex: "title",
            scopedSlots: { customRender: "splitText" }
          },
          {
            label: "地址",
            dataIndex: "from_name"
          },
          {
            label: "等级",
            dataIndex: "level_name"
          },
          {
            label: "价格",
            dataIndex: "type_name"
          },
          {
            label: "图片",
            dataIndex: "picture"
          },
          {
            label: "处理结果图片",
            dataIndex: "handlepicture"
          }
        ],
        tableData: [
          {
            key: 1,
            rowKey: 1,
            id: 1,
            title: "双流区草堂商城流行羽绒服",
            from_name: "双流区天府广场",
            level_name: 1,
            type_name: 299,
            sliders: [
              "https://i.loli.net/2019/11/13/7LAw3NfWJBk4bxO.jpg",
              "https://i.loli.net/2019/11/13/F1LZ2Tkmb7x4aRN.jpg"
            ],
            handlesliders: [
              "https://i.loli.net/2019/11/13/NDWsOaZ1CjmLJAF.jpg",
              "https://i.loli.net/2019/11/13/3wfcP5K4RVqLQnv.jpg"
            ]
          }
        ],
        total_count: 123
      }
    };
  },
  watch: {
    acceptContent: {
      deep: true,
      handler(data) {
        this.filter.name = data.keyWords; //关键字搜索
        if (this.filter.name) {
          this.$Msg.success(data.keyWords);
        }
      }
    }
  },
  methods: {
    handleTable() {},
    handleSet() {},
    setStopMethod() {
      this.$Dialog({
        content: () => import("@/components/Modal/Cars/set-stop-toll"),
        dialogProps: {
          width: "35%",
          title: "弹窗一",
          okText: "保存",
          onConfirm: res => {
            console.log(res);
          }
        }
      });
    },
    setMonthMethod() {
      this.$Dialog({
        content: () => import("@/components/Modal/Cars/set-month-toll"),
        dialogProps: {
          width: "35%",
          title: "弹窗二",
          okText: "保存",
          onConfirm: res => {
            console.log(res);
          }
        }
      });
    },
    editAction() {
      this.$Msg.success("edit");
    },
    deleteAction(key) {
      this.$Msg.success("id:" + key.id);
    },
    addShopMall() {
      this.ModalTitle = "新增商城";
      this.$Dialog({
        content: () => import("@/components/Modal/input-map.vue"),
        dialogProps: {
          width: "35%",
          title: this.ModalTitle,
          okText: "保存",
          onConfirm: res => {
            console.log(res);
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.Man {
  .modal-style {
    .ant-modal-content {
      .ant-modal-body {
        .ant-form-item {
          padding: 0 5rem;
        }
      }
    }
  }
}
</style>
