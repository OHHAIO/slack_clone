import React, { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loadable from "@loadable/component";

const LogIn = loadable(() => import("@pages/Login"));
const SignUp = loadable(() => import("@pages/SignUp"));
const Channel = loadable(() => import("@pages/Channel"));

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={"/login"} />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/workspace/channel" element={<Channel />} />
      <Route path="*" element={<LogIn />} />
    </Routes>
  );
};

export default App;
