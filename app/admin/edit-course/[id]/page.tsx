"use client";
import EditCourse from "../../../../app/components/Admin/Course/EditCourse";
import DashboardHeader from "../../../../app/components/Admin/DashboardHeader";
import AdminSidebar from "../../../../app/components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../../app/utils/Heading";
import React from "react";

const Page = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <Heading
        title="ELearning - Create Course"
        description="This is all about modern web development using mongoDB, Express, React and Node"
        keywords="Programming, Coding, Web Development, Frontend Development, Backend Development"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
