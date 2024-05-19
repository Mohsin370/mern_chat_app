import { Formik, Form, Field } from "formik";
import { Link, Outlet } from "react-router-dom";
import * as Yup from "yup";
import { LoginApi } from "../../api/auth";
import { IUserLogin } from "../../interface/user";
import { useNavigate } from "react-router-dom";

import { NotificationContext } from "../../context/notification/notificationContext";
import { AuthContext } from "../../context/auth/authContext";
import { useContext } from "react";
import { AxiosError } from "axios";
import { ApiResponse } from "../../types/api";

const loginSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
};

export default function Login() {
  const navigate = useNavigate();
  const { setNotification } = useContext(NotificationContext);
  const { setUser } = useContext(AuthContext);

  const userLogin = (values: IUserLogin) => {
    LoginApi(values)
      .then((res) => {
        if (res.data.success) {
          setNotification({
            type: "success",
            message: res.data.message,
            show: true,
          });

          setUser({
            id: res.data.user.id,
            name: res.data.user.name,
            email: res.data.user.email,
            token: res.data.user.token,
          });

          localStorage.setItem("user", JSON.stringify(res.data.user));

          navigate("/chat");
        } else {
          setNotification({
            type: "error",
            message: res.data.message,
            show: true,
          });
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
          message: "Login Failed",
          show: true,
        });
      });
  };

  return (
    <article className="pros prose-xl">
      <div className="mx-auto w-11/12 lg:w-3/4">
        <div className="min-h-screen flex-col flex-wrap items-center justify-center sm:flex ">
          <div className="rounded py-10 text-center sm:p-32 sm:shadow-xl">
            <Link to="/" className="cursor-pointer font-gilroy-bold text-5xl text-secondary">
              Ping
            </Link>
            <h3>Welcome Back</h3>
            <h4>Please enter your login details.</h4>
            <Formik initialValues={{ email: "", password: "" }} onSubmit={(values) => userLogin(values)} validationSchema={loginSchema}>
              {({ errors, touched }) => (
                <Form className="mb-3 flex flex-col flex-wrap items-center justify-center">
                  <Field
                    className="m-3 w-5/6 border p-2 text-gray-700 shadow focus:shadow-secondary-light focus:outline-none sm:w-full"
                    type="text"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                  />
                  {touched.email && errors.email && <div className="w-5/6 text-left text-red-600 sm:w-full">{errors.email}</div>}
                  <Field
                    className=" m-3 w-5/6 border p-2 text-gray-700 shadow focus:shadow-secondary-light focus:outline-none sm:w-full"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    placeholder="Password"
                  />
                  {touched.password && errors.password && <div className="w-5/6 text-left text-red-600 sm:w-full">{errors.password}</div>}
                  <Link to="/forgot-password" className="py-2 text-lg text-secondary">
                    Forgot Password?
                  </Link>
                  <button type="submit" className="m-3 rounded-sm bg-secondary px-8 py-2 text-white">
                    Login
                  </button>
                </Form>
              )}
            </Formik>
            <div className="sm:flex">
              <h6 className="px-2">Don't have an account?</h6>
              <Link to="/signup" className="text-secondary">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </article>
  );
}
