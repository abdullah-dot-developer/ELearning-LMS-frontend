"use client";
import AdminSidebar from "../../../app/components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import React from "react";
import DashboardHero from "../../../app/components/Admin/DashboardHero";
import EditHero from "../../../app/components/Admin/customization/EditHero";

const page = () => {
  return (
    <div>
      <Heading
        title="ELearning - Customize admin"
        description="This is all about modern web development using mongoDB, Express, React and Node"
        keywords="Programming, Coding, Web Development, Frontend Development, Backend Development"
      />
      <div className="flex min-h-screen max-h-full">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <EditHero />
        </div>
      </div>
    </div>
  );
};

export default page;
