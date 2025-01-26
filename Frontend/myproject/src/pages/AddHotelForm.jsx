import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../Config/axiosConfig';

const AddHotelForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    price: '',
    offerPrice: '',
    image: null, // For file input
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(); // Create FormData for file upload
    data.append('name', formData.name);
    data.append('address', formData.address);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('offerPrice', formData.offerPrice);
    data.append('image', formData.image); // Append file

    try {
      const response = await axios.post('http://localhost:5000/hotel', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setFormData({
        name: '',
        address: '',
        description: '',
        price: '',
        offerPrice: '',
        image: null,
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error submitting form');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Hotel</h1>
      {message && (
        <div className={`p-3 mb-4 text-white rounded ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4" >
        <input
          type="text"
          name="name"
          placeholder="Hotel Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          required
        />
        <input
          type="number"
          name="offerPrice"
          placeholder="Offer Price (Optional)"
          value={formData.offerPrice}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddHotelForm;

// import React, { useState } from 'react';
// import axios from 'axios';

// const AddHotelForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     description: '',
//     price: '',
//     offerPrice: '',
//     image: null,
//   });

//   const [message, setMessage] = useState('');
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       setFormData({ ...formData, image: file });
//       setImagePreview(URL.createObjectURL(file));
//       setMessage('');
//     } else {
//       setMessage('Please upload a valid image file.');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.image) {
//       setMessage('Image file is required.');
//       return;
//     }

//     const data = new FormData();
//     data.append('name', formData.name);
//     data.append('address', formData.address);
//     data.append('description', formData.description);
//     data.append('price', formData.price);
//     data.append('offerPrice', formData.offerPrice);
//     data.append('image', formData.image);

//     try {
//       const response = await axios.post('http://localhost:5000/hotel', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage(response.data.message || 'Hotel added successfully!');
//       setFormData({
//         name: '',
//         address: '',
//         description: '',
//         price: '',
//         offerPrice: '',
//         image: null,
//       });
//       setImagePreview(null);
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Error submitting form');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
//       <h1 className="text-2xl font-bold text-center mb-6">Add New Hotel Room</h1>
//       {message && (
//         <div className={`p-3 mb-4 text-white rounded ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
//           {message}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
//         <input
//           type="text"
//           name="name"
//           placeholder="Room Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           required
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           required
//         />
//         <input
//           type="number"
//           name="offerPrice"
//           placeholder="Offer Price (Optional)"
//           value={formData.offerPrice}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//         />
//         <input
//           type="file"
//           name="image"
//           onChange={handleFileChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           required
//         />
//         {imagePreview && (
//           <div className="mt-4">
//             <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
//           </div>
//         )}
//         <button
//           type="submit"
//           className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddHotelForm;


// import React, { useState } from 'react';
// import axios from 'axios';

// const AddHotelForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     description: '',
//     price: '',
//     offerPrice: '',
//     image: '', 
//   });

//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData(); // Create FormData for file upload
//     data.append('name', formData.name);
//     data.append('address', formData.address);
//     data.append('description', formData.description);
//     data.append('price', formData.price);
//     data.append('offerPrice', formData.offerPrice);
//     data.append('image', formData.image); // Append file

//     try {
//       const response = await axios.post('http://localhost:5000/hotel', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage(response.data.message);
//       setFormData({
//         name: '',
//         address: '',
//         description: '',
//         price: '',
//         offerPrice: '',
//         image: null,
//       });
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Error submitting form');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
//       <h1 className="text-2xl font-bold text-center mb-6">Add New Hotel Room</h1>
//       {message && (
//         <div className={`p-3 mb-4 text-white rounded ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
//           {message}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
//         <input
//           type="text"
//           name="name"
//           placeholder="Room Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           required
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           required
//         />
//         <input
//           type="number"
//           name="offerPrice"
//           placeholder="Offer Price (Optional)"
//           value={formData.offerPrice}
//           onChange={handleChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//         />
//         <input
//           type="file"
//           name="image"
//           onChange={handleFileChange}
//           className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddHotelForm;

// // import React, { useState, useRef } from "react";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";

// // function AddPackageForm() {
// //   // const [availableDates, setAvailableDates] = useState([]);
// //   const [images, setImages] = useState([]);
// //   // const fileInputRef = useRef(null);  // Ref for the file input
// //   // const today = new Date(); // Get the current date

// //   // Handle date selection
// //   const handleDateChange = (dates) => {
// //     setAvailableDates(dates || []);
// //   };

// //   // Handle image upload (one by one)
// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0]; // Get the first file uploaded

// //     if (file) {
// //       const newImage = URL.createObjectURL(file); // Create URL for the image
// //       setImages((prev) => [...prev, newImage]); // Add the new image to the state
// //     }
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // const formData = new FormData(e.target);
// //       const response = await axiosInstance.post("/hotel", {
// //       name: data.name,
// //       address: data.address,
// //       password: data.password,

// //     // Log data for debugging
// //     console.log("Available Dates:", availableDates);
// //     console.log("Images:", images);
// //     alert("Form submitted! Check the console for data.");
// //   };

// //   // Trigger file input manually
// //   const triggerFileInput = () => {
// //     fileInputRef.current.click();
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
// //         <header className="bg-gray-800 text-white py-4 rounded-t-lg">
// //           <h1 className="text-center text-2xl font-bold">Admin - Add Hotel</h1>
// //         </header>
// //         <form onSubmit={handleSubmit} className="p-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {/* Hotel Details */}
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4 text-gray-700">Hotel Details</h2>
// //               <div className="space-y-4">
// //                 {/* Image Upload */}
// //                 <div>
// //                   <label
// //                     htmlFor="image"
// //                     className="block text-sm font-medium text-gray-600 cursor-pointer"
// //                     onClick={triggerFileInput}
// //                   >
// //                     Upload Image
// //                   </label>
// //                   <div className="mt-2 relative border-2 border-dashed border-gray-300 rounded-lg p-4">
// //                     {/* Invisible file input */}
// //                     <input
// //                       type="file"
// //                       id="image"
// //                       name="image"
// //                       accept="image/*"
// //                       ref={fileInputRef} // Referencing the input
// //                       onChange={handleImageUpload}
// //                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// //                     />
// //                     <div className="flex flex-col items-center justify-center text-gray-400">
// //                       <svg
// //                         className="w-10 h-10"
// //                         fill="currentColor"
// //                         viewBox="0 0 20 20"
// //                       >
// //                         <path
// //                           fillRule="evenodd"
// //                           d="M10 12a2 2 0 100-4 2 2 0 000 4z"
// //                           clipRule="evenodd"
// //                         />
// //                         <path
// //                           fillRule="evenodd"
// //                           d="M10 3a7 7 0 100 14 7 7 0 000-14zM4 10a6 6 0 1112 0 6 6 0 01-12 0z"
// //                           clipRule="evenodd"
// //                         />
// //                       </svg>
// //                       <span className="mt-2 text-sm">Click to upload image</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Preview Images */}
// //                 {images.length > 0 && (
// //                   <div className="flex items-center gap-4 mt-4">
// //                     {images.slice(0, 3).map((img, index) => (
// //                       <img
// //                         key={index}
// //                         src={img}
// //                         alt={`Preview ${index + 1}`}
// //                         className="w-16 h-16 object-cover rounded-md shadow-md"
// //                       />
// //                     ))}
// //                     {images.length > 3 && (
// //                       <span className="text-sm text-gray-600">
// //                         +{images.length - 3} More
// //                       </span>
// //                     )}
// //                   </div>
// //                 )}
// //                 {/* Hotel Name */}
// //                 <div>
// //                   <label htmlFor="package_name" className="block text-sm font-medium text-gray-600">
// //                     Hotel Name
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="package_name"
// //                     name="package_name"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 {/* Location */}
// //                 <div>
// //                   <label htmlFor="destination" className="block text-sm font-medium text-gray-600">
// //                     Location
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="destination"
// //                     name="destination"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 {/* Description */}
// //                 <div>
// //                   <label htmlFor="description" className="block text-sm font-medium text-gray-600">
// //                     Description
// //                   </label>
// //                   <textarea
// //                     id="description"
// //                     name="description"
// //                     rows="4"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   ></textarea>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Other Information */}
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4 text-gray-700">Other Information</h2>
// //               <div className="space-y-4">
// //                 {/* Available Dates */}
// //                 {/* <div>
// //                   <label htmlFor="available_dates" className="block text-sm font-medium text-gray-600">
// //                     Available Dates
// //                   </label>
// //                   <DatePicker
// //                     selected={null}
// //                     onChange={handleDateChange}
// //                     startDate={availableDates[0]}
// //                     endDate={availableDates[availableDates.length - 1]}
// //                     selectsRange
// //                     minDate={today} // Restrict past dates
// //                     inline
// //                   />
// //                 </div> */}

// //                 {/* Price */}
// //                 <div>
// //                   <label htmlFor="price" className="block text-sm font-medium text-gray-600">
// //                     Price ($)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     id="price"
// //                     name="price"
// //                     min="0"
// //                     step="10"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 {/* Discount */}
// //                 <div>
// //                   <label htmlFor="offerprice" className="block text-sm font-medium text-gray-600">
// //                     Offer Price ($)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     id="offerprice"
// //                     name="offerprice"
// //                     min="0"
// //                     step="10"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Submit Button */}
// //           <div className="mt-6 flex justify-end">
// //             <button
// //               type="submit"
// //               className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
// //             >
// //               Add Package
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AddPackageForm;

// // import React, { useState, useRef } from "react";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";

// // function AddPackageForm() {
// //   const [availableDates, setAvailableDates] = useState([]);
// //   const [images, setImages] = useState([]);
// //   const fileInputRef = useRef(null);  // Ref for the file input
// //   const today = new Date(); // Get the current date

// //   // Handle date selection
// //   const handleDateChange = (dates) => {
// //     setAvailableDates(dates || []);
// //   };

// //   // Handle image upload
// //   const handleImageUpload = (e) => {
// //     const files = Array.from(e.target.files); // Convert FileList to Array

// //     // Create URLs for preview
// //     const newImages = files.map((file) => URL.createObjectURL(file));

// //     setImages((prev) => {
// //       const updatedImages = [...prev, ...newImages];
// //       return updatedImages.slice(0, 10); // Limit to 10 images
// //     });
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const formData = new FormData(e.target);
// //     formData.append("available_dates", JSON.stringify(availableDates));

// //     // Log data for debugging
// //     console.log("Available Dates:", availableDates);
// //     console.log("Images:", images);
// //     alert("Form submitted! Check the console for data.");
// //   };

// //   // Trigger file input manually
// //   const triggerFileInput = () => {
// //     fileInputRef.current.click();
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
// //         <header className="bg-gray-800 text-white py-4 rounded-t-lg">
// //           <h1 className="text-center text-2xl font-bold">Admin - Add Hotel</h1>
// //         </header>
// //         <form onSubmit={handleSubmit} className="p-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {/* Hotel Details */}
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4 text-gray-700">Hotel Details</h2>
// //               <div className="space-y-4">
// //                 {/* Image Upload */}
// //                 <div>
// //                   <label
// //                     htmlFor="image"
// //                     className="block text-sm font-medium text-gray-600 cursor-pointer"
// //                     onClick={triggerFileInput}
// //                   >
// //                     Upload Images
// //                   </label>
// //                   <div className="mt-2 relative border-2 border-dashed border-gray-300 rounded-lg p-4">
// //                     {/* Invisible file input */}
// //                     <input
// //                       type="file"
// //                       id="image"
// //                       name="image"
// //                       accept="image/*"
// //                       multiple
// //                       ref={fileInputRef} // Referencing the input
// //                       onChange={handleImageUpload}
// //                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// //                     />
// //                     <div className="flex flex-col items-center justify-center text-gray-400">
// //                       <svg
// //                         className="w-10 h-10"
// //                         fill="currentColor"
// //                         viewBox="0 0 20 20"
// //                       >
// //                         <path
// //                           fillRule="evenodd"
// //                           d="M10 12a2 2 0 100-4 2 2 0 000 4z"
// //                           clipRule="evenodd"
// //                         />
// //                         <path
// //                           fillRule="evenodd"
// //                           d="M10 3a7 7 0 100 14 7 7 0 000-14zM4 10a6 6 0 1112 0 6 6 0 01-12 0z"
// //                           clipRule="evenodd"
// //                         />
// //                       </svg>
// //                       <span className="mt-2 text-sm">Click to upload images</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Preview Images */}
// //                 {images.length > 0 && (
// //                   <div className="flex items-center gap-4 mt-4">
// //                     {images.slice(0, 3).map((img, index) => (
// //                       <img
// //                         key={index}
// //                         src={img}
// //                         alt={`Preview ${index + 1}`}
// //                         className="w-16 h-16 object-cover rounded-md shadow-md"
// //                       />
// //                     ))}
// //                     {images.length > 3 && (
// //                       <span className="text-sm text-gray-600">
// //                         +{images.length - 3} More
// //                       </span>
// //                     )}
// //                   </div>
// //                 )}
// //                 {/* Hotel Name */}
// //                 <div>
// //                   <label htmlFor="package_name" className="block text-sm font-medium text-gray-600">
// //                     Hotel Name
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="package_name"
// //                     name="package_name"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 {/* Location */}
// //                 <div>
// //                   <label htmlFor="destination" className="block text-sm font-medium text-gray-600">
// //                     Location
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="destination"
// //                     name="destination"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 {/* Description */}
// //                 <div>
// //                   <label htmlFor="description" className="block text-sm font-medium text-gray-600">
// //                     Description
// //                   </label>
// //                   <textarea
// //                     id="description"
// //                     name="description"
// //                     rows="4"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   ></textarea>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Other Information */}
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4 text-gray-700">Other Information</h2>
// //               <div className="space-y-4">
// //                 {/* Available Dates */}
// //                 <div>
// //                   <label htmlFor="available_dates" className="block text-sm font-medium text-gray-600">
// //                     Available Dates
// //                   </label>
// //                   <DatePicker
// //                     selected={null}
// //                     onChange={handleDateChange}
// //                     startDate={availableDates[0]}
// //                     endDate={availableDates[availableDates.length - 1]}
// //                     selectsRange
// //                     minDate={today} // Restrict past dates
// //                     inline
// //                   />
// //                 </div>

// //                 {/* Price */}
// //                 <div>
// //                   <label htmlFor="price" className="block text-sm font-medium text-gray-600">
// //                     Price ($)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     id="price"
// //                     name="price"
// //                     min="0"
// //                     step="10"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 {/* Discount */}
// //                 <div>
// //                   <label htmlFor="discount" className="block text-sm font-medium text-gray-600">
// //                     Offer Price ($)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     id="offerprice"
// //                     name="offerprice"
// //                     min="0"
// //                     step="10"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Submit Button */}
// //           <div className="mt-6 flex justify-end">
// //             <button
// //               type="submit"
// //               className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
// //             >
// //               Add Package
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AddPackageForm;

// // import React, { useState } from "react";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";

// // function AddPackageForm() {
// //   const [availableDates, setAvailableDates] = useState([]);
// //   const [images, setImages] = useState([]);
// //   const today = new Date(); // Get the current date

// //   // Handle date selection
// //   const handleDateChange = (dates) => {
// //     setAvailableDates(dates || []);
// //   };

// //   // Handle image upload
// //   const handleImageUpload = (e) => {
// //     const files = Array.from(e.target.files); // Convert FileList to Array

// //     // Create URLs for preview
// //     const newImages = files.map((file) => URL.createObjectURL(file));

// //     setImages((prev) => {
// //       const updatedImages = [...prev, ...newImages];
// //       return updatedImages.slice(0, 10); // Limit to 10 images
// //     });
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const formData = new FormData(e.target);
// //     formData.append("available_dates", JSON.stringify(availableDates));

// //     // Log data for debugging
// //     console.log("Available Dates:", availableDates);
// //     console.log("Images:", images);
// //     alert("Form submitted! Check the console for data.");
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
// //         <header className="bg-gray-800 text-white py-4 rounded-t-lg">
// //           <h1 className="text-center text-2xl font-bold">Admin - Add Hotel</h1>
// //         </header>
// //         <form onSubmit={handleSubmit} className="p-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {/* Hotel Details */}
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4 text-gray-700">Hotel Details</h2>
// //               <div className="space-y-4">
// //                 {/* Image Upload */}
// //                 <div>
// //                   <label htmlFor="image" className="block text-sm font-medium text-gray-600">
// //                     Upload Images
// //                   </label>
// //                   <div className="mt-2 relative border-2 border-dashed border-gray-300 rounded-lg p-4">
// //                     <input
// //                       type="file"
// //                       id="image"
// //                       name="image"
// //                       accept="image/*"
// //                       multiple
// //                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// //                       onChange={handleImageUpload}
// //                     />
// //                     <div className="flex flex-col items-center justify-center text-gray-400">
// //                       <svg
// //                         className="w-10 h-10"
// //                         fill="currentColor"
// //                         viewBox="0 0 20 20"
// //                       >
// //                         <path
// //                           fillRule="evenodd"
// //                           d="M10 12a2 2 0 100-4 2 2 0 000 4z"
// //                           clipRule="evenodd"
// //                         />
// //                         <path
// //                           fillRule="evenodd"
// //                           d="M10 3a7 7 0 100 14 7 7 0 000-14zM4 10a6 6 0 1112 0 6 6 0 01-12 0z"
// //                           clipRule="evenodd"
// //                         />
// //                       </svg>
// //                       <span className="mt-2 text-sm">Click to upload images</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Preview Images */}
// //                 {images.length > 0 && (
// //                   <div className="flex items-center gap-4 mt-4">
// //                     {images.slice(0, 3).map((img, index) => (
// //                       <img
// //                         key={index}
// //                         src={img}
// //                         alt={`Preview ${index + 1}`}
// //                         className="w-16 h-16 object-cover rounded-md shadow-md"
// //                       />
// //                     ))}
// //                     {images.length > 3 && (
// //                       <span className="text-sm text-gray-600">
// //                         +{images.length - 3} More
// //                       </span>
// //                     )}
// //                   </div>
// //                 )}
                
// //                 {/* Hotel Name */}
// //                 <div>
// //                   <label htmlFor="package_name" className="block text-sm font-medium text-gray-600">
// //                     Hotel Name
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="package_name"
// //                     name="package_name"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 {/* Location */}
// //                 <div>
// //                   <label htmlFor="destination" className="block text-sm font-medium text-gray-600">
// //                     Location
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="destination"
// //                     name="destination"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 {/* Description */}
// //                 <div>
// //                   <label htmlFor="description" className="block text-sm font-medium text-gray-600">
// //                     Description
// //                   </label>
// //                   <textarea
// //                     id="description"
// //                     name="description"
// //                     rows="4"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   ></textarea>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Other Information */}
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4 text-gray-700">Other Information</h2>
// //               <div className="space-y-4">
// //                 {/* Available Dates */}
// //                 <div>
// //                   <label htmlFor="available_dates" className="block text-sm font-medium text-gray-600">
// //                     Available Dates
// //                   </label>
// //                   <DatePicker
// //                     selected={null}
// //                     onChange={handleDateChange}
// //                     startDate={availableDates[0]}
// //                     endDate={availableDates[availableDates.length - 1]}
// //                     selectsRange
// //                     minDate={today} // Restrict past dates
// //                     inline
// //                   />
// //                 </div>

// //                 {/* Price */}
// //                 <div>
// //                   <label htmlFor="price" className="block text-sm font-medium text-gray-600">
// //                     Price ($)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     id="price"
// //                     name="price"
// //                     min="0"
// //                     step="0.01"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 {/* Discount */}
// //                 <div>
// //                   <label htmlFor="discount" className="block text-sm font-medium text-gray-600">
// //                     Offer Price ($)
// //                   </label>
// //                   <input
// //                     type="number"
// //                     id="discount"
// //                     name="discount"
// //                     min="0"
// //                     max="100"
// //                     step="0.01"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Submit Button */}
// //           <div className="mt-6 flex justify-end">
// //             <button
// //               type="submit"
// //               className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
// //             >
// //               Add Package
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AddPackageForm;




// // import React, { useState } from "react";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";

// // function AddPackageForm() {
// //   const [availableDates, setAvailableDates] = useState([]);

// //   const handleDateChange = (dates) => {
// //     setAvailableDates(dates || []);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     // Prepare form data
// //     const formData = new FormData(e.target);
// //     formData.append("available_dates", JSON.stringify(availableDates));

// //     // Submit form logic
// //     fetch("/api/admin/hotels", {
// //       method: "POST",
// //       body: formData,
// //     })
// //       .then((response) => response.json())
// //       .then((data) => {
// //         alert("Hotel added successfully!");
// //       })
// //       .catch((error) => {
// //         console.error("Error:", error);
// //         alert("Something went wrong!");
// //       });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
// //         <header className="bg-gray-800 text-white py-4 rounded-t-lg">
// //           <h1 className="text-center text-2xl font-bold">Admin - Add Hotel</h1>
// //         </header>
// //         <form onSubmit={handleSubmit} className="p-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {/* Hotel Details */}
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4 text-gray-700">Hotel Details</h2>
// //               <div className="space-y-4">
// //                 <div>
// //                   <label htmlFor="image" className="block text-sm font-medium text-gray-600">Upload Image</label>
// //                   <div className="mt-2 relative border-2 border-dashed border-gray-300 rounded-lg p-4">
// //                     <input
// //                       type="file"
// //                       id="image"
// //                       name="image"
// //                       accept="image/*"
// //                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// //                     />
// //                     <div className="flex flex-col items-center justify-center text-gray-400">
// //                       <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
// //                         <path
// //                           fillRule="evenodd"
// //                           d="M10 12a2 2 0 100-4 2 2 0 000 4z"
// //                           clipRule="evenodd"
// //                         />
// //                         <path
// //                           fillRule="evenodd"
// //                           d="M10 3a7 7 0 100 14 7 7 0 000-14zM4 10a6 6 0 1112 0 6 6 0 01-12 0z"
// //                           clipRule="evenodd"
// //                         />
// //                       </svg>
// //                       <span className="mt-2 text-sm">Click to upload an image</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label htmlFor="package_name" className="block text-sm font-medium text-gray-600">Hotel Name</label>
// //                   <input
// //                     type="text"
// //                     id="package_name"
// //                     name="package_name"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="destination" className="block text-sm font-medium text-gray-600">Location</label>
// //                   <input
// //                     type="text"
// //                     id="destination"
// //                     name="destination"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
// //                   <textarea
// //                     id="description"
// //                     name="description"
// //                     rows="4"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   ></textarea>
// //                 </div>
// //               </div>
// //             </div>
// //             {/* Other Information */}
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4 text-gray-700">Other Information</h2>
// //               <div className="space-y-4">
// //                 <div>
// //                   <label htmlFor="available_dates" className="block text-sm font-medium text-gray-600">
// //                     Available Dates
// //                   </label>
// //                   <DatePicker
// //                     selected={null}
// //                     onChange={handleDateChange}
// //                     startDate={availableDates[0]}
// //                     endDate={availableDates[availableDates.length - 1]}
// //                     selectsRange
// //                     inline
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="price" className="block text-sm font-medium text-gray-600">Price ($)</label>
// //                   <input
// //                     type="number"
// //                     id="price"
// //                     name="price"
// //                     min="0"
// //                     step="0.01"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="discount" className="block text-sm font-medium text-gray-600">Offer Price ($)</label>
// //                   <input
// //                     type="number"
// //                     id="discount"
// //                     name="discount"
// //                     min="0"
// //                     max="100"
// //                     step="0.01"
// //                     className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="mt-6 flex justify-end">
// //             <button
// //               type="submit"
// //               className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
// //             >
// //               Add Package
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AddPackageForm;

// // import React from 'react';

// // function AddPackageForm() {
// //   return (
// //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
// //         <header className="bg-gray-800 text-white py-4 rounded-t-lg">
// //           <h1 className="text-center text-2xl font-bold">Admin - Add Hotel</h1>
// //         </header>
// //         <form action="#" method="POST" className="p-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4 text-gray-700">Hotel Details</h2>
// //               <div className="space-y-4">
// //                 <div>
// //                   <label htmlFor="image" className="block text-sm font-medium text-gray-600">Upload Image</label>
// //                   <div className="mt-2 relative border-2 border-dashed border-gray-300 rounded-lg p-4">
// //                     <input type="file" id="image" name="image" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
// //                     <div className="flex flex-col items-center justify-center text-gray-400">
// //                       <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
// //                         <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
// //                         <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
// //                       </svg>
// //                       <span className="mt-2 text-sm">Click to upload an image</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <label htmlFor="package_name" className="block text-sm font-medium text-gray-600">Hotel Name</label>
// //                   <input type="text" id="package_name" name="package_name" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500" required />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="destination" className="block text-sm font-medium text-gray-600">Location</label>
// //                   <input type="text" id="destination" name="destination" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500" required />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
// //                   <textarea id="description" name="description" rows="4" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500" required></textarea>
// //                 </div>
// //               </div>
// //             </div>
// //             <div>
// //               <h2 className="text-xl font-semibold mb-4 text-gray-700">Other Information</h2>
// //               <div className="space-y-4">
// //                 <div>
// //                   <label htmlFor="start_date" className="block text-sm font-medium text-gray-600">Available Dates</label>
// //                   <input type="date" id="start_date" name="start_date" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500" required />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="price" className="block text-sm font-medium text-gray-600">Price ($)</label>
// //                   <input type="number" id="price" name="price" min="0" step="0.01" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500" required />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="discount" className="block text-sm font-medium text-gray-600">Offer Price ($)</label>
// //                   <input type="number" id="discount" name="discount" min="0" max="100" step="0.01" className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500" required />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="mt-6 flex justify-end">
// //             <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300">Add Package</button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AddPackageForm;


// // import React from 'react';

// // function AddPackageForm() {
// //   return (
// //     <div className="bg-gray-100">
// //       <header className="bg-gray-900 text-white py-4">
// //         <h1 className="text-center">Admin - Add Package</h1>
// //       </header>
// //       <form action="#" method="POST" className="container mx-auto mt-8 px-4">
// //         <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <h2 className="text-2xl font-semibold mb-4">Package Details</h2>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="col-span-2 md:col-span-1">
// //                 <label htmlFor="image" className="form-label">Upload Image</label>
// //                 <div className="image-upload-wrapper">
// //                   <input type="file" id="image" name="image" accept="image/*" className="hidden" />
// //                   <label htmlFor="image" className="image-upload-placeholder border border-gray-300 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200">
// //                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
// //                       <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
// //                       <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" clipRule="evenodd" />
// //                     </svg>
// //                     <span className="mt-2 text-gray-500">Click to Upload Image</span>
// //                   </label>
// //                 </div>
// //               </div>
// //               <div className="col-span-2 md:col-span-1">
// //                 <label htmlFor="package_name" className="form-label">Package Name</label>
// //                 <input type="text" id="package_name" name="package_name" className="form-input" required />
// //               </div>
// //               <div className="col-span-2">
// //                 <label htmlFor="destination" className="form-label">Destination</label>
// //                 <input type="text" id="destination" name="destination" className="form-input" required />
// //               </div>
// //               <div className="col-span-2">
// //                 <label htmlFor="description" className="form-label">Description</label>
// //                 <textarea id="description" name="description" rows="4" className="form-input" required></textarea>
// //               </div>
// //             </div>
// //           </div>
// //           <div>
// //             <h2 className="text-2xl font-semibold mb-4">Other Information</h2>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label htmlFor="duration" className="form-label">Duration (Days)</label>
// //                 <input type="number" id="duration" name="duration" min="0" className="form-input" required />
// //               </div>
// //               <div>
// //                 <label htmlFor="start_date" className="form-label">Start Date</label>
// //                 <input type="date" id="start_date" name="start_date" className="form-input" required />
// //               </div>
// //               <div>
// //                 <label htmlFor="end_date" className="form-label">End Date</label>
// //                 <input type="date" id="end_date" name="end_date" className="form-input" required />
// //               </div>
// //               <div>
// //                 <label htmlFor="price" className="form-label">Price ($)</label>
// //                 <input type="number" id="price" name="price" min="0" step="0.01" className="form-input" required />
// //               </div>
// //               <div>
// //                 <label htmlFor="discount" className="form-label">Discount (%)</label>
// //                 <input type="number" id="discount" name="discount" min="0" max="100" step="0.01" className="form-input" required />
// //               </div>
// //             </div>
// //           </div>
// //           <div></div>
// //           <div className="flex justify-end">
// //             <button type="submit" className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-300">Add Package</button>
// //           </div>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default AddPackageForm;
