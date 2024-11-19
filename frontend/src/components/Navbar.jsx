import {Search,LogOut,ShoppingCart,House,LayoutDashboard} from "lucide-react";
import {Link} from "react-router-dom";
import "./Navbar.css";
import { useUserStore } from "../stores/useUserStore.js";
import { useCartStore } from "../stores/useCartStore.js";
const Navbar = () => {
  
  
  const {user,logout} = useUserStore();;
 //The optional chaining operator (?.) checks if the user object is defined (i.e., not null or undefined).
//If user is null or undefined, the entire expression user?.role will return undefined instead of throwing an error.
//If user exists, it will access the role property of user.
const {cart} = useCartStore();

 
  const isAdmin = user?.role === "admin";

  let itemCount = 1;
  
  return (
    <div className="navbar">
      <div className="search-container">
      <Search color="whitesmoke"/>
      <input className="search-input"/>
      </div>
     <div className="gp-navbar">
     {isAdmin&&<Link className="link" to='/mydashboard'>
        <LayoutDashboard />
      Dashboard
      </Link>}
      <Link className="link" to= "/"><House />HOME</Link>
      {
        user && (<Link className="link" to="/cart">Cart<ShoppingCart />{itemCount > 0 && (
          cart.length > 0 && (<span className="cart-item-count">{cart.length}</span>)
        )}</Link>)
      }
      <div className="btn-logout-container">
        {user?<span className="gp-span">
          <button className="btn-logout" onClick={logout}>logout</button>
          <LogOut color="white"/></span>:<span className="gp-span"><Link className="link" to="/signup">Signup</Link> <Link className="link" to="/login">Login</Link></span>}
      
      
      </div>
      
      </div>  
    </div>
  )
}

export default Navbar
