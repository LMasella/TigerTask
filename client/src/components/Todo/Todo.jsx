import React from 'react'
import { Link } from 'react-router-dom'
import { CompleteButton, DeleteButton } from '../'
import './todo.css';

const Todo = ({_id, title, information, dueDate, createdBy, assignedTo, completed, todos, setTodos, setTodosLoading, setEditForm}) => {
  const optionsDate = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const optionsTime = {
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  }
  const due = new Date(dueDate);
  const overdue = due - new Date() < 0;
  const date = due.toLocaleString(undefined, optionsDate);
  const time = due.toLocaleString(undefined, optionsTime);

  const backgroundStyle = () => {
    if (completed === true) return "todo bg-complete color-3";
    if (overdue === true) return "todo bg-overdue color-3";
    return "todo bg-1 color-3";
  }

  return (
    <div className={backgroundStyle()} key={_id}>
      <div className="d-flex justify-between align-start">
        <div className="link-container color-5">
          <p className="color-5" onClick={() => setEditForm(_id)}>{title}</p>
        </div>
        <div className={!completed && overdue ? "due-container overdue" : "due-container color-4"}>
          <p className="due-date">Due: {date}</p>
          <p className="due-time">At: {time}</p>
        </div>
      </div>
      <div className="todo-content">
        <div className="todo-content-header">
        <p>Posted by {createdBy.name}</p>
        {assignedTo ? <p>Assigned to {assignedTo['name']}</p> : <p className="color-2">(Unassigned)</p>}
        </div>
      </div>
      <div className="todo-content-info">
        <p>{information}</p>
      </div>
      <div className="buttons d-flex justify-end align-center">
        { createdBy._id === localStorage.getItem('uuid') &&
          <DeleteButton _id={_id} setTodos={setTodos} setTodosLoading={setTodosLoading} />
        }
        <CompleteButton _id={_id} completed={completed} todos={todos} setTodos={setTodos} />
      </div>
    </div>
  )
}

export default Todo