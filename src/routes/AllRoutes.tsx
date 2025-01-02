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
  ChangeAvatar,
  ChangePassword,
  RankingFull,
  UserGlance,
} from "../pages";
import { PreStarter } from "../pages/PreStarter";
import { EditDetails } from "../pages/EditDetails";
import { useState } from "react";

interface Game {
  id: number;
  user: {
    id: number;
  };
  duration: number;
  round: number;
  attempts: number;
  date: string;
  points: number;
  success: boolean;
  sequence: number[];
  guesses: number[][];
  responses: number[][];
}

interface AllRoutesProps {
  finishZeroResponse: Game | undefined;
  setFinishZeroResponse: Function;
}

export const AllRoutes: React.FC<AllRoutesProps> = ({
  finishZeroResponse,
  setFinishZeroResponse,
}) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/game/:userId" element={<Game />}></Route> */}
        <Route
          path="/game"
          element={
            <Game
              finishZeroResponse={finishZeroResponse}
              setFinishZeroResponse={setFinishZeroResponse}
            />
          }
        ></Route>
        <Route
          path="/preStarter"
          element={<PreStarter setFinishZeroResponse={setFinishZeroResponse} />}
        ></Route>
        <Route path="/editDetails" element={<EditDetails />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/rules" element={<Rules />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/ranking" element={<Ranking />}></Route>
        <Route path="/rankingfull" element={<RankingFull />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/user" element={<UserDetail />}></Route>
        <Route path="/userglance" element={<UserGlance />}></Route>
        <Route path="/changeAvatar" element={<ChangeAvatar />}></Route>
        <Route path="/changePassword" element={<ChangePassword />}></Route>
        <Route path="/notfound" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
};
