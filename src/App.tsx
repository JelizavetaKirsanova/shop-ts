import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { db } from "./services/firebase/config";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import userStore from "./store/UserStore";

import Profile from "./pages/Profile";

function App() {
  console.log(db);
  useEffect(() => {
    const unSubscribe = getAuth().onAuthStateChanged((user) => {
      userStore.setUser(user);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="reg" element={<Registration />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);
