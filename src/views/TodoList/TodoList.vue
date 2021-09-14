<!--
 * @Author: WangJiaCheng
 * @Date: 2021-09-12 00:09:33
 * @LastEditors: WangJiaCheng
 * @LastEditTime: 2021-09-14 09:47:15
 * @Description: 
-->
<script lang="ts" setup>
import TodoItem from '@/components/TodoItem'

const props = defineProps<{
  todoList: todo[]
}>()

const emits = defineEmits<{
  (e: 'remove', todo: todo): void
}>()

const handleRemove = (todo: todo) => {
  emits('remove', todo)
}
</script>

<template>
  <ul class="todo-list">
    <TodoItem
      v-for="todo in todoList"
      :key="todo.id"
      :todo="todo"
      @remove="handleRemove"
    />
  </ul>
</template>

<style lang="less">

</style>