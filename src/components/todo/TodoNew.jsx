import { useState } from "react";

const TodoNew = (props) => {
    // console.log(">>> check point: ", props);

    // useState hook
    // const valueInput = "James"; // không thể set thủ công như thế này

    // solution: useState
    const [valueInput, setValueInput] = useState("James");

    const { addNewTodo } = props;

    // addNewTodo("James");

    const handleClick = () => {
        // alert("Click me");
        // console.log(">>> get valueInput: ", valueInput);
        addNewTodo(valueInput);
    }

    const handleOnChange = (name) => {
        // console.log(">>> onchange name: ", name);
        setValueInput(name);
    }

    return (
        <div className="todo-new">
            <input type="text"
                // onChange={ handleOnChange }
                onChange={(event) => { handleOnChange(event.target.value) }}
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