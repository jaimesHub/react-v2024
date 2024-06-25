import { useState } from "react";

import './components/todo/todo.css';
import reactLogo from './assets/react.svg';

import TodoNew from './components/todo/TodoNew';
import TodoData from './components/todo/TodoData';
const App = () => {
  const [todoList, setTodoList] = useState([]);

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }
    
    setTodoList([...todoList, newTodo]);
  }

  const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>

      <TodoNew addNewTodo={addNewTodo}/>

      {/* condition in JSX - c1 */}
      {/* { todoList.length > 0 &&
        <TodoData todoList={todoList}/>
      }

      { todoList.length === 0 &&
        <div className="todo-image">
          <img src={reactLogo} className="logo" />
        </div>
      } */}

      {/* condition in JSX - c2 */}
      { todoList.length > 0 ? 
        <TodoData todoList={todoList}/> :
        <div className="todo-image">
          <img src={reactLogo} className="logo" />
        </div>
      }
      
      
    </div>
  )
}

export default App
