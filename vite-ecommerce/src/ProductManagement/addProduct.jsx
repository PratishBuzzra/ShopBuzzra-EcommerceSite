import React, { useState } from 'react';



const base_url =  import.meta.env.VITE_API_URL

const AddProduct = ({onCancel}) => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
 

  const handleChange = (e) => {
    const {name, type, value, files} =  e.target;
    

    if (type === "file") {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('title', product.title);
    formData.append('description', product.description)
    formData.append('price', product.price)
     formData.append('category', product.category)

      if (product.image) {
      formData.append("image", product.image);
    }try {
        const res = await fetch(`${base_url}/v1/product/addproduct`, {
            method: "POST",
            headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData
        })

        if(!res.ok){
              const text = await res.text();
        throw new Error(text);
        }
         const data = await res.json();
      console.log("Product added:", data);

      setProduct({
     title: '',
    description: '',
    price: '',
    category: '',
    image: null,
      })
        
    } catch (error) {
        console.error('Error submitting form', error);
        
        
    }

    alert("Product submitted (mock)");
   
  };

  return (
    <div className="mb-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">Title</label>
          <input
          type='text'
            name="title"
            value={product.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Product title"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
          type = "text"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Product description"
          />
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Product price"
          />
        </div>

        <div>
         <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
            placeholder="Product category"
          />
        </div>

        <div>
          <label className="block font-medium">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            accept="image/*"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Product
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-400 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
