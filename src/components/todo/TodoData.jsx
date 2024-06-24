// const TodoData = ({name}) => { // c3
const TodoData = (props) => {
    // props là 1 object {}
    //{
        // props.name = "James"
        // props.age = 25
        // props.data = {address: "Hanoi", country: "Vietnam"}
    //}

    const { name, age, data } = props; // c1

    // c2
    // const name = props.name;
    // const age = props.age;
    // const data = props.data;

    // console.log(">>> Check props:: ", props);
    return (
        <div className="todo-data">
            <div>My name is {name}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
      </div>
    );
}

export default TodoData;