"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "../../../../redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  const { data } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const courseToBeUpdated =
    data && data.courses.find((item: any) => item._id === id);

  //   console.log(courseToBeUpdated);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Updated Successfully!");
      redirect("/admin/live-courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (courseToBeUpdated) {
      setCourseInfo({
        courseName: courseToBeUpdated.courseName,
        courseDescription: courseToBeUpdated.courseDescription,
        coursePrice: courseToBeUpdated.coursePrice,
        courseEstimatedPrice: courseToBeUpdated.courseEstimatedPrice,
        tags: courseToBeUpdated.tags,
        level: courseToBeUpdated.level,
        demoVideoUrl: courseToBeUpdated.demoVideoUrl,
        thumbnail: courseToBeUpdated.thumbnail?.url,
      });
      //   console.log(courseInfo.thumbnail);
      setBenefits(courseToBeUpdated.benefits);
      setPrerequisites(courseToBeUpdated.prerequisites);
      setCourseContentData(courseToBeUpdated.courseData);
    }
  }, [courseToBeUpdated]);

  const [courseInfo, setCourseInfo] = useState({
    courseName: "",
    courseDescription: "",
    coursePrice: "",
    courseEstimatedPrice: "",
    tags: "",
    level: "",
    demoVideoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    const formattedBenefit = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisite = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    const formattedCourseContent = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: content.suggestion,
    }));

    const data = {
      courseName: courseInfo.courseName,
      courseDescription: courseInfo.courseDescription,
      coursePrice: courseInfo.coursePrice,
      courseEstimatedPrice: courseInfo.courseEstimatedPrice,
      thumbnail: courseInfo.thumbnail, //thumbnail
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoVideoUrl: courseInfo.demoVideoUrl,
      benefits: formattedBenefit,
      prerequisites: formattedPrerequisite,
      courseData: formattedCourseContent,
      totalVideos: courseContentData.length,
    };
    setCourseData(data);
  };

  const handleCourseCreate = async () => {
    const data = courseData;
    const id = courseToBeUpdated?._id;
    await editCourse({ id, data });
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-16 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
