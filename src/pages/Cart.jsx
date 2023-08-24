import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Modal from "../components/Modal";

const CartItems = () => {
  const { cart, deleteItem, setModal } = useContext(CartContext);
  const navigate = useNavigate();
  const storedProductQuantities = JSON.parse(
    localStorage.getItem("productQuantities")
  );

  const [productQuantities, setProductQuantities] = useState(
    storedProductQuantities ||
      cart.reduce((quantities, product) => {
        quantities[product.id] = 1;
        return quantities;
      }, {})
  );

  const incrementProductQuantity = (productId) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const decrementProductQuantity = (productId) => {
    if (productQuantities[productId] > 1) {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      const quantity = productQuantities[product.id] || 1;
      total += product.price * quantity;
    });
    return total.toFixed(2);
  };

  useEffect(() => {
    localStorage.setItem(
      "productQuantities",
      JSON.stringify(productQuantities)
    );
  }, [productQuantities]);

  useEffect(() => {
    localStorage.setItem(
      "productQuantities",
      JSON.stringify(productQuantities)
    );
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">
        <Modal />
        <div className="w-full flex flex-col h-fit gap-4 p-4">
          <p className="text-blue-900 text-xl font-extrabold">My cart</p>
          <Toaster position="top-center" />
          {cart.length > 0 ? (
            cart.map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm"
              >
                <div className="flex  flex-col md:flex-row gap-3 justify-between">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-28 h-28">
                      <img
                        className="w-full h-full"
                        src={prod.image}
                        alt="Product"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-lg text-gray-800 font-semibold">
                        {prod.title}
                      </p>
                      <p className="text-xs text-gray-600 font-semibold">
                        Color: <span className="font-normal">Black + Zinc</span>
                      </p>
                      <p className="text-xs text-gray-600 font-semibold">
                        Size: <span className="font-normal">42</span>
                      </p>
                    </div>
                  </div>
                  <div className="self-center text-center mx-auto md:ms-auto flex flex-col gap-2">
                    <p className="text-gray-800 font-normal text-xl">
                      $ {(prod.price * productQuantities[prod.id]).toFixed(2)}
                    </p>
                    <button
                      className="px-4 h-10 bg-red-600 rounded text-center text-gray-100 text-sm "
                      onClick={() => deleteItem(prod.id)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="self-center">
                    <button className="">
                      <svg
                        height="24px"
                        width="24px"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      ></svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-row self-center gap-1">
                  <button
                    onClick={() => decrementProductQuantity(prod.id)}
                    className="w-5 h-5 self-center rounded-full border border-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d1d5db"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <span>{productQuantities[prod.id]}</span>
                  <button
                    onClick={() => incrementProductQuantity(prod.id)}
                    className="w-5 h-5 self-center rounded-full border border-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill=""
                      stroke="#9ca3af"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-3xl text-green-500 flex items-center justify-center">
              Cart is Empty!
            </div>
          )}

          {}
        </div>

        {cart.length > 0 ? (
          <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
            <p className="text-blue-900 text-xl font-extrabold">
              Purchase Resume
            </p>
            <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">Subtotal ({cart.length} Items)</p>
                <p className="text-end font-bold">$ {calculateTotal()}</p>
              </div>
              <hr className="bg-gray-200 h-0.5" />
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">Cargo</p>
                <div>
                  <p className="text-end font-bold">$0. 00</p>
                  <p className="text-gray-600 text-sm font-normal">
                    Arrives on Jul 16
                  </p>
                </div>
              </div>

              <hr className="bg-gray-200 h-0.5" />
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">Total</p>
                <div>
                  <p className="text-end font-bold">$ {calculateTotal()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setModal((prev) => !prev)}
                  className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md"
                >
                  FINISH
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md"
                >
                  ADD MORE PRODUCTS
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CartItems;
