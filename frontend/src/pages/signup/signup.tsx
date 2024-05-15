import { Link } from "react-router-dom";
import * as Yup from "yup";
import { SignupAPi } from "../../api/auth";
import { IUser } from "../../interface/user";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { AxiosError } from "axios";
import { ApiResponse } from "../../types/api";
import { NotificationContext } from "../../context/notification/notificationContext";
import { useContext, useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/16/solid";

const SignupSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "Minimum three charachrters are required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Mnimum 8 charachters are required"),
  });
};

export default function Signup() {
  const navigate = useNavigate();
  const { setNotification } = useContext(NotificationContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const userSignUp = (values: IUser) => {
    values.image = ""; //empty for now
    SignupAPi(values)
      .then((res) => {
        if (res.data.success) {
          setNotification({
            type: "success",
            message: res.data.message,
            show: true,
          });
          navigate("/login");
        }
      })
      .catch((error: AxiosError<ApiResponse>) => {
        if (error.response) {
          setNotification({
            type: "error",
            message: error.response.data.message,
            show: true,
          });
          return;
        }
        setNotification({
          type: "error",
          message: "Sign up failed",
          show: true,
        });
      });
  };
  return (
    <article className="pros prose-xl">
      <div className="lg:w-3/4 mx-auto w-11/12">
        <div className="sm:flex flex-wrap flex-col justify-center min-h-screen items-center ">
          <div className="py-10 sm:shadow-xl sm:p-32 text-center rounded">
            <Link to="/" className="text-5xl font-gilroy-bold cursor-pointer text-secondary">
              Ping
            </Link>
            <h3>Create a new account</h3>
            <h4>Please enter your details to register.</h4>
            <Formik initialValues={{ email: "", password: "", name: "" }} onSubmit={(values) => userSignUp(values)} validationSchema={SignupSchema}>
              {({ errors, touched }) => (
                <Form className="flex flex-wrap flex-col justify-center items-center mb-3">
                  <Field className="w-5/6 sm:w-full shadow p-2 m-3 border text-gray-700 focus:outline-none focus:shadow-secondary-light" name="name" type="text" placeholder="Full Name"/>
                  {touched.name && errors.name && <div className="w-5/6 sm:w-full text-red-600 text-left">{errors.name}</div>}
                  <Field className="w-5/6 sm:w-full shadow p-2 m-3 border text-gray-700 focus:outline-none focus:shadow-secondary-light" name="email" type="text" placeholder="Email"  autoComplete="email"/>
                  {touched.email && errors.email && <div className="w-5/6 sm:w-full text-red-600 text-left">{errors.email}</div>}
                  <div className="w-100 relative w-full">
                    <Field
                      className=" w-5/6 sm:w-full shadow p-2 my-3 border text-gray-700 focus:outline-none focus:shadow-secondary-light"
                      name="password"
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    {showPassword ? (
                      <EyeSlashIcon className="absolute right-0 top-0 h-full w-9 text-secondary hover:cursor-pointer" onClick={() => setShowPassword(false)} />
                    ) : (
                      <EyeIcon className="absolute right-0 top-0 h-full text-secondary w-9 hover:cursor-pointer" onClick={() => setShowPassword(true)} />
                    )}
                  </div>
                  {touched.password && errors.password && <div className="w-5/6 sm:w-full text-red-600 text-left">{errors.password}</div>}
                  <button className="bg-secondary text-white py-2 px-8 rounded-sm m-3" type="submit">
                    Register
                  </button>
                </Form>
              )}
            </Formik>
            <div className="sm:flex">
              <h6 className="px-2">Already have an account?</h6>
              <Link to="/login" className="text-secondary">
                Login Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
