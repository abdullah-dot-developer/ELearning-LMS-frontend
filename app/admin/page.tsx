"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";

const page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ELearning - Admin"
          description="This is all about modern web development using mongoDB, Express, React and Node"
          keywords="Programming, Coding, Web Development, Frontend Development, Backend Development"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
