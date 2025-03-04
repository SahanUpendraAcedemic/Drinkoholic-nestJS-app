import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import userService from "../services/userService";

export default function SignUp() {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    uname: "",
    dob: "",
    phone: "",
  });
  const hadleInputChange = (e) => {
    const { id, value } = e.target;
    setFromData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Password and Confirm Password must be same");
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        const firebaseId = await user.user.uid;
        const data = { firebaseId, ...formData };
        console.log(data);
        const response = await userService.signUp(data);
        console.log(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-800 overflow-y-scroll scrollbar-hide py-5 text-white flex justify-center items-center">
      <div className="w-full  max-w-md p-10 rounded-lg shadow-md bg-gray-900">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          Sign Up
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={hadleInputChange}
              placeholder="Enter name"
              className="rounded-lg text-black hover:ring-amber-100 focus:ring-2 focus:ring-amber-200"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="phone">Phone</label>
            <input
              type="Number"
              id="phone"
              onChange={hadleInputChange}
              placeholder="Enter name"
              className="rounded-lg text-black hover:ring-amber-100 focus:ring-2 focus:ring-amber-200"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="dob">Date Of Birth</label>
            <input
              type="Date"
              id="dob"
              onChange={hadleInputChange}
              placeholder="Enter name"
              className="rounded-lg text-black hover:ring-amber-100 focus:ring-2 focus:ring-amber-200"
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={hadleInputChange}
              placeholder="Enter email"
              className="rounded-lg text-black hover:ring-amber-100 focus:ring-2 focus:ring-amber-200"
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
          <div className="flex flex-col space-y-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              onChange={hadleInputChange}
              placeholder="Confirm password"
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
        </form>
        <h2 className="text-center py-2">
          Already have a account{" "}
          <Link className="text-amber-300 hover:text-amber-500" to={"/signin"}>
            Sign In
          </Link>
        </h2>
      </div>
    </div>
  );
}
