import React from 'react';
import { useState, useCallback } from 'react';
import { Todos, Categories, Filters, CategoryForm, Welcome, Header } from '../../components';
import './dashboard.css';
import axios from 'axios';

const Dashboard = ({currentCategory, setCurrentCategory, currentFilters, setCurrentFilters}) => {
  const [todos, setTodos] = useState([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [editForm, setEditForm] = useState(null);
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleCategoryClick = useCallback(cat => {
    setAddCategory(false);
    setToggleMenu(false);
    setEditForm(null);
    setTodosLoading(true);
    const catType = typeof cat;
    const urlString = catType === "string" ? cat : cat._id;
    axios.get(`/api/todos/category/${urlString}`)
    .then(res => {
      // if catType is a string, look up the category in the array and set it.
      if (catType === "string") {
        const catIndex = categories.findIndex(category => category._id === cat);
        if (catIndex !== -1) {
          setCurrentCategory(categories[catIndex]);
        }
      } else {
        setCurrentCategory(cat);
      }
      setTodos(res.data.sort((a,b) => {
        return Date.parse(a.dueDate) - Date.parse(b.dueDate);
      }));
      setTodosLoading(false);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Header setCurrentCategory={setCurrentCategory} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <div className="d-flex dashboard-container">
        <Categories categories={categories} setCategories={setCategories} currentCategory={currentCategory} handleCategoryClick={handleCategoryClick} setAddCategory={setAddCategory} toggleMenu={toggleMenu} />
        <div className="dashboard bg-2 color-4">
          { addCategory ?
            <>
              <h1>Add New Category:</h1>
              <CategoryForm setAddCategory={setAddCategory} setCurrentCategory={setCurrentCategory} setCategories={setCategories} handleCategoryClick={handleCategoryClick} />
            </>
            :
            <>
              <h1>Dashboard:</h1>
              {/* <button onClick={() => setCurrentCategory('')}>Clear category</button> */}
              {!currentCategory ?
                <Welcome setAddCategory={setAddCategory} />
                :
                <>
                  <Filters todos={todos} setFilteredTodos={setFilteredTodos} filters={currentFilters} setFilters={setCurrentFilters} />
                  <Todos todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} currentCategory={currentCategory} todosLoading={todosLoading} setTodosLoading={setTodosLoading} handleCategoryClick={handleCategoryClick} editForm={editForm} setEditForm={setEditForm} setCategories={setCategories} setCurrentCategory={setCurrentCategory} />
                </>
              }
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard