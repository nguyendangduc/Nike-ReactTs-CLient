import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";

export const Checkout = () => {
    return (
        <>
            <div className="d-flex flex-column my-5">
                <div className="">
                    <div className="row">
                        <div className="col-lg-7 mx-auto">
                            <h2 className="text-center">Checkout</h2>
                            <p className="text-end">Shipping cod</p>

                            <div className="form-group mb-3">
                                <label htmlFor="name">Name:</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="form-control my-2"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="address">Address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="form-control my-2"
                                />
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="Email">Email:</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="form-control my-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number:</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            className="form-control my-2"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-dark w-100 mt-2" type="submit">
                                Payment
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}