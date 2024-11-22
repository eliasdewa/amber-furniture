import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useUserStore } from "../../stores/useUserStore";

const AllUsers = () => {
  // get all users
  const { getAllUsers, deleteUser, users, loading } = useUserStore();

	useEffect(() => {
		getAllUsers();
	}, [getAllUsers]);
  // handle user deletion
  const handleDeleteUser = async (userId) => {
    deleteUser(userId);
  };

  if (loading) return <Loading />;
  return (
    <section className="w-full mb-12 xl:mb-0 mx-auto">
      <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <h3 className="font-semibold text-base">All Users</h3>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse ">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Id
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Role
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {user._id}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {user.username}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {user.email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {user.role}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4 text-left">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="font-medium hover:text-red-500"
                      >
                        <i className="ri-delete-bin-6-line ri-xl"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="text-center p-8 text-lg font-bold">
                  No Users found
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default AllUsers;
