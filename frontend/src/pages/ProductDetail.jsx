import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaArrowLeft, FaArrowRight, FaTag, FaRupeeSign, FaTshirt, FaUndo,
  FaCheckCircle, FaHeadset, FaShippingFast, FaStar, FaThumbsUp
} from 'react-icons/fa';
import { shopDataContext } from '../context/ShopContext';
import Swal from 'sweetalert2';

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(shopDataContext);
  const [productData, setProductData] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [size, setSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedIndex, setRelatedIndex] = useState(0);

  useEffect(() => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProductData(item);
      const validImages = [item.image1, item.image2, item.image3, item.image4].filter(Boolean);
      setImages(validImages);
      setCurrentIndex(0);
      const related = products.filter(
        (p) => p._id !== item._id && p.category === item.category
      );
      setRelatedProducts(related);
      setRelatedIndex(0);
    }
  }, [productId, products]);

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleRelatedPrev = () => {
    setRelatedIndex((prev) => (prev === 0 ? Math.max(0, relatedProducts.length - 3) : prev - 1));
  };

  const handleRelatedNext = () => {
    setRelatedIndex((prev) => (prev + 3 >= relatedProducts.length ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!size) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Size',
        text: 'Please choose a size before adding to cart.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    addToCart(productData._id, size);

    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${productData.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (!productData)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div className="w-full min-h-screen bg-gradient-to-bl from-[#141414] to-[#0c2025] text-white px-6 md:px-20 py-[100px]">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-6 items-start">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 items-center justify-center">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-[3px] ${
                  currentIndex === idx ? 'border-amber-600' : 'border-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full h-[400px] flex items-center justify-center bg-white rounded-md shadow-lg overflow-hidden">
            <img
              src={images[currentIndex]}
              alt="Main product"
              className="h-full w-full object-contain"
            />
            <button
              onClick={handlePrev}
              className="absolute left-2 bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-70"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 bg-black bg-opacity-40 p-2 rounded-full hover:bg-opacity-70"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <FaTag className="text-blue-400" /> {productData.name}
          </h1>

          <p className="text-gray-300 text-md leading-relaxed">{productData.description}</p>

          <p className="text-3xl font-semibold text-green-400 flex items-center gap-2">
            <FaRupeeSign /> {productData.price}
          </p>

          <p className="text-sm text-gray-400 italic">
            Category: <span className="capitalize">{productData.category}</span> /{' '}
            <span className="capitalize">{productData.subCategory}</span>
          </p>

          {/* Size Selection */}
          <div>
            <h3 className="mb-2 font-semibold flex items-center gap-2">
              <FaTshirt /> Select Size:
            </h3>
            <div className="flex gap-4 flex-wrap">
              {productData.sizes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-md border transition ${
                    size === s
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white text-black border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-200">
            <div className="flex items-center gap-2">
              <FaUndo className="text-yellow-400 text-lg" />
              <span>Easy 7-Day Return</span>
            </div>
            <div className="flex items-center gap-2">
              <FaHeadset className="text-blue-400 text-lg" />
              <span>Help & Support</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400 text-lg" />
              <span>Quality Checked</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-600 px-6 py-3 rounded-md text-white font-semibold hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Why Shop With Us */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-gray-200">
          <div className="flex flex-col items-center">
            <FaShippingFast className="text-cyan-400 text-3xl mb-2" />
            <p>Fast & Reliable Shipping</p>
          </div>
          <div className="flex flex-col items-center">
            <FaStar className="text-yellow-400 text-3xl mb-2" />
            <p>Top-Rated Quality Products</p>
          </div>
          <div className="flex flex-col items-center">
            <FaThumbsUp className="text-green-400 text-3xl mb-2" />
            <p>Affordable Prices Guaranteed</p>
          </div>
          <div className="flex flex-col items-center">
            <FaHeadset className="text-blue-300 text-3xl mb-2" />
            <p>24/7 Friendly Customer Support</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6 text-center">You May Also Like</h2>
          <div className="relative">
            <button
              onClick={handleRelatedPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full z-10 shadow hover:bg-gray-200"
            >
              <FaArrowLeft />
            </button>
            <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-hidden">
              {relatedProducts.slice(relatedIndex, relatedIndex + 3).map((item) => (
                <Link
                  key={item._id}
                  to={`/productdetail/${item._id}`}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition text-black"
                >
                  <img
                    src={item.image1}
                    alt={item.name}
                    className="w-full h-48 object-contain mb-3"
                  />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-green-600 font-bold text-md">₹ {item.price}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {item.category} / {item.subCategory}
                  </p>
                </Link>
              ))}
            </div>
            <button
              onClick={handleRelatedNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full z-10 shadow hover:bg-gray-200"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
