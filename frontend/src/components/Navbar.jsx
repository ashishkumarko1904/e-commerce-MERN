import {Search,LogOut,ShoppingCart,House,LayoutDashboard} from "lucide-react";
import {Link} from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  //for now lets say  
  //ToDo: fetch it from backend
  let isAdmin = true;
  let itemCount = 1;
  
  return (
    <div className="navbar">
      <div className="search-container">
      <Search color="whitesmoke"/>
      <input className="search-input"/>
      </div>
     <div className="gp-navbar">
     {isAdmin&&<Link className="link" to='/dashboard'>
        <LayoutDashboard />
      Dashboard
      </Link>}
      <Link className="link"><House />HOME</Link>
      <Link className="link">Cart<ShoppingCart />{itemCount > 0 && (
        <span className="cart-item-count">{itemCount}</span>
      )}</Link>
      <div className="btn-logout-container">
      <button className="btn-logout">logout</button>   
      <LogOut color="white"/>
      
      </div>
      
      </div>  
    </div>
  )
}

export default Navbar
