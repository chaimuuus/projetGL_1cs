
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <div className="flex items-center space-x-4">
        <img
          src={Logo}
          alt="Logo"
          className="h-30 w-30"
        />
        <h1 className="text-4xl font-bold text-custom_green">404 Page Not Found</h1>
      </div>
      <p className="text-gray-600 mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="px-4 py-2 text-white bg-custom_green rounded-md shadow-md hover:bg-custom_yellow transition-all duration-200"
        >
          Go to Homepage
        </Link>
      </div>
      <div className="absolute top-4 left-4">
        <button className="p-2 bg-white shadow-md rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l-6-6m0 0l6-6m-6 6h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
