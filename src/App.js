import React, { useState , useRef, useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'; //https://www.npmjs.com/package/uuid

function App() {
  
  const LOCAL_STORAGE_KEY = 'todoApp.todos';
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  });
  const todoNameRef = useRef();
  

  // //as there is no arguments then this useEffect will called once when the page is loaded or reloaded
  // useEffect(()=>{
  //   console.log('only once use effect');
  //   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (storedTodos) setTodos(storedTodos);
  // },[]);
  
  // every time something changes in the [todos] array, we will call this function:
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos]);

  function toggleTodo(id){
    console.log('toggle todo');
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id===id);
    todo.complete = !todo.complete;
    setTodos(newTodos)
  }


  function handleAddTodo(e){
    console.log('handleAddTodo');
    const name = todoNameRef.current.value;
    
    if (name==='') return
    setTodos(prevTodos => {
      return [...prevTodos,{id: uuidv4(),name: name, complete:false}];
    })
    console.log(name);
    todoNameRef.current.value = null;
  }

  function handleClearCompletedTodos(){
    console.log('handleClearCompletedTodos');
    //filter todo array looking only for the non completed todos
    const newTodos = todos.filter(element => !element.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <h1>Simple Todo List App using React</h1><br/>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button> <br/><br/> 
      <button onClick={handleClearCompletedTodos}>Clear Completed Todos</button> <br/> <br/>
      <div>
        {todos.filter(element => !element.complete).length} left to do
      </div>
    </>
  );
}

export default App;

