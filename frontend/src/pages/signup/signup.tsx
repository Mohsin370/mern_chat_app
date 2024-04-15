import { Link } from "react-router-dom";
import * as Yup from "yup";
import {  SignupAPi } from "../../api/auth";
import { IUserSignUp } from "../../interface/user";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const SignupSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Name is required").min(2, "Minimum two charachrters are required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Mnimum 8 charachters are required"),
  });
};

export default function Signup() {
  const navigate = useNavigate();
  const userSignUp = (values: IUserSignUp) => {
    SignupAPi(values).then((res) => {
      if (res.data.success) {
        navigate("/login");
      }else{
        //error notificaition
      }
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
                  <Field className="w-5/6 sm:w-full shadow p-2 m-3 border text-gray-700 focus:outline-none focus:shadow-secondary-light" name="name" type="text" placeholder="Full Name" />
                  {touched.name && errors.name && <div className="w-full text-red-600 text-left">{errors.name}</div>}
                  <Field className="w-5/6 sm:w-full shadow p-2 m-3 border text-gray-700 focus:outline-none focus:shadow-secondary-light" name="email" type="text" placeholder="Email" />
                  {touched.email && errors.email && <div className="w-full text-red-600 text-left">{errors.email}</div>}
                  <Field className=" w-5/6 sm:w-full shadow p-2 m-3 border text-gray-700 focus:outline-none focus:shadow-secondary-light" name="password" type="password" placeholder="Password" />
                  {touched.password && errors.password && <div className="w-full text-red-600 text-left">{errors.password}</div>}
                  <button className="bg-secondary text-white py-2 px-8 rounded-sm m-3">Register</button>
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
