import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "../../../../app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
    if (isSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handleAddCategories = async (id: any, title: string) => {
    setCategories((prevCategory: any) => {
      return prevCategory.map((category: any) => {
        if (category._id === id) {
          return { ...category, title };
        } else {
          return category;
        }
      });
    });
    // await editLayout({ type: "Categories", categories: [{ _id: id, title }] });
    // refetch();
  };

  const handleAddNewCategory = async () => {
    if (categories[categories.length - 1]?.title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((category: any) => category.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data?.layout?.categories, categories) ||
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({ type: "Categories", categories });
    }
  };

  return (
    <div>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="text-center">
            <h1 className={`${styles.title}`}>All Categories</h1>
            {categories &&
              categories.map((item: any, index: number) => (
                <div key={index} className="p-3">
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item?.title}
                      onChange={(e) => {
                        handleAddCategories(item._id, e.target.value);
                      }}
                      placeholder="Enter category title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: any) => {
                          return prevCategory.filter(
                            (category: any) => category._id !== item._id
                          );
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            <br />
            <br />
            <div className="w-full flex justify-center">
              <IoMdAddCircleOutline
                className="dark:text-white text-black text-[18px] cursor-pointer"
                onClick={handleAddNewCategory}
              />
            </div>
            <div
              className={`${
                styles.button
              } !w-[100px] !min-h-[45px] !h-[45px] !dark:text-white !text-black !bg-[#cccccc34] ${
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-blue-600"
              } !rounded absolute bottom-12 right-12`}
              onClick={
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? () => null
                  : editCategoriesHandler
              }
            >
              Save
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default EditCategories;
