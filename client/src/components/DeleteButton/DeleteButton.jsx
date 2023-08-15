import React from 'react'
import axios from 'axios'
import './deletebutton.css';

const DeleteButton = ({_id, setTodos, setTodosLoading}) => {
    const deleteTodo = _id => {
        if(window.confirm('Are you sure?')) {
            setTodosLoading(true);
            axios.delete(`/api/todos/${_id}`, {data:{creatorId: localStorage.getItem('uuid')}})
            .then(res => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== _id))
                setTodosLoading(false);
            })
            .catch(err => console.log(err));
        }
    }

  return (
    <button className="delete-button bg-1" onClick={id => deleteTodo(_id)}>Delete</button>
  )
}

export default DeleteButton