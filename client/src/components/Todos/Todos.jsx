import React from 'react'
import { Todo, NewTodoButton, TodoForm, DeleteCategoryButton } from '../';
import './todos.css';

const Todos = ({todos, setTodos, filteredTodos, currentCategory, todosLoading, setTodosLoading, handleCategoryClick, editForm, setEditForm, setCategories, setCurrentCategory}) => {

  const tooltipHover = () => {
    const tooltip = document.getElementById("category-tooltip");
    tooltip.style.visibility = "visible";
  }

  const tooltipUnhover = () => {
    const tooltip = document.getElementById("category-tooltip");
    tooltip.style.visibility = "hidden";
  }

  return (
    <div className="todos">
      { !todosLoading ?
        <>
          {currentCategory && 
            <>
              <div className="d-flex align-center">
                <h2><span className="current-category color-5" onMouseEnter={tooltipHover} onMouseLeave={tooltipUnhover }>{currentCategory.name}</span> Tasks:</h2>
                <button style={{marginLeft: "1.5rem", fontSize: "18px"}} className="button-plain" onClick={() => setEditForm('new')}>Quick Add +</button>
                <DeleteCategoryButton _id={currentCategory._id} setCategories={setCategories} show={todos.length === 0} setCurrentCategory={setCurrentCategory} />
              </div>
              <div id="category-tooltip">
                <p>{currentCategory.information}</p>
              </div>
            </>
          }
          {filteredTodos.map((todo) => {
              return (
                todo._id === editForm ?
                  <TodoForm key={todo._id} id={todo._id} title={todo.title} information={todo.information} category={currentCategory} dueDate={todo.dueDate} assignedTo={todo.assignedTo} createdBy={todo.createdBy} create={false} setEditForm={setEditForm} handleCategoryClick={handleCategoryClick} />
                  :
                  <Todo key={todo._id} _id={todo._id} title={todo.title} information={todo.information} dueDate={todo.dueDate} createdBy={todo.createdBy} assignedTo={todo.assignedTo} completed={todo.completed} todos={todos} setTodos={setTodos} setTodosLoading={setTodosLoading} setEditForm={setEditForm} />
                  );
          })}
          { editForm === 'new' ?
            <TodoForm id='' title='' information='' category={currentCategory} dueDate='' assignedTo='' create={true} setEditForm={setEditForm} handleCategoryClick={handleCategoryClick} />
            :
            <NewTodoButton setEditForm={setEditForm} />
          }
        </>
        :
        <div className="loader-container">
          <div className="lds-ring black"><div></div><div></div><div></div><div></div></div>
        </div>
      }
    </div>
  )
}

export default Todos