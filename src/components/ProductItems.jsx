const ProductItems = ({ image, category, itemName, price }) => {
  return (
    <section className="text-gray-600 body-font ">
      <div className="container px-5 py-12 mx-auto ">
        <div className="relative flex flex-wrap -m-4 max-h-[400px] p-4">
          <div className="border hover:bg-gray-100 duration-200 h-[400px]  p-4 w-full rounded-md">
            <div className="block  relative h-48 rounded overflow-hidden">
              <img
                alt="ecommerce"
                className="object-contain object-center w-full h-full block"
                src={image}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                {category}
              </h3>
              <h2 className="text-gray-900 title-font text-base font-medium line-clamp-2">
                {itemName}
              </h2>
              <p className="mt-1 text-lg">${price}</p>
            </div>
          </div>
          <div className="absolute -bottom-4 left-6 flex h-full  items-end">
            <button className=" bg-green-700 hover:bg-green-700/80 duration-200 text-green-100 rounded my-2 px-4 py-2 z-20">
              Go to Detail
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductItems;
