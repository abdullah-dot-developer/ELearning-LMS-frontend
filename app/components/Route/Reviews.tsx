"use client";
import React from "react";
import ReviewsCard from "../review/ReviewsCard";

export const reviews = [
  {
    name: "Bill Gates",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s",
    profession: "Student | Cambridge University",
    comment:
      "This is absolutely the most insightful course I have ever seen on the internet.",
  },
  {
    name: "Elon Musk",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s",
    profession: "Entrepreneur | CEO of Tesla",
    comment: "A fantastic course with great content! Highly recommend it.",
  },
  {
    name: "Sundar Pichai",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s",
    profession: "Engineer | CEO of Google",
    comment:
      "Extremely well-structured course, perfect for beginners and advanced learners alike.",
  },
  {
    name: "Sheryl Sandberg",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s",
    profession: "COO | Facebook",
    comment:
      "This course covered all the topics I needed to excel in my career. Thanks a lot!",
  },
  {
    name: "Warren Buffett",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s",
    profession: "Investor | CEO of Berkshire Hathaway",
    comment:
      "Practical and valuable content. This course exceeded my expectations.",
  },
  {
    name: "Angela Merkel",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgD14vQ6I-UBiHTcwxZYnpSfLFJ2fclwS2A&s",
    profession: "Former Chancellor | Germany",
    comment:
      "A comprehensive guide! I learned so much and feel confident in applying this knowledge.",
  },
  //   {
  //     name: "Satya Nadella",
  //     avatar:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZQOSpq6F85ae8F0VmEZVVFGLdAvL1CgT8pw&s",
  //     profession: "CEO | Microsoft",
  //     comment:
  //       "The best online course I've attended—very informative and engaging.",
  //   },
  //   {
  //     name: "Malala Yousafzai",
  //     avatar:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzCr_YxOn3-gXc6yZ0fOqDHdZgFnpYFOf7A&s",
  //     profession: "Activist | Nobel Laureate",
  //     comment: "An amazing course that offers a lot of real-world insights!",
  //   },
];

const Reviews = () => {
  return (
    <div className="w-[90%] 800px:w-[80%] m-auto my-8 font-Poppins">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold dark:text-white text-black">
          Courses Reviews
        </h2>
        <p className="text-gray-400 font-semibold mt-2 text-sm sm:text-base lg:text-lg">
          Our students are <span className="text-blue-700">Our Strength.</span>{" "}
          Say what they say about us
        </p>
      </div>

      {/* Courses Grid */}
      {reviews?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review: any, index: number) => (
            <>
              <ReviewsCard review={review} key={index} />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
