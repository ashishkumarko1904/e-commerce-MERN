import { useState } from "react";
import {User,LockKeyhole} from "lucide-react";
import "../pages/Signup.css";

const SignUppage = () => {
  const [email,setEmail]= useState('');
  const [name,setName]= useState('');
  
  return (
    <div className="signupform">
      <h3 className="heading-signup">SignUp</h3>
      <div className="box-signup">

      <label className="label-signup">Name</label>
      <div className="input-container-signup">
      <User color="black"/>
      <input className="input-signup" name="username" placeholder="Enter name" value={name} onChange={e=>setName(e.target.value)}/>
      </div>

      <label className="label-signup">Email</label>
      <div className="input-container-signup">
      <User color="black"/>
      <input className="input-signup" name="username" placeholder="Enter Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      </div>
      
      <label className="label-signup">Password</label>
      <div className="input-container-signup">
      <LockKeyhole color="black"/>
      <input className="input-signup" name="password" placeholder="Enter Password" type="password"/>
      </div>
      
      <button className="btn-signup" type="submit">SignUp</button>
      </div>
      
    </div>
  )
}

export default SignUppage
