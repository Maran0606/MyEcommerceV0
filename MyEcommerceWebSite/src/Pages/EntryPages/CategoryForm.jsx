import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function CategoryForm() {
   // Form State
   const [formData, setFormData] = useState({
    category_name: '',
    status: 'available',
    category_description: '',
    added_by:'maran@gmail.com',
    gender :''
});

// Error State
const [errors, setErrors] = useState({
    category_name: '',
    status: '',
    category_description: '',
    gender :''
});



// Submission State
const [isSubmitting, setIsSubmitting] = useState(false);

// Response Message State
const [responseMessage, setResponseMessage] = useState('');

// 🔍 Validation Function
const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.category_name.trim()) {
        newErrors.category_name = 'Category Name is required';
        isValid = false;
    }

    if (!formData.gender.trim() || !formData.gender.trim() == 'n') {
        newErrors.gender = 'Category Gender is required';
        isValid = false;
    }

    // if (!formData.category_description.trim()) {
    //     newErrors.category_description = 'Category Description is required';
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
            'http://192.168.237.147:1000/admin/category/new/add/admin_id/1000',
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
                <div className="card-title d-flex justify-content-start fs-3">Category Information</div>
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
                                            <label className="form-label">Category Name <span className="text-red">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Category Name"
                                                name="category_name"
                                                value={formData.category_name}
                                                onChange={handleChange}
                                            />
                                              {errors.category_name && <p style={{ color: 'red' }}>{errors.category_name}</p>}
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Category Status<span className="text-red">*</span></label>
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

                                        <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Category Gender<span className="text-red">*</span></label>
                                                <select
                                                    className="form-control"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="n">None</option>
                                                    <option value="m">Male</option>
                                                    <option value="f">Female</option>
                                                    <option value="b">Boy</option>
                                                    <option value="g">Girl</option>
                                                    <option value="u">unisexual</option>
                                                
                                                   
                                                </select>
                                                {errors.gender && <p style={{ color: 'red' }}>{errors.gender}</p>}
                                            </div>
                                        </div>
                                    <div className="col-sm-12 col-12">
                                        <div className="mb-0">
                                            <label className="form-label">Category Description <span className="text-red">*</span></label>
                                            <textarea
                                                rows="4"
                                                className="form-control"
                                                placeholder="Enter Category Description"
                                                name="category_description"
                                                value={formData.category_description}
                                                onChange={handleChange}
                                            />
                                              {errors.category_description && <p style={{ color: 'red' }}>{errors.category_descriptions}</p>}
                                        </div>
                                    </div>

                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-sm-12 col-md-12 col-lg-12 col-12 mt-3 d-flex justify-content-center">
                        <div className="btn-Group">
                            <button type="button" className="btn btn-light me-2">Cancel</button>
                            <button type="submit" className="btn btn-success">Add Category</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CategoryForm;
