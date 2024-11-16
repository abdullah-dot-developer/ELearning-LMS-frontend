import Link from "next/link";
import React, { FC } from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  activeItems: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItems, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItems === index
                    ? "dark:text-[#37e39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      <div>
        {isMobile && (
          <div className="800px:hidden mt-5">
            <div className="w-full text-center py-6">
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                passHref
              >
                <span
                  className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                >
                  ELearning
                </span>
              </Link>
            </div>
            {navItemsData &&
              navItemsData.map((item, index) => (
                <Link href={`${item.url}`} key={index} passHref>
                  <span
                    className={`${
                      activeItems === index
                        ? "dark:text-[#37e39a] text-[crimson]"
                        : "dark:text-white text-black"
                    } block text-[18px] py-5 px-6 font-Poppins font-[400]`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NavItems;
