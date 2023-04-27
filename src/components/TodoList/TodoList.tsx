import { useEffect, useState } from "react";
import { TodoItem } from "..";
import { TodoItemProps } from "../TodoItem/types";
import './style.css';

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoItemProps[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const result = await response.json();

      setTodos(result);
    }

    fetchTodos();
  }, []);

  return (
    <div className="todo-list">
      <h2 className="todo-list-title">Список дел</h2>

      <div className="todo-list-items">
        {todos.map((todo) => (
          <TodoItem key={todo.id} title={todo.title} id={todo.id} completed={todo.completed} />
        ))}
      </div>
    </div>
  )
}
