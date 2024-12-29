import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "/src/CssFiles/Product.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Product() {
    const [formData, setFormData] = useState({
        product_name: '',
        catagory_id: '',
        price: '',
        discount: '',
        product_description: '',
        quantity_left: '',
        theme_id: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');


    const [categoryData, setCategoryData] = useState([]);
    const [ThemeData, setThemeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const headers = {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMCwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJtYXJhbkBnbWFpbC5jb20iLCJleHAiOjE3MzYwNjk0MTl9.zZevn4ErP4TemXU4SnmyV5z4T1wj4ZrI386zgMl5D9k",
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://192.168.237.147:1000/admin/category/get/all/admin_id/1000/status/available?page=1&limit=10',
                { headers }
            );
            console.log('Result:', response.data);

            const Themeresponse = await axios.get(
                'http://192.168.237.147:1000/admin/theme/get/all/admin_id/1000?page=1&limit=10',
                { headers }
            );
            console.log('Result:', Themeresponse.data);

            setCategoryData(response.data); // Update state with response data
            setThemeData(Themeresponse.data); // Update state with response data
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError(err.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    


    useEffect(() => {
        console.log("useEffect is running");
        fetchData();
    }, []); // Empty dependency array to ensure it runs only once

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const intFields = ['catagory_id', 'theme_id', 'quantity_left', 'price', 'discount'];

    // 📝 **Validation Logic**
    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.product_name.trim()) {
            newErrors.product_name = 'Product Name is required';
            isValid = false;
        }

        if (!formData.catagory_id || parseInt(formData.catagory_id, 10) <= 0) {
            newErrors.catagory_id = 'Select a valid Product Category';
            isValid = false;
        }

        if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
            newErrors.price = 'Enter a valid Product Price';
            isValid = false;
        }

        if (!formData.quantity_left || isNaN(parseInt(formData.quantity_left, 10)) || parseInt(formData.quantity_left, 10) <= 0) {
            newErrors.quantity_left = 'Enter a valid Product Quantity';
            isValid = false;
        }

        if (!formData.theme_id || parseInt(formData.theme_id, 10) <= 0) {
            newErrors.theme_id = 'Select a valid Product Theme';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // 📝 **Handle Input Change**
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: intFields.includes(name)
                ? (value === '' ? '' : parseInt(value, 10) || 0)
                : value
        });
    };

    // 📝 **Handle Form Submission**
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return; // Stop submission if validation fails
        }

        setIsSubmitting(true);

        try {
            console.log('Form Data:', formData);
            const response = await axios.post('http://192.168.237.147:1000/v1/product/upload/metadata', formData);
            setResponseMessage('Form submitted successfully!');
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
            setResponseMessage('Failed to submit the form.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card-header  mx-2 my-2">
                <div className="card-title d-flex justify-content-start fs-3">Product Information</div>
            </div>
            <div className="card-body  mx-3 mt-3">
                <div className="row">
                    {/* General Information Section */}
                    <div className="col-sm-12 col-md-6 col-lg-6 col-12  mt-3">
                        <div className="card-border">
                            <div className="card-border-title   ">General Information</div>
                            <div className="card-border-body mt-3">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Product Name <span className="text-red">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Product Name"
                                                name="product_name"
                                                value={formData.product_name}
                                                onChange={handleChange}
                                            />
                                            {errors.product_name && <p style={{ color: 'red' }}>{errors.product_name}</p>}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Product Category <span className="text-red">*</span></label>
                                            {/* <select
                                                    className="form-control"
                                                    name="catagory_id"
                                                    value={formData.catagory_id}
                                                    onChange={handleChange}
                                                >
                                                    <option value="0">Select Product Category</option>
                                                    <option value="100">Mobiles</option>
                                                    <option value="1000">Books</option>
                                                    <option value="3">Games</option>
                                                </select> */}
                                            <select className="form-control"
                                                name="catagory_id"
                                                value={formData.catagory_id}
                                                onChange={handleChange}>
                                                     <option key="0" value="0">
                                                        Select Category
                                                    </option>
                                                {categoryData.map((category) => (
                                                    <option key={category._id} value={category._id}>
                                                        {category.category_name}
                                                    </option>
                                                ))}
                                            </select>
                                           
                                            {errors.catagory_id && <p style={{ color: 'red' }}>{errors.catagory_id}</p>}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Product Price <span className="text-red">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Product Price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                            />
                                            {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Product Discount</label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Set Product Discount"
                                                    name="discount"
                                                    value={formData.discount}
                                                    onChange={handleChange}
                                                />
                                                <span className="input-group-text">%</span>
                                            </div>
                                            {errors.discount && <p style={{ color: 'red' }}>{errors.discount}</p>}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Product Theme <span className="text-red">*</span></label>
                                            <select
                                                className="form-control"
                                                name="theme_id"
                                                value={formData.theme_id}
                                                onChange={handleChange}
                                            >
                                                <option key="0" value="0">
                                                        Select Theme
                                                    </option>
                                                {ThemeData.map((theme) => (
                                                    <option key={theme._id} value={theme._id}>
                                                        {theme.theme_name}
                                                    </option>
                                                ))}
                                                {/* <option value="0">Select Product Theme</option>
                                                <option value="1">Aniame</option>
                                                <option value="2">God of war</option>
                                                <option value="3">Games</option> */}
                                            </select>
                                            {errors.theme_id && <p style={{ color: 'red' }}>{errors.theme_id}</p>}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 vcol-md-6 col-lg-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Product Quantity <span className="text-red">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Quantity"
                                                name="quantity_left"
                                                value={formData.quantity_left}
                                                onChange={handleChange}
                                            />
                                            {errors.quantity_left && <p style={{ color: 'red' }}>{errors.quantity_left}</p>}
                                        </div>

                                    </div>
                                    <div className="col-sm-12 col-12">
                                        <div className="mb-0">
                                            <label className="form-label">Product Description <span className="text-red">*</span></label>
                                            <textarea
                                                rows="4"
                                                className="form-control"
                                                placeholder="Enter Product Description"
                                                name="product_description"
                                                value={formData.product_description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Meta Data Section */}
                    <div className="col-sm-12 col-md-6 col-lg-6 col-12 mt-3">
                        <div className="card-border">
                            <div className="card-border-title">Meta Data</div>
                            <div className="card-border-body mt-3">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Meta Title <span className="text-red">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Meta Title"
                                                name="metaTitle"
                                                value={formData.metaTitle}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Meta Name <span className="text-red">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Meta Name"
                                                name="metaName"
                                                value={formData.metaName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12col-lg- col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Meta Tags <span className="text-red">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Meta Tags"
                                                name="metaTags"
                                                value={formData.metaTags}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-12 col-12">
                                        <div className="mb-0">
                                            <label className="form-label">Meta Description <span className="text-red">*</span></label>
                                            <textarea
                                                rows="4"
                                                className="form-control"
                                                placeholder="Enter Meta Description"
                                                name="metaDescription"
                                                value={formData.metaDescription}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Product Add Section */}
                    <div className="col-sm-12 col-12 mt-3">
                        <div className="card-border border-primary">
                            <div className="card-border-title px-3 py-3">Product Images</div>
                            <div className="card-border-body px-3">
                                <div id="dropzone" className="dropzone-dark">
                                    <input type="file" className="dropzone needsclick dz-clickable" placeholder="Upload the Product Images" id="ProductImg" name="ProductImages" multiple></input>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="col-12 mt-3 d-flex justify-content-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-light me-2">Cancel</button>
                            <button type="submit" className="btn btn-success">Add Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Product;
