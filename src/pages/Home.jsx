import { useEffect, useState } from "react";
import ProductItems from "../components/ProductItems";
import { Link, useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import banner from "/clothes.jpg";
const Home = () => {
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=4"
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
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={banner}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Stay Up-to-Date with the Latest Products
            </h1>
            <p className="mb-8 leading-relaxed">
              At CommerceLand, we bring you a world of endless possibilities.
              With a vast selection of products and unbeatable prices, we're
              here to make your online shopping experience nothing short of
              extraordinary. Discover Thousands of Unique Products: Explore our
              extensive catalog featuring thousands of products carefully
              curated to cater to your every need and desire. From fashion and
              electronics to home decor and beyond, you'll find something for
              every aspect of your life.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/products")}
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap w-full mb-8 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
          Categories
        </h1>
      </div>

      <div className="w-full">
        <div className="grid w-full text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap container mx-auto flex-1">
          <Categories />
        </div>
      </div>

      <h1 className="text-center text-4xl text-black my-8">For You</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto">
        {item.map((data) => (
          <Link key={data.id} to={`product/${data.id}`}>
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

export default Home;
