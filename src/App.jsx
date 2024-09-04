import './components/todo/todo.css';
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from './services/api.service';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context';

const App = () => {
  const { setUser } = useContext(AuthContext);

  // test reload [Login / Welcome <Username>]
  // const delay = (miliSeconds) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, miliSeconds);
  //   });
  // }

  const fetchUserInfo = async () => {
    const res = await getAccountAPI();

    // await delay(3000);  // test loading

    if (res.data) {
      // success
      console.log(">>> check user info: ", res.data);
      setUser(res.data.user);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []); // run once

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App
