<!--
 * @Author: WangJiaCheng
 * @Date: 2021-09-13 11:11:25
 * @LastEditors: WangJiaCheng
 * @LastEditTime: 2021-09-14 09:45:13
 * @Description: 
-->
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  todo: todo
}>()
const emits = defineEmits<{
  (e: 'remove', todo: todo): void
}>()

let editedTodo = ref<any>({})
let beforeEditCache: string

const editTodo = (todo: todo) => {
  beforeEditCache = todo.value
  editedTodo.value = todo
}
const cancelEdit = (todo: todo) => {
    editedTodo.value = null
    todo.value = beforeEditCache
}
const doneEdit = (todo: todo) => {
  if (!editedTodo?.value) {
    return
  }
  editedTodo.value = null
  todo.value = todo.value.trim()
  if (!todo.value) {
    removeTodo(todo)
  }
}
const removeTodo = (todo: todo) => {
  emits('remove', todo)
}
</script>

<template>
  <li
    class="todo"
    :class="{ completed: todo.completed, editing: todo?.id == editedTodo?.id }"
  >
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todo.completed" />
      <label @dblclick="editTodo(todo)">{{ todo.value }}</label>
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
    <input
      class="edit"
      type="text"
      v-model="todo.value"
      v-todo-focus="todo == editedTodo"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.esc="cancelEdit(todo)"
    />
  </li>
</template>

<style lang="less">
.todo {
  text-align: left;
  .toggle {
    cursor: pointer;
  }
  .destroy {
    cursor: pointer;
  }
}
</style>
