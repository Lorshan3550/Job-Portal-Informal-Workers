// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaVenusMars, FaTools, FaTrophy, FaEdit } from "react-icons/fa";

// const districts = {
//   Western: ["Colombo", "Gampaha", "Kalutara"],
//   Central: ["Kandy", "Matale", "Nuwara Eliya"],
//   Southern: ["Galle", "Matara", "Hambantota"],
//   Northern: ["Jaffna", "Kilinochchi", "Mullaitivu", "Vavuniya", "Mannar"],
//   Eastern: ["Batticaloa", "Ampara", "Trincomalee"],
//   Uva: ["Badulla", "Monaragala"],
//   Sabaragamuwa: ["Ratnapura", "Kegalle"],
//   NorthWestern: ["Kurunegala", "Puttalam"],
//   NorthCentral: ["Anuradhapura", "Polonnaruwa"],
// };

// const Profile = () => {
//   const sampleProfile = {
//     firstname: "John",
//     lastname: "Doe",
//     email: "johndoe@example.com",
//     phone: "0712345678",
//     gender: "Male",
//     location: "Colombo",
//     province: "Western",
//     district: "Colombo",
//     dob: "1995-08-15",
//     role: "Job Seeker",
//     skills: "GHGH, NJNJ, KJK",
//     achievements: "jj jr tgntngjhbugt iniugi4ngni",
//   };

//   const [profile, setProfile] = useState(sampleProfile);
//   const [isEditing, setIsEditing] = useState(false);
//   const [originalProfile, setOriginalProfile] = useState(sampleProfile);

//   useEffect(() => {
//     setProfile(sampleProfile);
//     setOriginalProfile(sampleProfile);
//   }, []);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = () => {
//     toast.success("Profile updated successfully!");
//     setOriginalProfile(profile);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setProfile(originalProfile);
//     setIsEditing(false);
//   };

//   return (
//     <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 mt-16 py-12">
//       <div className="w-full max-w-4xl p-10 bg-white rounded-2xl shadow-2xl border border-gray-200">
//         <div className="text-center mb-6">
//           <img src="/logo.png" alt="logo" className="w-24 mx-auto mb-4" />
//           <h3 className="text-3xl font-semibold text-gray-800">{profile.firstname} {profile.lastname}</h3>

//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InputField icon={FaUser} label="First Name" name="firstname" value={profile.firstname} onChange={handleChange} disabled={!isEditing} />
//           <InputField icon={FaUser} label="Last Name" name="lastname" value={profile.lastname} onChange={handleChange} disabled={!isEditing} />
//           <InputField icon={FaEnvelope} label="Email" name="email" value={profile.email} onChange={handleChange} disabled={!isEditing} />
//           <InputField icon={FaPhone} label="Phone" name="phone" value={profile.phone} onChange={handleChange} disabled={!isEditing} />
//           <SelectField icon={FaVenusMars} label="Gender" name="gender" value={profile.gender} onChange={handleChange} disabled={!isEditing} options={["Male", "Female", "Other"]} />
//           <InputField icon={FaMapMarkerAlt} label="Location" name="location" value={profile.location} onChange={handleChange} disabled={!isEditing} />
//           <SelectField icon={FaMapMarkerAlt} label="Province" name="province" value={profile.province} onChange={handleChange} disabled={!isEditing} options={Object.keys(districts)} />
//           <SelectField icon={FaMapMarkerAlt} label="District" name="district" value={profile.district} onChange={handleChange} disabled={!isEditing} options={districts[profile.province] || []} />
//           <InputField icon={FaCalendarAlt} label="Date of Birth" name="dob" type="date" value={profile.dob} onChange={handleChange} disabled={!isEditing} />
//           {profile.role === "Job Seeker" && (
//             <>
//               <InputField icon={FaTools} label="Skills" name="skills" value={profile.skills} onChange={handleChange} disabled={!isEditing} />
//               <InputField icon={FaTrophy} label="Achievements" name="achievements" value={profile.achievements} onChange={handleChange} disabled={!isEditing} />
//             </>
//           )}
//         </div>
//         <div className="mt-8 text-center space-x-4">
//           {isEditing ? (
//             <>
//               <button onClick={handleUpdate} className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800 transition">
//                 Save
//               </button>
//               <button onClick={handleCancel} className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition">
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button onClick={() => setIsEditing(true)} className="bg-green-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-900 transition flex items-center gap-2">
//               <FaEdit />
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// const InputField = ({ icon: Icon, label, name, type = "text", value, onChange, disabled }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700">{label}</label>
//     <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 shadow-inner focus-within:ring-2 focus-within:ring-green-500">
//       <Icon className="text-gray-600 mr-3" />
//       <input type={type} name={name} value={value || ""} onChange={onChange} className="w-full bg-transparent focus:outline-none" disabled={disabled} />
//     </div>
//   </div>
// );

// const SelectField = ({ icon: Icon, label, name, value, onChange, disabled, options }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700">{label}</label>
//     <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 shadow-inner focus-within:ring-2 focus-within:ring-green-500">
//       <Icon className="text-gray-600 mr-3" />
//       <select name={name} value={value || ""} onChange={onChange} className="w-full bg-transparent focus:outline-none" disabled={disabled}>
//         <option value="">Select {label}</option>
//         {options.map((opt, index) => (
//           <option key={index} value={opt}>{opt}</option>
//         ))}
//       </select>
//     </div>
//   </div>
// );

// export default Profile;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaVenusMars,
//   FaTools,
//   FaTrophy,
//   FaEdit,
// } from "react-icons/fa";
// import { provinces } from "./_utils/constants";

// const districts = {
//   Western: ["Colombo", "Gampaha", "Kalutara"],
//   Central: ["Kandy", "Matale", "Nuwara Eliya"],
//   Southern: ["Galle", "Matara", "Hambantota"],
//   Northern: ["Jaffna", "Kilinochchi", "Mullaitivu", "Vavuniya", "Mannar"],
//   Eastern: ["Batticaloa", "Ampara", "Trincomalee"],
//   Uva: ["Badulla", "Monaragala"],
//   Sabaragamuwa: ["Ratnapura", "Kegalle"],
//   NorthWestern: ["Kurunegala", "Puttalam"],
//   NorthCentral: ["Anuradhapura", "Polonnaruwa"],
// };

// const Profile = () => {
//   const [profile, setProfile] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [originalProfile, setOriginalProfile] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Fetch user profile from the backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/user/getuser",
//           { withCredentials: true }
//         );
//         setProfile(data.user);
//         setOriginalProfile(data.user);
//       } catch (error) {
//         console.error(error);
//         toast.error(
//           error.response?.data?.message || "Failed to fetch profile data."
//         );
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.put(
//         `http://localhost:4000/api/v1/user/update/${profile._id}`,
//         profile,
//         { withCredentials: true }
//       );
//       toast.success(data.message || "Profile updated successfully!");
//       setOriginalProfile(profile);
//       setIsEditing(false);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error.response?.data?.message || "Failed to update profile."
//       );
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setProfile(originalProfile);
//     setIsEditing(false);
//   };

//   return (
//     <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 mt-16 py-12">
//       <div className="w-full max-w-4xl p-10 bg-white rounded-2xl shadow-2xl border border-gray-200">
//         <div className="text-center mb-6">
//           <img src="/logo.png" alt="logo" className="w-24 mx-auto mb-4" />
//           <h3 className="text-3xl font-semibold text-gray-800">
//             {profile.firstName} {profile.lastName}
//           </h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InputField
//             icon={FaUser}
//             label="First Name"
//             name="firstName"
//             value={profile.firstName}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//           <InputField
//             icon={FaUser}
//             label="Last Name"
//             name="lastName"
//             value={profile.lastName}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//           <InputField
//             icon={FaEnvelope}
//             label="Email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//             disabled
//           />
//           <InputField
//             icon={FaPhone}
//             label="Phone"
//             name="phone"
//             value={profile.phone}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//           <SelectField
//             icon={FaVenusMars}
//             label="Gender"
//             name="gender"
//             value={profile.gender}
//             onChange={handleChange}
//             disabled={!isEditing}
//             options={["Male", "Female", "Other"]}
//           />
//           <InputField
//             icon={FaMapMarkerAlt}
//             label="Location"
//             name="location"
//             value={profile.location}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//           <SelectField
//             icon={FaMapMarkerAlt}
//             label="Province"
//             name="province"
//             value={profile.province}
//             onChange={handleChange}
//             disabled={!isEditing}
//             options={Object.keys(provinces)}
//           />
//           <SelectField
//             icon={FaMapMarkerAlt}
//             label="District"
//             name="district"
//             value={profile.district}
//             onChange={handleChange}
//             disabled={!isEditing}
//             options={provinces[profile.province] || []}
//           />
//           <InputField
//             icon={FaCalendarAlt}
//             label="Date of Birth"
//             name="dateOfBirth"
//             type="date"
//             value={profile.dateOfBirth}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//           {profile.role === "Worker" && (
//             <>
//               <InputField
//                 icon={FaTools}
//                 label="Skills"
//                 name="skills"
//                 value={profile.skills}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//               />
//               <InputField
//                 icon={FaTrophy}
//                 label="Achievements"
//                 name="achievements"
//                 value={profile.achievements}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//               />
//             </>
//           )}
//         </div>
//         <div className="mt-8 text-center space-x-4">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800 transition"
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-green-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-900 transition flex items-center gap-2"
//             >
//               <FaEdit />
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// const InputField = ({ icon: Icon, label, name, type = "text", value, onChange, disabled }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700">{label}</label>
//     <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 shadow-inner focus-within:ring-2 focus-within:ring-green-500">
//       <Icon className="text-gray-600 mr-3" />
//       <input
//         type={type}
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         className="w-full bg-transparent focus:outline-none"
//         disabled={disabled}
//       />
//     </div>
//   </div>
// );

// const SelectField = ({ icon: Icon, label, name, value, onChange, disabled, options }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700">{label}</label>
//     <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 shadow-inner focus-within:ring-2 focus-within:ring-green-500">
//       <Icon className="text-gray-600 mr-3" />
//       <select
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         className="w-full bg-transparent focus:outline-none"
//         disabled={disabled}
//       >
//         <option value="">Select {label}</option>
//         {options.map((opt, index) => (
//           <option key={index} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//     </div>
//   </div>
// );

// export default Profile;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaVenusMars,
//   FaTools,
//   FaTrophy,
//   FaEdit,
//   FaLock,
// } from "react-icons/fa";
// import { provinces } from "./_utils/constants";

// const Profile = () => {
//   const [profile, setProfile] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [originalProfile, setOriginalProfile] = useState({});
//   const [loading, setLoading] = useState(false);

//   // State for updating email and password
//   const [showUpdateEmailForm, setShowUpdateEmailForm] = useState(false);
//   const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
//   const [email, setEmail] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");

//   // Fetch user profile from the backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/user/getuser",
//           { withCredentials: true }
//         );
//         setProfile(data.user);
//         setOriginalProfile(data.user);
//       } catch (error) {
//         console.error(error);
//         toast.error(
//           error.response?.data?.message || "Failed to fetch profile data."
//         );
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.put(
//         `http://localhost:4000/api/v1/user/update/${profile._id}`,
//         profile,
//         { withCredentials: true }
//       );
//       toast.success(data.message || "Profile updated successfully!");
//       setOriginalProfile(profile);
//       setIsEditing(false);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error.response?.data?.message || "Failed to update profile."
//       );
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setProfile(originalProfile);
//     setIsEditing(false);
//   };

//   const handleUpdateEmail = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.put(
//         "http://localhost:4000/api/v1/user/update-email",
//         { email },
//         { withCredentials: true }
//       );
//       toast.success(data.message || "Email updated successfully!");
//       setProfile((prev) => ({ ...prev, email }));
//       setShowUpdateEmailForm(false);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error.response?.data?.message || "Failed to update email."
//       );
//       setLoading(false);
//     }
//   };

//   const handleUpdatePassword = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.put(
//         "http://localhost:4000/api/v1/user/updatepassword",
//         { oldPassword, newPassword, confirmNewPassword },
//         { withCredentials: true }
//       );
//       toast.success(data.message || "Password updated successfully!");
//       setShowUpdatePasswordForm(false);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error.response?.data?.message || "Failed to update password."
//       );
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 mt-16 py-12">
//       <div className="w-full max-w-4xl p-10 bg-white rounded-2xl shadow-2xl border border-gray-200">
//         <div className="text-center mb-6">
//           <img src="/logo.png" alt="logo" className="w-24 mx-auto mb-4" />
//           <h3 className="text-3xl font-semibold text-gray-800">
//             {profile.firstName} {profile.lastName}
//           </h3>
//         </div>

//         {/* Profile Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InputField
//             icon={FaUser}
//             label="First Name"
//             name="firstName"
//             value={profile.firstName}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//           <InputField
//             icon={FaUser}
//             label="Last Name"
//             name="lastName"
//             value={profile.lastName}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//           <InputField
//             icon={FaEnvelope}
//             label="Email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//             disabled
//           />
//           <InputField
//             icon={FaPhone}
//             label="Phone"
//             name="phone"
//             value={profile.phone}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//           <SelectField
//             icon={FaVenusMars}
//             label="Gender"
//             name="gender"
//             value={profile.gender}
//             onChange={handleChange}
//             disabled={!isEditing}
//             options={["Male", "Female", "Other"]}
//           />
//           <InputField
//             icon={FaMapMarkerAlt}
//             label="Location"
//             name="location"
//             value={profile.location}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//           <SelectField
//             icon={FaMapMarkerAlt}
//             label="Province"
//             name="province"
//             value={profile.province}
//             onChange={handleChange}
//             disabled={!isEditing}
//             options={Object.keys(provinces)}
//           />
//           <SelectField
//             icon={FaMapMarkerAlt}
//             label="District"
//             name="district"
//             value={profile.district}
//             onChange={handleChange}
//             disabled={!isEditing}
//             options={provinces[profile.province] || []}
//           />
//           <InputField
//             icon={FaCalendarAlt}
//             label="Date of Birth"
//             name="dateOfBirth"
//             type="date"
//             value={profile.dateOfBirth}
//             onChange={handleChange}
//             disabled={!isEditing}
//           />
//           {profile.role === "Worker" && (
//             <>
//               <InputField
//                 icon={FaTools}
//                 label="Skills"
//                 name="skills"
//                 value={profile.skills}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//               />
//               <InputField
//                 icon={FaTrophy}
//                 label="Achievements"
//                 name="achievements"
//                 value={profile.achievements}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//               />
//             </>
//           )}
//         </div>

//         {/* Update Email Section */}
//         <div className="mb-6">
//           <h4 className="text-xl font-semibold mb-4">Email</h4>
//           {!showUpdateEmailForm ? (
//             <div className="flex justify-between items-center">
//               <p>{profile.email}</p>
//               <button
//                 onClick={() => setShowUpdateEmailForm(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 Update Email
//               </button>
//             </div>
//           ) : (
//             <div>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter new email"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
//               />
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={handleUpdateEmail}
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                   disabled={loading}
//                 >
//                   {loading ? "Updating..." : "Submit"}
//                 </button>
//                 <button
//                   onClick={() => setShowUpdateEmailForm(false)}
//                   className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Update Password Section */}
//         <div className="mb-6">
//           <h4 className="text-xl font-semibold mb-4">Password</h4>
//           {!showUpdatePasswordForm ? (
//             <button
//               onClick={() => setShowUpdatePasswordForm(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Update Password
//             </button>
//           ) : (
//             <div>
//               <input
//                 type="password"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 placeholder="Enter old password"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
//               />
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 placeholder="Enter new password"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
//               />
//               <input
//                 type="password"
//                 value={confirmNewPassword}
//                 onChange={(e) => setConfirmNewPassword(e.target.value)}
//                 placeholder="Confirm new password"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
//               />
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={handleUpdatePassword}
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                   disabled={loading}
//                 >
//                   {loading ? "Updating..." : "Submit"}
//                 </button>
//                 <button
//                   onClick={() => setShowUpdatePasswordForm(false)}
//                   className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Edit Profile Buttons */}
//         <div className="mt-8 text-center space-x-4">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800 transition"
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-green-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-900 transition flex items-center gap-2"
//             >
//               <FaEdit />
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// const InputField = ({ icon: Icon, label, name, type = "text", value, onChange, disabled }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700">{label}</label>
//     <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 shadow-inner focus-within:ring-2 focus-within:ring-green-500">
//       <Icon className="text-gray-600 mr-3" />
//       <input
//         type={type}
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         className="w-full bg-transparent focus:outline-none"
//         disabled={disabled}
//       />
//     </div>
//   </div>
// );

// const SelectField = ({ icon: Icon, label, name, value, onChange, disabled, options }) => (
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700">{label}</label>
//     <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 shadow-inner focus-within:ring-2 focus-within:ring-green-500">
//       <Icon className="text-gray-600 mr-3" />
//       <select
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         className="w-full bg-transparent focus:outline-none"
//         disabled={disabled}
//       >
//         <option value="">Select {label}</option>
//         {options.map((opt, index) => (
//           <option key={index} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//     </div>
//   </div>
// );

// export default Profile;


import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaTools,
  FaTrophy,
  FaEdit,
  FaLock,
} from "react-icons/fa";
import { provinces } from "./_utils/constants";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState({});
  const [loading, setLoading] = useState(false);

  // State for updating email and password
  const [showUpdateEmailForm, setShowUpdateEmailForm] = useState(false);
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Fetch user profile from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setProfile(data.user);
        setOriginalProfile(data.user);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch profile data."
        );
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/user/update/${profile._id}`,
        profile,
        { withCredentials: true }
      );
      toast.success(data.message || "Profile updated successfully!");
      setOriginalProfile(profile);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update profile."
      );
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  const handleUpdateEmail = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/update-email",
        { email },
        { withCredentials: true }
      );
      toast.success(data.message || "Email updated successfully!");
      setProfile((prev) => ({ ...prev, email }));
      setShowUpdateEmailForm(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update email."
      );
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/updatepassword",
        { oldPassword, newPassword, confirmNewPassword },
        { withCredentials: true }
      );
      toast.success(data.message || "Password updated successfully!");
      setShowUpdatePasswordForm(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 mt-16 py-12">
      <div className="w-full max-w-4xl p-10 bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="logo" className="w-24 mx-auto mb-4" />
          <h3 className="text-3xl font-semibold text-gray-800">
            {profile.firstName} {profile.lastName}
          </h3>
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={FaUser}
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <InputField
            icon={FaUser}
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <InputField
            icon={FaEnvelope}
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled
          />
          <InputField
            icon={FaPhone}
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <SelectField
            icon={FaVenusMars}
            label="Gender"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            disabled={!isEditing}
            options={["Male", "Female", "Other"]}
          />
          <InputField
            icon={FaMapMarkerAlt}
            label="Location"
            name="location"
            value={profile.location}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <SelectField
            icon={FaMapMarkerAlt}
            label="Province"
            name="province"
            value={profile.province}
            onChange={handleChange}
            disabled={!isEditing}
            options={Object.keys(provinces)}
          />
          <SelectField
            icon={FaMapMarkerAlt}
            label="District"
            name="district"
            value={profile.district}
            onChange={handleChange}
            disabled={!isEditing}
            options={provinces[profile.province] || []}
          />
          <InputField
            icon={FaCalendarAlt}
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={profile.dateOfBirth}
            onChange={handleChange}
            disabled={!isEditing}
          />
          {profile.role === "Worker" && (
            <>
              <InputField
                icon={FaTools}
                label="Skills"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <InputField
                icon={FaTrophy}
                label="Achievements"
                name="achievements"
                value={profile.achievements}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </>
          )}
        </div>

        {/* Edit Profile Buttons */}
        <div className="mt-8 text-center space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800 transition"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-900 transition flex items-center gap-2"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>

        {/* Update Email Section */}
        <div className="mt-10">
          <h4 className="text-xl font-semibold mb-4">Update Email</h4>
          {!showUpdateEmailForm ? (
            <button
              onClick={() => setShowUpdateEmailForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Email
            </button>
          ) : (
            <div className="space-y-4">
              <InputField
                icon={FaEnvelope}
                label="New Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleUpdateEmail}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Submit"}
                </button>
                <button
                  onClick={() => setShowUpdateEmailForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Update Password Section */}
        <div className="mt-10">
          <h4 className="text-xl font-semibold mb-4">Update Password</h4>
          {!showUpdatePasswordForm ? (
            <button
              onClick={() => setShowUpdatePasswordForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Password
            </button>
          ) : (
            <div className="space-y-4">
              <InputField
                icon={FaLock}
                label="Old Password"
                name="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <InputField
                icon={FaLock}
                label="New Password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputField
                icon={FaLock}
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleUpdatePassword}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Submit"}
                </button>
                <button
                  onClick={() => setShowUpdatePasswordForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const InputField = ({ icon: Icon, label, name, type = "text", value, onChange, disabled }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 shadow-inner focus-within:ring-2 focus-within:ring-green-500">
      <Icon className="text-gray-600 mr-3" />
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full bg-transparent focus:outline-none"
        disabled={disabled}
      />
    </div>
  </div>
);

const SelectField = ({ icon: Icon, label, name, value, onChange, disabled, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-50 shadow-inner focus-within:ring-2 focus-within:ring-green-500">
      <Icon className="text-gray-600 mr-3" />
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full bg-transparent focus:outline-none"
        disabled={disabled}
      >
        <option value="">Select {label}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default Profile;