<template>
  <div class="table-global">
    <div class="setter" @click="handleSet" v-show="cardTable.useSetting">
      <a-icon
        type="setting"
        style="font-size: 30px;color: #1890FF"
        class="iconfont"
      />
    </div>
    <custom-table
      :scroll="cardTable.scroll || scroll"
      :table-data="cardTable.tableData"
      bordered
      :pagination="cardTable.pagination"
      @onChange="handleTable"
      :total-count="cardTable.total_count"
    >
      <!-- 表头,一列-->
      <a-table-column
        align="center"
        v-for="item in cardTable.columns"
        :key="item.dataIndex"
        :title="item.label"
        :data-index="item.dataIndex"
        :fixed="item.fixed"
        :width="item.width"
      >
        <!--   表格主体-->
        <template slot-scope="text, scope, index" align="center">
          <span
            v-if="
              !(
                item.scopedSlots ||
                item.scopedTimeSlots ||
                item.scopedStateSlots ||
                item.scopedTaskSlots ||
                item.dataIndex == 'over_status_str'
              )
            "
            >{{ text }}</span
          >
          <!-- 文字提示-->
          <div v-if="item.scopedSlots">
            <div slot="splitText" v-show="text ? text.length > 10 : ''">
              <a-tooltip :get-popup-container="setPopupContainer">
                <!-- 漂浮在数据上面的文字提示   -->
                <template slot="title">
                  {{ text }}
                </template>
                <a class="descriptWord">{{ splitText(text) }}</a>
              </a-tooltip>
            </div>
            <span v-show="text ? text.length < 10 || text.length == 10 : ''">{{
              text
            }}</span>
          </div>
          <div v-if="item.scopedTimeSlots">
            <div slot="timeText">
              {{ timeText(text) }}
            </div>
          </div>
          <!-- 事件图片-->
          <div v-if="item.dataIndex == 'picture'" class="changPic">
            <!--图片显示-->
            <div ref="windowing" class="window">
              <ul class="galley">
                <li
                  v-for="(item, index) in scope.sliders"
                  :key="index"
                  class="lionisation"
                  v-show="item != ''"
                >
                  <span v-show="scope.sliders.length" class="sceptre"
                    >{{ scope.sliders.length }}张</span
                  >
                  <img :src="item" @click="showEventPictures(scope)" />
                </li>
                <li v-show="scope.sliders == ''" style="z-index: 200">
                  <br />无
                </li>
              </ul>
            </div>
          </div>
          <!-- 处理图片-->
          <div v-if="item.dataIndex == 'handlepicture'" class="changPic">
            <!--  图片显示-->
            <div ref="handlewindowing" class="window">
              <ul class="galley">
                <li
                  v-for="(item, index) in scope.handlesliders"
                  :key="index"
                  class="lionisation"
                  v-show="item != ''"
                >
                  <span v-show="scope.handlesliders.length" class="sceptre"
                    >{{ scope.handlesliders.length }}张</span
                  >
                  <img :src="item" @click="shandleEventPictures(scope)" />
                </li>
                <li v-show="scope.handlesliders == ''" style="z-index: 200">
                  <br />无
                </li>
              </ul>
            </div>
          </div>
          <!-- 事件语音-->
          <div v-if="item.dataIndex == 'audio'" class="changeVic">
            <div
              class="voice"
              @click="listenVoice(scope)"
              v-show="
                !(
                  scope.voice == '' ||
                  scope.voice == '[]' ||
                  scope.voice == '{}' ||
                  scope.voice.time == 0
                )
              "
            >
              <div>
                <div class="box">
                  <!--                  theme="filled"-->
                  <a-icon type="filter" class="box-voice sound" />
                  <div class="wifi-symbol">
                    <div
                      class="wifi-circle second"
                      :class="active == index ? 'update_second' : 'second'"
                    ></div>
                    <div
                      class="wifi-circle third"
                      :class="active == index ? 'update_third' : 'third'"
                    ></div>
                  </div>
                  <span class="voice-title">语音</span>
                </div>
                <div class="soundbites">
                  <audio class="audioTag" ref="audioTag">
                    <source
                      :src="scope.voice ? scope.voice.url : ''"
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
            </div>
            <div
              class="voice"
              style="z-index: 200"
              v-show="
                scope.voice == '' ||
                  scope.voice == '[]' ||
                  scope.voice == '{}' ||
                  scope.voice.time == 0
              "
            >
              无
            </div>
          </div>
          <!-- 事件处理语音-->
          <div v-if="item.dataIndex == 'reportvoice'" class="changeVic">
            <div
              class="voice"
              @click="listenVoiceoner(scope)"
              v-show="
                !(
                  scope.report_voice == '' ||
                  scope.report_voice == '[]' ||
                  scope.report_voice == '{}' ||
                  scope.report_voice.time == 0
                )
              "
            >
              <div>
                <div class="box">
                  <!--                  theme="filled"-->
                  <a-icon type="filter" class="box-voice sound" />
                  <div class="wifi-symbol">
                    <div
                      class="wifi-circle second"
                      :class="activetwo == index ? 'update_second' : 'second'"
                    ></div>
                    <div
                      class="wifi-circle third"
                      :class="activetwo == index ? 'update_third' : 'third'"
                    ></div>
                  </div>
                  <span class="voice-title">语音</span>
                </div>
                <div class="soundbites">
                  <audio class="audioTag" ref="audioTag2">
                    <source
                      :src="scope.report_voice ? scope.report_voice.url : ''"
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
            </div>
            <div
              class="voice"
              style="z-index: 200"
              v-show="
                scope.report_voice == '' ||
                  scope.report_voice == '[]' ||
                  scope.report_voice == '{}' ||
                  scope.report_voice.time == 0
              "
            >
              无
            </div>
          </div>
        </template>
      </a-table-column>
      <slot v-if="!cardTable || !cardTable.length"></slot>
    </custom-table>
  </div>
</template>

<script>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
export default {
  name: "Table",
  data() {
    return {
      // 小圆圈
      page: null,
      active: -1,
      activetwo: -1,
      scroll: { x: 2000 }
    };
  },
  props: {
    cardTable: {
      type: Object,
      default: () => {
        return { tableData: [], useSetting: false };
      }
    },
    splitTextLength: { default: () => 15 }
  },
  components: {
    customTable: () => import("@/plugins/custom-table/index.vue")
  },
  beforeUpdate() {},
  methods: {
    handleSet(pagination, filters, sorter) {
      this.$emit("onclick", { pagination, filters, sorter });
    },
    handleTable(pagination) {
      this.$emit("ontable", pagination);
    },
    //   文本内容过多，提示文字跟随鼠标移动的问题
    setPopupContainer() {
      return this.$el;
    },
    //提示文字
    splitText(text) {
      if (text) {
        let max_len = this.split_text_length;
        return text.length > max_len
          ? text.substring(0, max_len) + "..."
          : text;
      }
    },
    //展示picture
    showEventPictures(scope) {
      let data = this.cardTable.tableData;
      let number;
      for (let index in data) {
        if (data[index] == scope) {
          number = index;
        }
      }
      let galley = this.$refs["windowing"][number];
      new Viewer(galley, {
        // 相关配置项,详情参考官网
      });
    },
    //处理事件图片
    shandleEventPictures(scope) {
      let data = this.cardTable.tableData;
      let number;
      for (let index in data) {
        if (data[index] == scope) {
          number = index;
        }
      }
      let handlegalley = this.$refs["handlewindowing"][number];
      new Viewer(handlegalley, {
        // 相关配置项,详情参考官网
      });
    }
  }
};
</script>
<style scoped>
.setwidth {
  min-width: 130px;
}
.table-global {
  position: relative;
}
.setter {
  width: 40px;
  height: 58px;
  border-left: 1px solid #e8e8e8;
  position: absolute;
  top: 0px;
  right: 7px;
  cursor: pointer;
  z-index: 30;
}
.setter .iconfont {
  position: absolute;
  top: 13px;
  left: 6px;
}
</style>
<style scoped>
.changeVic {
  width: 90px;
  height: 30px;
  display: inline-block;
  text-align: center;
}
.voice {
  width: 110px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.voice div {
  margin-right: 18px;
}
.soundbites {
  width: 30px;
}
</style>
<style scoped lang="scss">
ol,
ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.changPic {
  display: inline-block;
  width: 50px;
  height: 50px;
}
.window {
  text-align: center;
  position: relative;
  width: 50px;
  height: 50px;
  overflow: hidden;
}

.window ul {
  width: 51px;
  height: 51px;
  overflow: hidden;
  z-index: 100;
}
.window .lionisation {
  width: 51px;
  height: 51px;
  position: relative;
}
.window .sceptre {
  cursor: pointer;
  font-size: 10px;
  position: absolute;
  top: 16px;
  left: 15px;
  color: #ffffff;
  pointer-events: none;
  /*元素永远不会成为鼠标事件的target。但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，*/
  /*在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。*/
}
.window img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  cursor: pointer;
}
img {
  user-select: none;
}
.dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.dots li {
  display: inline-block;
  width: 25px;
  height: 5px;
  margin: 0 3px;
  border: 1px solid white;
  background-color: #ffffff;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.5s;
}
.dots .dotted {
  background-color: #ffffff;
  opacity: 1;
  width: 35px;
}
.overdueColor {
  color: red;
}
.noverdueColor {
  /*color: #42b983;*/
  color: green;
}
.descriptWord {
  color: #0088cc;
}
.stateColor {
  color: #30a679;
}
.nostateColor {
  color: #ff5100;
}
</style>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.box {
  color: #1890ff;
  width: 87px;
  height: 30px;
  border: 1px solid #1890ff;
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
  text-align: center;
  border-radius: 5px;
}
.box-voice {
  font-size: 16px;
  transform: rotate(90deg);
  position: absolute;
  top: 6px;
  left: 7px;
  color: #1890ff;
}
.wifi-symbol {
  position: absolute;
  top: -11px;
  left: 3px;
  margin-left: 30px;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  overflow: hidden;
  transform: rotate(135deg);
}
.voice-title {
  position: absolute;
  top: -1px;
  right: 8px;
}
.wifi-circle {
  border: 2px solid #1890ff;
  border-radius: 50%;
  position: absolute;
}
.second {
  width: 25px;
  height: 25px;
  top: 40px;
  left: 40px;
}

.third {
  width: 30px;
  height: 30px;
  top: 35px;
  left: 35px;
}
.update_second {
  width: 25px;
  height: 25px;
  top: 40px;
  left: 40px;
  animation: fadeInOut 1s infinite 0.2s;
}

.update_third {
  width: 30px;
  height: 30px;
  top: 35px;
  left: 35px;
  animation: fadeInOut 1s infinite 0.4s;
}
@keyframes fadeInOut {
  0% {
    opacity: 0; /*初始状态 透明度为0*/
  }
  100% {
    opacity: 1; /*结尾状态 透明度为1*/
  }
}

.ant-table-body {
  overflow-x: scroll !important;
}
</style>
