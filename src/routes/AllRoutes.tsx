import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Game,
  Register,
  Rules,
  About,
  Ranking,
  Users,
  UserDetail,
  PageNotFound,
} from "../pages";
import { PreStarter } from "../pages/PreStarter";
import { EditDetails } from "../pages/EditDetails";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/game/:userId" element={<Game />}></Route> */}
        <Route path="/game" element={<Game />}></Route>
        <Route path="/preStarter" element={<PreStarter />}></Route>
        <Route path="/editDetails" element={<EditDetails />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/rules" element={<Rules />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/ranking" element={<Ranking />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/user" element={<UserDetail />}></Route>
        <Route path="/notfound" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
};
