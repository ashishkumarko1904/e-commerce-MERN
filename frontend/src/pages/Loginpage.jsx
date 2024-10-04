import { useState } from "react";
import "./Loginpage.css";
import {User,LockKeyhole} from "lucide-react";

const Loginpage = () => {
  const [email,setEmail]= useState('');
  
  return (
    <div className="loginform">
      <h3 className="heading">Login</h3>
      <div className="box">
      <label className="label">Email</label>
      <div className="input-container">
      <User color="black"/>
      <input className="input" name="username" placeholder="Enter Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      </div>
      
      <label className="label">Password</label>
      <div className="input-container">
      <LockKeyhole color="black"/>
      <input className="input" name="password" placeholder="Enter Password" type="password"/>
      </div>
      
      <button className="btn" type="submit">login</button>
      </div>
      
    </div>
  )
}

export default Loginpage;
