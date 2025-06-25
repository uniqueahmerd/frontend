import Tittle from "../component/Tittle";
import { assets } from "../assets/Index";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen pb-22">
      <Tittle Tittle={"About Us"} />
      <div className="mt-6 text-center px-2">
        <img
          src={assets.about_us_image} // Replace with your image URL
          alt="About Us"
          className="mx-auto rounded-lg shadow-md mb-6"
          width={200}
        />
        <p className="text-lg text-gray-700">
          Welcome to our platform! We are dedicated to providing the best
          services to our users. Our mission is to deliver high-quality products
          and ensure customer satisfaction.
        </p>
        <p className="mt-4 text-gray-600">
          If you have any questions or need assistance, feel free to contact our
          support team. Thank you for choosing us!
        </p>
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

export default AboutUs;
