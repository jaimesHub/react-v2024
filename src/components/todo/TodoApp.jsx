import reactLogo from '../../assets/react.svg';
import TodoNew from '../todo/TodoNew';
import TodoData from '../todo/TodoData';

import { useState } from "react";

const TodoApp = () => {
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
        </>
    )
}

export default TodoApp;