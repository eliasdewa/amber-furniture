import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const ProfilePage = () => {
  const { currentUser } = useUserStore();

  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const res = await fetch(`/api/user/update/${currentUser._id}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await res.json();
    //   if (data.success === false) {
    //     return;
    //   }
    //   setUpdateSuccess(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleDeleteAccount = async () => {
    // try {
    //   const res = await fetch(`/api/user/delete/${currentUser._id}`, {
    //     method: 'DELETE',
    //   });
    //   const data = await res.json();
    //   if (data.success === false) {
    //     return;
    //   }
    //   deleteUser(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p> */}
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-700 text-white p-3 mx-auto w-full rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Delete Account
        </button>
      </div>
      {/* <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p> */}
      {/* <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully!'}
      </p> */}
    </div>
  );
};
export default ProfilePage;
