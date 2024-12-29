import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function ThemeForm() {
   // Form State
   const [formData, setFormData] = useState({
    theme_name: '',
    status: 'available',
    theme_description: '',
    added_by:'maran@gmail.com'
});

// Error State
const [errors, setErrors] = useState({
    theme_name: '',
    status: '',
    theme_description: ''
});

// Submission State
const [isSubmitting, setIsSubmitting] = useState(false);

// Response Message State
const [responseMessage, setResponseMessage] = useState('');

// 🔍 Validation Function
const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.theme_name.trim()) {
        newErrors.theme_name = 'Theme Name is required';
        isValid = false;
    }

    // if (!formData.status.trim()) {
    //     newErrors.status = 'Theme Status is required';
    //     isValid = false;
    // }

    // if (!formData.theme_description.trim()) {
    //     newErrors.theme_description = 'Theme Description is required';
    //     isValid = false;
    // }

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
    const headers = {"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMCwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJtYXJhbkBnbWFpbC5jb20iLCJleHAiOjE3MzYwNjk0MTl9.zZevn4ErP4TemXU4SnmyV5z4T1wj4ZrI386zgMl5D9k"
    }
    try {
        console.log('Form Data:', formData);
        const response = await axios.post(
            'http://192.168.237.147:1000/admin/theme/add/new/admin_id/1000',
            formData,{ headers: headers }
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
                                                name="theme_name"
                                                value={formData.theme_name}
                                                onChange={handleChange}
                                            />
                                              {errors.theme_name && <p style={{ color: 'red' }}>{errors.theme_name}</p>}
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

                                       
                                    <div className="col-sm-12 col-12">
                                        <div className="mb-0">
                                            <label className="form-label">Theme Description <span className="text-red">*</span></label>
                                            <textarea
                                                rows="4"
                                                className="form-control"
                                                placeholder="Enter Theme Description"
                                                name="theme_description"
                                                value={formData.theme_description}
                                                onChange={handleChange}
                                            />
                                              {errors.theme_description && <p style={{ color: 'red' }}>{errors.theme_descriptions}</p>}
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
