# Vue 3  Todos

[在线Demo](https://codesandbox.io/s/vue3-todolist-y0thz)

[script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)

使用 Vue 3 + Typescript + Vite 开发的 todoList 应用。

## 运行

- yarn install
- yarn dev

### 技术点

#### typescript + vue3

- 类型注解普通数据类型

```ts
  let newTodo = ref<string>('')
  let count = ref<number>(0)
```

- 类型注解对象数组

```ts
interface todo {
  id: number
  value: string
  completed?: boolean
}

const props = defineProps<{
  todo: todo,
  todoList: todo[]
}>()
```

#### script setup

setup 函数在beforeCreate和created期间运行的，可以将需要在created钩子里编写的代码放置在setup中

- defineProps

定义Props，同时使用TS做类型注解

```ts
const props = defineProps<{
  todoList: todo[]
}>()
```

定义Props，同时使用TS做类型注解并赋予默认值

```ts
const props = withDefaults(defineProps<{
  remaining: number
  visibility: string
  todoList: todo[]
}>(), {
  remaining: 0,
  visibility: 'all'
})
```

- watch

监听基本类型的数据源

```ts
const count = ref<number>(0)

watch(count, (todos, preTodos) => {
  todoStorage.save(todos)
}, {
  deep: true,
})
```
监听对象或数组

```ts
let todoList = ref<todo[]>(todoStorage.fetch())

watch(() => todoList.value, (todos, preTodos) => {
  todoStorage.save(todos)
}, {
  deep: true,
})

const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)
```

- defineEmits

定义事件，同时使用TS做类型注解

```ts
const emits = defineEmits<{
  (e: 'remove', todo: todo): void
}>()

// 触发事件
emits('remove', todo)
```

#### directive

```javascript
const app = createApp(App)

app.directive('todo-focus', {
  updated(el, binding) {
    if (binding.value) {
      el.focus()
    }
  }
})
```
...
