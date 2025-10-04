// src/components/TodoList.jsx
import { useState } from "react";

function TodoList() {
  // 할 일 목록 상태
  const [todos, setTodos] = useState([
    { id: 1, text: "React 세팅하기", done: true },
    { id: 2, text: "샘플 화면 만들기", done: false },
  ]);

  // 입력 상태
  const [input, setInput] = useState("");

  // 할 일 추가
  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = { id: Date.now(), text: input, done: false };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  // 완료 토글
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // 삭제
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h2>할 일 목록</h2>

      {/* 입력창 */}
      <input
        type="text"
        value={input}
        placeholder="할 일을 입력하세요"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>추가</button>

      {/* 리스트 */}
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              margin: "5px 0",
            }}
          >
            <span onClick={() => toggleTodo(todo.id)} style={{ cursor: "pointer" }}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)} style={{ marginLeft: "10px" }}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
