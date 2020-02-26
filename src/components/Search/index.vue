<template>
  <div>
    <input type="hidden" v-show="false" :value="value" />
    <a-form class="search-from">
      <a-row>
        <a-col
          v-for="(selectItem, index) of selectNameArrAfterDeal"
          :key="'selectItem' + index"
          :xxl="selectItem.inline ? 8 : 24"
          :xl="selectItem.inline ? 12 : 24"
        >
          <a-row v-if="reSetsShow">
            <asyncComponents
              :component="
                () =>
                  import(
                    '@/components/Search/store/' + selectItem.componentsName
                  )
              "
              :name="selectItem.name"
              :refName="selectItem.refName"
              :placeholder="selectItem.placeholder"
              :keyName="selectItem.keyName"
              :selectList="selectItem.selectList"
              :advanceChildren="selectItem.advanceChildren"
              :hasReset="selectItem.hasReset"
              :selectChildren="selectItem.selectChildren"
              :styleCss="selectItem.styleCss"
              :authType="selectItem.authType"
              :taskStatusSelected="selectItem.taskStatusSelected"
              :selectedValueProps="selectItem.selectedValue"
              :departmentType="selectItem.departmentType"
              @input="getValFromAsynComponents"
              @searchRest="keyWordsReset"
            />
          </a-row>
        </a-col>
      </a-row>
      <a-row
        class="search-from-row"
        v-for="(selectName, index) of selectNameArr"
        :key="index"
      >
      </a-row>
    </a-form>
  </div>
</template>
<script>
import asyncComponents from "@/plugins/async-components/index.vue";
export default {
  name: "Search",
  components: { asyncComponents },
  props: {
    selectNameArr: {
      type: Array,
      default: () => {
        return [];
      }
    }, //需要展示的搜索框数组
    selectedAcceptList: {
      type: Object,
      default: () => {
        // return { taskFrom: "案件来源" };
        return {};
      }
    }
  },
  data() {
    return {
      value: "",
      //处理后的选框列表
      selectNameArrAfterDeal: [],
      //已选择的内容
      selectedList: {},
      reSetsShow: true // 实现筛选组建局部重置
    };
  },
  watch: {
    selectNameArr() {
      //处理传过来的选框列表
      this.dealNameArr();
    }
  },
  created() {
    this.dealNameArr();
  },
  beforeDestroy() {},
  methods: {
    // 用法
    // acceptSelectNameArr: [
    //   {
    //     type: "custom-inputSearch",
    //     placeholder: "请输入任务编号、处置人姓名、事件处置描述",
    //     keyName: "keyWords",
    //     name: "关键字搜索",
    //     hasReset: true,
    //     styleCss: "width:390px"
    //   },
    //   {
    //     type: "custom-selectTime"
    //   }
    // ],

    //处理选框列表
    dealNameArr() {
      this.selectNameArr.forEach(item => {
        switch (item.type) {
          case "custom-selectTime":
            this.selectNameArrAfterDeal = [
              ...this.selectNameArrAfterDeal,
              {
                keyName: item.keyName || "locationRange",
                name: item.name || "定位时间",
                componentsName: "custom-selectTime.vue",
                inline: item.inline
              }
            ];
            break;
          case "custom-inputSearch":
            this.selectNameArrAfterDeal = [
              ...this.selectNameArrAfterDeal,
              {
                name: item.name,
                componentsName: "custom-inputSearch.vue",
                refName: item.refName,
                hasReset: item.hasReset,
                placeholder: item.placeholder,
                keyName: item.keyName,
                styleCss: item.styleCss,
                selectedValue: this.selectedAcceptList.keyWords,
                inline: item.inline
              }
            ];
            break;
          case "custom-Select":
            this.selectNameArrAfterDeal = [
              ...this.selectNameArrAfterDeal,
              {
                keyName: item.keyName,
                name: item.name,
                componentsName: "custom-Select.vue",
                placeholder: item.placeholder,
                inline: item.inline,
                selectChildren: item.selectChildren
              }
            ];
            break;
          case "custom-timeFilter":
            this.selectNameArrAfterDeal = [
              ...this.selectNameArrAfterDeal,
              {
                keyName: item.keyName,
                name: item.name,
                componentsName: "custom-timeFilter.vue",
                placeholder: item.placeholder,
                inline: item.inline,
                selectChildren: item.selectChildren
              }
            ];
            break;
        }
      });
    },
    //获取子组件的值
    getValFromAsynComponents(val) {
      this.selectedList[val.name] = val.value;
      this.selectedChange();
    },
    //获取各种选框下拉列表
    //选择的内容改变时触发
    selectedChange() {
      console.log(this.selectedList);
      //将选择的内容发送给父组件
      this.$emit("input", { ...this.selectedList, isSearchReset: true });
    },
    //重置按钮
    keyWordsReset() {
      //清空已选择的内容
      this.selectedChange();
      this.selectNameArrAfterDeal.map((item, index) => {
        if (item.selectedValue) {
          this.selectNameArrAfterDeal[index].selectedValue = undefined;
        }
      });
      this.searchReload();
    },
    //筛选组件局部更新
    async searchReload() {
      this.reSetsShow = false;
      await this.$nextTick();
      this.reSetsShow = true;
    }
  }
};
</script>
<style scoped lang="scss">
.search-from {
  position: relative;
  margin-top: 20px;
  .ant-form-item-label {
    min-width: 90px;
  }
  .search-buttonBox > button:nth-child(1) {
    margin-right: 10%;
  }
  .custom-label {
    margin-bottom: 0;
    text-align: right;
    color: rgba(0, 0, 0, 0.85);
    &:after {
      content: ":";
      margin: 0 8px 0 2px;
      position: relative;
      top: -0.5px;
    }
  }
  .search-row-box {
    display: flex;
    /*width: 100%;*/
    margin-bottom: 20px;
    align-items: center;
    flex-wrap: wrap;
  }
  .advance-options-box {
    margin-bottom: 0;
    > div {
      margin-bottom: 20px;
    }
    & > div:nth-child(3) {
      margin-left: 50px;
    }
  }
  .anticon-close-circle {
    cursor: pointer;
    color: #ccc;
    transition: color 0.3s;
  }
  .anticon-close-circle:hover {
    color: #999;
  }
  .anticon-close-circle:active {
    color: #666;
  }
  .search-from-innerBox {
    display: inline-block;
    width: 600px;
    > div {
      width: 100%;
    }
  }
}
</style>
