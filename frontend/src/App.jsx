import { Navigate, Route,Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import SignUppage from "./pages/SignUppage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import Loading from "./components/Loading";
import Adminpage from "./pages/Adminpage";
import CartPage from "./pages/CartPage";
function App() {
  
const {user,checkAuth,checkingAuth} = useUserStore();
useEffect(()=>{
  checkAuth()
},[checkAuth]);
if(checkingAuth){
  return <Loading/>
}
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/signup" element={!user?<SignUppage/>:<Navigate to="/"/>}/>
        <Route path="/login" element={!user?<Loginpage/>:<Navigate to="/"/>}/>
        <Route path="/cart" element={!user?<Navigate to="/login"/>:<CartPage/>}/>
        <Route path="/mydashboard" element={user?.role=== "admin"?<Adminpage/>:<Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
