import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './todoform.css';
import '../Todo/todo.css';

const TodoForm = (props) => {
    const {setEditForm, handleCategoryClick} = props;

    const [title, setTitle] = useState(props.title);
    const [information, setInformation] = useState(props.information);
    const [category, setCategory] = useState(props.category);
    const [dueDate, setDueDate] = useState(props.dueDate);
    const [dateFilterFlag, setDateFilterFlag] = useState(false);
    const [assignedTo, setAssignedTo] = useState(props.assignedTo ? props.assignedTo : '');
    const [errors, setErrors] = useState({});

    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);

    const dateOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }

    useEffect(() => {
        const form = document.querySelector('#title');
        form.selectionStart = form.value.length;
        form.selectionEnd = form.value.length;
        form.focus();

        if (!dateFilterFlag && dueDate) {
          const date = new Date(dueDate);
          const localeDate = (date.toLocaleString('en-US', dateOptions));
          const year = localeDate.slice(6, 10);
          const month = localeDate.slice(0, 2);
          const day = localeDate.slice(3, 5);
          const hour = localeDate.slice(12, 14);
          const min = localeDate.slice(15, 17);
          const sec = localeDate.slice(18, 20);
          const ISODate = (year + '-' + month + '-' + day + 'T' + hour + ':' + min + ':' + sec);
          setDueDate(ISODate);
        }
        setDateFilterFlag(true);

        axios.get('/api/categories')
        .then(res => {
            setCategories(res.data);
            category ? setCategory(category) : setCategory('');
        })
        .catch(err => console.log(err));
  
        axios.get('/api/users')
        .then(res => {
            setUsers(res.data);
            assignedTo ? setAssignedTo(assignedTo._id) : setAssignedTo('');
        })
        .catch(err => console.log(err));
      }, []);

        const submitHandler = e => {
            e.preventDefault();
            
            // Validate the form data before submitting
            const newErrors = {};
            if (!title.trim()) {
              newErrors.title = 'Title is required.';
            }
            if (!information.trim()) {
              newErrors.information = 'Information is required.';
            }
            if (!dueDate) {
              newErrors.dueDate = 'Due date is required.';
            }
            if (!category) {
              newErrors.category = 'Category is required.'
            }

            if (Object.keys(newErrors).length > 0) {
              setErrors(newErrors);
            } else {

            
              if (props.create) { // CREATE NEW TASK
                  axios.post('/api/todos', {title, information, category: category ? category : null, dueDate, assignedTo: assignedTo ? assignedTo : null, createdBy: localStorage.getItem('uuid')}, {withCredentials: true})
                  .then(res => {
                    setEditForm(null);
                    handleCategoryClick(category);
                  })
                  .catch(err => {
                  console.log(err);
                  });
              } else { // UPDATE TASK
                  axios.put(`/api/todos/${props.id}`, {title, information, category: category ? category : null, dueDate, assignedTo: assignedTo ? assignedTo : null}, {withCredentials: true})
                  .then(res => {
                    setEditForm(null);
                    handleCategoryClick(category);
                  })
                  .catch(err => {
                  console.log(err);
                  });
              }
            }
         }

  return (
    <form className="todo bg-1 color-3" onSubmit={submitHandler}>
      <div className="d-flex justify-between align-center">
        <div className="title-container">
          <input type='text' className="color-5" name='title' id='title' value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="due-form-container color-4">
          <label htmlFor='dueDate'>Due:<br />At:</label>
          <input type='datetime-local' name='dueDate' id='dueDate' value={dueDate} onChange={e => setDueDate(e.target.value)} />
          {errors.dueDate && <span className="error">{errors.dueDate}</span>}
        </div>
      </div>
      <div className="todo-content">
        <div className="todo-content-header">
        <p>Posted by {localStorage.getItem('name')}</p>
        <label htmlFor='assignedTo'>Assigned to </label>
        <select name='assignedTo' id='assignedTo' value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
            <option value='' disabled hidden>Assign to User...</option>
            {users.map((user) => <option key={user._id} value={user._id}>{user.name}</option>)}
          </select>
        </div>
      </div>
      <div className="todo-content-info">
        <textarea name='information' placeholder="Information" id='information' value={information} onChange={e => setInformation(e.target.value)}></textarea>
        {errors.information && <span className="error">{errors.information}</span>}
      </div>
      <div>
        <label htmlFor='category'>Category: </label>
        <select name='category' id='category' value={category? category._id : ''} onChange={e => setCategory(e.target.value)}>
          <option value='' disabled hidden>Select Category...</option>
          {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </div>
      <div className="form-buttons d-flex justify-end align-center">
        <button className="cancel" type="button" onClick={() => setEditForm(null)}>Cancel</button>
        <button type="submit">{props.create === true ? <>Create</> : <>Update</>} Task</button>
      </div>
    </form>
  );
}

export default TodoForm