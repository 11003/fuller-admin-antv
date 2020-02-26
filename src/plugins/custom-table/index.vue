<template>
  <a-table
    :bordered="bordered"
    :columns="columns"
    :data-source="tableData"
    :pagination="pagination"
    :row-selection="rowSelection"
    :scroll="scroll"
    :row-class-name="rowClassName"
    @expand="onTableExpand"
    @change="onTableChange"
    @expandedRowsChange="onExpandedRowsChange"
  >
    <slot v-if="!columns || !columns.length"></slot>
    <div slot="footer" slot-scope="" align="left" v-show="totalCount">
      共：{{ totalCount }} 条
    </div>
  </a-table>
</template>

<script>
export default {
  name: "CustomTable",
  props: {
    tableData: { type: Array, default: () => [] },
    columns: { type: Array, default: () => undefined },
    bordered: { type: Boolean, default: true },
    pagination: { type: Object, default: null },
    rowSelection: { type: Object, default: null },
    rowClassName: { type: String, default: undefined },
    scroll: { type: Object, default: undefined },
    customHeaderRow: { type: Function, default: undefined },
    customRow: { type: Function, default: undefined },
    rowKey: { type: [String, Function], default: "key" },
    size: { type: String, default: "default" },
    totalCount: { type: Number, default: () => undefined }
  },
  data() {
    return {};
  },
  methods: {
    onTableChange(pagination, filters, sorter) {
      this.$emit("onChange", { pagination, filters, sorter });
    },
    onTableExpand(expanded, record) {
      this.$emit("onExpand", { expanded, record });
    },
    onExpandedRowsChange(expandedRows) {
      this.$emit("onExpandRowsChange", { expandedRows });
    }
  }
};
</script>

<style scoped></style>
