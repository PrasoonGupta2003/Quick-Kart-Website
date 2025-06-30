import React, { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import { MdDelete, MdEmail } from "react-icons/md";
import { FaUndo, FaCheckCircle, FaShippingFast } from "react-icons/fa";
import CartTotal from "../component/CartTotal";

function Cart() {
  const {
    cartItem,
    products,
    updateQuantity,
    removeItemFromCart,
  } = useContext(shopDataContext);

  // ✅ Check if cart has items with quantity > 0
  const hasItemsInCart = Object.entries(cartItem).some(([_, sizes]) =>
    Object.values(sizes).some((qty) => qty > 0)
  );

  return (
    <div className="min-h-screen px-4 pt-[100px] pb-20 bg-[#f3f7f7]">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Your Shopping Cart
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          🛍️ Grab your favorites before they run out! Complete your order now.
        </p>
      </div>

      {!hasItemsInCart ? (
        <p className="text-center text-gray-600 py-20 text-xl font-semibold">
          🛒 Your cart is empty. Start shopping now!
        </p>
      ) : (
        <div className="max-w-6xl mx-auto space-y-8">
          {Object.entries(cartItem).map(([itemId, sizes]) => {
            const product = products.find((p) => p._id === itemId);
            if (!product) return null;

            return Object.entries(sizes)
              .filter(([_, quantity]) => quantity > 0)
              .map(([size, quantity]) => (
                <div
                  key={`${itemId}-${size}`}
                  className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-lg gap-6"
                >
                  <img
                    src={product.image1}
                    alt={product.name}
                    className="w-full md:w-60 h-60 object-cover rounded-xl"
                  />

                  <div className="flex-1 w-full space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {product.name}
                      <span className="text-sm text-gray-500 font-normal ml-2">
                        ({size})
                      </span>
                    </h3>
                    <p className="text-gray-700 font-semibold text-lg">
                      Price: ₹{product.price}
                    </p>

                    <div className="flex gap-4 items-center text-sm font-medium text-green-600">
                      <FaUndo className="text-base" />
                      <span>7-Day Easy Return</span>
                      <FaCheckCircle className="text-base" />
                      <span>100% Original</span>
                      <FaShippingFast className="text-base" />
                      <span>Free Delivery*</span>
                    </div>

                    <div className="flex items-center mt-4">
                      <button
                        onClick={() => updateQuantity(itemId, size, quantity - 1)}
                        disabled={quantity <= 1}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                      >
                        -
                      </button>
                      <span className="mx-3 text-lg font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(itemId, size, quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                      >
                        +
                      </button>
                      <MdDelete
                        onClick={() => removeItemFromCart(itemId, size)}
                        className="ml-6 text-red-500 text-2xl cursor-pointer hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="text-right text-xl font-bold text-gray-800">
                    ₹{product.price * quantity}
                  </div>
                </div>
              ));
          })}

          {/* 🧾 Cart total at the end */}
          <CartTotal />

          {/* 💡 Bottom taglines */}
          <div className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <div>
              <p className="text-lg font-semibold text-gray-700">
                ✅ Your items are kept safe in cart!
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Fast shipping, safe packaging, and a smooth checkout experience guaranteed.
              </p>
            </div>
            <div className="text-sm mt-4 sm:mt-0 text-gray-600">
              <a
                href="mailto:support@yourshop.com"
                className="flex items-center gap-2 mt-6 sm:mt-0 text-sm text-gray-600 hover:text-gray-950 transition-all cursor-pointer"
              >
                <MdEmail className="text-lg" />
                <span>
                  <span className="font-semibold">Need Help?</span> Mail us for help and support
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
