<!--
 * @Author: konnga
 * @Date: 2021-09-11 15:15:28
 * @LastEditors: konnga
 * @LastEditTime: 2021-09-13 17:14:01
 * @Description: header
-->
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Headers",
  setup() {
    return {};
  },
});
</script>

<template>
  <div class="header">
    <h2>todos</h2>
  </div>
</template>

<style lang="less">
.header {
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.55);
  h2 {
    position: absolute;
    top: -155px;
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    text-rendering: optimizeLegibility;
  }
}
</style>
