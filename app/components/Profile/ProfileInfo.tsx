import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarDefault from "../../../public/avatar2.png";
import { styles } from "../../../app/styles/style";
import Image from "next/image";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfoPage: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();

  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name,
      });
    }
  };

  const handleAvatarChange = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result as string;
        // console.log(typeof avatar);
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (isSuccess) {
      toast.success("Profile Image updated successfully!");
    }
    if (error) {
      console.log(error);
    }
    if (success) {
      toast.success("Profile updated successfully");
    }
  }, [isSuccess, error, success, updateError]);

  //   console.log(user?.avatar, avatar);

  return (
    <div className="w-full px-8 800px:px-[70px] flex flex-col justify-center items-center mx-auto">
      <div className="relative flex justify-center">
        <div className="w-28 h-28 relative">
          <Image
            src={
              user?.avatar || avatar
                ? user?.avatar.url || avatar
                : avatarDefault
            }
            alt="Profile Avatar"
            width={100}
            height={100}
            className="w-full h-full rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 bg-navy-blue p-1 rounded-full cursor-pointer">
            <div className="rounded-full bg-white dark:bg-gray-800 p-1 ">
              <AiOutlineCamera
                size={20}
                className=" text-black dark:text-white"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              id="avatar"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
        <div>
          <label
            className="block text-gray-900 dark:text-gray-300 font-semibold"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="mt-1 block w-full px-3 py-2 border dark:border-gray-300 border-gray-600 rounded-md text-black dark:text-white focus:outline-none focus:ring focus:ring-navy-blue"
          />
        </div>

        <div>
          <label
            className="block text-gray-900 dark:text-gray-300 font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            readOnly
            // onChange={formik.handleChange}
            value={user?.email}
            className="mt-1 block w-full dark:text-white text-black px-3 py-2 border dark:border-gray-300 border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-navy-blue"
          />
        </div>

        <div className="text-center flex justify-center">
          <button type="submit" className={`${styles.button} w-[50%]`}>
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoPage;
