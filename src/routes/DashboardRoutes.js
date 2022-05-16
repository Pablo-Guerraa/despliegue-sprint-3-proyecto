import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import NavBar from "../components/navbar";
import Profile from "../components/Profile";


export default function DashboardRoutes({setIsLoggedIn}) {
  return(
    <>
      <NavBar/>
      <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn}/>}/>
      </Routes>
    </>
  )
}
