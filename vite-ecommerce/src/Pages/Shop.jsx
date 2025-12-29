import React, { useContext, useEffect, useState } from "react";
import ConstantHero from "../components/ConstantHero";
import bannerImg from "../assets/HeroBanner/B2.jpg";
import FilterProduct from "../components/FilterProduct";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../Context/CartContext";
import { ProductContext } from "../Context/ProductContext";

const Shop = () => {
  const { cart } = useContext(CartContext);
  const { product, allProduct } = useContext(ProductContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    allProduct();
  }, []);

const filteredProducts = () => {
  if (!Array.isArray(product)) return [];

  return product.filter(item => {
    const matchCategory = category.toLowerCase() === 'all' || item.category?.toLowerCase() === category.toLowerCase();
    const matchSearch = item.title?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });
};

console.log("Category state:", category);
console.log("Filtered:", filteredProducts());

  return (
    <div className="bg-blue-50">
      <ConstantHero
        cName="relative w-full h-[50vh] overflow-hidden"
        imgSrc={bannerImg}
        imgcName="w-full h-screen object-cover "
        heroDesc="absolute inset-0 bg-black/40 flex flex-col justify-center text-center items-center mt-16"
        heroTitle="Welcome to Our Store"
        heroText={<>Discover the latest trends with amazing deals.</>}
        heroBtncName="hidden"
      />
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex gap-8">
          <FilterProduct
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />
          <div className="grid grid-cols-3 gap-7 mt-10 mb-10">
            {filteredProducts().length === 0 ? (
  <p>No products found.</p>
) : (
  filteredProducts().map((item) => (
    <ProductCard key={item._id} product={item} />
  ))
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
