    import React, { useState } from 'react';
    import  "../CssFiles/Product.css"
    import "bootstrap/dist/css/bootstrap.min.css";
    import "bootstrap/dist/js/bootstrap.bundle.min";

    function Product() {
        const [formData, setFormData] = useState({
            productName: '',
            productCategory: '',
            productPrice: '',
            productDiscount: '',
            productDescription: '',
            metaTitle: '',
            metaName: '',
            metaTags: '',
            metaDescription: ''
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Form submitted:', formData);
        };

        return (
            <form onSubmit={handleSubmit}>
                <div className="card-header  mx-2 my-2">
                    <div className="card-title d-flex justify-content-start">Product Information</div>
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
                                                <label className="form-label">Product Name <span className="text-red">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Product Name"
                                                    name="productName"
                                                    value={formData.productName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Product Category <span className="text-red">*</span></label>
                                                <select
                                                    className="form-control"
                                                    name="productCategory"
                                                    value={formData.productCategory}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Product Category</option>
                                                    <option value="Mobiles">Mobiles</option>
                                                    <option value="Books">Books</option>
                                                    <option value="Games">Games</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-6 col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Product Price <span className="text-red">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Product Price"
                                                    name="productPrice"
                                                    value={formData.productPrice}
                                                    onChange={handleChange}
                                                />
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
                                                        name="productDiscount"
                                                        value={formData.productDiscount}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="input-group-text">%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-12">
                                            <div className="mb-0">
                                                <label className="form-label">Product Description <span className="text-red">*</span></label>
                                                <textarea
                                                    rows="4"
                                                    className="form-control"
                                                    placeholder="Enter Product Description"
                                                    name="productDescription"
                                                    value={formData.productDescription}
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
                                <div className="card-border-body">
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
                        <div class="col-sm-12 col-12 mt-3">
                            <div class="card-border border-primary">
                            <div class="card-border-title px-3 py-3">Product Images</div>
                            <div class="card-border-body px-3">
                                <div id="dropzone" class="dropzone-dark">
                                    <input type="file" class="dropzone needsclick dz-clickable" placeholder="Upload the Product Images" id="ProductImg" name="ProductImages" multiple></input>
                                </div>

                            </div>
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="col-sm-12 col-md-6 col-lg-6 col-12 mt-3">
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

    export default Product;
