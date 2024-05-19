import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import Lost_3d from "../../assets/lost_3d.png";

export default function FallBack() {
  return (
    <div className="min-h-dvh grid-cols-2 sm:grid">
      <div className="flex h-dvh flex-col items-center justify-center px-3 text-center">
        <span className="text-primary-light">404 error</span>
        <h1 className="my-3 text-5xl font-extrabold lg:text-7xl">Something's missing</h1>
        <p className="mb-12 w-3/4  text-lg">You're seeing this page because the URL you entered does'nt exist.</p>
        <Link to="/">
          <button className="flex items-center justify-between rounded-sm bg-secondary px-3 py-4 text-white">
            <ArrowLeftIcon className="h-6" />
            <span className="pl-3">Go back home</span>
          </button>
        </Link>
      </div>
      <div className="hidden min-h-dvh sm:flex">
        <img className="m-auto w-11/12 rounded-lg" src={Lost_3d} alt="404" />
      </div>
    </div>
  );
}
