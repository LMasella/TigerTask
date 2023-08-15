import React from 'react'
import axios from 'axios'
import './deletecategorybutton.css';

const DeleteCategoryButton = ({_id, setCategories, show, setCurrentCategory}) => {
    const deleteCategory = _id => {
        axios.delete(`/api/categories/${_id}`)
        .then(res => {
            setCurrentCategory('');
            setCategories(prevCategories => prevCategories.filter(cat => cat._id !== _id))
        })
        .catch(err => console.log(err));
    }

  return (
    show ?
    <button style={{marginLeft: "1rem", fontSize: "14px"}} className="button-plain" onClick={() => deleteCategory(_id)}>Delete Category</button>
    :
    <></>
  )
}

export default DeleteCategoryButton