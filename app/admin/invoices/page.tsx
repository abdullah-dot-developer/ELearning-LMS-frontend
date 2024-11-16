"use client";
import AdminSidebar from "../../../app/components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import React from "react";
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";
import AllInvoices from "../../../app/components/Admin/orders/AllInvoices";

const page = () => {
  return (
    <div>
      <Heading
        title="ELearning - Courses Analytics"
        description="This is all about modern web development using mongoDB, Express, React and Node"
        keywords="Programming, Coding, Web Development, Frontend Development, Backend Development"
      />
      <div className="flex min-h-screen max-h-full">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <AllInvoices />
        </div>
      </div>
    </div>
  );
};

export default page;
