import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './categoryform.css';

const CategoryForm = ({setAddCategory, setCurrentCategory, setCategories, handleCategoryClick}) => {
    const [name, setName] = useState('');
    const [information, setInformation] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
      document.getElementById('name').focus();
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    const submitHandler = e => {
        e.preventDefault();

        // Validate the form data before submitting
        const newErrors = {};
        if (!name.trim()) {
          newErrors.name = 'Category name is required.';
        }
        if (!information.trim()) {
          newErrors.information = 'Category description is required.';
        }

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
        } else {
            axios.post('/api/categories', {name, information}, {withCredentials: true})
            .then(res => {
              setCategories(oldCats => [...oldCats, res.data]);
              setCurrentCategory(res.data);
              handleCategoryClick(res.data);
            })
            .catch(err => {
              console.log(err);
            });
          }
    }

    //error handler

  return (
    <form className="category-form todo bg-1 color-3" onSubmit={submitHandler}>
      <div className="d-flex align-center">
        <div className="title-container">
          <input type='text' className="color-5" name='name' id='name' value={name} placeholder="Category Name" onChange={e => setName(e.target.value)} />
          {errors.name && <p style={{margin: '-1.1rem 0 1.1rem'}}><span className="error">{errors.name}</span></p>}
        </div>
      </div>
      <div className="todo-content-info">
        <textarea className="category-description" name='information' placeholder="Category description" id='information' value={information} onChange={e => setInformation(e.target.value)}></textarea>
        {errors.information && <p><span className="error">{errors.information}</span></p>}
      </div>
      <div className="buttons d-flex justify-end align-center">
        <button className="cancel" type="button" onClick={() => setAddCategory(false)}>Cancel</button>
        <button type="submit">Create New Category</button>
      </div>
    </form>
  )
}

export default CategoryForm;