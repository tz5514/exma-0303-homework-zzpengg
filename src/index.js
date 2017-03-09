// require styles
require('../styles/index.scss');

// require modules
import $ from 'jquery';

import TodoItem from './TodoItem.js';

const todoInstances = [];

// 更新一個 todo 的資料到 API Server
const updateTodoAPI = async(data) => {
  const response = await fetch(`/api/todos/update/${data.id}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/text'
    },
    body: data
  });
  return await console.log(response);
}

// 將所有的 todo 都變成 完成 或 未完成 的顯示狀態，並呼叫更新資料到 API Server
function toggleAllTodosCompleted(isCompleted) {
  todoInstances.forEach(todo => {
    todo.toggleCompleted(isCompleted);
  });
}

// 建立並初始化一個 Todo Component
function createTodoComponent({id, title, isCompleted}) {
  const newTodo = new TodoItem({
    id, title, isCompleted,
    onToggle: updateTodoAPI
  });
  todoInstances.push(newTodo);
}

// 讀取 API todo 資料並呼叫 UI 初始化
const loadAPI = async() => {
  const response = await fetch('/api/todos').then(data => data.json()); // 處理資料
  response.forEach(todoData => {
    createTodoComponent(todoData);
  })
}

// 程式進入點
$(document).ready(() => {
  loadAPI();

  // 綁定全部完成的事件
  $('#complete-all-btn').click(() => {
    toggleAllTodosCompleted(true);
  });

  // 綁定全部未完成的事件
  $('#uncomplete-all-btn').click(() => {
    toggleAllTodosCompleted(false);
  });
});
