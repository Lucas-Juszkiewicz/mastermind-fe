import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Game,
  Login,
  Register,
  Rules,
  About,
  Ranking,
  Users,
  UserDetail,
  PageNotFound,
} from "../pages";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/rules" element={<Rules />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/ranking" element={<Ranking />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/user/:id" element={<UserDetail />}></Route>
        <Route path="/notfound" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
};
