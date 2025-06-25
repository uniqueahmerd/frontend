import React from "react";
import Tittle from "../component/Tittle";

const Help = () => {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <Tittle Tittle={"Help"} />
      <div className="mt-6 text-center px-2">
        <p className="text-lg text-gray-700">
          Need assistance? We are here to help! Check out the frequently asked
          questions below or contact our support team for further assistance.
        </p>
        <div className="mt-6 text-left">
          <h2 className="text-xl font-semibold text-gray-800">FAQs</h2>
          <ul className="mt-4 list-disc list-inside text-gray-700">
            <li>How do I create an account?</li>
            <li>How can I reset my password?</li>
            <li>Where can I find my purchase history?</li>
            <li>How do I contact customer support?</li>
          </ul>
        </div>
        <div className="mt-6 text-gray-700">
          <p>
            Email:{" "}
            <a href="mailto:support@example.com" className="text-blue-500">
              support@example.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-500">
              +123 456 7890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
