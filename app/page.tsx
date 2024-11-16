"use client";

import React, { useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/footer/Footer";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItems] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div className="font-Poppins">
      <Heading
        title="ELearning"
        description="This is all about modern web development using mongoDB, Express, React and Node"
        keywords="Programming, Coding, Web Development, Frontend Development, Backend Development"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItems={activeItems}
        route={route}
        setRoute={setRoute}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
