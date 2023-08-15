import React from 'react'
import axios from 'axios'
import './completebutton.css';

const CompleteButton = ({_id, completed, todos, setTodos}) => {
  return (
    <button className={!completed ? "complete-button bg-2" : "incomplete-button"}
        onClick={() => {
            axios.put(`/api/todos/${_id}`, {completed: !completed})
            .then(res => {
                const updatedTodo = res.data;
                const updatedIndex = todos.findIndex(todo => todo._id === updatedTodo._id);
                if (updatedIndex !== -1) {
                    const updatedTodos = [...todos];
                    updatedTodos[updatedIndex].completed = updatedTodo.completed;
                    setTodos(updatedTodos);
                }
            })
            .catch(err => console.log(err));
        }}
    >Complete</button>
  )
}

export default CompleteButton