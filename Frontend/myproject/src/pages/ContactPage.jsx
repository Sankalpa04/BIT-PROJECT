import React, { useState } from "react";
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(); // Create FormData for file upload
    formdata.append('name', formData.name);
    formdata.append('email', formData.email);
    formdata.append('message', formData.message);
    try {
      const response = await axios.post("http://localhost:5000/contact",formdata,{
          headers: {
            "Content-Type": "application/json",
          },
        });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.success);
      } else {
        setResponseMessage(data.error);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setResponseMessage("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section className="bg-blue-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg">
          Get in touch with us for any questions or assistance!
        </p>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control w-full px-4 py-2 rounded-md shadow-sm"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {/* Email Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control w-full px-4 py-2 rounded-md shadow-sm"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {/* Message Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Message</label>
                <textarea
                  name="message"
                  className="form-control w-full px-4 py-2 rounded-md shadow-sm"
                  rows="4"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
              >
                Send Message
              </button>
              {/* Response Message */}
              {responseMessage && (
                <p className="mt-4 text-center text-blue-600">
                  {responseMessage}
                </p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-between">
            {/* Images Section */}
            <div className="flex space-x-4">
              <img
                src="https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg?q=w_2226,h_1449,x_0,y_0,c_fill"
                alt="Hotel Front"
                className="w-1/2 h-64 rounded-lg shadow-md object-cover"
              />
              <img
                src="https://www.belledorm.co.uk/cms_media/images/hotel_look_3.jpg"
                alt="Hotel Lobby"
                className="w-1/2 h-64 rounded-lg shadow-md object-cover"
              />
            </div>
            {/* Map Section */}
            <div className="mt-4 flex-1 h-full rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.947177757485!2d84.42808157611326!3d27.68802742634202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb311c0decbd%3A0x1d666a159de8d623!2sBirendra%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1733400310949!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Birendra Multiple Campus Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

// import React from "react";

// const ContactPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header Section */}
//       <section className="bg-blue-600 text-white text-center py-12">
//         <h1 className="text-4xl font-bold">Contact Us</h1>
//         <p className="mt-4 text-lg">
//           Get in touch with us for any questions or assistance!
//         </p>
//       </section>

//       {/* Content Section */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Contact Form */}
//           <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
//             <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
//             <form>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   className="form-control w-full px-4 py-2 rounded-md shadow-sm"
//                   placeholder="Your Name"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   className="form-control w-full px-4 py-2 rounded-md shadow-sm"
//                   placeholder="Your Email"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Message</label>
//                 <textarea
//                   className="form-control w-full px-4 py-2 rounded-md shadow-sm"
//                   rows="4"
//                   placeholder="Your Message"
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Contact Information */}
//           <div className="flex flex-col justify-between">
//             {/* Images Section */}
//             <div className="flex space-x-4">
//               <img
//                 src="https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg?q=w_2226,h_1449,x_0,y_0,c_fill"
//                 alt="Hotel Front"
//                 className="w-1/2 h-64 rounded-lg shadow-md object-cover"
//               />
//               <img
//                 src="https://www.belledorm.co.uk/cms_media/images/hotel_look_3.jpg"
//                 alt="Hotel Lobby"
//                 className="w-1/2 h-64 rounded-lg shadow-md object-cover"
//               />
//             </div>
//             {/* Map Section */}
//             <div className="mt-4 flex-1 h-full rounded-lg overflow-hidden shadow-md">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.947177757485!2d84.42808157611326!3d27.68802742634202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb311c0decbd%3A0x1d666a159de8d623!2sBirendra%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1733400310949!5m2!1sen!2snp"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen={true}
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Birendra Multiple Campus Location"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;

// import React from "react";

// const ContactPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header Section */}
//       <section className="bg-blue-600 text-white text-center py-12">
        
//         <h1 className="text-4xl font-bold">Contact Us</h1>
//         <p className="mt-4 text-lg">
//           Get in touch with us for any questions or assistance!
//         </p>
//       </section>

//       {/* Content Section */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Contact Form */}
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
//             <form>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   className="form-control w-full px-4 py-2 rounded-md shadow-sm"
//                   placeholder="Your Name"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   className="form-control w-full px-4 py-2 rounded-md shadow-sm"
//                   placeholder="Your Email"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Message</label>
//                 <textarea
//                   className="form-control w-full px-4 py-2 rounded-md shadow-sm"
//                   rows="4"
//                   placeholder="Your Message"
//                 ></textarea>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Contact Information */}
//           <div className="flex flex-col space-y-6">
//             {/* Images Section */}
//             <div className="flex-1">
//               <img
//                 src="https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg?q=w_2226,h_1449,x_0,y_0,c_fill"
//                 alt="Hotel Front"
//                 className="h-full rounded-lg shadow-md object-cover"
//               />
//             </div>
//             <div className="flex-1">
//               <img
//                 src="https://www.belledorm.co.uk/cms_media/images/hotel_look_3.jpg"
//                 alt="Hotel Lobby"
//                 className="h-full rounded-lg shadow-md object-cover"
//               />
//             </div>
//             {/* Map Section */}
//             <div className="h-64 rounded-lg overflow-hidden shadow-md">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.947177757485!2d84.42808157611326!3d27.68802742634202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb311c0decbd%3A0x1d666a159de8d623!2sBirendra%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1733400310949!5m2!1sen!2snp"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen={true}
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Birendra Multiple Campus Location"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;

// // import React from "react";

// // const ContactPage = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       {/* Header Section */}
// //       <section className="bg-blue-600 text-white text-center py-12">
        
// //         <h1 className="text-4xl font-bold">Contact Us</h1>
// //         <p className="mt-4 text-lg">
// //           Get in touch with us for any questions or assistance!
// //         </p>
// //       </section>

// //       {/* Content Section */}
// //       <div className="container mx-auto px-4 py-8">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           {/* Contact Form */}
// //           <div className="bg-white shadow-lg rounded-lg p-6">
// //             <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
// //             <form>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700">Name</label>
// //                 <input
// //                   type="text"
// //                   className="form-control w-full px-4 py-2 rounded-md shadow-sm"
// //                   placeholder="Your Name"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700">Email</label>
// //                 <input
// //                   type="email"
// //                   className="form-control w-full px-4 py-2 rounded-md shadow-sm"
// //                   placeholder="Your Email"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label className="block text-gray-700">Message</label>
// //                 <textarea
// //                   className="form-control w-full px-4 py-2 rounded-md shadow-sm"
// //                   rows="4"
// //                   placeholder="Your Message"
// //                 ></textarea>
// //               </div>
// //               <button
// //                 type="submit"
// //                 className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
// //               >
// //                 Send Message
// //               </button>
// //             </form>
// //           </div>

// //           {/* Contact Information */}
// //           <div className="flex flex-col space-y-6">
// //             {/* Images Section */}
// //             <div>
// //               <img
// //                 src="https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg?q=w_2226,h_1449,x_0,y_0,c_fill"
// //                 alt="Hotel Front"
// //                 className="h-[325px] rounded-lg shadow-md"
// //               />
// //             </div>
// //             <div>
// //               <img
// //                 src="https://www.belledorm.co.uk/cms_media/images/hotel_look_3.jpg"
// //                 alt="Hotel Lobby"
// //                 className="h-[325px] rounded-lg shadow-md"
// //               />
// //             </div>
// //             {/* Map Section */}
// //             <div className="h-64 rounded-lg overflow-hidden shadow-md">
// //               <iframe
// //                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.947177757485!2d84.42808157611326!3d27.68802742634202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb311c0decbd%3A0x1d666a159de8d623!2sBirendra%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1733400310949!5m2!1sen!2snp"
// //                 width="100%"
// //                 height="100%"
// //                 style={{ border: 0 }}
// //                 allowFullScreen={true}
// //                 loading="lazy"
// //                 referrerPolicy="no-referrer-when-downgrade"
// //                 title="Birendra Multiple Campus Location"
// //               ></iframe>
// //             </div>
// //         </div>
// //       </div>
// //     </div>
// //     </div>
// //   );
// // };

// // export default ContactPage;
