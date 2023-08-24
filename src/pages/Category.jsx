import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const Category = () => {
  const [item, setItem] = useState([]);

  const { categoryName } = useParams();
  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${categoryName}`
        );
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
    window.scrollTo(0, 0);
  }, [location]);

  console.log(item);
  return (
    <>
      <div className="flex flex-wrap w-full mb-0 md:mb-8 mt-52 md:mt-20 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
          {categoryName}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-5 container mx-auto">
        {item.map((data) => (
          <section key={data.id} className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto ">
              <div className="flex flex-wrap -m-4 h-[400px] relative">
                <Link to={`/product/${data.id}`} className="border p-4 w-full">
                  <div className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-contain object-center w-full h-full block"
                      src={data.image}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-900 title-font text-base font-medium line-clamp-1">
                      {data.title}
                    </h3>
                    <h2 className="text-gray-500 text-xs tracking-widest title-font line-clamp-2 my-2">
                      {data.description}
                    </h2>

                    <p className="mt-1 text-lg">${data.price}</p>
                  </div>
                  <div className="absolute bottom-0 left-3 flex h-full  items-end">
                    <button className="bg-green-700 hover:bg-green-700/80 duration-200 text-green-100 rounded my-2 px-4 py-2 z-20">
                      Go to Detail
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Category;
