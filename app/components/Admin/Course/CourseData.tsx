"use client";
import { MdAddCircleOutline } from "react-icons/md";
import { styles } from "../../../../app/styles/style";
import React, { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (benefits: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisite = [...prerequisites];
    updatedPrerequisite[index].title = value;
    setPrerequisites(updatedPrerequisite);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the benefits for students in this course.
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            name="benefits"
            key={index}
            placeholder="You will be able to build full stack dynamic websites..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e: any) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <MdAddCircleOutline
          size={30}
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          className="dark:text-white text-black"
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label htmlFor="email" className={`${styles.label} text-[20px]`}>
          What are the prerequisites for students in this course.
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            name="prerequisites"
            key={index}
            placeholder="You should be familiar with basics of HTML, CSS..."
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e: any) =>
              handlePrerequisitesChange(index, e.target.value)
            }
          />
        ))}
        <MdAddCircleOutline
          size={30}
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          className="dark:text-white text-black"
          onClick={handleAddPrerequisite}
        />
      </div>
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
            onClick={() => handleOptions()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseData;
