
const Checkout = () => {
    return (
<div className="th-checkout-wrapper section-padding fix">
        <div className="container">
            <div className="woocommerce-form-login-toggle">
                <div className="woocommerce-info">Returning customer? <a href="#" className="showlogin">Click here to login</a>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form action="#" className="woocommerce-form-login">
                        <div className="form-group">
                            <label>Username or email *</label>
                            <input type="text" className="form-control" placeholder="Username or email" />
                        </div>
                        <div className="form-group">
                            <label>Password *</label>
                            <input type="text" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <div className="custom-checkbox">
                                <input type="checkbox" id="remembermylogin" />
                                <label htmlFor="remembermylogin">Remember Me</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="th-btn">Login</button>
                            <p className="fs-xs mt-2 mb-0"><a className="text-reset" href="#">Lost your password?</a></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="woocommerce-form-coupon-toggle">
                <div className="woocommerce-info">Have a coupon? <a href="#" className="showcoupon">Click here to enter your
                        code</a> </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form action="#" className="woocommerce-form-coupon">
                        <div className="form-group">
                            <label>Coupon code</label>
                            <input type="text" className="form-control" placeholder="Write your coupon code" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="th-btn">Apply coupon</button>
                        </div>
                    </form>
                </div>
            </div>
            <form action="#" className="woocommerce-checkout mt-5">
                <div className="row ">
                    <div className="col-lg-6">
                        <h2 className="h4">Billing Details</h2>
                        <div className="row">
                            <div className="col-12 form-group">
                                <select className="single-select w-100 mb-3">
                                    <option>United Kingdom (UK)</option>
                                    <option>United State (US)</option>
                                    <option>Equatorial Guinea (GQ)</option>
                                    <option>Australia (AU)</option>
                                    <option>Germany (DE)</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <input type="text" className="form-control" placeholder="First Name" />
                            </div>
                            <div className="col-md-6 form-group">
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                            <div className="col-12 form-group">
                                <input type="text" className="form-control" placeholder="Your Company Name" />
                            </div>
                            <div className="col-12 form-group">
                                <input type="text" className="form-control" placeholder="Street Address" />
                                <input type="text" className="form-control"
                                    placeholder="Apartment, suite, unit etc. (optional)" />
                            </div>
                            <div className="col-12 form-group">
                                <input type="text" className="form-control" placeholder="Town / City" />
                            </div>
                            <div className="col-md-6 form-group">
                                <input type="text" className="form-control" placeholder="Country" />
                            </div>
                            <div className="col-md-6 form-group">
                                <input type="text" className="form-control" placeholder="Postcode / Zip" />
                            </div>
                            <div className="col-12 form-group">
                                <input type="text" className="form-control" placeholder="Email Address" />
                                <input type="text" className="form-control" placeholder="Phone number" />
                            </div>
                            <div className="col-12 form-group">
                                <input type="checkbox" id="accountNewCreate" />
                                <label htmlFor="accountNewCreate">Create An Account?</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <p id="ship-to-different-address">
                            <input id="ship-to-different-address-checkbox" type="checkbox"
                                name="ship_to_different_address" value="1"  />
                            <label htmlFor="ship-to-different-address-checkbox">
                                Ship to a different address?
                                <span className="checkmark"></span>
                            </label>
                        </p>
                        <div className="shipping_address mt-1">
                            <div className="row">
                                <div className="col-12 form-group">
                                    <select className="single-select w-100 mb-3">
                                        <option>United Kingdom (UK)</option>
                                        <option>United State (US)</option>
                                        <option>Equatorial Guinea (GQ)</option>
                                        <option>Australia (AU)</option>
                                        <option>Germany (DE)</option>
                                    </select>
                                </div>
                                <div className="col-md-6 form-group">
                                    <input type="text" className="form-control" placeholder="First Name"/>
                                </div>
                                <div className="col-md-6 form-group">
                                    <input type="text" className="form-control" placeholder="Last Name"/>
                                </div>
                                <div className="col-12 form-group">
                                    <input type="text" className="form-control" placeholder="Your Company Name"/>
                                </div>
                                <div className="col-12 form-group">
                                    <input type="text" className="form-control" placeholder="Street Address"/>
                                    <input type="text" className="form-control"
                                        placeholder="Apartment, suite, unit etc. (optional)"/>
                                </div>
                                <div className="col-12 form-group">
                                    <input type="text" className="form-control" placeholder="Town / City"/>
                                </div>
                                <div className="col-md-6 form-group">
                                    <input type="text" className="form-control" placeholder="Country"/>
                                </div>
                                <div className="col-md-6 form-group">
                                    <input type="text" className="form-control" placeholder="Postcode / Zip"/>
                                </div>
                                <div className="col-12 form-group">
                                    <input type="text" className="form-control" placeholder="Email Address"/>
                                    <input type="text" className="form-control" placeholder="Phone number"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 form-group">
                            <textarea cols="20" rows="5" className="form-control"
                                placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                        </div>
                    </div>
                </div>
            </form>
            <h4 className="mt-4 pt-lg-2">Your Order</h4>
            <form action="#" className="woocommerce-cart-form">
                <table className="cart_table mb-20">
                    <thead>
                        <tr>
                            <th className="cart-col-image">Image</th>
                            <th className="cart-colname">Product Name</th>
                            <th className="cart-col-price">Price</th>
                            <th className="cart-col-quantity">Quantity</th>
                            <th className="cart-col-total">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="cart_item">
                            <td data-title="Product">
                                <a className="cartimage" href="shop-details.html"><img width="91" height="91"
                                        src="/assets/img/dishes/dishes4_1.png" alt="Image"/></a>
                            </td>
                            <td data-title="Name">
                                <a className="cartname" href="shop-details.html">Brick Oven Pepperoni</a>
                            </td>
                            <td data-title="Price">
                                <span className="amount"><bdi><span>$</span>281</bdi></span>
                            </td>
                            <td data-title="Quantity">
                                <strong className="product-quantity">01</strong>
                            </td>
                            <td data-title="Total">
                                <span className="amount"><bdi><span>$</span>281</bdi></span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot className="checkout-ordertable">
                        <tr className="cart-subtotal">
                            <th>Subtotal</th>
                            <td data-title="Subtotal" colSpan="4"><span
                                    className="woocommerce-Price-amount amount"><bdi><span
                                            className="woocommerce-Price-currencySymbol">$</span>281.05</bdi></span></td>
                        </tr>
                        <tr className="woocommerce-shipping-totals shipping">
                            <th>Shipping</th>
                            <td data-title="Shipping" colSpan="4"> Enter your address to view shipping options.
                            </td>
                        </tr>
                        <tr className="order-total">
                            <th>Total</th>
                            <td data-title="Total" colSpan="4"><strong><span
                                        className="woocommerce-Price-amount amount"><bdi><span
                                                className="woocommerce-Price-currencySymbol">$</span>281.05</bdi></span></strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </form>
            <div className="mt-lg-3 mb-30">
                <div className="woocommerce-checkout-payment">
                    <ul className="wc_payment_methods payment_methods methods">
                        <li className="wc_payment_method payment_method_bacs">
                            <input id="payment_method_bacs" type="radio" className="input-radio" name="payment_method"
                                value="bacs" checked="checked"/>
                            <label htmlFor="payment_method_bacs">Direct bank transfer</label>
                            <div className="payment_box payment_method_bacs">
                                <p>Make your payment directly into our bank account. Please use your Order ID as the
                                    payment reference. Your order will not be shipped until the funds have cleared in
                                    our account.
                                </p>
                            </div>
                        </li>
                        <li className="wc_payment_method payment_method_cheque">
                            <input id="payment_method_cheque" type="radio" className="input-radio" name="payment_method"
                                value="cheque"/>
                            <label htmlFor="payment_method_cheque">Cheque Payment</label>
                            <div className="payment_box payment_method_cheque">
                                <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                                    Store Postcode.</p>
                            </div>
                        </li>
                        <li className="wc_payment_method payment_method_cod">
                            <input id="payment_method_cod" type="radio" className="input-radio" name="payment_method"/>
                            <label htmlFor="payment_method_cod">Credit Cart <img src="/assets/img/shop/credit_card.jpg"
                                    alt="image"/></label>
                            <div className="payment_box payment_method_cod">
                                <p>Pay with cash upon delivery.</p>
                            </div>
                        </li>
                        <li className="wc_payment_method payment_method_paypal">
                            <input id="payment_method_paypal" type="radio" className="input-radio" name="payment_method"
                                value="paypal"/>
                            <label htmlFor="payment_method_paypal">Paypal<img src="/assets/img/shop/paypal.jpg"
                                    alt="PayPal acceptance mark"/></label>
                            <div className="payment_box payment_method_paypal">
                                <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.
                                </p>
                            </div>
                        </li>
                    </ul>
                    <div className="form-row place-order">
                        <button type="submit" className="theme-btn">Place order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Checkout;