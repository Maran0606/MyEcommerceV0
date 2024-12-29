import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function ThemeForm() {
    // Form State
    const [formData, setFormData] = useState({
        sub_theme_name: '',
        status: 'available',
        sub_theme_description: '',
        added_by: 'maran@gmail.com',
        theme_id: '',
    });

    // Error State
    const [errors, setErrors] = useState({
        sub_theme_name: '',
        status: '',
        sub_theme_description: '',
        theme_id: '',
    });


    const [themeData, setthemeData] = useState([]);
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
                    'http://192.168.237.147:1000/admin/theme/get/all/admin_id/1000?page=1&limit=10',
                    { headers }
                );
                console.log('ResponseData', response.data)
                setthemeData(response.data || []);
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


    // 🔍 Validation Function
    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.sub_theme_name.trim()) {  
            newErrors.sub_theme_name = 'Theme Name is required';
            isValid = false;
        }

        if (!formData.theme_id.trim()) {
            newErrors.theme_id = 'Theme is required';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    // 📝 Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 🚀 Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior

        // Reset previous response message
        setResponseMessage('');

        if (!validate()) {
            return; // Exit if validation fails
        }

        setIsSubmitting(true);
        const headers = {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMCwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJtYXJhbkBnbWFpbC5jb20iLCJleHAiOjE3MzYwNjk0MTl9.zZevn4ErP4TemXU4SnmyV5z4T1wj4ZrI386zgMl5D9k"
        }
        try {
            console.log('Form Data:', formData);
            const response = await axios.post(
                'http://192.168.237.147:1000/admin/sub/theme/add/new/admin_id/1000',
                formData, { headers: headers }
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
            <div className="card-header  mx-2 my-2">
                <div className="card-title d-flex justify-content-start fs-3">Theme Information</div>
            </div>
            <div className="card-body  mx-3 mt-3">
                <div className="row">
                    {/* General Information Section */}
                    <div className="col-sm-12 col-md-6 col-lg-6 col-12  mt-3">
                        <div className="card-border">
                            <div className="card-border-title">General Information</div>
                            <div className="card-border-body">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Theme Name <span className="text-red">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Theme Name"
                                                name="sub_theme_name"
                                                value={formData.sub_theme_name}
                                                onChange={handleChange}
                                            />
                                            {errors.sub_theme_name && <p style={{ color: 'red' }}>{errors.sub_theme_name}</p>}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Theme Status<span className="text-red">*</span></label>
                                            <select
                                                className="form-control"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                            >

                                                <option value="available">Active</option>
                                                <option value="not available">InActive</option>

                                            </select>
                                            {errors.status && <p style={{ color: 'red' }}>{errors.status}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Select Theme<span className="text-red">*</span></label>
                                        <select
                                            className="form-control"
                                            name="theme_id"
                                            value={formData.theme_id}
                                            onChange={handleChange}
                                        >
                                            <option key="0" value="">Select Theme</option>
                                            {themeData.map((theme) => (
                                                <option key={theme._id} value={theme._id}>
                                                    {theme.theme_name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.theme_id && <p style={{ color: 'red' }}>{errors.theme_id}</p>}
                                    </div>

                                    <div className="col-sm-12 col-12">
                                        <div className="mb-0">
                                            <label className="form-label">Theme Description <span className="text-red">*</span></label>
                                            <textarea
                                                rows="4"
                                                className="form-control"
                                                placeholder="Enter Theme Description"
                                                name="sub_theme_description"
                                                value={formData.sub_theme_description}
                                                onChange={handleChange}
                                            />
                                            {errors.sub_theme_description && <p style={{ color: 'red' }}>{errors.sub_theme_descriptions}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-12 col-12 mt-3">
                        <div className="btn-Group">
                            <button type="button" className="btn btn-light me-2">Cancel</button>
                            <button type="submit" className="btn btn-success">Add Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ThemeForm;
