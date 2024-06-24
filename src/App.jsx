import './components/todo/todo.css';
import reactLogo from './assets/react.svg';

import TodoNew from './components/todo/TodoNew';
import TodoData from './components/todo/TodoData';
const App = () => {
  const user = "James";
  const age = 25;
  const data = {
    address: "Hanoi",
    country: "Vietnam"
  }

  // props_element={value}

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew/>
      <TodoData name={user} age={age} data={data}/>
      <div className="todo-image">
          <img src={reactLogo} className="logo" />
      </div>
    </div>
  )
}

export default App
