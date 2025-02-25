import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: `/get-orders`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublishableKey: builder.query({
      query: (type) => ({
        url: `/payment/stripe-publishable-key`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: `/payment`,
        method: "POST",
        body: { amount },
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ userId, paymentInfo }) => ({
        url: `/create-order`,
        method: "POST",
        body: { userId, paymentInfo },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
} = ordersApi;
