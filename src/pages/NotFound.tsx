// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error(
//       "404 Error: User attempted to access non-existent route:",
//       location.pathname
//     );
//   }, [location.pathname]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">404</h1>
//         <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
//         <a href="/" className="text-blue-500 hover:text-blue-700 underline">
//           Return to Home
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NotFound;
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Large 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl font-extrabold text-teal-600 mb-2 drop-shadow-lg">
            404
          </h1>
          <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-teal-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-teal-600 mb-2">
            The page you're looking for doesn't exist.
          </p>
          <p className="text-sm text-teal-500">
            Route: <code className="bg-teal-100 px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <a
            href="/"
            // className="inline-block w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            className="inline-block w-full px-6 py-3 bg-teal-500 text-teal-800 font-semibold rounded-lg hover:bg-teal-700 hover:text-white transition-colors duration-200 border border-teal-300"
          >
            Return to Home
          </a>
          
          {/* <button
            onClick={() => window.history.back()}
            className="inline-block w-full px-6 py-3 bg-teal-100 text-teal-700 font-semibold rounded-lg hover:bg-teal-200 transition-colors duration-200 border border-teal-300"
          >
            Go Back
          </button> */}
        </div>

        {/* Decorative Element
        <div className="mt-12">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-teal-600 rounded-full animate-pulse delay-150"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NotFound;