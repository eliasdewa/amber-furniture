import { useRef, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser, updateUser } = useUserStore();
  // console.log(currentUser);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    profileImg: currentUser?.profileImg || "",
  });

  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImg") {
      setFormData((prev) => ({
        ...prev,
        profileImg: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData for file upload
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    if (formData.profileImg) data.append("profileImg", formData.profileImg);

    await updateUser(data);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Image Upload */}
        <div className="mb-4">
          <div className="flex justify-center items-center">
            <input
              type="file"
              name="profileImg"
              accept="image/*"
              ref={fileRef}
              hidden
              onChange={handleChange}
            />

            <img
              src={formData.profileImg || currentUser.profileImg}
              onClick={() => fileRef.current.click()}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        </div>
        {/* username */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {/* email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {/* password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password (optional)
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};
export default ProfilePage;
