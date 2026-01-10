
const Wishlist = () => {
    return (
        <div className="section-padding">
        <div className="container">
            <div className="tinv-wishlist woocommerce tinv-wishlist-clear">
                <div className="tinv-header">
                    <h2 className="mb-30">Wishlist</h2>
                </div>
                <form action="#" method="post" autoComplete="off">
                    <table className="tinvwl-table-manage-list">
                        <thead>
                            <tr>
                                <th className="product-cb">
                                    <input type="checkbox" className="global-cb" title="Select all for bulk action" />
                                </th>
                                <th className="product-remove"></th>
                                <th className="product-thumbnail">&nbsp;</th>
                                <th className="product-name">
                                    <span className="tinvwl-full">Product Name</span><span
                                        className="tinvwl-mobile">Product</span>
                                </th>
                                <th className="product-price">Unit Price</th>
                                <th className="product-date">Date Added</th>
                                <th className="product-stock">Stock Status</th>
                                <th className="product-action">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="wishlist_item">
                                <td className="product-cb">
                                    <input type="checkbox" name="wishlist_pr[]" value="58"
                                        title="Select for bulk action" />
                                </td>
                                <td className="product-remove">
                                    <button type="submit" name="tinvwl-remove" value="58" title="Remove"><i className="bi bi-x"></i>
                                    </button>
                                </td>
                                <td className="product-thumbnail">
                                    <a href="#"><img src="/assets/img/dishes/dishes5_1.png"
                                            className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                            alt="image" /></a>
                                </td>
                                <td className="product-name">
                                    <a href="#">Egg and Cucumber</a>
                                </td>
                                <td className="product-price">
                                    <span className="woocommerce-Price-amount amount"><bdi><span
                                                className="woocommerce-Price-currencySymbol">$</span>45.00</bdi></span>
                                </td>
                                <td className="product-date">
                                    <time className="entry-date" dateTime="2021-11-21 03:54:24">November 21, 2023</time>
                                </td>
                                <td className="product-stock">
                                    <p className="stock in-stock">
                                        <span><i className="fas fa-check text-success"></i></span><span
                                            className="tinvwl-txt text-success">In stock</span>
                                    </p>
                                </td>
                                <td className="product-action">
                                    <button className="button as-btn style4" name="tinvwl-add-to-cart" value="58"
                                        title="Add to Cart">
                                        <i className="bi bi-basket3-fill"></i><span className="tinvwl-txt">Add to Cart</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="wishlist_item">
                                <td className="product-cb">
                                    <input type="checkbox" name="wishlist_pr[]" value="60"
                                        title="Select for bulk action" />
                                </td>
                                <td className="product-remove">
                                    <button type="submit" name="tinvwl-remove" value="60" title="Remove"><i className="bi bi-x"></i>
                                    </button>
                                </td>
                                <td className="product-thumbnail">
                                    <a href="#"><img src="/assets/img/dishes/dishes5_2.png"
                                            className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                            alt="image" /></a>
                                </td>
                                <td className="product-name">
                                    <a href="#">Brick Oven Pepperoni</a>
                                </td>
                                <td className="product-price">
                                    <ins><span className="woocommerce-Price-amount amount"><bdi><span
                                                    className="woocommerce-Price-currencySymbol">$</span>18.00</bdi></span></ins>
                                    <del><span className="woocommerce-Price-amount amount"><bdi><span
                                                    className="woocommerce-Price-currencySymbol">$</span>20.00</bdi></span></del>
                                </td>
                                <td className="product-date">
                                    <time className="entry-date" dateTime="2021-11-21 03:54:24">November 21, 2021</time>
                                </td>
                                <td className="product-stock">
                                    <p className="stock in-stock"><span><i
                                                className="fas fa-check text-success"></i></span><span
                                            className="tinvwl-txt text-success">In stock</span></p>
                                </td>
                                <td className="product-action">
                                    <button className="button as-btn style4" name="tinvwl-add-to-cart" value="60"
                                        title="Add to Cart">
                                        <i className="bi bi-basket3-fill"></i><span className="tinvwl-txt">Add to Cart</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="wishlist_item">
                                <td className="product-cb">
                                    <input type="checkbox" name="wishlist_pr[]" value="60"
                                        title="Select for bulk action" />
                                </td>
                                <td className="product-remove">
                                    <button type="submit" name="tinvwl-remove" value="60" title="Remove"><i className="bi bi-x"></i>
                                    </button>
                                </td>
                                <td className="product-thumbnail">
                                    <a href="#"><img src="/assets/img/dishes/dishes5_3.png"
                                            className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                            alt="image" /></a>
                                </td>
                                <td className="product-name">
                                    <a href="#">Double Patty Veg</a>
                                </td>
                                <td className="product-price">
                                    <ins><span className="woocommerce-Price-amount amount"><bdi><span
                                                    className="woocommerce-Price-currencySymbol">$</span>18.00</bdi></span></ins>
                                    <del><span className="woocommerce-Price-amount amount"><bdi><span
                                                    className="woocommerce-Price-currencySymbol">$</span>20.00</bdi></span></del>
                                </td>
                                <td className="product-date">
                                    <time className="entry-date" dateTime="2021-11-21 03:54:24">November 21, 2021</time>
                                </td>
                                <td className="product-stock">
                                    <p className="stock in-stock"><span><i
                                                className="fa-regular fa-xmark text-theme-color"></i></span><span
                                            className="tinvwl-txt text-theme-color">Out of Stock</span></p>
                                </td>
                                <td className="product-action">
                                    <button className="button as-btn style4" name="tinvwl-add-to-cart" value="60"
                                        title="Add to Cart">
                                        <i className="bi bi-basket3-fill"></i><span className="tinvwl-txt">Add to Cart</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div className="social-buttons">
                    <span>Share on</span>
                    <ul>
                        <li><a href="https://www.facebook.com/sharer/sharer.php?u=permalink"
                                className="social social-facebook" title="Facebook"><i className="bi bi-facebook"></i></a></li>
                        <li><a href="https://twitter.com/share?url=permalink" className="social social-twitter "
                                title="Twitter"><i className="bi bi-twitter-x"></i></a></li>
                        <li><a href="http://pinterest.com/pin/create/button/?url=permalink"
                                className="social social-pinterest " title="Pinterest"><i className="bi bi-linkedin"></i></a></li>
                        <li><a href="https://api.whatsapp.com/send?text=permalink" className="social social-whatsapp "
                                title="WhatsApp"><i className="bi bi-youtube"></i></a></li>
                        <li><a href="http://vecurosoft.com/products/wordpress/foodelio/wishlist/974b61/"
                                className="social social-clipboard " title="Clipboard"><i className="bi bi-whatsapp"></i></a>
                        </li>
                        <li><a href="mailto:?body=permalink" className="social social-email " title="Email"><i className="bi bi-envelope"></i></a></li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
    );
};

export default Wishlist;