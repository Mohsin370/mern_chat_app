import { Link } from "react-router-dom";

export default function Login() {
  return (
    <article className="pros prose-xl">
      <div className="lg:w-3/4 mx-auto w-11/12">
        <div className="flex flex-wrap flex-col justify-center min-h-screen items-center ">
          <div className="sm:shadow-xl sm:p-32 text-center rounded">
            <Link to="/" className="text-5xl font-gilroy-bold cursor-pointer text-secondary">
              Ping
            </Link>
            <h3>Welcome Back</h3>
            <h4>Please enter your login details.</h4>
            <form className="flex flex-wrap flex-col justify-center items-center mb-3">
              <input className="w-5/6 sm:w-full shadow p-2 m-3 border text-gray-700 focus:outline-none focus:shadow-secondary-light" type="text" placeholder="Email" />
              <input className=" w-5/6 sm:w-full shadow p-2 m-3 border text-gray-700 focus:outline-none focus:shadow-secondary-light" type="password" placeholder="Password" />
              <Link to="/forgot-password" className="text-secondary text-lg py-2">
                Forgot Password?
              </Link>
              <button className="bg-secondary text-white py-2 px-8 rounded-sm m-3">Login</button>
            </form>
            <div className="sm:flex">
              <h6 className="px-2">Don't have an account?</h6>
              <Link to="/signup" className="text-secondary">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
