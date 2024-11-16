"use client";
import AllUsers from "../../../app/components/Admin/Users/AllUsers";
import DashboardHero from "../../../app/components/Admin/DashboardHero";
import AdminSidebar from "../../../app/components/Admin/Sidebar/AdminSidebar";
import AdminProtected from "../../../app/hooks/adminProtected";
import Heading from "../../../app/utils/Heading";
import React from "react";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ELearning - Admin"
          description="This is all about modern web development using mongoDB, Express, React and Node"
          keywords="Programming, Coding, Web Development, Frontend Development, Backend Development"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <AllUsers isTeam={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
