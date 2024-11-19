import { useCartStore } from "../stores/useCartStore"


const CartPage = () => {
  const {cart} = useCartStore();
  return (<div>
    {
    cart.length === 0?(<div>cart is empty</div>):(<div>
      {
        cart.map((item)=>(
          <div key={item._id}>
             <img src={item.image} width="80px" height="80px" alt={item.name} />
                        <p>Name: {item.name}</p>
                        <p>Price: ${item.price}</p>
                        <p>quantity: {item.quantity}</p>
                        <div><button type="button">Add</button>
                        <button type="button">Remove</button>
                        </div>

          </div>
        ))
      }
    </div>)
  }
  </div>
  )
}

export default CartPage
