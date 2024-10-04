import {Search,LogOut} from "lucide-react";
import {Link} from "react-router-dom";
import "Navbar.css";
const Navbar = () => {
  //for now lets say  
  //ToDo: fetch it from backend
  let isAdmin = true;
  return (
    <div className="navbar">
      <div>
      <Search />
      <input/>
      </div>
      {isAdmin&&<Link to='/dashboard'>Dashboard</Link>}
      <Link>HOME</Link>
      <Link>Cart</Link>
      <button>logout<LogOut /></button>     
    </div>
  )
}

export default Navbar
