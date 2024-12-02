import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useEmailStore } from "../../stores/useEmailStore";

const AllSubscribers = () => {
  const { getAllEmails, deleteEmail, emails, loading } = useEmailStore();

  useEffect(() => {
    getAllEmails();
  }, [getAllEmails]);
  // handle user deletion
  const handleDeleteEmail = async (id) => {
    deleteEmail(id);
  };

  if (loading) return <Loading />;
  return (
    <section className="w-full mb-12 xl:mb-0 mx-auto">
      <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <h3 className="font-semibold text-base">All email subscribers</h3>
        </div>
        <div className="container mx-auto p-6">
          {emails.length === 0 ? (
            <div>No subscriber found!</div>
          ) : (
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      #
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {emails ? (
                    emails.map((email, index) => (
                      <tr key={index}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {email.email}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4 text-left">
                          <button
                            onClick={() => handleDeleteEmail(email._id)}
                            className="font-medium hover:text-red-500"
                          >
                            <i className="ri-delete-bin-6-line ri-xl"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className="text-center p-8 text-lg font-bold">
                      No Subscribers found
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default AllSubscribers;
