import { Link } from "react-router-dom";
import landingSVG from "../../assets/landing.png";
import Header from "../../components/header";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

export default function landing() {
  return (
    <article className="pros prose-xl">
      <div className="flex flex-col max-h-dvh lg:w-3/4 mx-auto w-11/12 overflow-hidden">
        <Header />
        <div className="xl:grid grid-cols-2 items-center md:my-10">
          <div className="xl:block flex flex-col justify-center items-center">
            <h1 className="font-gilroy-bold text-primary">
              Slick Chats
              <br />
              Big laughs
            </h1>
            <p className="text-primary-light text-center md:text-left">
              Revolutionize web connections for all. Modern design, <br /> endless connections, boundless communication.
            </p>
            <Link to="/login">
              <button className="rounded-2xl bg-violet-100 flex justify-between items-center h-20 w-52">
                <span className="font-bold px-4">Let's Ping</span>
                <div className="bg-secondary rounded-2xl p-7 transform transition-transform ease-in-out duration-500 hover:translate-x-6 ">
                  <ArrowRightIcon className=" text-white h-6" />
                </div>
              </button>
            </Link>
          </div>
          <div className="m-auto w-full">
            <img className="hidden md:block m-auto" src={landingSVG} alt="landing" />
          </div>
        </div>
      </div>
    </article>
  );
}
