const TodoData = (props) => {
    const { todoList, removeTodo } = props;

    const handleDelete = (id) => {
        removeTodo(id);
    }

    return (
        <div className="todo-data">
            {todoList.map((item, index) => {
                return (
                    <div className={`todo-item ${index}`} key={item.id}>
                        <div>{item.name}</div>
                        <button 
                            style={{ cursor: "pointer" }} 
                            onClick={() => handleDelete(item.id)}
                        >Delete</button>
                    </div>
                );
            })}
      </div>
    );
}

export default TodoData;