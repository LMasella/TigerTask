import React from 'react'
import { useEffect, useCallback } from 'react'
import './filters.css';

const Filters = ({todos, setFilteredTodos, filters, setFilters}) => {

    const applyFilters = useCallback(() => {
        let filteredTodos = todos;

        if (filters.completed === false) {
            filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        }
        if (filters.createdBy) {
            filteredTodos = filteredTodos.filter(todo => todo.createdBy._id === localStorage.getItem('uuid'));
        }
        if (filters.assignedTo) {
            filteredTodos = filteredTodos.filter(todo => todo.assignedTo?._id === localStorage.getItem('uuid'));
        }
        setFilteredTodos(filteredTodos);
    }, [todos, filters, setFilteredTodos]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);
    
    const handleFilterChange = (filter, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filter]: value
        }));
    }

  return (
    <div className="filters">
        <h3>Filters:</h3>
        <div className="d-flex">
            <div className="checkbox-wrapper-2">
                <input id="completed" type='checkbox' className="ikxBAC" checked={filters.completed} onChange={e => handleFilterChange('completed', e.target.checked)} />
            </div>
            <label className="filter-label" htmlFor="completed">show completed tasks</label>
        </div>
        <div className="d-flex">
            <div className="checkbox-wrapper-2">
                <input id="creator" type='checkbox' className="ikxBAC" checked={filters.createdBy} onChange={e => handleFilterChange('createdBy', e.target.checked)} />
            </div>
            <label className="filter-label" htmlFor="creator">created by me</label>
        </div>
        <div className="d-flex">
            <div className="checkbox-wrapper-2">
                <input id="assignee" type='checkbox' className="ikxBAC" checked={filters.assignedTo} onChange={e => handleFilterChange('assignedTo', e.target.checked)} />
            </div>
            <label className="filter-label" htmlFor="assignee">assigned to me</label>
        </div>
    </div>
  )
}

export default Filters