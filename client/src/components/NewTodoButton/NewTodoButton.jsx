import React from 'react';
import { Link } from 'react-router-dom';
import './newtodobutton.css';

const NewTodoButton = ({setEditForm}) => {
  return (
    <div className="new-todo-button" onClick={() => setEditForm('new')}>
        <p>
          Add New Task... +
        </p>
    </div>
  )
}

export default NewTodoButton