import { useState } from "react";
import "./Loginpage.css";
import {User,LockKeyhole,Loader} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const Loginpage = () => {
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const {login,loading} = useUserStore();
  const handleSubmit = (e)=>{
    e.preventDefault();
    login(formData);
  }
  
  return (
    <form className="loginform" onSubmit={handleSubmit}>
      <h3 className="heading">Login</h3>
      <div className="box">
      <label className="label">Email</label>
      <div className="input-container">
      <User color="black"/>
      <input className="input" id= "name" name="username" placeholder="Enter Email" value={formData.email} onChange={e=>setFormData({...formData ,email:e.target.value})}/>
      </div>
      
      <label className="label">Password</label>
      <div className="input-container">
      <LockKeyhole color="black"/>
      <input className="input" id="password" name="password" placeholder="Enter Password" type="password" value={formData.password} onChange={e=>setFormData({...formData,password:e.target.value})}/>
      </div>
      
      <button className="btn" type="submit">
      {loading ? (
								<>
									<Loader className='' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									Login
								</>
							)}
      </button>
      </div>
      
    </form>
  )
}

export default Loginpage;
