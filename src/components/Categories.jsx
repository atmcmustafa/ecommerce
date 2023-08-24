import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("API isteği başarısız oldu.");
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log(category);
  }, []);

  return (
    <>
      {category.map((item, index) => (
        <section key={index} className="text-gray-600 body-font p-4">
          <div className="container px-5 py-4 md:py-12 mx-auto w-full flex ">
            <Link
              to={`categories/${item}`}
              className="flex w-full flex-1 flex-wrap -m-4 hover:bg-gray-200 cursor-pointer rounded"
            >
              <div className="w-full flex-1">
                <div className="border border-gray-200 p-6 rounded-lg ">
                  <h2 className="text-lg text-gray-900 font-medium title-font 2">
                    {item}
                  </h2>
                </div>
              </div>
            </Link>
          </div>
        </section>
      ))}
    </>
  );
};

export default Categories;
