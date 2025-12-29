import { useState } from "react";
import { createContext } from "react";



export const ProductContext = createContext()

const base_url =  import.meta.env.VITE_API_URL

const ProductProvider = ({children})=>{
    const [product, setProduct] = useState([])

    const allProduct = async ()=>{
        try {
            const res = await fetch(`${base_url}/v1/product/getproduct`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            })

            const data = await res.json()
            setProduct(data.products)
            console.log("fetch product",data.products);
            
            
        } catch (error) {
            console.error("Failed to fecth product", error);
            
            
        }
    }

const editProduct = async (productId, updatedFormData) => {
    try {
        const res = await fetch(`${base_url}/v1/product/updateproduct/${productId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
                // No Content-Type here for FormData
            },
            body: updatedFormData
        });

        if (!res.ok) {
            throw new Error("Failed to update product");
        }

        const data = await res.json();
        console.log('updated product', data);
        allProduct();
    } catch (error) {
        console.error("Failed to edit product", error);
    }
};
 const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`${base_url}/v1/product/deleteproduct/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
  
      const data = await res.json();
      console.log("Deleted product:", data);
  
    
      allProduct();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };




    return (
        <ProductContext.Provider value={{product, allProduct, editProduct,deleteProduct}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;