
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";
import RegisterAndLoginForm from "./RegisterAndLoginForm.jsx";
import LandingPage from "./Home.jsx";
import Chat from "./Chat";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SymptomSelection from "./SymptomSelection.jsx";
import Reminder from "./Reminder.jsx"
export default function Router() {
  const {username, id} = useContext(UserContext);
  return (
     <>
    
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<LandingPage/>}/>
      <Route path="/" element={<RegisterAndLoginForm/>}/>
      <Route path="/symp" element={<SymptomSelection/>}/>
      <Route path="/remind" element={<Reminder/>}/>
      <Route path="/chat" element={username===null ? (<RegisterAndLoginForm/>) : (<Chat/>)}/>

    </Routes>
    
    </BrowserRouter>
    </>
  );
}