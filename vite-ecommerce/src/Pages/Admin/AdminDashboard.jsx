import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../../ProductManagement/addProduct";
import EditProduct from "../../ProductManagement/editProduct";
import { ProductContext } from "../../Context/ProductContext";
import { AuthContext } from "../../Context/authContext";

const AdminDashboard = () => {
  const { product, allProduct, editProduct, deleteProduct } = useContext(ProductContext);
   const { logout} = useContext(AuthContext)

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    allProduct();
  }, []);


  const handleAddClick = () => {
    setIsAdding(true);
    setEditingProduct(null);
    setIsEditing(false);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingProduct(null);
    setIsEditing(false);
  };

   const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        await deleteProduct(id);
        alert("Product deleted successfully!");
      }
    };

  return (
    <div className="min-h-screen bg-blue-50">

      <header className="bg-white text-black shadow-lg flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold cursor-pointer">AdminDashboard</div>
        <button
          onClick={logout}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

   
      <main className="max-w-6xl  mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <button
            onClick={handleAddClick}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        </div>

     
        {isAdding && <AddProduct onCancel={handleCancel} />}

       
        {isEditing && editingProduct && (
          <EditProduct
            existingProduct={editingProduct}
            onCancel={handleCancel}
            onSubmit={async (productId, updatedFormData) => {
              await editProduct(productId, updatedFormData);
              setEditingProduct(null);
              setIsEditing(false);
              allProduct();
            }}
          />
        )}

       
        <table className="min-w-full bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left px-4 py-3">Image</th>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3">Price (NPR)</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((prod) => (
              <tr key={prod._id} className="border-b hover:bg-gray-50 align-top">
                <td className="px-4 py-3">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{prod.title}</td>
                <td className="px-4 py-3 text-gray-600">{prod.category}</td>
                <td className="px-4 py-3 text-gray-700 max-w-xs">
                  {prod.description}
                </td>
                <td className="px-4 py-3 font-semibold">
                  {prod.price.toLocaleString()}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => handleEditClick(prod)}
                    className="bg-blue-600 text-white py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
