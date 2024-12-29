import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function CategoryForm() {
    const [formData, setFormData] = useState({
        sub_category_name: '',
        status: 'available',
        sub_category_description: '',
        added_by: 'maran@gmail.com',
        category_id: '',
    });

    const [errors, setErrors] = useState({
        sub_category_name: '',
        status: '',
        sub_category_description: '',
        category_id: '',
    });

    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const headers = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMCwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJtYXJhbkBnbWFpbC5jb20iLCJleHAiOjE3MzYwNjk0MTl9.zZevn4ErP4TemXU4SnmyV5z4T1wj4ZrI386zgMl5D9k",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://192.168.237.147:1000/admin/category/get/all/admin_id/1000/status/available?page=1&limit=10',
                    { headers }
                );
                console.log('ResponseData',response.data)
                setCategoryData(response.data || []);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Validation Logic
    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.sub_category_name.trim()) {
            newErrors.sub_category_name = 'Category Name is required';
            isValid = false;
        }

        if (!formData.category_id.trim()) {
            newErrors.category_id = 'Category Id is required';
            isValid = false;
        }

        // if (!formData.sub_category_description.trim()) {
        //     newErrors.sub_category_description = 'Category Description is required';
        //     isValid = false;
        // }

        setErrors(newErrors);
        return isValid;
    };

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        setResponseMessage('');
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post(
                'http://192.168.237.147:1000/admin/sub/category/new/add/admin_id/1000',
                formData,
                { headers }
            );
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
            <div className="card-header mx-2 my-2">
                <div className="card-title d-flex justify-content-start fs-3">Category Information</div>
            </div>
            <div className="card-body mx-3 mt-3">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                        <div className="card-border">
                            <div className="card-border-title">General Information</div>
                            <div className="card-border-body">
                                <div className="mb-3">
                                    <label className="form-label">Sub Category Name <span className="text-red">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Category Name"
                                        name="sub_category_name"
                                        value={formData.sub_category_name}
                                        onChange={handleChange}
                                    />
                                    {errors.sub_category_name && <p style={{ color: 'red' }}>{errors.sub_category_name}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Sub Category Status<span className="text-red">*</span></label>
                                    <select
                                        className="form-control"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="available">Active</option>
                                        <option value="not available">Inactive</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Select Category<span className="text-red">*</span></label>
                                    <select
                                        className="form-control"
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleChange}
                                    >
                                        <option key="0" value="">Select Category</option>
                                        {categoryData.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p style={{ color: 'red' }}>{errors.category_id}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Sub Category Description<span className="text-red">*</span></label>
                                    <textarea
                                        rows="4"
                                        className="form-control"
                                        name="sub_category_description"
                                        value={formData.sub_category_description}
                                        onChange={handleChange}
                                          placeholder="Enter Sub Category Description"
                                    />
                                    {errors.sub_category_description && <p style={{ color: 'red' }}>{errors.sub_category_description}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 d-flex justify-content-center">
                        <button type="button" className="btn btn-light me-2">Cancel</button>
                        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Add Category'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CategoryForm;
