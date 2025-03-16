import { useGetCourseDetailsQuery } from "../../../redux/features/courses/coursesApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "../../../app/utils/Heading";
import Header from "../Header";
import Footer from "../footer/Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "../../../redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data: userData } = useLoadUserQuery(undefined, {});
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  // console.log(paymentIntentData);
  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data && userData?.user) {
      const amount = Math.round(data?.course.coursePrice * 100);
      createPaymentIntent(amount);
    }
  }, [config, data, userData, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  console.log(data);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={`${data?.course?.courseName} - ELearning`}
            description="This is all about modern web development using mongoDB, Express, React and Node"
            keywords={`${data?.course?.tags}`}
          />
          <Header
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
            activeItems={1}
          />
          {stripePromise && (
            <CourseDetails
              data={data?.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
