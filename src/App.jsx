import './components/todo/todo.css';
import reactLogo from './assets/react.svg';

import TodoNew from './components/todo/TodoNew';
import TodoData from './components/todo/TodoData';
const App = () => {
  // Định nghĩa data từ cha component
  const user = "James";
  const age = 25;
  const data = {
    address: "Hanoi",
    country: "Vietnam"
  }

  // Định nghĩa function từ cha component
  const addNewTodo = (name, ) => {
    alert(`call me ${name}`);
  }

  // addNewTodo();

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew addNewTodo={addNewTodo}/>
      <TodoData 
        name={user} 
        age={age} 
        data={data}
      />
      <div className="todo-image">
          <img src={reactLogo} className="logo" />
      </div>
    </div>
  )
}

export default App
