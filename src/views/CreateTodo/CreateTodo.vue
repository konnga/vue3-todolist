<!--
 * @Author: konnga
 * @Date: 2021-09-11 16:45:52
 * @LastEditors: konnga
 * @LastEditTime: 2021-09-14 09:23:00
 * @Description: 
-->
<script lang="ts" setup>
  import { ref } from 'vue'

  const emits = defineEmits<{
    (e: 'create', value: string): void
  }>()

  let newTodo = ref<string>('')

  const addTodo = () => {
    if (!newTodo.value) {
      return
    }
    emits('create', newTodo.value)
    newTodo.value = ''
  }
</script>

<template>
  <input
    class="new-todo"
    autofocus
    autocomplete="off"
    placeholder="What needs to be done?"
    v-model="newTodo"
    @keyup.enter="addTodo"
  />
</template>

<style lang="less">
  .new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, .003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
    box-sizing: border-box;
    outline: none;
  }
</style>
