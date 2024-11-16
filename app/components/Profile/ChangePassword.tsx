import toast from "react-hot-toast";
import { styles } from "../../../app/styles/style";
import { useUpdatePasswordMutation } from "../../../redux/features/user/userApi";
import React, { useEffect, useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated Successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full px-8 800px:px-[70px] flex flex-col justify-center items-center mx-auto">
      <div className="relative flex justify-center">
        <div className="font-Poppins text-center font-semibold text-2xl dark:text-white text-black">
          Change Password
        </div>
      </div>

      <form onSubmit={passwordChangeHandler} className="mt-6 w-full space-y-4">
        <div>
          <label
            className="block text-gray-900 dark:text-gray-300 font-semibold"
            htmlFor="fullName"
          >
            Enter Your Old Password
          </label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="text"
            required
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            className="mt-1 block w-full px-3 py-2 border dark:border-gray-300 border-gray-600 rounded-md text-black dark:text-white focus:outline-none focus:ring focus:ring-navy-blue"
          />
        </div>
        <div>
          <label
            className="block text-gray-900 dark:text-gray-300 font-semibold"
            htmlFor="fullName"
          >
            Enter Your New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="text"
            required
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            className="mt-1 block w-full px-3 py-2 border dark:border-gray-300 border-gray-600 rounded-md text-black dark:text-white focus:outline-none focus:ring focus:ring-navy-blue"
          />
        </div>
        <div>
          <label
            className="block text-gray-900 dark:text-gray-300 font-semibold"
            htmlFor="fullName"
          >
            Confirm Your New Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="text"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="mt-1 block w-full px-3 py-2 border dark:border-gray-300 border-gray-600 rounded-md text-black dark:text-white focus:outline-none focus:ring focus:ring-navy-blue"
          />
        </div>

        <div className="text-center flex justify-center">
          <button type="submit" className={`${styles.button} w-[50%] !px-4`}>
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
