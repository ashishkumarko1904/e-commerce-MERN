import { useState } from "react";
import { useProductStore } from "../stores/useProductStore.js";
import { PlusCircle, Upload, Loader } from "lucide-react";
import "./CreateProductForm.css"

const CreateProductForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
      });

      const {createProduct,loading} = useProductStore();

      const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
			await createProduct(formData);
			setFormData({ name: "", description: "", price: "", category: "", image: "" });
		} catch {
			console.log("error creating a product");
		}
      }

      const handleImageChange = (e) => {
		const file = e.target.files[0]; // Get the selected file
		if (file) {
			const reader = new FileReader(); // Create a new FileReader instance
            // When the reading process finishes, update the state with the file's Base64 content
			reader.onloadend = () => {
				setFormData({ ...formData, image: reader.result });
                
			};
             // Read the file as a Data URL (Base64 string)
			reader.readAsDataURL(file); // base64

		}
	};

  return (
    <div className="form-container" style={{width:"400px",height:"400px",background:"blue"}}>
      <form  id="newproduct" name="newproduct" onSubmit={handleSubmit}>
        <div className="form-group">
        <label>name</label>
        <input type="text"
              name="name" 
              value={formData.name} 
              onChange={e=>setFormData({...formData,name:e.target.value})}
              required ></input>
        </div>
        <div className="form-group">
        <label>Description</label>
        <input type="text"
            name="description" 
            value={formData.description} 
            onChange={e=>setFormData({...formData,description:e.target.value})}
            required ></input>
        </div>
        <div className="form-group">
        <label>Price</label>
        <input type="number"
              name="price" 
              value={formData.price} 
              onChange={e=>setFormData({...formData,price:e.target.value})}
              required ></input>
        </div>
        <div className="form-group">
        <label>Category</label>
        <select 
            name="category" 
            value={formData.category} 
            onChange={e=>setFormData({...formData,category:e.target.value})} 
            required
          >
            <option value="">Select Category</option>
            <option value="jeans">jeans</option>
            <option value="shirt">shirt</option>
            <option value="tshirt">tshirt</option>
            <option value="shoes">Shoes</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
        <label>Upload Image <Upload/></label>
        <input type="file"
             accept="image/*" 
             onChange={handleImageChange}
             required></input>
             {formData.image && <span>Image uploaded </span>}
        </div>
        <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? (
						<>
							<Loader  />
							Loading...
						</>
					) : (
						<>
							<PlusCircle />
							Create Product
						</>
					)}
        </button>
      </form>
    </div>
  )
}

export default CreateProductForm
