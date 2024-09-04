import './components/todo/todo.css';
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";

// const ParentComponent = (props) => {
//   console.log(props);
//   return (
//     <>
//       <div>Parent Component</div>
//       pass anything: {props.children}
//     </>
//   );
// }

// const ChildComponent = (props) => {
//   return (
//     <div>Child Component</div>
//   );
// }

const App = () => {
  return (
    <>
      {/* <ParentComponent >
        <ChildComponent />
      </ParentComponent> */}
      <Header />
      <Outlet />
      <Footer />
    </>
  );

}

export default App
