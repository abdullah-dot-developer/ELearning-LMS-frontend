"use client";
import React, { useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/footer/Footer";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItems] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user?.name} - Profile`}
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
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
