<!--
 * @Author: konnga
 * @Date: 2021-09-12 00:10:37
 * @LastEditors: konnga
 * @LastEditTime: 2021-09-14 10:47:39
 * @Description: 
-->
<script lang="ts" setup>
import { withDefaults } from 'vue'

// 在ts语法下，defineProps 暂时无法使用默认值，需要借助withDefaults
const props = withDefaults(defineProps<{
  remaining: number
  visibility: string
  todoList: todo[]
}>(), {
  remaining: 0,
  visibility: 'all'
})
const emits = defineEmits(['filters', 'clearCompleted'])

const clearCompleted = (): void => {
  emits('clearCompleted')
}

const handleFilters = (type: string): void => {
  emits('filters', type)
}
</script>

<template>
  <footer class="footer">
    <div class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining === 1 ? 'item' : 'items' }} left
    </div>
    <ul class="filters">
      <li>
        <a @click="() => handleFilters('all')" :class="{ selected: visibility == 'all' }">All</a>
      </li>
      <li>
        <a @click="() => handleFilters('active')" :class="{ selected: visibility == 'active' }"
          >Active</a
        >
      </li>
      <li>
        <a @click="() => handleFilters('completed')" :class="{ selected: visibility == 'completed' }"
          >Completed</a
        >
      </li>
    </ul>
    <button
      class="clear-completed"
      @click="clearCompleted"
      v-show="todoList.length > remaining"
    >
      Clear completed
    </button>
  </footer>
</template>

<style lang="less">
.footer {
  display: flex;
  justify-content: space-between;
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
    li {
      display: inline;
      a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
        cursor: pointer;
        &.selected {
            border-color: rgba(175, 47, 47, 0.2);
        }
      }
    }
  }
  .clear-completed, .clear-completed:active {
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
