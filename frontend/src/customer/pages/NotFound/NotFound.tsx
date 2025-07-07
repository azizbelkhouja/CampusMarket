import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <section className="py-10 px-4">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="text-center max-w-3xl">
            <h1 className="text-7xl font-bold my-dark-blue">404</h1>
            <div
              className="bg-center bg-no-repeat bg-cover h-96 flex items-center justify-center"
              style={{
                backgroundImage:
                  "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
              }}
            >
            </div>

            <div className="mt-[-50px]">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                Looks like you're lost
              </h3>
              <p className="mb-6 text-lg">
                The page you are looking for is not available!
              </p>
              <Link
                to="/"
                className="inline-block my-main-button px-6 py-2"
              >
                Go to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
