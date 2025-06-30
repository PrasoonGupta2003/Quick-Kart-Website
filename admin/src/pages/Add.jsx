import React, { useState, useContext } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import upload from "../assets/upload image.png";
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Add() {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Men");
    const [price, setPrice] = useState("");
    const [subCategory, setSubCategory] = useState("TopWear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const { serverUrl } = useContext(authDataContext);

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (image1) formData.append('image1', image1);
        if (image2) formData.append('image2', image2);
        if (image3) formData.append('image3', image3);
        if (image4) formData.append('image4', image4);

        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('price', price);
        formData.append('bestseller', bestseller);
        formData.append('sizes', JSON.stringify(sizes));

        try {
            let result = await axios.post(serverUrl + "/api/product/addProduct", formData, { withCredentials: true });
            console.log(result.data);

            if (result.data) {
                setName("");
                setDescription("");
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice("");
                setBestseller(false);
                setCategory("Men");
                setSubCategory("TopWear");
                setSizes([]);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleSizeChange = (size) => {
        setSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-hidden relative">
            <Nav />
            <div className="flex pt-[70px]">
                <div className="w-[18%] min-w-[200px] max-w-[250px]">
                    <Sidebar />
                </div>
                <div className="w-[82%] min-w-0 overflow-x-hidden px-4 md:px-10">
                    <form onSubmit={handleAddProduct} className="w-full flex flex-col gap-10 py-10">
                        <h2 className="text-[25px] md:text-[40px] font-semibold">Add Product Page</h2>

                        <div className="flex flex-col gap-3">
                            <p className="text-[20px] md:text-[25px] font-semibold">Upload Images</p>
                            <div className="flex flex-wrap gap-4">
                                {[image1, image2, image3, image4].map((img, idx) => (
                                    <label
                                        key={idx}
                                        htmlFor={`image${idx + 1}`}
                                        className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] cursor-pointer border-2 rounded-lg hover:border-[#46d1f7] overflow-hidden"
                                    >
                                        <img
                                            src={!img ? upload : URL.createObjectURL(img)}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                        <input
                                            type="file"
                                            id={`image${idx + 1}`}
                                            hidden
                                            onChange={(e) => {
                                                const setter = [setImage1, setImage2, setImage3, setImage4][idx];
                                                setter(e.target.files[0]);
                                            }}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full max-w-[600px]">
                            <label className="text-[20px] md:text-[25px] font-semibold">Product Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Type here"
                                className="h-[45px] rounded-lg bg-slate-600 px-4 text-[18px] placeholder:text-[#ffffffc2] border-2 hover:border-[#46d1f7]"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full max-w-[600px]">
                            <label className="text-[20px] md:text-[25px] font-semibold">Product Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Type here"
                                className="h-[100px] rounded-lg bg-slate-600 px-4 py-2 text-[18px] placeholder:text-[#ffffffc2] border-2 hover:border-[#46d1f7]"
                            />
                        </div>

                        <div className="flex flex-wrap gap-10">
                            <div className="flex flex-col gap-2 w-full sm:w-[45%]">
                                <label className="text-[20px] md:text-[25px] font-semibold">Product Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="bg-slate-600 px-4 py-2 rounded-lg border-2 hover:border-[#46d1f7]"
                                >
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 w-full sm:w-[45%]">
                                <label className="text-[20px] md:text-[25px] font-semibold">Sub Category</label>
                                <select
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    className="bg-slate-600 px-4 py-2 rounded-lg border-2 hover:border-[#46d1f7]"
                                >
                                    <option value="TopWear">TopWear</option>
                                    <option value="BottomWear">BottomWear</option>
                                    <option value="WinterWear">WinterWear</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full max-w-[600px]">
                            <label className="text-[20px] md:text-[25px] font-semibold">Product Price (₹)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="2000"
                                className="h-[45px] rounded-lg bg-slate-600 px-4 text-[18px] placeholder:text-[#ffffffc2] border-2 hover:border-[#46d1f7]"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full max-w-[600px]">
                            <label className="text-[20px] md:text-[25px] font-semibold">Available Sizes</label>
                            <div className="flex flex-wrap gap-3">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        className={`px-4 py-2 rounded-full border-2 ${sizes.includes(size) ? 'bg-[#46d1f7] border-white' : 'bg-slate-600 border-slate-400'}`}
                                        onClick={() => handleSizeChange(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 max-w-[600px]">
                            <input
                                type="checkbox"
                                checked={bestseller}
                                onChange={(e) => setBestseller(e.target.checked)}
                            />
                            <label className="text-[20px] md:text-[25px] font-semibold">Mark as Bestseller</label>
                        </div>

                        <button
                            type="submit"
                            className="w-fit px-8 py-2 rounded-lg bg-[#46d1f7] text-black font-semibold hover:bg-[#31b7db]"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Add;