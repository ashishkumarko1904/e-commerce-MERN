import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore.js"
import CreateProductForm from "../components/CreateProductForm.jsx";
import Allproducts from "../components/Allproducts.jsx";

const Adminpage = () => {
  const [activeTab,setActiveTab] = useState("create");
  const {fetchAllProducts} = useProductStore();
    useEffect(()=>{
      fetchAllProducts();
    },[fetchAllProducts]);
  
    const renderDiv =()=>{

     switch(activeTab){
      case "create": return <div><CreateProductForm/></div>;
      case "products": return <div><Allproducts/></div>;
      case "analytics":  return <div>Analytics</div>;
      default: return null;
     }
    }
  
  return (
    
    <div>
        <span>
        <button type="button" onClick={()=>{setActiveTab("create")}}>Create Product</button> 
        <button type="button" onClick={()=>{
          setActiveTab("products")
        }}>Products</button>
        <button type="button" onClick={()=>{setActiveTab("analytics")}}>Analytics</button>
       </span>
      {renderDiv()}
    </div>
  )
}

export default Adminpage
