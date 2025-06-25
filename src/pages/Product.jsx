import React, { useState, useContext } from "react";
import { AppContext } from "../contex/Contex"; // Import your context
import { assets } from "../assets/Index";
import ProductItem from "../component/ProductItem";
import ProductTOBuy from "../component/ProductTOBuy";
import { NavLink } from "react-router-dom";

const Product = () => {
  const [showProductToBuy, setShowProductToBuy] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

  // Access products and other state from the context
  const {
    setAccountBalance,
    accountBalance,
    products,

    purchasedProducts,

    currency,
    addToHistory,
  } = useContext(AppContext);

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Pass the clicked product details
    setShowProductToBuy(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const handleClose = () => {
    setShowProductToBuy(false);
    setSelectedProduct(null); // Clear the selected product
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  const handleConfirmPurchase = (product) => {
    addToHistory(product); // Add or update the product in the cart
    setShowProductToBuy(false); // Close the modal
    setSelectedProduct(null); // Clear the selected product
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  return (
    <div className="relative">
      {/* Wrapper for the entire page */}
      <div className={showProductToBuy ? "blur-sm pointer-events-none" : ""}>
        <div className="bg-gray-100 flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <NavLink
                to="/ProductQuantity"
                className="bg-blue-900 text-white rounded-r-full py-2 pl-5 pr-8 text-center"
              >
                <p>Total purchased products</p>
                <p>{purchasedProducts ? purchasedProducts.length : 0}</p>
              </NavLink>
            </div>
            <div>
              <img
                src={assets.product_header_img}
                alt="Product Header"
                className="w-50"
              />
            </div>
          </div>
          <div>
            {products.length > 0 ? (
              products.map((item, index) => (
                <ProductItem
                  key={index}
                  currency={currency}
                  vip={item.name}
                  img={item.image}
                  price={item.price}
                  daily_income={item.daily_income}
                  total_income={item.total_income}
                  onClick={() => handleProductClick(item)} // Pass product details
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No products available for purchase.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showProductToBuy && selectedProduct && (
        <ProductTOBuy
          handleClose={handleClose}
          product={selectedProduct} // Ensure this is the correct product object
          setAccountBalance={setAccountBalance}
          accountBalance={accountBalance}
          currency={currency}
          onConfirm={() => handleConfirmPurchase(selectedProduct)} // Handle purchase confirmation
        />
      )}
    </div>
  );
};

export default Product;
