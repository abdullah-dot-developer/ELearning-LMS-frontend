import {
  useGetHeroDataQuery,
  useEditLayoutMutation,
} from "../../../../redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const EditFaq = () => {
  const { data, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    if (data) {
      setFaqs(data?.layout?.faq || []);
    }
    if (isSuccess) {
      toast.success("FAQ updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleAddFaq = async () => {
    if (!newQuestion || !newAnswer) {
      return toast.error("Please enter both question and answer.");
    }

    const updatedFaqs = [...faqs, { question: newQuestion, answer: newAnswer }];
    setFaqs(updatedFaqs);
    setNewQuestion("");
    setNewAnswer("");

    try {
      // Save the updated FAQ list to the backend
      await editLayout({ type: "FAQ", faqData: updatedFaqs });
      // toast.success("New FAQ added successfully");
      refetch(); // Fetch updated data to refresh the list
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast.error("Failed to add FAQ");
    }
  };

  const handleEditFaq = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveFaq = async () => {
    try {
      await editLayout({ type: "FAQ", faqData: faqs });
      setEditingIndex(null);
      refetch();
    } catch (error) {
      console.error("Error updating FAQ:", error);
    }
  };

  const handleDeleteFaq = (index: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
    editLayout({ type: "FAQ", faqData: updatedFaqs })
      .then(() => {
        // toast.success("FAQ deleted successfully");
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting FAQ:", error);
        toast.error("Failed to delete FAQ");
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit FAQs</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-2">
          {editingIndex === index ? (
            <>
              <input
                type="text"
                value={faq.question}
                onChange={(e) =>
                  setFaqs(
                    faqs.map((f, i) =>
                      i === index ? { ...f, question: e.target.value } : f
                    )
                  )
                }
                className="border p-1 mb-2 w-full"
              />
              <textarea
                value={faq.answer}
                onChange={(e) =>
                  setFaqs(
                    faqs.map((f, i) =>
                      i === index ? { ...f, answer: e.target.value } : f
                    )
                  )
                }
                className="border p-1 w-full"
              />
              <button
                onClick={handleSaveFaq}
                className="bg-green-500 text-white px-2 py-1 mt-1 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div
                onClick={() => handleEditFaq(index)}
                className="cursor-pointer"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
              <button
                onClick={() => handleDeleteFaq(index)}
                className="text-red-500 ml-2"
              >
                <AiOutlineDelete />
              </button>
            </>
          )}
        </div>
      ))}

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Add New FAQ</h3>
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="border p-1 mb-2 w-full"
        />
        <textarea
          placeholder="Enter answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="border p-1 w-full"
        />
        <button
          onClick={handleAddFaq}
          className="bg-blue-500 text-white px-2 py-1 mt-2 rounded flex items-center"
        >
          <AiOutlinePlus className="mr-2" /> Add FAQ
        </button>
      </div>
    </div>
  );
};

export default EditFaq;
