import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("items");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [productQuantities, setProductQuantities] = useState(() => {
    const storedProductQuantities = JSON.parse(
      localStorage.getItem("productQuantities")
    );
    return storedProductQuantities || {};
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(cart));
    localStorage.setItem(
      "productQuantities",
      JSON.stringify(productQuantities)
    );
  }, [cart, productQuantities]);

  const addToCart = (id) => {
    if (!productQuantities[id.id]) {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id.id]: 1,
      }));
    }
    setCart([...cart, id]);
    console.log("id", id);
    toast.success("Item added to cart.");
  };

  const deleteItem = (id) => {
    const items = [...cart];
    console.log(items);
    const updatedItems = items.filter((item) => item.id !== id);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    setCart(updatedItems);
    toast.error("Item deleted");
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  const value = {
    cart,
    addToCart,
    productQuantities,
    deleteItem,
    modal,
    setModal,
    toggleModal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
