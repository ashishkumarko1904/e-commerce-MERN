import { useProductStore } from "../stores/useProductStore"
import { Trash2 ,Sparkles} from "lucide-react";
import "./Allproducts.css"

const Allproducts = () => {
    const {products,toggleFeaturedProduct,deleteProduct} = useProductStore();
  return (
    <div className="table-container">
    <table className="product-table">
      <thead className="table-header">
        <tr>
          <th className="table-heading">Product</th>
          <th className="table-heading">Price</th>
          <th className="table-heading">Category</th>
          <th className="table-heading">Featured</th>
          <th className="table-heading">Actions</th>
        </tr>
      </thead>

      <tbody className="table-body">
        {products?.map((product) => (
          <tr key={product._id} className="table-row">
            <td className="table-data">
              <div className="product-info">
                <div className="product-image">
                  <img className="image" src={product.image} alt={product.name} />
                </div>
                <div className="product-name">{product.name}</div>
              </div>
            </td>
            <td className="table-data">${product.price.toFixed(2)}</td>
            <td className="table-data">{product.category}</td>
            <td className="table-data">
              <button
                onClick={() => toggleFeaturedProduct(product._id)}
                className={`featured-button ${
                  product.isFeatured ? 'featured-active' : 'featured-inactive'
                }`}
              >
               <Sparkles />
              </button>
            </td>
            <td className="table-data">
              <button onClick={() => deleteProduct(product._id)} className="delete-button">
              <Trash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Allproducts
