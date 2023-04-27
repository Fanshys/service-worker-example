import { TodoItemProps } from "./types"
import './style.css'

export const TodoItem: React.FC<TodoItemProps> = ({title}) => {
  return (
    <div className="todo-item">
      {title}
    </div>
  )
}
