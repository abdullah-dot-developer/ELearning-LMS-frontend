"use client";
import { useGetHeroDataQuery } from "../../../../redux/features/layout/layoutApi";
import { styles } from "../../../../app/styles/style";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({
            ...courseInfo,
            thumbnail: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({
          ...courseInfo,
          thumbnail: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className="">
        <div>
          <label htmlFor="" className={`${styles.label}`}>
            Course Name
          </label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.courseName}
            onChange={(e: any) => {
              setCourseInfo({ ...courseInfo, courseName: e.target.value });
            }}
            id="courseName"
            placeholder="MERN Stack with Advanced DSA"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id="courseDescription"
            cols={30}
            rows={10}
            placeholder="Write what you are providing to students..."
            className={`${styles.input} !h-min`}
            value={courseInfo.courseDescription}
            onChange={(e: any) => {
              setCourseInfo({
                ...courseInfo,
                courseDescription: e.target.value,
              });
            }}
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.coursePrice}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, coursePrice: e.target.value });
              }}
              id="coursePrice"
              placeholder="500.00"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Estimated price (optional)
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.courseEstimatedPrice}
              onChange={(e: any) => {
                setCourseInfo({
                  ...courseInfo,
                  courseEstimatedPrice: e.target.value,
                });
              }}
              id="courseEstimatedPrice"
              placeholder="399.99"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between ">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course tags
            </label>
            <input
              type="text"
              name=""
              value={courseInfo.tags}
              onChange={(e: any) => {
                setCourseInfo({
                  ...courseInfo,
                  tags: e.target.value,
                });
              }}
              id="tags"
              placeholder="MERN, NEXTJS 13, REACT, NODEJS, C++"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label} w-[50%]`}>
              Course Categories
            </label>
            <select
              name=""
              id=""
              className={`${styles.input} `}
              value={courseInfo.category}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, category: e.target.value });
              }}
            >
              <option value="" className="bg-[#05080C] text-white ">
                Select Category
              </option>
              {categories.map((item: any) => (
                <option
                  value={item?.title}
                  key={item?._id}
                  className="bg-[#05080C] text-white "
                >
                  {item?.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />
        <div className="w-full flex justify-between ">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, level: e.target.value });
              }}
              id="level"
              placeholder="Beginner/Intermediate/Advanced"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Demo Url
            </label>
            <input
              type="text"
              name=""
              value={courseInfo.demoVideoUrl}
              onChange={(e: any) => {
                setCourseInfo({
                  ...courseInfo,
                  demoVideoUrl: e.target.value,
                });
              }}
              id="demoVideoUrl"
              placeholder="eeffad3fds"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="Course Thumbnail"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and Drop your Thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <button
            type="submit"
            className={`w-full 800px:w-[100px] h-[40px] bg-[#2190ff] text-center text-[#fff] rounded mt-8 cursor-pointer`}
          >
            Submit
          </button>
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
