import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import "./index.css"

const initialColors = ["pink","yellow","skyblue","gold","voilet"]


const TodoItem = (props) =>{
    const {todoDetails,filterDeletedTodoItems,onCheckedStatus,handleEdit} = props 
    const {event,id,status} = todoDetails

    const generateColor = Math.floor(Math.random()*initialColors.length);
    console.log(generateColor);

    const onClickDelete = () =>{
        filterDeletedTodoItems(id);
    }

    const onClickStatus = () =>{
        onCheckedStatus(id);
    }

    const onHandleEdit = () =>{
        handleEdit(id);
    }
    const statusOfTodo = status ? "completed" : "not-completed"
   
    

    return(
        <li className='list-main-container' Style={"border-left-style:red"}>
        <div className='list-items'> 
            <p className={`event ${statusOfTodo}`}>{event}</p>
        <div className='buttons-container'>
        <button className='delete-container' onClick={onHandleEdit}>
           <FaRegEdit/>
        </button>
        <button className='delete-container' onClick={onClickStatus}>
           <FaRegCheckCircle/>
        </button>
        <button className='delete-containers' onClick={onClickDelete}>
            <MdDelete/>
        </button>
        </div>    
        </div>
        </li>
    )
}

export default TodoItem