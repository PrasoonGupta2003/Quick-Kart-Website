import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import { userDataContext } from './UserContext';
import axios from 'axios';

export const shopDataContext = createContext();

function ShopContext({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cartItem, setCartItem] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);

  const currency = '₹';
  const delivery_fee = 40;

  // ✅ Utility: Clean up cart items with 0 quantity
  const cleanCartItem = (rawCart) => {
    const newCart = {};

    for (const itemId in rawCart) {
      const sizes = rawCart[itemId];
      const validSizes = {};

      for (const size in sizes) {
        if (sizes[size] > 0) {
          validSizes[size] = sizes[size];
        }
      }

      if (Object.keys(validSizes).length > 0) {
        newCart[itemId] = validSizes;
      }
    }

    return newCart;
  };

  // 🛒 Fetch products from backend
  const getProducts = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/product/list`, {
        withCredentials: true,
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  // 🛒 Fetch user's cart and clean it
  const getUserCart = async () => {
    try {
      const res = await axios.post(`${serverUrl}/api/cart/get`, {}, {
        withCredentials: true,
      });

      const cleanedCart = cleanCartItem(res.data || {});
      setCartItem(cleanedCart);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  // ➕ Add product to cart
  const addToCart = async (itemId, size) => {
    if (!size) return console.log("Select product size");

    const updatedCart = structuredClone(cartItem);

    if (!updatedCart[itemId]) updatedCart[itemId] = {};
    updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;

    const cleaned = cleanCartItem(updatedCart);
    setCartItem(cleaned);

    if (userData) {
      try {
        await axios.post(`${serverUrl}/api/cart/add`, { itemId, size }, {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Add to cart failed", error);
      }
    }
  };

  // 🔁 Update quantity of item in cart
  const updateQuantity = async (itemId, size, quantity) => {
    const updatedCart = structuredClone(cartItem);
    updatedCart[itemId][size] = quantity;

    const cleaned = cleanCartItem(updatedCart);
    setCartItem(cleaned);

    if (userData) {
      try {
        await axios.post(`${serverUrl}/api/cart/update`, {
          itemId, size, quantity,
        }, { withCredentials: true });
      } catch (error) {
        console.error("Cart update failed", error);
      }
    }
  };

  // 📊 Calculate total cart count
  const calculateCartCount = () => {
    let count = 0;
    for (let itemId in cartItem) {
      for (let size in cartItem[itemId]) {
        if (cartItem[itemId][size] > 0) {
          count += cartItem[itemId][size];
        }
      }
    }
    setCartCount(count);
  };

  // 💰 Calculate total amount of cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (let itemId in cartItem) {
      const product = products.find(p => p._id === itemId);
      if (product) {
        for (let size in cartItem[itemId]) {
          const quantity = cartItem[itemId][size];
          if (quantity > 0) {
            totalAmount += quantity * product.price;
          }
        }
      }
    }
    return totalAmount;
  };

  // ❌ Remove item or size from cart
  const removeItemFromCart = async (itemId, size) => {
    const updatedCart = structuredClone(cartItem);

    delete updatedCart[itemId][size];

    if (Object.keys(updatedCart[itemId]).length === 0) {
      delete updatedCart[itemId];
    }

    const cleaned = cleanCartItem(updatedCart);
    setCartItem(cleaned);

    if (userData) {
      try {
        await axios.post(`${serverUrl}/api/cart/update`, {
          itemId,
          size,
          quantity: 0, // Tells backend to remove it
        }, {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Failed to remove item from backend", error);
      }
    }
  };


  // 🔄 Initial fetch
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (userData) {
      getUserCart();
    }
  }, [userData]);

  useEffect(() => {
    calculateCartCount();
  }, [cartItem]);

  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItem,
    setCartItem,
    cartCount,
    updateQuantity,
    getCartAmount,
    getUserCart,
    removeItemFromCart
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;
