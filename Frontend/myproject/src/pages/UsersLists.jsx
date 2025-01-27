import React, { useEffect, useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/user"); // API endpoint from backend
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data); // Set users to state
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Render
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users List</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">SN</th>
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-center">{index + 1}</td>
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{new Date(user.createdAt).toLocaleString()}</td>
              <td className="px-4 py-2 border">{new Date(user.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;

// import React, { useEffect, useState } from 'react';

// const UsersList = () => {
//   const [users, setUsers] = useState([]); // State to store users
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     // Fetch users from the API
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/user'); // API endpoint from backend
//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         const data = await response.json();
//         setUsers(data); // Set users to state
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Render
//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Users List</h1>
//       <ul className="space-y-4">
//         {users.map((user) => (
//           <li key={user._id} className="border rounded-lg p-4 shadow-sm">
//             <p><strong>Username:</strong> {user.username}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
//             <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UsersList;
