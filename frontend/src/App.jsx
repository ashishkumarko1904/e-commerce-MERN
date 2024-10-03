import { Route,Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import SignUppage from "./pages/SignUppage";
import Navbar from "./components/Navbar";

function App() {
  

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={<SignUppage/>}/>
        <Route path="/login" element={<Loginpage/>}/>
      </Routes>
    </div>
  )
}

export default App
