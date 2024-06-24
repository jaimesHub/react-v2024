const TodoData = (props) => {
    const { name, age, data } = props;

    console.log(">>> check todo list: ", props.todoList);

    return (
        <div className="todo-data">
            <div>My name is {name}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
            {/* <div>{props.todoList}</div> */}
            <div>
                {JSON.stringify(props.todoList)}
            </div>
      </div>
    );
}

export default TodoData;