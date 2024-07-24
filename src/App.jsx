import { useState } from "react";

import './components/todo/todo.css';
import reactLogo from './assets/react.svg';

import TodoNew from './components/todo/TodoNew';
import TodoData from './components/todo/TodoData';
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
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

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  }

  return (
    <>
      <Header />
      <div className="todo-container">
        <div className="todo-title">Todo List</div>

        <TodoNew addNewTodo={addNewTodo} />

        {todoList.length > 0 ?
          <TodoData
            todoList={todoList}
            removeTodo={removeTodo}
          /> :
          <div className="todo-image">
            <img src={reactLogo} className="logo" />
          </div>
        }
      </div>
      <Footer />
    </>

  )
}

export default App
