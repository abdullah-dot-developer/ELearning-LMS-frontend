"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/footer/Footer";
import About from "./About";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(2);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="About us - CoursePool"
        description="ELearning is a dynamic online e-learning platform that offers a wide range of courses to students of all ages and backgrounds"
        keywords="Programming, App Development, Web Development, DevOps, Engineering, Machine Learning, UPSC, Cyber Security, Maths, Gate, Jee, Neet"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItems={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <About />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Page;
