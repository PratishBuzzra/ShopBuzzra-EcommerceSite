import React from 'react';

const FilterProduct = ({ search, setSearch, category, setCategory }) => {
  const categories = ['ALL', 'men', 'women', 'kids'];

  return (
    <div className="shadow-lg mt-10 p-4 rounded h-max">
      <input
        type="text"
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2"
      />
      <h1 className="mt-5 font-semibold text-xl">Browse By</h1>
      <div className="flex flex-col mt-3">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setCategory(cat)}
            className={`cursor-pointer uppercase text-left p-2 rounded ${
              category.toLowerCase() === cat.toLowerCase()
                ? 'bg-blue-600 text-white'
                : ''
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterProduct;
