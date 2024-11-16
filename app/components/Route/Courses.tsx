"use client";
import { useGetUsersAllCoursesQuery } from "../../../redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../course/CourseCard";
import Loader from "../Loader/Loader";

const Courses = () => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto py-10 font-Poppins">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold dark:text-white text-black">
          Our Courses
        </h2>
        <p className="text-gray-600 font-semibold mt-2 text-sm sm:text-base lg:text-lg">
          Explore a variety of courses to enhance your skills and knowledge
        </p>
      </div>

      {/* Courses Grid */}
      {!isLoading && courses?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => (
            <>
              <CourseCard course={course} key={course._id} />
            </>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Courses;
