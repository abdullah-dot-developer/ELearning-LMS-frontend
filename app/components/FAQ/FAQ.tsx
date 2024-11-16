import { useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const FAQ = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [question, setQuestion] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestion(data?.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-[90%] max-w-6xl mx-auto my-12 ">
      <h2
        className={`text-center text-2xl sm:text-3xl lg:text-5xl font-bold dark:text-white text-black`}
      >
        Frequently Asked Questions
      </h2>
      {isLoading ? (
        <Loader />
      ) : (
        question.map((item: any) => (
          <div
            key={item._id}
            className="border-b border-gray-200 py-8 cursor-pointer"
            onClick={() => toggleQuestion(item._id)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-500">
                {item.question}
              </h3>
              <span
                className={`text-gray-500 transition-transform duration-200 ${
                  activeQuestion === item._id ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>
            {activeQuestion === item._id && (
              <p className="mt-2 text-gray-600">{item.answer}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default FAQ;
