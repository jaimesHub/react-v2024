import '../learn/style.css'

const FakeComponent = () => {
    return (
      <div>Fake component</div>
    )

}

const MyComponent = () => {
    // const user = "james"; // string
    // const user = 123; // number
    // const user = true; // boolean
    // const user = undefined; // undefined
    // const user = null;
    const user = [1, 2, 3]; // array
    // const user = { name: "james", age: 30 }; // object
    return (
      <>
        <div>{JSON.stringify(user)} & hoidanit</div>
        <div>{console.log("JAMES")}</div>
        <div className="child" style={{ fontSize: "10px" }}>Fragment example</div>
      </>
    )
}

export default MyComponent