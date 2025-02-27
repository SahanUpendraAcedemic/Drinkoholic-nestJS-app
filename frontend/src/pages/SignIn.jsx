import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const hadleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const login = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("token", login.user.accessToken);
      nav("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-800 overflow-y-scroll scrollbar-hide h-screen text-white flex justify-center items-center">
      <div className="w-full max-w-md p-10 rounded-lg shadow-md bg-gray-900 ">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
          Sign In
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={hadleInputChange}
              placeholder="Enter email"
              className="rounded-lg text-black hover:ring-amber-100 focus:ring-2 focus:ring-amber-200 "
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={hadleInputChange}
              placeholder="Enter password"
              className="rounded-lg text-black hover:ring-amber-100 focus:ring-2 focus:ring-amber-200 "
              required
            />
          </div>
          <button
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            type="submit"
          >
            Sign Up
          </button>

          <h2 className="text-center">
            Don't have a account{" "}
            <Link
              className="text-amber-300 hover:text-amber-500"
              to={"/signup"}
            >
              Sign Up
            </Link>
          </h2>
          <hr />
          <h3 className="text-center">or</h3>

          <button className="inline-flex items-center justify-center px-5 py-2 gap-2 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            <FaGoogle /> Google Authentication
          </button>
        </form>
      </div>
    </div>
  );
}
