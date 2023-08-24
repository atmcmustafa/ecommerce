import { Link } from "react-router-dom";
import ProductItems from "../components/ProductItems";
import { useEffect, useState } from "react";

const Products = () => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("API isteği başarısız oldu.");
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap w-full mb-0 md:mb-8 mt-52 md:mt-20 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
          All Products
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto">
        {item.map((data) => (
          <Link key={data.id} to={`/product/${data.id}`}>
            <ProductItems
              category={data.category}
              image={data.image}
              itemName={data.title}
              price={data.price}
              title={data.title}
              key={data.id}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Products;
