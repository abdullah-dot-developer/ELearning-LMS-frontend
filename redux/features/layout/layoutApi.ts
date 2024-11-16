import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `/get-layout/${type}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    editLayout: builder.mutation({
      query: ({ type, image, title, subtitle, faqData, categories }) => ({
        url: `/edit-layout`,
        method: "PUT",
        body: {
          type,
          image,
          title,
          subtitle,
          faqData,
          categories,
        },
        credentials: "include",
      }),
    }),
  }),
});
export const { useGetHeroDataQuery, useEditLayoutMutation } = layoutApi;
