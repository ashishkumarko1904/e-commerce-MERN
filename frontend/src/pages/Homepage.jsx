import { useEffect } from "react";
import { useCartStore } from "../stores/useCartStore.js";
import { useProductStore } from "../stores/useProductStore.js";
import "./Homepage.css"

const Homepage = () => {
  const {fetchAllProducts,products} = useProductStore();
  const {addToCart} = useCartStore();
  function handleBuy(product){
    console.log(product);
    console.log(product._id);
    addToCart(product);
   
  }
  useEffect(()=>{
    fetchAllProducts();
  },[fetchAllProducts]);
  return (
    <div className="home">
     
        <div>
          slider
        </div>
      
      products here
      <div className="grid-products">
      {products && products.length > 0 ? (
                products.map((product) => (
                    <div key={product._id} className="product-card"> 
                        <img src={product.image} width="250px" height="300px" alt={product.name} />
                        <p>Name: {product.name}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={()=>handleBuy(product)}>Add to Cart</button>
                    </div>
                ))
            ) : (
                <p>Products not found</p>
            )}
      </div>
    </div>
  )
}

export default Homepage;
