import Ratings from "../../../app/utils/Ratings";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  course: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ course, isProfile }) => {
  //   console.log(course);
  return (
    <Link
      href={
        !isProfile ? `/course/${course?._id}` : `/course-access/${course?._id}`
      }
    >
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
        <img
          className="p-8 rounded-t-lg"
          src={course?.thumbnail?.url}
          alt="Course Image"
        />

        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {course?.courseName}
          </h5>
          <div className="w-full flex items-center justify-between py-2">
            <Ratings rating={course?.ratings} />
            <h5
              className={`text-black dark:text-white ${
                isProfile && "hidden 800px:inline"
              }`}
            >
              {course?.purchased} Students
            </h5>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {course?.courseEstimatedPrice === 0
                ? "FREE"
                : "$" + course?.courseEstimatedPrice}
            </span>
            <p className="flex gap-2 text-black dark:text-white">
              <AiOutlineUnorderedList size={20} />
              {course?.courseData.length} Lecture
              {course?.courseData.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
