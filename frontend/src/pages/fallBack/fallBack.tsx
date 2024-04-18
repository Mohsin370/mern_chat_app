import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import Lost_3d from "../../assets/lost_3d.png";

export default function FallBack() {
  return (
    <div className="min-h-dvh sm:grid grid-cols-2">
      <div className="flex flex-col justify-center items-center text-center px-3 h-dvh">
        <span className="text-primary-light">404 error</span>
        <h1 className="font-extrabold lg:text-7xl my-3 text-5xl">Something's missing</h1>
        <p className="text-lg mb-12  w-3/4">You're seeing this page because the URL you entered does'nt exist.</p>
        <Link to="/">
          <button className="text-white flex justify-between items-center px-3 py-4 bg-secondary rounded-sm">
            <ArrowLeftIcon className="h-6" />
            <span className="pl-3">Go back home</span>
          </button>
        </Link>
      </div>
      <div className="hidden min-h-dvh sm:flex">
        <img className=" rounded-lg m-auto max-w-8xl" src={Lost_3d} alt="404" />
      </div>
    </div>
  );
}
