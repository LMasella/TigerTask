import React from 'react'
import axios from 'axios';
import { useState, useEffect} from 'react';
import './categories.css';

const Categories = ({categories, setCategories, currentCategory, handleCategoryClick, setAddCategory}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('/api/categories')
        .then(res => {
          setCategories(res.data)
          setLoaded(true)
        })
        .catch(err => console.log(err));
      }, []);
    

  return (
    <div className="categories bg-4">
        <h2>Categories:</h2>
        {loaded ? 
        <>
          {categories.map((cat, i) => {
            return (
            <button 
              className={cat._id == currentCategory._id ? "button-plain color-5" : "button-plain"} 
              key={cat._id} onClick={() => {
                handleCategoryClick(cat)
              }}
            >
              {cat.name}
            </button>
            );
        })}
        <button className="new-category" onClick={() => setAddCategory(true)}>New Category +</button>
        </>
        
          :
          <div className="categories-loader-container">
            <div className="lds-ring white"><div></div><div></div><div></div><div></div></div>
          </div>
        }
    </div>
  )
}

export default Categories