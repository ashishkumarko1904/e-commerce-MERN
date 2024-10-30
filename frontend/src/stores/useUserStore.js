import {create} from "zustand";
import axios from "../lib/axios.js";
import {toast} from "react-hot-toast";

 export const useUserStore = create((set,get)=>({
    user:null,
    loading:false,
    chekingAuth:true,

    signup: async ({name,email,password,confirmPassword})=>{
        set({loading:true});
        if(password != confirmPassword){
            set({loading:false});
            return toast.error("Passwords do not Match");
        }
        try {
            const res = await axios.post("/auth/signup",{name,email,password});
            set({user:res.data,loading:false});
        } catch (error) {
            set({loading:false});
            return toast.error(error.response.data.message||"An error occurred");      
        }
    },
    login: async ({email,password})=>{
        set({loading:true});
        try {
            const res = await axios.post("/auth/login",{email,password});
            set({user:res.data,loading:false});
        } catch (error) {
            set({loading:false});
            return toast.error(error.response.data.message||"An error occurred");      
        }
    },
    checkAuth:async ()=>{
        set({chekingAuth:true});
        try {
            const response = await axios.get("/auth/profile")
            set({user: response.data,chekingAuth:false})
        } catch (error) {
            set({chekingAuth:false,user:null});
            console.log(error);
        }
    },
    logout:async ()=>{
        try {
            await axios.post("/auth/logout");
            set({user:null});
        } catch (error) {
            toast.error(error.response?.data?.message || "an error occured during logout")
        }
    }
}))