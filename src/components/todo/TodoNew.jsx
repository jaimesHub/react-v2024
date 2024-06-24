import { useState } from "react";

const TodoNew = (props) => {
    const [valueInput, setValueInput] = useState("James");

    const { addNewTodo } = props;

    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }

    return (
        <div className="todo-new">
            <input type="text"
                onChange={(event) => { handleOnChange(event.target.value) }}
                value={valueInput} // thay vì đưa cho html quản lý giá trị, ta sẽ quản lý giá trị này bằng state
            />
            <button 
                style={{ cursor: "pointer" }}
                onClick={ handleClick }
            >Add</button>
            <div>
                My text input is {valueInput}
            </div>
      </div>
    );
}

export default TodoNew;