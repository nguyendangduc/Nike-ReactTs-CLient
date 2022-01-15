import React from "react";

export const Checkout = () => {
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-md-7 mx-auto">
                        <div className="border p-2 mb-3">
                            <h2 className="text-center">Checkout</h2>
                            <h5 className="text-end">Shipping cod</h5>

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

                            <div className="row">
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
                        </div>
                        <button className="btn btn-dark w-100 mt-2" type="submit">
                            Payment
                        </button>
                    </div>

                    <div className="col-lg-5">
                        <div className="border">
                            <div className="in-bag bg-dark p-3">
                                <h3 className="text-white m-0">
                                    IN YOUR BAG
                                </h3>
                            </div>
                            <div className="p-3">
                                <div>
                                    <div className="subtotal d-flex justify-content-between">
                                        <p>Subtotal</p>
                                        <p>$300.00</p>
                                    </div>
                                    <div className="shipping d-flex justify-content-between">
                                        <p>Shipping</p>
                                        <p>$20.00</p>
                                    </div>
                                    <div className="total d-flex justify-content-between">
                                        <h5>TOTAL</h5>
                                        <h5 className="text-danger">$320.00</h5>
                                    </div>
                                </div>
                                <hr />

                                <div>
                                    <h5 className="mb-4">ARRIVES BY MON, JAN24</h5>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <img src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoe-WrLlWX.png" alt="day" />
                                        </div>
                                        <div className="col-md-8">
                                            <h5>Nike Air Force 1</h5>
                                            <p className="m-0">Size: EU 38.5</p>
                                            <p className="m-0">Color: 2</p>
                                            <p className="m-0">Qty: 2</p>
                                            <b className="m-0">$100.00</b>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <img src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/adc7cecb-c02a-42c1-b2de-67ddc141295d/air-force-1-gore-tex-shoes-xkl3Ps.png" alt="day" />
                                        </div>
                                        <div className="col-md-8">
                                            <h5>Nike Air Force 1 GORE-TEX</h5>
                                            <p className="m-0">Size: EU 44</p>
                                            <p className="m-0">Color: 2</p>
                                            <p className="m-0">Qty: 2</p>
                                            <b className="m-0">$200.00</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}