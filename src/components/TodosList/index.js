import React, { useEffect } from 'react'
import TodoItem from "../TodoItem"
import { useState } from 'react'
import {v4 as uuidv4} from "uuid";
import "./index.css"

const getTodosList = () =>{
    let list = localStorage.getItem("todosList");


    if(list){
        return JSON.parse(localStorage.getItem("todosList"));
    }else{
        return []
    }
}

function TodoList() {

    const [input,setInput] = useState("");
    const [todoItems,setTodoItems] = useState(getTodosList());
    const [editTodo,setEditTodo] = useState(0);
   

    const onChangeInput = (event) =>{
        setInput(event.target.value);
    }
    const handleSubmit = () =>{
        if(input === ""){
            alert("Add something");
        }else{
            let newTodo = {
                id:uuidv4(),
                event:input,
                status:false
            }
            setTodoItems([...todoItems,newTodo])
            setInput("")
        }
        if(editTodo){
            const editText = todoItems.find((each) => each.id === editTodo);
            const updatetodo = todoItems.map((each) => each.id === editText.id ? (each = {id:each.id,event:input})
        : (each = {id:each.id,event:each.event}))
        setTodoItems(updatetodo);
        setEditTodo(0)
        setInput('');
        }

    }
    
    const filterDeletedTodoItems = (id) => {
        const filteredItems = todoItems.filter((each) => (
            each.id !== id 
        ))
        setTodoItems(filteredItems);
    }

    const onCheckedStatus = (id) =>{
        const checkedStatus = todoItems.map((each) =>{
            if(each.id === id){
                return {...each,status:!each.status}
            }
            return each
        })
        setTodoItems(checkedStatus)
    }

    useEffect(() =>{
        localStorage.setItem("todosList",JSON.stringify(todoItems));
    },[todoItems])


    const handleEdit = (id) =>{
        const editTask = todoItems.find((each) => each.id === id);
        setInput(editTask.event);
        setEditTodo(editTask.id);

    }

  return (
    <div className='main-container'>
        <h2>Create Your Checklist</h2>
        <div className='todo-details-container'>
            <input type="text" placeholder='Add Event Here'
            value={input} name="text" className='todo-form-input' 
            onChange={onChangeInput} />
            <button type="button" onClick={handleSubmit} >Add todo</button>
        </div>

        <ul>
            {todoItems.map((eachItem) =>(
                <TodoItem todoDetails={eachItem} key={eachItem.id} 
                filterDeletedTodoItems={filterDeletedTodoItems}
                onCheckedStatus={onCheckedStatus}
                handleEdit={handleEdit}/>
            ))}
        </ul>
        <button type="button" className='save-button'>Check List</button>
    </div>
  )
}

export default TodoList
