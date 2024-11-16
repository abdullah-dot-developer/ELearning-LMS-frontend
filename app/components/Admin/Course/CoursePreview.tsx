"use client";
import Ratings from "../../../../app/utils/Ratings";
import { styles } from "../../../../app/styles/style";
import CoursePlayer from "../../../../app/utils/CoursePlayer";
import React, { FC } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}) => {
  // console.log(courseData);
  const discoutPercentage =
    ((courseData?.courseEstimatedPrice - courseData?.coursePrice) /
      courseData?.courseEstimatedPrice) *
    100;

  const discountPercentagePrice = discoutPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoVideoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.coursePrice === 0
              ? "Free"
              : "$ " + courseData?.coursePrice}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            ${courseData.courseEstimatedPrice}
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentagePrice} % OFF
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now ${courseData?.coursePrice}
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Discount Code..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] !ml-3 !mt-0`}
            name=""
            id=""
          />
          <div
            className={`${styles.button} !w-[120px] !my-3 !ml-4 !font-Poppins  !cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1">(a). Source Code Included</p>
        <p className="pb-1">(b). Lifetime access</p>
        <p className="pb-1">(c). Completion Certificate</p>
        <p className="pb-3 800px:pb-1">(d). Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {courseData?.courseName}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
        </div>
        <br />
        <h1 className="text-[25px] font-Poppins font-[600]">
          What you will learn from this course?
        </h1>
        {courseData?.benefits.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoMdCheckmarkCircleOutline size={20} />
            </div>
            <p className="pl-2">{item?.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className="text-[25px] font-Poppins font-[600]">
          What are the prerequisites for this cousrse?
        </h1>
        {courseData?.prerequisites.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] mr-1">
              <IoMdCheckmarkCircleOutline size={20} />
            </div>
            <p className="pl-2">{item?.title}</p>
          </div>
        ))}
        <br />
        <br />
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
            {courseData?.courseDescription}
          </p>
        </div>
        <br />
        <br />
        <div className="w-full flex items-center justify-between">
          <div>
            <button
              className={`w-full 800px:w-[100px] h-[40px] bg-[#2190ff] text-center text-[#fff] rounded mt-8 cursor-pointer`}
              onClick={() => prevButton()}
            >
              Back
            </button>
          </div>
          <div>
            <button
              className={`w-full 800px:w-[100px] h-[40px] bg-[#2190ff] text-center text-[#fff] rounded mt-8 cursor-pointer`}
              onClick={() => createCourse()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
