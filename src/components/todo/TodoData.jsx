const TodoData = (props) => {
    // props là 1 object {}
    // props: {
        // props.name = "James"
        // props.age = 25
        // props.data = {address: "Hanoi", country: "Vietnam"}
    //}

    const { name, age, data } = props;

    return (
        <div className="todo-data">
            <div>My name is {name}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
      </div>
    );
}

export default TodoData;