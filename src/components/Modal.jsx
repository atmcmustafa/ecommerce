import { useContext } from "react";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const { modal, setModal } = useContext(CartContext);
  const navigate = useNavigate();

  const contShop = () => {
    navigate("/products");
    setModal(false);
  };

  return (
    <>
      {modal ? (
        <div className="relative ">
          <div
            onClick={() => setModal(false)}
            className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 "
          ></div>
          <div className="flex flex-col gap-3 justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-7 rounded-lg bg-zinc-200 text-black z-20 text-center md:text-start mt-20 md:mt-0">
            <span
              onClick={() => setModal(false)}
              className="absolute top-2 right-4 text-xl cursor-pointer"
            >
              X
            </span>
            <h1 className="text-3xl">Purchase is succesfull.</h1>
            <div className="flex flex-col gap-2 text-gray-500">
              <p>
                Thank you! Your order has been successfully placed. Your items
                will be prepared and shipped as soon as possible. You can track
                the status of your order by logging into your account or
                checking our email notifications.
              </p>

              <p className="text-lg font-semibold text-black">
                Happy shopping!
              </p>
              <button
                onClick={() => contShop()}
                className="h-10 px-4 rounded bg-green-600 hover:bg-green-600/80 duration-200 w-fit text-zinc-100 mx-auto md:mx-0"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Modal;
