"use client";
import React, { useEffect, useState } from "react";
import ThemeSwitcher from "../../../app/utils/ThemeSwitcher";
import { BiBell } from "react-icons/bi";
import socketIO from "socket.io-client";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "../../../redux/features/notifications/notificationsApi";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

type Props = {
  open?: boolean;
  setOpen?: any;
};

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const DashboardHeader: React.FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/dig1xnhyl/video/upload/v1696192391/avatars/notification_vcetjn_vqbbbk.mp3"
      )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess, audio, refetch]);

  useEffect(() => {
    socketId.on("newNotification", () => {
      refetch();
      playNotificationSound();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <header className="text-white p-4 flex justify-end items-center">
      {/* ThemeSwitcher Component */}
      <ThemeSwitcher />

      {/* Notification Icon */}
      <div className="relative ml-4">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-full hover:bg-gray-700 transition relative"
        >
          <BiBell className="w-6 h-6 dark:text-white text-black" />
          {/* Display notification count if needed */}
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-96 font-Poppins bg-gray-800 text-white shadow-lg rounded-lg h-72 overflow-y-auto overflow-x-hidden">
            <h1 className="p-2 text-center text-lg font-semibold font-Poppins">
              Notification
            </h1>
            {notifications &&
              notifications.map((notification: any, index: number) => (
                <div className="p-2 " key={index}>
                  <div className="px-4 py-2 text-sm">
                    <strong>{notification.title}</strong>
                    <div className="mt-1">{notification.message}</div>
                    <div className="mt-1 text-gray-400">
                      {timeAgo.format(new Date(notification.createdAt))}
                    </div>
                    <button
                      className="mt-2 text-blue-500 hover:underline"
                      onClick={() => {
                        // Handle mark as read action here
                        setOpen(false);
                        handleNotificationStatusChange(notification._id);
                      }}
                    >
                      Mark as read
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
