import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../contex/Contex";

const ProductTOBuy = ({
  handleClose,
  product,
  currency,
  setAccountBalance,
  accountBalance,
  onConfirm,
}) => {
  const [message, setMessage] = useState(""); // State for success or error message
  const [isClosing, setIsClosing] = useState(false); // State to track if the modal is closing
  const { navigate } = useContext(AppContext);
  const handleConfirm = () => {
    if (product.price > accountBalance) {
      // Set error message if the balance is insufficient
      const errorMessage = `Insufficient balance to purchase this product. Your balance is ${currency} ${accountBalance}, but the product costs ${currency} ${product.price}.`;
      setMessage(errorMessage);
    } else {
      // Deduct the product price from the account balance
      const newBalance = accountBalance - product.price;
      setAccountBalance(newBalance);

      // Call the onConfirm function to update the cart
      onConfirm(product);
      // addTOHistory()

      // Set success message
      const successMessage = `You have successfully purchased ${product.name}. Your remaining balance is ${currency} ${newBalance}.`;
      setMessage(successMessage);

      setTimeout(() => {
        navigate("/ProductQuantity");
      }, 1500);
      // Delay closing the modal to allow the success message to display
      setIsClosing(true); // Indicate that the modal is in the process of closing
      setTimeout(() => {
        setIsClosing(false); // Reset the closing state
        handleClose(); // Close the modal
      }, 1500); // Delay for 2 seconds
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-blue-900 flex flex-col text-white items-center py-8 px-5 rounded-xl shadow-lg">
        <div className="w-30">
          <img src={product.image} className="rounded-lg" alt={product.name} />
        </div>
        <div className="flex flex-col items-center mt-5">
          <p className="font-semibold text-xl mb-2">{product.name}</p>
          <p className="text-lg text-white">Settlement income every 24 hours</p>
          <p className="text-3xl mt-4 mb-6 font-bold">
            {currency} {product.price}
          </p>
          <div className="text-md text-white flex flex-col gap-3 items-center mb-10">
            <p>
              Daily income: {currency} {product.daily_income}
            </p>
            <p>
              Total income: {currency} {product.total_income}
            </p>
            <p>Validity: 60 days</p>
          </div>
          <p className="font-semibold text-sm text-center">
            Each product can be purchased multiple times, which will increase
            your income...
          </p>
        </div>

        {/* Display success or error message */}
        {message && (
          <div
            className={`p-3 rounded-md mt-4 text-center ${
              message.includes("Insufficient")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex gap-4 w-full justify-between mt-8">
          <button
            className="bg-gray-300 text-gray-500 py-2 px-12 rounded-md"
            onClick={handleClose}
            disabled={isClosing} // Disable the button while closing
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-yellow-500 text-black py-2 px-12 rounded-md"
            disabled={isClosing} // Disable the button while closing
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTOBuy;
