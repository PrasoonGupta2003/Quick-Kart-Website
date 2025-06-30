import React, { useEffect, useState, useContext } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { authDataContext } from '../context/AuthContext';
import { MdDelete, MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

function Lists() {
    const { serverUrl } = useContext(authDataContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageIndexes, setImageIndexes] = useState({});

    const fetchProducts = async () => {
        try {
            const res = await axios.get(serverUrl + "/api/product/list", { withCredentials: true });
            setProducts(res.data);
            const initIndexes = {};
            res.data.forEach(p => {
                initIndexes[p._id] = 0;
            });
            setImageIndexes(initIndexes);
        } catch (err) {
            console.error("Error fetching products", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This product will be deleted permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true });
            setProducts(prev => prev.filter(p => p._id !== id));
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
        } catch (err) {
            console.error("Error deleting product", err);
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };

    const handleImageSlide = (productId, direction) => {
        const currentIndex = imageIndexes[productId];
        const totalImages = 4;
        let newIndex = direction === 'left'
            ? (currentIndex - 1 + totalImages) % totalImages
            : (currentIndex + 1) % totalImages;
        setImageIndexes(prev => ({ ...prev, [productId]: newIndex }));
    };

    const getImageArray = (product) => {
        return [product.image1, product.image2, product.image3, product.image4];
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-hidden">
            <Nav />
            <div className="flex flex-col md:flex-row pt-[70px]">
                <div className="w-full md:w-[18%] md:min-w-[200px] md:max-w-[250px] md:min-h-screen border-b border-gray-700 md:border-b-0 md:border-r">
                    <Sidebar />
                </div>

                <div className="flex-1 px-4 md:px-10 py-10">
                    <h2 className="text-[25px] md:text-[40px] font-semibold mb-6">All Products</h2>

                    {loading ? (
                        <p className="text-xl">Loading products...</p>
                    ) : products.length === 0 ? (
                        <p className="text-xl">No products found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => {
                                const images = getImageArray(product);
                                const currentIndex = imageIndexes[product._id] || 0;

                                return (
                                    <div key={product._id} className="bg-slate-800 rounded-2xl p-4 flex flex-col shadow-lg">
                                        <div className="relative w-full h-[200px] mb-4 rounded-xl overflow-hidden">
                                            <img
                                                src={images[currentIndex]}
                                                alt={`Product ${product.name}`}
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                            <button
                                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                                                onClick={() => handleImageSlide(product._id, 'left')}
                                            >
                                                <MdArrowBackIos size={20} />
                                            </button>
                                            <button
                                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                                                onClick={() => handleImageSlide(product._id, 'right')}
                                            >
                                                <MdArrowForwardIos size={20} />
                                            </button>
                                        </div>

                                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                        <p className="text-sm mb-2">{product.description.slice(0, 80)}...</p>
                                        <p className="mb-1">Category: <span className="font-semibold">{product.category} / {product.subCategory}</span></p>
                                        <p className="mb-1">Price: ₹{product.price}</p>
                                        <p className="mb-1">Sizes: {product.sizes.join(", ")}</p>
                                        {product.bestseller && (
                                            <p className="text-green-400 font-semibold">Bestseller</p>
                                        )}
                                        <button
                                            className="mt-auto flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-fit mt-4 self-end"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            <MdDelete size={20} />
                                            Delete
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Lists;
