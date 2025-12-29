import React, { useState, useEffect } from "react";

const EditProduct = ({ existingProduct, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null, 
  });

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        title: existingProduct.title || '',
        description: existingProduct.description || '',
        price: existingProduct.price?.toString() || '',
        category: existingProduct.category || '',
        image: null, 
      });
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedForm = new FormData();
    updatedForm.append("title", formData.title);
    updatedForm.append("description", formData.description);
    updatedForm.append("price", formData.price);
    updatedForm.append("category", formData.category);
    
    if (formData.image) {
      updatedForm.append("image", formData.image);
    }

    onSubmit(existingProduct._id, updatedForm); 
  };

  return (
    <div className="mb-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Replace Image (optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Product
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

export default EditProduct;
