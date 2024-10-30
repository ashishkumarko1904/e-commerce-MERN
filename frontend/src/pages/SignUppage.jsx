import { useState } from "react";
import {User,LockKeyhole,Loader} from "lucide-react";
import "../pages/Signup.css";
import { useUserStore } from "../stores/useUserStore";

const SignUppage = () => {
  const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

  const { signup, loading } = useUserStore();
  const  handleSubmit = (e)=>{
    e.preventDefault();
    signup(formData);
   }
  return (
    
      <form className="signupform" onSubmit={handleSubmit}>
        
      <h3 className="heading-signup">SignUp</h3>
      <div className="box-signup">

      <label className="label-signup">Name</label>
      <div className="input-container-signup">
      <User color="black"/>
      <input className="input-signup" 
      id="name"
      name="username" 
      placeholder="Enter name"
       value={formData.name} 
       onChange={e=>setFormData({...formData,name:e.target.value})}/>
      </div>

      <label className="label-signup">Email</label>
      <div className="input-container-signup">
      <User color="black"/>
      <input className="input-signup"
      id="email"
       name="email" 
       placeholder="Enter Email"
        value={formData.email}
         onChange={e=>setFormData({...formData,email:e.target.value})}/>
      </div>
      
      <label className="label-signup">Password</label>
      <div className="input-container-signup">
      <LockKeyhole color="black"/>
      <input className="input-signup" 
      id="password"
      name="password" 
      placeholder="Enter Password"
       type="password" value={formData.password} 
       onChange={e=>setFormData({...formData,password:e.target.value})}/>
      
      </div>
       
      <label className="label-signup">Confirm Password</label>
      <div className="input-container-signup">
      <LockKeyhole color="black"/>
      <input className="input-signup" 
      id="confirmPassword"
      name="confirmPassword"
       placeholder="Enter Password" 
       type="password" value={formData.confirmPassword} 
       onChange={e=>setFormData({...formData,confirmPassword:e.target.value})}/>
      
      </div>
      
      <button className="btn-signup" type="submit" disabled={loading}>

      {loading ? (
								<>
									<Loader className='' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									Sign up
								</>
							)}

      </button>
      </div>
      </form>
      
    
  )
}

export default SignUppage
