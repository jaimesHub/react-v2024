const TodoNew = (props) => {
    console.log(">>> check point: ", props);
    const { addNewTodo } = props;

    // addNewTodo("James");
    const handleClick = () => {
        alert("Click me");
    }

    // const handleOnChange = (event) => {
    //     console.log(event.target.value);
    //     // alert(">> handle onchange")
    // }

    const handleOnChange = (name) => {
        console.log(">>> onchange name: ", name);
    }

    return (
        <div className="todo-new">
            <input type="text"
                // onChange={ handleOnChange }
                onChange={(event) => { handleOnChange(event.target.value) }} // c2

            />
            <button 
                style={{ cursor: "pointer" }}
                onClick={ handleClick } // c1
            >Add</button>
      </div>
    );
}

export default TodoNew;