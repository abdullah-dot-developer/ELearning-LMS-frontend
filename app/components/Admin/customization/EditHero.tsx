import toast from "react-hot-toast";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../../redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";

const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  useEffect(() => {
    if (data) {
      setImage(data?.layout?.banner?.image?.url);
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subtitle);
    }
    if (isSuccess) {
      refetch();
      toast.success("Layout updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  // console.log(data);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target?.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  // console.log(image);
  const handleSave = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subtitle: subTitle,
    });
  };

  return (
    <div className="p-4">
      <section className="relative py-12 overflow-hidden dark:bg-gradient-to-b dark:from-gray-800 dark:to-black sm:pb-16 lg:pb-20 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            <div>
              {isEditingTitle ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  className="w-full text-4xl font-normal text-black dark:text-white sm:text-5xl lg:text-6xl xl:text-7xl bg-transparent border-none outline-none"
                  autoFocus
                />
              ) : (
                <h1
                  onClick={() => setIsEditingTitle(true)}
                  className="text-4xl font-normal text-black dark:text-white cursor-pointer sm:text-5xl lg:text-6xl xl:text-7xl"
                >
                  {title ||
                    "Improve Your Online Learning Experience Better Instantly."}
                </h1>
              )}
              {isEditingSubtitle ? (
                <textarea
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  onBlur={() => setIsEditingSubtitle(false)}
                  className="mt-4 w-full text-lg font-normal text-gray-600 bg-transparent border-none outline-none sm:mt-8"
                  autoFocus
                />
              ) : (
                <p
                  onClick={() => setIsEditingSubtitle(true)}
                  className="mt-4 text-lg font-normal text-gray-600 cursor-pointer sm:mt-8"
                >
                  {subTitle ||
                    "We have 40k+ online course and 500k+ students. Find your desired Course from here."}
                </p>
              )}
            </div>

            <div className="relative">
              <img
                className="relative w-full max-w-md mx-auto"
                src={
                  image ||
                  "https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/2/illustration.png"
                }
                alt="Hero Image"
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Button aligned to the center at the bottom */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditHero;
