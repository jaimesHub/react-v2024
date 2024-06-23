import '../learn/style.css'

const FakeComponent = () => {
    return (
      <div>Fake component</div>
    )

}

// Fragment
const MyComponent = () => {
    return (
      <>
        <div>James & hoidanit</div>
        <div className="child" style={{ fontSize: "10px" }}>Fragment example</div>
      </>
    )
}

export default MyComponent