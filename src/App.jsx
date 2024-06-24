import { useState } from "react";

import './components/todo/todo.css';
import reactLogo from './assets/react.svg';

import TodoNew from './components/todo/TodoNew';
import TodoData from './components/todo/TodoData';
const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Learning React" },
    { id: 2, name: "Watching Youtube" },
    { id: 3, name: "Working" },
  ]);

  const user = "James";
  const age = 25;
  const data = {
    address: "Hanoi",
    country: "Vietnam"
  }

  const addNewTodo = (name) => {
    // alert(`call me ${name}`);
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }

    // không nên
    // todoList.push(newTodo); // sửa đổi trực tiếp state của React có thể sẽ gây ra bugs
    // setTodoList(todoList);

    // nên
    setTodoList([...todoList, newTodo]);
  }

  const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew addNewTodo={addNewTodo}/>
      <TodoData 
        name={user} 
        age={age} 
        data={data}
        todoList={todoList}
      />
      <div className="todo-image">
          <img src={reactLogo} className="logo" />
      </div>
    </div>
  )
}

export default App
