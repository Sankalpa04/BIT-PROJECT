import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../../Config/axiosconfig";
import { useNavigate } from "react-router-dom";

// Define schema for validation using Yup
const schema = yup.object({
  name: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email")
    .matches(
      /@(gmail\.com|yahoo\.com|outlook\.com|[\w-]+\.[a-z]{2,})$/,
      "Email domain must be gmail.com, yahoo.com, outlook.com, or valid domain"
    ),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /[a-z]/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /[0-9]/,
      "Password must contain at least one number"
    )
    .required("Password is required"),
}).required();

const Signup = () => {
  const [message, setMessage] = useState(""); // For showing success or error messages
  const navigate = useNavigate();

  // Use react-hook-form with yup validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit function for the form
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/signup", {
        username: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        setMessage("Signup successful! Please log in.");
        navigate('/');
      } else {
        setMessage(response.data.message || "An error occurred during signup.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full p-2 border rounded-md mt-1"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full p-2 border rounded-md mt-1"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full p-2 border rounded-md mt-1"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>

      {/* Error/Success message */}
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}

      {/* Log In Link */}
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600">Log In</a>
      </p>
    </div>
  );
};

export default Signup;


// import React, { useState } from "react";
// import axiosInstance from "../../Config/axiosconfig";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [message, setMessage] = useState(""); // To show success/error messages
//   const navigate =  useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axiosInstance.post("/signup", {
//         username: name,
//         email,
//         password,
//       });
  
//       if (response.status === 200) {
//         setMessage("Signup successful! Please log in.");
//         setEmail("");
//         setPassword("");
//         setName("");
//         navigate('/')
//       } else {
//         setMessage(response.data.message || "An error occurred during signup.");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       setMessage(error.response?.data?.message || "An error occurred. Please try again.");
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axiosInstance.post("/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: name,
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Signup successful! Please log in.");
//         setEmail("");
//         setPassword("");
//         setName("");
//       } else {
//         setMessage(data.message || "An error occurred during signup.");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700">Full Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your full name"
//             className="w-full p-2 border rounded-md mt-1"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="w-full p-2 border rounded-md mt-1"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             className="w-full p-2 border rounded-md mt-1"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           Sign Up
//         </button>
//       </form>
//       {message && <p className="mt-4 text-center text-red-600">{message}</p>}
//       <p className="mt-4 text-center">
//         Already have an account?{" "}
//         <a href="/login" className="text-blue-600">Log In</a>
//       </p>
//     </div>
//   );
// };

// export default Signup;

// // Signup.js
// import React, { useState } from "react";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle signup logic here (e.g., API call)
//     console.log("Signing up:", { email, password, name });
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700">Full Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your full name"
//             className="w-full p-2 border rounded-md mt-1"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="w-full p-2 border rounded-md mt-1"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             className="w-full p-2 border rounded-md mt-1"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           Sign Up
//         </button>
//       </form>
//       <p className="mt-4 text-center">
//         Already have an account?{" "}
//         <a href="/login" className="text-blue-600">Log In</a>
//       </p>
//     </div>
//   );
// };
// export default Signup;