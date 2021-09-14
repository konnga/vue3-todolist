<!--
 * @Author: WangJiaCheng
 * @Date: 2021-09-11 15:17:56
 * @LastEditors: WangJiaCheng
 * @LastEditTime: 2021-09-14 09:45:50
 * @Description: 
-->
<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

import Headers from "@/views/Headers"
import Footers from '@/views/Footers'
import CreateTodo from "@/views/CreateTodo"
import TodoList from '@/views/TodoList'

interface filters {
  [key: string]: (todo: todo[]) => todo[]
}

// localStorage persistence
const STORAGE_KEY = "todos-vuejs-3.0"
const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    return todos
  },
  save(todos: todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

let todoList = ref<todo[]>(todoStorage.fetch())
const visibility = ref<string>('all')
const filters: filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter((todo) => !todo.completed)
  },
  completed(todos) {
    return todos.filter((todo) => todo.completed)
  },
}
const remaining = computed(() => filters.active(todoList.value).length)
const filteredTodos = computed(() => filters[visibility.value](todoList.value))

// 当不传递侦听源时，默认监听回调函数内的响应式数据
// 监听复杂数据源时，使用箭头函数处理
watch(() => todoList.value, (todos, preTodos) => {
  todoStorage.save(todos)
}, {
  deep: true,
})

const createTodo = (value: string) => {
  if (value) {
    todoList.value.push({
      id: new Date().getTime(),
      value,
      completed: false
    })
  }
}
const removeTodo = (todo: todo) => {
  todoList.value = todoList.value.filter(item => item.id !== todo.id)
}
const handleFilters = (type: string) => {
    if (filters[type]) {
    visibility.value = type
  } else {
    visibility.value = "all"
  }
}
const handleClearCompleted = ():void => {
  todoList.value = filters.active(todoList.value)
}
</script>

<template>
  <div class="todoapp">
    <Headers />
    <CreateTodo
      @create="createTodo"
    />
    <div class="main" v-show="todoList?.length">
      <TodoList
        :todoList="filteredTodos"
        @remove="removeTodo"
      />
      <Footers
        :todoList="todoList"
        :remaining="remaining"
        :visibility="visibility"
        @filters="handleFilters"
        @clearCompleted="handleClearCompleted"
      />
    </div>
  </div>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>tods developed by sfc and ts</p>
    <p>Written by <a href="http://konnga.cn">WangJiaCheng</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
</template>

<style lang="less">
.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
</style>
